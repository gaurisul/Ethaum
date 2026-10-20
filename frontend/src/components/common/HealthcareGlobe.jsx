import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '../../context/useTheme';
import { ShieldCheckIcon, ClockIcon, ActivityIcon } from './Icons';

// Verified international medical coordination hubs with clinical operational metrics
export const MEDICAL_HUBS = [
  {
    id: 'zur',
    name: 'Zurich',
    country: 'Switzerland',
    lat: 47.37,
    lon: 8.54,
    specialty: 'Oncology & Precision Med',
    turnaround: '36 hours',
    accreditedBeds: '580 Beds',
    hospitalLead: 'St. Anna Medical Center',
    accreditation: 'ACHS / Swiss Med',
  },
  {
    id: 'bos',
    name: 'Boston',
    country: 'United States',
    lat: 42.36,
    lon: -71.05,
    specialty: 'Orthopedics & Clinical Research',
    turnaround: '48 hours',
    accreditedBeds: '1,240 Beds',
    hospitalLead: 'Mass Clinical Pavilion',
    accreditation: 'JCI / AMA Accredited',
  },
  {
    id: 'sel',
    name: 'Seoul',
    country: 'South Korea',
    lat: 37.56,
    lon: 126.97,
    specialty: 'Robotic & Reconstructive Surgery',
    turnaround: '24 hours',
    accreditedBeds: '2,700 Beds',
    hospitalLead: 'Asan Medical Center Hub',
    accreditation: 'JCI / KOIHA Accredited',
  },
  {
    id: 'sin',
    name: 'Singapore',
    country: 'Singapore',
    lat: 1.35,
    lon: 103.82,
    specialty: 'Cardiac Care & Joint Arthroplasty',
    turnaround: '36 hours',
    accreditedBeds: '1,450 Beds',
    hospitalLead: 'Mount Elizabeth Surgical Center',
    accreditation: 'JCI Accredited',
  },
  {
    id: 'lon',
    name: 'London',
    country: 'United Kingdom',
    lat: 51.5,
    lon: -0.1,
    specialty: 'Cardiothoracic & Neurosurgery',
    turnaround: '40 hours',
    accreditedBeds: '890 Beds',
    hospitalLead: 'Wellington Surgical Institute',
    accreditation: 'CQC / JCI Accredited',
  },
  {
    id: 'dxb',
    name: 'Dubai',
    country: 'United Arab Emirates',
    lat: 25.2,
    lon: 55.27,
    specialty: 'Complex Orthopedics & Bariatrics',
    turnaround: '48 hours',
    accreditedBeds: '640 Beds',
    hospitalLead: 'Dubai Healthcare City Hospital',
    accreditation: 'JCI / ACHS Accredited',
  },
];

// Active coordination routes between hubs
const COORDINATION_ROUTES = [
  { from: 'bos', to: 'lon' },
  { from: 'bos', to: 'zur' },
  { from: 'bos', to: 'dxb' },
  { from: 'bos', to: 'sin' },
  { from: 'lon', to: 'zur' },
  { from: 'zur', to: 'dxb' },
  { from: 'dxb', to: 'sin' },
  { from: 'sin', to: 'sel' },
];

export function HealthcareGlobe() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const { theme } = useTheme();
  const themeRef = useRef(theme);
  const [activeHub, setActiveHub] = useState(MEDICAL_HUBS[0]); // Zurich default
  const activeHubRef = useRef(activeHub);
  const [canvasSupported, setCanvasSupported] = useState(true);
  const targetRotationRef = useRef(null);

  useEffect(() => {
    themeRef.current = theme;
  }, [theme]);

  useEffect(() => {
    activeHubRef.current = activeHub;
    // When activeHub changes, set a gentle target angle to rotate towards that hub
    const target = -(activeHub.lon * Math.PI) / 180 - Math.PI / 2;
    targetRotationRef.current = target;
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
    let rotation = -0.55;
    let isVisible = true;
    let pulseProgress = 0;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const resize = () => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1, 2);
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      if (ctx.setTransform) {
        ctx.setTransform(1, 0, 0, 1, 0, 0);
      }
      if (ctx.scale) {
        ctx.scale(dpr, dpr);
      }
    };

    resize();
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', resize);
    }

    let observer = null;
    if (typeof IntersectionObserver !== 'undefined' && containerRef.current) {
      observer = new IntersectionObserver(([entry]) => {
        isVisible = entry ? entry.isIntersecting : true;
      });
      observer.observe(containerRef.current);
    }

    const to3D = (lat, lon, angle, radius) => {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lon + 180) * (Math.PI / 180) + angle;

      const x0 = -(radius * Math.sin(phi) * Math.cos(theta));
      const z0 = radius * Math.sin(phi) * Math.sin(theta);
      const y0 = -(radius * Math.cos(phi));

      const tilt = 0.22;
      const cosT = Math.cos(tilt);
      const sinT = Math.sin(tilt);

      const x = x0;
      const y = y0 * cosT + z0 * sinT;
      const z = -y0 * sinT + z0 * cosT;

      return { x, y, z };
    };

    const dots = [];
    for (let lat = -65; lat <= 70; lat += 14) {
      const radiusAtLat = Math.cos((lat * Math.PI) / 180);
      const step = Math.max(16, Math.round(22 / (radiusAtLat || 0.1)));
      for (let lon = -180; lon < 180; lon += step) {
        const isMajorOcean =
          (lon > -155 && lon < -75 && (lat < -12 || lat > 50)) ||
          (lon > -42 && lon < -12 && lat < 28) ||
          (lon > 62 && lon < 92 && lat < 6);
        if (!isMajorOcean || (lat % 28 === 0 && lon % 28 === 0)) {
          dots.push({ lat, lon });
        }
      }
    }

    const latitudeCircles = [-30, 0, 30, 60];
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
      const globeRadius = Math.min(width, height) * 0.38;

      ctx.clearRect(0, 0, width, height);
      const isDark = themeRef.current === 'dark';

      // 1. Grounding Contact Shadow
      ctx.save();
      const shadowY = cy + globeRadius * 0.98;
      const shadowRx = globeRadius * 0.72;
      const shadowRy = globeRadius * 0.14;
      const shadowGrad = ctx.createRadialGradient(cx, shadowY, 0, cx, shadowY, shadowRx);

      if (isDark) {
        shadowGrad.addColorStop(0, 'rgba(0, 0, 0, 0.45)');
        shadowGrad.addColorStop(0.5, 'rgba(0, 0, 0, 0.15)');
        shadowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      } else {
        shadowGrad.addColorStop(0, 'rgba(15, 30, 25, 0.08)');
        shadowGrad.addColorStop(0.45, 'rgba(15, 30, 25, 0.03)');
        shadowGrad.addColorStop(1, 'rgba(15, 30, 25, 0)');
      }

      ctx.beginPath();
      ctx.ellipse(cx, shadowY, shadowRx, shadowRy, 0, 0, Math.PI * 2);
      ctx.fillStyle = shadowGrad;
      ctx.fill();
      ctx.restore();

      // 2. Globe Sphere Material
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
        sphereGradient.addColorStop(0, '#1E2C26');
        sphereGradient.addColorStop(0.7, '#16201B');
        sphereGradient.addColorStop(1, '#111714');
      } else {
        sphereGradient.addColorStop(0, '#FFFFFF');
        sphereGradient.addColorStop(0.3, '#F3F7F5');
        sphereGradient.addColorStop(0.68, '#E0ECE7');
        sphereGradient.addColorStop(0.88, '#C6D8D0');
        sphereGradient.addColorStop(1, '#AEC3BA');
      }

      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, globeRadius, 0, Math.PI * 2);
      ctx.fillStyle = sphereGradient;
      ctx.fill();

      // Outer rim
      ctx.lineWidth = 1.25;
      ctx.strokeStyle = isDark ? 'rgba(45, 212, 191, 0.25)' : 'rgba(13, 148, 136, 0.22)';
      ctx.stroke();
      ctx.restore();

      // 3. Latitude & Longitude Graticules
      ctx.save();
      ctx.strokeStyle = isDark ? 'rgba(45, 212, 191, 0.08)' : 'rgba(13, 148, 136, 0.08)';
      ctx.lineWidth = 1;

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

      // 4. Cartographic Point Cloud
      ctx.save();
      dots.forEach((dot) => {
        const p = to3D(dot.lat, dot.lon, rotation, globeRadius);
        if (p.z > 0) {
          const depth = p.z / globeRadius;
          const alpha = Math.pow(depth, 1.15);
          ctx.beginPath();
          ctx.arc(cx + p.x, cy + p.y, isDark ? 1.4 : 1.35, 0, Math.PI * 2);
          ctx.fillStyle = isDark
            ? `rgba(94, 234, 212, ${Math.min(1, alpha * 0.9)})`
            : `rgba(15, 81, 50, ${Math.min(1, alpha * 0.88)})`;
          ctx.fill();
        }
      });
      ctx.restore();

      // 5. Travel Pathways & Pulses
      if (!prefersReducedMotion) {
        pulseProgress = (pulseProgress + 0.0035) % 1;
      }

      COORDINATION_ROUTES.forEach((route) => {
        const fromHub = MEDICAL_HUBS.find((h) => h.id === route.from);
        const toHub = MEDICAL_HUBS.find((h) => h.id === route.to);
        if (!fromHub || !toHub) return;

        const p1 = to3D(fromHub.lat, fromHub.lon, rotation, globeRadius);
        const p2 = to3D(toHub.lat, toHub.lon, rotation, globeRadius);

        if (p1.z > -15 || p2.z > -15) {
          const midX = (p1.x + p2.x) / 2;
          const midY = (p1.y + p2.y) / 2;
          const midZ = (p1.z + p2.z) / 2;

          const arcLift = 1.18;
          const ctrlX = midX * arcLift;
          const ctrlY = midY * arcLift;
          const arcAlpha = Math.max(0.12, Math.min(1, (p1.z + p2.z) / (globeRadius * 1.5)));

          ctx.save();
          ctx.beginPath();
          ctx.moveTo(cx + p1.x, cy + p1.y);
          ctx.quadraticCurveTo(cx + ctrlX, cy + ctrlY, cx + p2.x, cy + p2.y);
          ctx.strokeStyle = isDark
            ? `rgba(45, 212, 191, ${arcAlpha * 0.55})`
            : `rgba(13, 148, 136, ${arcAlpha * 0.5})`;
          ctx.lineWidth = 1.5;
          ctx.setLineDash([4, 4]);
          ctx.stroke();
          ctx.restore();

          const t = pulseProgress;
          const px = (1 - t) * (1 - t) * p1.x + 2 * (1 - t) * t * ctrlX + t * t * p2.x;
          const py = (1 - t) * (1 - t) * p1.y + 2 * (1 - t) * t * ctrlY + t * t * p2.y;
          const pz = (1 - t) * (1 - t) * p1.z + 2 * (1 - t) * t * midZ + t * t * p2.z;

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
              ctx.beginPath();
              ctx.arc(cx + px, cy + py, 4.5, 0, Math.PI * 2);
              ctx.fillStyle = 'rgba(13, 148, 136, 0.2)';
              ctx.fill();

              ctx.beginPath();
              ctx.arc(cx + px, cy + py, 2.2, 0, Math.PI * 2);
              ctx.fillStyle = '#0F5132';
              ctx.fill();
            }
            ctx.restore();
          }
        }
      });

      // 6. Draw City Pins & Labels
      MEDICAL_HUBS.forEach((hub) => {
        const p = to3D(hub.lat, hub.lon, rotation, globeRadius);
        if (p.z > 0) {
          const depth = p.z / globeRadius;
          const alpha = Math.min(1, depth * 1.5);
          const currentActiveHub = activeHubRef.current;
          const isActive = currentActiveHub && hub.id === currentActiveHub.id;

          ctx.save();

          // Outer halo
          ctx.beginPath();
          ctx.arc(cx + p.x, cy + p.y, isActive ? 7.5 : 4.5, 0, Math.PI * 2);
          ctx.fillStyle = isDark
            ? `rgba(45, 212, 191, ${alpha * (isActive ? 0.4 : 0.2)})`
            : `rgba(13, 148, 136, ${alpha * (isActive ? 0.35 : 0.18)})`;
          ctx.fill();

          // Core node pin
          ctx.beginPath();
          ctx.arc(cx + p.x, cy + p.y, isActive ? 3.5 : 2.2, 0, Math.PI * 2);
          ctx.fillStyle = isDark ? (isActive ? '#5EEAD4' : '#2DD4BF') : (isActive ? '#0F5132' : '#0D9488');
          ctx.fill();

          // Highlight center pip
          ctx.beginPath();
          ctx.arc(cx + p.x, cy + p.y, 1, 0, Math.PI * 2);
          ctx.fillStyle = '#FFFFFF';
          ctx.fill();

          // Prominent Label
          if (depth > 0.35 || isActive) {
            ctx.font = isActive
              ? '700 12px Plus Jakarta Sans, Inter, sans-serif'
              : '600 11px Plus Jakarta Sans, Inter, sans-serif';

            const labelWidth = ctx.measureText ? ctx.measureText(hub.name).width : hub.name.length * 6.5;

            if (!isDark) {
              ctx.fillStyle = isActive ? 'rgba(15, 81, 50, 0.95)' : 'rgba(255, 255, 255, 0.92)';
              if (ctx.fillRect) {
                ctx.fillRect(cx + p.x + 6, cy + p.y - 8, labelWidth + 8, 14);
              }
              ctx.fillStyle = isActive ? '#FFFFFF' : '#0F172A';
              ctx.fillText(hub.name, cx + p.x + 10, cy + p.y + 3);
            } else {
              ctx.fillStyle = isActive ? 'rgba(45, 212, 191, 0.95)' : 'rgba(25, 34, 30, 0.92)';
              if (ctx.fillRect) {
                ctx.fillRect(cx + p.x + 6, cy + p.y - 8, labelWidth + 8, 14);
              }
              ctx.fillStyle = isActive ? '#0E1A16' : '#F0F5F2';
              ctx.fillText(hub.name, cx + p.x + 10, cy + p.y + 3);
            }
          }
          ctx.restore();
        }
      });

      // Smooth camera drift or user-directed hub focus
      if (!prefersReducedMotion) {
        if (targetRotationRef.current !== null) {
          const diff = targetRotationRef.current - rotation;
          // Smooth interpolation
          if (Math.abs(diff) > 0.01) {
            rotation += diff * 0.05;
          } else {
            targetRotationRef.current = null;
          }
        } else {
          rotation += 0.00095;
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', resize);
      }
      if (observer) {
        observer.disconnect();
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="clinical-network-card"
      aria-label="International clinical coordination network overview"
    >
      {/* Network Header with Live Status Indicator */}
      <div className="network-card-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
          <div className="network-live-indicator" aria-hidden="true">
            <span className="network-live-ping" />
            <span className="network-live-dot" />
          </div>
          <div>
            <strong className="network-header-title">
              Live Clinical Corridors Active
            </strong>
            <span className="network-header-sub">
              6 Verified Inter-Hospital Coordination Routes
            </span>
          </div>
        </div>

        <div className="network-accreditation-pill">
          <ShieldCheckIcon size={13} style={{ color: 'var(--color-brand-accent)' }} />
          <span>JCI / ACHS Tier-1</span>
        </div>
      </div>

      {/* 3D Visual Hub Area */}
      <div className="network-canvas-container">
        {canvasSupported ? (
          <canvas
            ref={canvasRef}
            className="network-canvas"
            aria-hidden="true"
          />
        ) : (
          /* High-Quality SVG Visual Fallback */
          <svg
            viewBox="0 0 400 400"
            className="network-canvas"
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
                    <stop offset="0%" stopColor="#FFFFFF" />
                    <stop offset="35%" stopColor="#F3F7F5" />
                    <stop offset="70%" stopColor="#E0ECE7" />
                    <stop offset="100%" stopColor="#AEC3BA" />
                  </>
                )}
              </radialGradient>
              <radialGradient id="fallbackShadow" cx="50%" cy="50%" r="50%">
                <stop
                  offset="0%"
                  stopColor={theme === 'dark' ? 'rgba(0,0,0,0.45)' : 'rgba(15,30,25,0.08)'}
                />
                <stop offset="100%" stopColor="transparent" />
              </radialGradient>
            </defs>
            <ellipse cx="200" cy="350" rx="110" ry="22" fill="url(#fallbackShadow)" />
            <circle
              cx="200"
              cy="200"
              r="150"
              fill="url(#fallbackSphere)"
              stroke={theme === 'dark' ? 'rgba(45,212,191,0.25)' : 'rgba(13,148,136,0.22)'}
              strokeWidth="1.25"
            />
            <path
              d="M 140 180 Q 200 130 260 170"
              fill="none"
              stroke={theme === 'dark' ? 'rgba(45,212,191,0.5)' : 'rgba(13,148,136,0.5)'}
              strokeWidth="1.5"
              strokeDasharray="4 4"
            />
            <circle cx="140" cy="180" r="5" fill={theme === 'dark' ? '#2DD4BF' : '#0F5132'} />
            <circle cx="260" cy="170" r="5" fill={theme === 'dark' ? '#2DD4BF' : '#0F5132'} />
          </svg>
        )}

        {/* Screen Reader Accessibility Description */}
        <span className="sr-only">
          Interactive 3D visualization illustrating active medical coordination pathways between verified hospital hubs in Zurich, Boston, Seoul, Singapore, London, and Dubai.
        </span>

        {/* Floating Active Hub Detail Card Overlay */}
        <div className="active-hub-floating-overlay animate-fade-in" key={activeHub.id}>
          <div className="active-hub-header">
            <div>
              <span className="active-hub-lead">{activeHub.hospitalLead}</span>
              <h4 className="active-hub-city">{activeHub.name}, {activeHub.country}</h4>
            </div>
            <span className="active-hub-accreditation">{activeHub.accreditation}</span>
          </div>
          <div className="active-hub-metrics-grid">
            <div className="active-hub-metric-box">
              <span className="metric-box-label">Avg. Turnaround</span>
              <span className="metric-box-value">
                <ClockIcon size={12} style={{ color: 'var(--color-brand-accent)' }} />
                {activeHub.turnaround}
              </span>
            </div>
            <div className="active-hub-metric-box">
              <span className="metric-box-label">Accredited Beds</span>
              <span className="metric-box-value">
                <ActivityIcon size={12} style={{ color: 'var(--color-brand-accent)' }} />
                {activeHub.accreditedBeds}
              </span>
            </div>
          </div>
          <div className="active-hub-specialty-strip">
            <strong>Key Focus:</strong> {activeHub.specialty}
          </div>
        </div>
      </div>

      {/* Interactive City Selector Pins Bar */}
      <div className="network-city-pins-bar" role="tablist" aria-label="Medical corridor hubs">
        {MEDICAL_HUBS.map((hub) => {
          const isSelected = hub.id === activeHub.id;
          return (
            <button
              key={hub.id}
              type="button"
              role="tab"
              aria-selected={isSelected}
              className={`network-city-pin-btn ${isSelected ? 'active' : ''}`}
              onClick={() => setActiveHub(hub)}
              title={`${hub.name}: ${hub.turnaround} turnaround, ${hub.accreditedBeds}`}
            >
              <span className="city-pin-dot" />
              <span className="city-pin-name">{hub.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default HealthcareGlobe;