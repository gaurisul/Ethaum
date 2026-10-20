import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '../../context/useTheme';

// Verified international medical coordination hubs (lat, lon, label, specialty)
const MEDICAL_HUBS = [
  { id: 'lon', name: 'London', country: 'United Kingdom', lat: 51.5, lon: -0.1, specialty: 'Cardiac & Neurosurgery' },
  { id: 'zur', name: 'Zurich', country: 'Switzerland', lat: 47.37, lon: 8.54, specialty: 'Oncology & Precision Med' },
  { id: 'bos', name: 'Boston', country: 'United States', lat: 42.36, lon: -71.05, specialty: 'Clinical Research' },
  { id: 'dxb', name: 'Dubai', country: 'United Arab Emirates', lat: 25.2, lon: 55.27, specialty: 'Surgical Center' },
  { id: 'sin', name: 'Singapore', country: 'Singapore', lat: 1.35, lon: 103.82, specialty: 'Transplant & Joint Arthroplasty' },
  { id: 'sel', name: 'Seoul', country: 'South Korea', lat: 37.56, lon: 126.97, specialty: 'Reconstructive & Robotic Surgery' },
  { id: 'tyo', name: 'Tokyo', country: 'Japan', lat: 35.67, lon: 139.65, specialty: 'Advanced Diagnostics' },
];

// Active coordination routes between hubs, with key corridors originating from Boston
const COORDINATION_ROUTES = [
  { from: 'bos', to: 'lon' },
  { from: 'bos', to: 'zur' },
  { from: 'bos', to: 'dxb' },
  { from: 'bos', to: 'sin' },
  { from: 'lon', to: 'zur' },
  { from: 'zur', to: 'dxb' },
  { from: 'dxb', to: 'sin' },
  { from: 'sin', to: 'sel' },
  { from: 'sel', to: 'tyo' },
];

export function HealthcareGlobe() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const { theme } = useTheme();
  const themeRef = useRef(theme);
  const [activeHub, setActiveHub] = useState(MEDICAL_HUBS[1]); // Zurich default
  const activeHubRef = useRef(activeHub);
  const [canvasSupported, setCanvasSupported] = useState(true);

  // Synchronously maintain current theme and active hub in refs so the animation loop
  // updates materials, lighting, and markers dynamically without tearing down or resetting rotation
  useEffect(() => {
    themeRef.current = theme;
  }, [theme]);

  useEffect(() => {
    activeHubRef.current = activeHub;
  }, [activeHub]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || typeof canvas.getContext !== 'function') {
      setCanvasSupported(false);
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      setCanvasSupported(false);
      return;
    }

    let animationFrameId;
    let rotation = -0.55; // Initial camera angle focusing on Atlantic / Europe medical corridor
    let isVisible = true;
    let pulseProgress = 0;

    // Check prefers-reduced-motion
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Handle high-DPI displays safely
    const resize = () => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1, 2);
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      if (ctx.setTransform) {
        ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset transform before scaling
      }
      if (ctx.scale) {
        ctx.scale(dpr, dpr);
      }
    };

    resize();
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', resize);
    }

    // Pause animation when off-screen to preserve CPU/GPU battery
    let observer = null;
    if (typeof IntersectionObserver !== 'undefined' && containerRef.current) {
      observer = new IntersectionObserver(([entry]) => {
        isVisible = entry ? entry.isIntersecting : true;
      });
      observer.observe(containerRef.current);
    }

    // 3D Spherical projection with realistic axial tilt (~12.5°)
    // Correctly orients North upwards (negative canvas Y) and South downwards (positive canvas Y)
    const to3D = (lat, lon, angle, radius) => {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lon + 180) * (Math.PI / 180) + angle;

      const x0 = -(radius * Math.sin(phi) * Math.cos(theta));
      const z0 = radius * Math.sin(phi) * Math.sin(theta);
      const y0 = -(radius * Math.cos(phi));

      // Axial tilt: tilts the northern medical hubs (Zurich, London, Boston) naturally towards viewer
      const tilt = 0.22;
      const cosT = Math.cos(tilt);
      const sinT = Math.sin(tilt);

      const x = x0;
      const y = y0 * cosT + z0 * sinT;
      const z = -y0 * sinT + z0 * cosT;

      return { x, y, z };
    };

    // Pre-calculate restrained, cartographic coordinate dots
    const dots = [];
    for (let lat = -65; lat <= 70; lat += 14) {
      const radiusAtLat = Math.cos((lat * Math.PI) / 180);
      const step = Math.max(16, Math.round(22 / (radiusAtLat || 0.1)));
      for (let lon = -180; lon < 180; lon += step) {
        // Exclude major uninhabited deep ocean areas to suggest continent contours
        const isMajorOcean =
          (lon > -155 && lon < -75 && (lat < -12 || lat > 50)) ||
          (lon > -42 && lon < -12 && lat < 28) ||
          (lon > 62 && lon < 92 && lat < 6);
        if (!isMajorOcean || (lat % 28 === 0 && lon % 28 === 0)) {
          dots.push({ lat, lon });
        }
      }
    }

    // Latitude graticule lines
    const latitudeCircles = [-30, 0, 30, 60];
    // Longitude graticule lines
    const longitudeMeridians = [-120, -60, 0, 60, 120, 180];

    const render = () => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      if (width === 0 || height === 0) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      const cx = width / 2;
      const cy = height / 2;
      const globeRadius = Math.min(width, height) * 0.39;

      ctx.clearRect(0, 0, width, height);

      const isDark = themeRef.current === 'dark';

      // 1. Grounding Contact Shadow Beneath Globe
      ctx.save();
      const shadowY = cy + globeRadius * 0.98;
      const shadowRx = globeRadius * 0.72;
      const shadowRy = globeRadius * 0.14;
      const shadowGrad = ctx.createRadialGradient(
        cx,
        shadowY,
        0,
        cx,
        shadowY,
        shadowRx
      );

      if (isDark) {
        shadowGrad.addColorStop(0, 'rgba(0, 0, 0, 0.45)');
        shadowGrad.addColorStop(0.5, 'rgba(0, 0, 0, 0.15)');
        shadowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      } else {
        shadowGrad.addColorStop(0, 'rgba(21, 34, 28, 0.12)');
        shadowGrad.addColorStop(0.45, 'rgba(21, 34, 28, 0.05)');
        shadowGrad.addColorStop(1, 'rgba(21, 34, 28, 0)');
      }

      ctx.beginPath();
      ctx.ellipse(cx, shadowY, shadowRx, shadowRy, 0, 0, Math.PI * 2);
      ctx.fillStyle = shadowGrad;
      ctx.fill();
      ctx.restore();

      // 2. Globe Sphere Material & Directional Studio Lighting
      const lightSourceX = cx - globeRadius * 0.35;
      const lightSourceY = cy - globeRadius * 0.38;
      const sphereGradient = ctx.createRadialGradient(
        lightSourceX,
        lightSourceY,
        globeRadius * 0.04,
        cx,
        cy,
        globeRadius
      );

      if (isDark) {
        // Dark Mode: Emerald-charcoal deep palette
        sphereGradient.addColorStop(0, '#1E2C26');
        sphereGradient.addColorStop(0.7, '#16201B');
        sphereGradient.addColorStop(1, '#111714');
      } else {
        // Light Mode: Bespoke porcelain highlight, warm ivory body, and soft sage shaded contour
        // Harmonizes with #FAF9F5 canvas background without washed-out bleeding
        sphereGradient.addColorStop(0, '#FCFBF7');
        sphereGradient.addColorStop(0.28, '#F4F2EB');
        sphereGradient.addColorStop(0.65, '#E5EDE7');
        sphereGradient.addColorStop(0.88, '#D2DFD5');
        sphereGradient.addColorStop(1, '#BAC9BE');
      }

      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, globeRadius, 0, Math.PI * 2);
      ctx.fillStyle = sphereGradient;
      ctx.fill();

      // Clean atmospheric rim
      ctx.lineWidth = 1.25;
      ctx.strokeStyle = isDark ? 'rgba(45, 212, 191, 0.25)' : 'rgba(18, 76, 62, 0.22)';
      ctx.stroke();
      ctx.restore();

      // 3. True 3D Cartographic Graticules (Rotating Latitude & Longitude)
      ctx.save();
      ctx.strokeStyle = isDark ? 'rgba(45, 212, 191, 0.08)' : 'rgba(18, 76, 62, 0.08)';
      ctx.lineWidth = 1;

      // Latitude Parallels
      latitudeCircles.forEach((lat) => {
        let isPathOpen = false;
        ctx.beginPath();
        for (let lon = -180; lon <= 180; lon += 6) {
          const pt = to3D(lat, lon, rotation, globeRadius);
          if (pt.z > 0) {
            if (!isPathOpen) {
              ctx.moveTo(cx + pt.x, cy + pt.y);
              isPathOpen = true;
            } else {
              ctx.lineTo(cx + pt.x, cy + pt.y);
            }
          } else {
            isPathOpen = false;
          }
        }
        ctx.stroke();
      });

      // Longitude Meridians
      longitudeMeridians.forEach((lon) => {
        let isPathOpen = false;
        ctx.beginPath();
        for (let lat = -75; lat <= 75; lat += 6) {
          const pt = to3D(lat, lon, rotation, globeRadius);
          if (pt.z > 0) {
            if (!isPathOpen) {
              ctx.moveTo(cx + pt.x, cy + pt.y);
              isPathOpen = true;
            } else {
              ctx.lineTo(cx + pt.x, cy + pt.y);
            }
          } else {
            isPathOpen = false;
          }
        }
        ctx.stroke();
      });
      ctx.restore();

      // 4. Land Coordinates Point Cloud (High-visibility cartographic dots)
      ctx.save();
      dots.forEach((dot) => {
        const p = to3D(dot.lat, dot.lon, rotation, globeRadius);
        if (p.z > 0) {
          const depth = p.z / globeRadius;
          const alpha = Math.pow(depth, 1.15); // Clearer visibility across sphere curvature
          ctx.beginPath();
          ctx.arc(cx + p.x, cy + p.y, isDark ? 1.4 : 1.35, 0, Math.PI * 2);
          ctx.fillStyle = isDark
            ? `rgba(94, 234, 212, ${Math.min(1, alpha * 0.9)})`
            : `rgba(18, 76, 62, ${Math.min(1, alpha * 0.88)})`;
          ctx.fill();
        }
      });
      ctx.restore();

      // 5. Draw Coordination Travel Pathways & Pulses
      if (!prefersReducedMotion) {
        pulseProgress = (pulseProgress + 0.0035) % 1;
      }

      COORDINATION_ROUTES.forEach((route) => {
        const fromHub = MEDICAL_HUBS.find((h) => h.id === route.from);
        const toHub = MEDICAL_HUBS.find((h) => h.id === route.to);
        if (!fromHub || !toHub) return;

        const p1 = to3D(fromHub.lat, fromHub.lon, rotation, globeRadius);
        const p2 = to3D(toHub.lat, toHub.lon, rotation, globeRadius);

        // Render if at least one hub faces towards the viewer
        if (p1.z > -15 || p2.z > -15) {
          const midX = (p1.x + p2.x) / 2;
          const midY = (p1.y + p2.y) / 2;
          const midZ = (p1.z + p2.z) / 2;

          // Lift curve outward from sphere surface
          const arcLift = 1.18;
          const ctrlX = midX * arcLift;
          const ctrlY = midY * arcLift;

          const arcAlpha = Math.max(0.12, Math.min(1, (p1.z + p2.z) / (globeRadius * 1.5)));

          // Route dashed line
          ctx.save();
          ctx.beginPath();
          ctx.moveTo(cx + p1.x, cy + p1.y);
          ctx.quadraticCurveTo(cx + ctrlX, cy + ctrlY, cx + p2.x, cy + p2.y);
          ctx.strokeStyle = isDark
            ? `rgba(45, 212, 191, ${arcAlpha * 0.5})`
            : `rgba(25, 109, 93, ${arcAlpha * 0.45})`;
          ctx.lineWidth = 1.4;
          ctx.setLineDash([4, 4]);
          ctx.stroke();
          ctx.restore();

          // Smooth traveling coordination pulse
          const t = pulseProgress;
          const px = (1 - t) * (1 - t) * p1.x + 2 * (1 - t) * t * ctrlX + t * t * p2.x;
          const py = (1 - t) * (1 - t) * p1.y + 2 * (1 - t) * t * ctrlY + t * t * p2.y;
          const pz = (1 - t) * (1 - t) * p1.z + 2 * (1 - t) * t * midZ + t * t * p2.z;

          // Coordination pulse (suppressed under prefers-reduced-motion)
          if (pz > 0 && !prefersReducedMotion) {
            ctx.save();
            if (isDark) {
              ctx.beginPath();
              ctx.arc(cx + px, cy + py, 2.5, 0, Math.PI * 2);
              ctx.fillStyle = '#5EEAD4';
              ctx.shadowColor = 'rgba(94, 234, 212, 0.8)';
              ctx.shadowBlur = 6;
              ctx.fill();
            } else {
              // Light mode: Crisp double-ring pulse (no muddy dark blur shadow)
              ctx.beginPath();
              ctx.arc(cx + px, cy + py, 4.5, 0, Math.PI * 2);
              ctx.fillStyle = 'rgba(25, 109, 93, 0.18)';
              ctx.fill();

              ctx.beginPath();
              ctx.arc(cx + px, cy + py, 2.2, 0, Math.PI * 2);
              ctx.fillStyle = '#124C3E';
              ctx.fill();
            }
            ctx.restore();
          }
        }
      });

      // 6. Draw Medical Hub Markers & Legible Micro-Badges
      MEDICAL_HUBS.forEach((hub) => {
        const p = to3D(hub.lat, hub.lon, rotation, globeRadius);
        if (p.z > 0) {
          const depth = p.z / globeRadius;
          const alpha = Math.min(1, depth * 1.5);
          const currentActiveHub = activeHubRef.current;
          const isActive = currentActiveHub && hub.id === currentActiveHub.id;

          ctx.save();

          // Outer halo ring
          ctx.beginPath();
          ctx.arc(cx + p.x, cy + p.y, isActive ? 6.5 : 4.5, 0, Math.PI * 2);
          ctx.fillStyle = isDark
            ? `rgba(45, 212, 191, ${alpha * (isActive ? 0.35 : 0.2)})`
            : `rgba(25, 109, 93, ${alpha * (isActive ? 0.25 : 0.16)})`;
          ctx.fill();

          // Core node pin
          ctx.beginPath();
          ctx.arc(cx + p.x, cy + p.y, 2.2, 0, Math.PI * 2);
          ctx.fillStyle = isDark ? '#2DD4BF' : '#124C3E';
          ctx.fill();

          // Surgical center pip for clinical precision
          if (!isDark) {
            ctx.beginPath();
            ctx.arc(cx + p.x, cy + p.y, 0.75, 0, Math.PI * 2);
            ctx.fillStyle = '#FFFFFF';
            ctx.fill();
          }

          // Hub typography label for prominently visible nodes
          if (depth > 0.38) {
            ctx.font = '600 11px Source Sans 3, -apple-system, BlinkMacSystemFont, sans-serif';

            if (!isDark) {
              // Light mode: subtle high-contrast backing pill for perfect legibility
              const labelWidth = ctx.measureText
                ? ctx.measureText(hub.name).width
                : hub.name.length * 6.5;

              ctx.fillStyle = 'rgba(250, 249, 245, 0.9)';
              if (ctx.fillRect) {
                ctx.fillRect(cx + p.x + 6, cy + p.y - 8, labelWidth + 6, 13);
              }
              ctx.fillStyle = `rgba(21, 34, 28, ${Math.max(0.7, alpha)})`;
              ctx.fillText(hub.name, cx + p.x + 9, cy + p.y + 2);
            } else {
              // Dark mode label
              ctx.fillStyle = `rgba(240, 245, 242, ${alpha * 0.9})`;
              ctx.fillText(hub.name, cx + p.x + 8, cy + p.y + 3);
            }
          }
          ctx.restore();
        }
      });

      // Increment rotation at a calm, dignified speed (unless user prefers reduced motion)
      if (!prefersReducedMotion) {
        rotation += 0.00095;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // Auto-cycle active hub metadata pill every 6 seconds
    const hubInterval = setInterval(() => {
      setActiveHub((current) => {
        const currentIndex = MEDICAL_HUBS.findIndex((h) => h.id === current.id);
        const nextIndex = (currentIndex + 1) % MEDICAL_HUBS.length;
        return MEDICAL_HUBS[nextIndex];
      });
    }, 6000);

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', resize);
      }
      clearInterval(hubInterval);
      if (observer) {
        observer.disconnect();
      }
    };
  }, []); // Run effect once on mount; theme is read dynamically via themeRef to avoid remount/flicker

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '460px',
        margin: '0 auto',
      }}
    >
      {/* 3D Visual Container with Restrained Editorial Aesthetic */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '1 / 1',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {canvasSupported ? (
          <canvas
            ref={canvasRef}
            style={{
              width: '100%',
              height: '100%',
              display: 'block',
            }}
            aria-hidden="true"
          />
        ) : (
          /* High-Quality SVG Visual Fallback for Environments Without Canvas / WebGL */
          <svg
            viewBox="0 0 400 400"
            style={{ width: '100%', height: '100%', display: 'block' }}
            aria-hidden="true"
          >
            <defs>
              <radialGradient id="fallbackSphere" cx="35%" cy="35%" r="65%">
                {theme === 'dark' ? (
                  <>
                    <stop offset="0%" stopColor="#1E2C26" />
                    <stop offset="70%" stopColor="#16201B" />
                    <stop offset="100%" stopColor="#111714" />
                  </>
                ) : (
                  <>
                    <stop offset="0%" stopColor="#FCFBF7" />
                    <stop offset="35%" stopColor="#F4F2EB" />
                    <stop offset="70%" stopColor="#E5EDE7" />
                    <stop offset="100%" stopColor="#BAC9BE" />
                  </>
                )}
              </radialGradient>
              <radialGradient id="fallbackShadow" cx="50%" cy="50%" r="50%">
                <stop
                  offset="0%"
                  stopColor={theme === 'dark' ? 'rgba(0,0,0,0.45)' : 'rgba(21,34,28,0.12)'}
                />
                <stop offset="100%" stopColor="transparent" />
              </radialGradient>
            </defs>
            {/* Grounding Contact Shadow */}
            <ellipse cx="200" cy="350" rx="110" ry="22" fill="url(#fallbackShadow)" />
            {/* Base Sphere */}
            <circle
              cx="200"
              cy="200"
              r="150"
              fill="url(#fallbackSphere)"
              stroke={theme === 'dark' ? 'rgba(45,212,191,0.25)' : 'rgba(18,76,62,0.22)'}
              strokeWidth="1.25"
            />
            {/* Graticule Parallels */}
            <ellipse
              cx="200"
              cy="200"
              rx="150"
              ry="45"
              fill="none"
              stroke={theme === 'dark' ? 'rgba(45,212,191,0.08)' : 'rgba(18,76,62,0.08)'}
            />
            <ellipse
              cx="200"
              cy="150"
              rx="130"
              ry="38"
              fill="none"
              stroke={theme === 'dark' ? 'rgba(45,212,191,0.08)' : 'rgba(18,76,62,0.08)'}
            />
            <ellipse
              cx="200"
              cy="250"
              rx="130"
              ry="38"
              fill="none"
              stroke={theme === 'dark' ? 'rgba(45,212,191,0.08)' : 'rgba(18,76,62,0.08)'}
            />
            {/* Coordination Arc */}
            <path
              d="M 140 180 Q 200 130 260 170"
              fill="none"
              stroke={theme === 'dark' ? 'rgba(45,212,191,0.5)' : 'rgba(25,109,93,0.5)'}
              strokeWidth="1.5"
              strokeDasharray="4 4"
            />
            {/* Hub Pins */}
            <circle
              cx="140"
              cy="180"
              r="4"
              fill={theme === 'dark' ? '#2DD4BF' : '#124C3E'}
            />
            <circle
              cx="260"
              cy="170"
              r="4"
              fill={theme === 'dark' ? '#2DD4BF' : '#124C3E'}
            />
          </svg>
        )}

        {/* Static Screen Reader Accessibility Description */}
        <span
          className="sr-only"
          style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden' }}
        >
          Interactive 3D visualization illustrating active medical coordination pathways between verified hospital hubs in Zurich, London, Boston, Singapore, and Seoul.
        </span>
      </div>

      {/* Understated Clinical Node Metadata Pill */}
      <div
        style={{
          marginTop: 'var(--space-2)',
          padding: '0.625rem 0.875rem',
          backgroundColor: 'var(--color-bg-surface)',
          border: '1px solid var(--color-border-subtle)',
          borderRadius: 'var(--radius-md)',
          boxShadow: 'var(--shadow-xs)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          transition: 'all var(--transition-fast)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span
            style={{
              width: 7,
              height: 7,
              borderRadius: '50%',
              backgroundColor: 'var(--color-brand-accent)',
              display: 'inline-block',
            }}
          />
          <div>
            <div
              style={{
                fontSize: 'var(--font-size-xs)',
                fontWeight: 600,
                color: 'var(--color-text-primary)',
              }}
            >
              {activeHub.name}, {activeHub.country}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
              {activeHub.specialty}
            </div>
          </div>
        </div>
        <span
          style={{
            fontSize: '0.6875rem',
            color: 'var(--color-text-muted)',
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
            fontWeight: 500,
          }}
        >
          Verified Hub
        </span>
      </div>
    </div>
  );
}

export default HealthcareGlobe;
