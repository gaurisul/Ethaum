import '@testing-library/jest-dom';

// Clean mock for HTMLCanvasElement getContext in headless JSDOM environments
if (typeof HTMLCanvasElement !== 'undefined') {
  HTMLCanvasElement.prototype.getContext = () => ({
    clearRect: () => {},
    fillRect: () => {},
    beginPath: () => {},
    arc: () => {},
    fill: () => {},
    stroke: () => {},
    moveTo: () => {},
    lineTo: () => {},
    closePath: () => {},
    quadraticCurveTo: () => {},
    ellipse: () => {},
    save: () => {},
    restore: () => {},
    scale: () => {},
    setTransform: () => {},
    createRadialGradient: () => ({
      addColorStop: () => {},
    }),
    createLinearGradient: () => ({
      addColorStop: () => {},
    }),
    fillText: () => {},
    measureText: (text = '') => ({ width: (text || '').length * 6 }),
    setLineDash: () => {},
  });
}

// Clean mock for IntersectionObserver in headless JSDOM environments
if (typeof window !== 'undefined' && !window.IntersectionObserver) {
  window.IntersectionObserver = class {
    constructor(callback) {
      this.callback = callback;
    }
    observe() {}
    unobserve() {}
    disconnect() {}
  };
}

