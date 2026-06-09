import { useEffect, useRef } from 'react';

export default function AcRepairTransition({ onComplete }) {
  const stageRef = useRef(null);

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;

    const wipe = el.querySelector('.ar-wipe');
    const logo = el.querySelector('.ar-logo');
    const flakes = el.querySelectorAll('.ar-flake');

    // 1. Blue wipe sweeps down
    wipe.animate(
      [{ height: '0%' }, { height: '100%' }],
      { duration: 380, easing: 'cubic-bezier(0.4,0,0.2,1)', fill: 'forwards' }
    );

    // 2. Logo fades in
    setTimeout(() => {
      logo.animate(
        [{ opacity: 0, transform: 'translate(-50%,-50%) scale(0.88)' },
        { opacity: 1, transform: 'translate(-50%,-50%) scale(1)' }],
        { duration: 220, fill: 'forwards' }
      );
    }, 280);

    // 3. Snowflakes fall down
    flakes.forEach((f, i) => {
      setTimeout(() => {
        f.animate(
          [{ opacity: 0, transform: 'translateY(-20px) rotate(0deg) scale(0)' },
          { opacity: 0.8, transform: `translateY(${40 + i * 15}px) rotate(180deg) scale(1)`, offset: 0.55 },
          { opacity: 0, transform: `translateY(${100 + i * 20}px) rotate(360deg) scale(0.5)` }],
          { duration: 800, easing: 'ease-out', fill: 'forwards' }
        );
      }, 150 + i * 50);
    });

    // 4. Wipe slides off
    setTimeout(() => {
      wipe.animate(
        [{ transform: 'translateY(0)' }, { transform: 'translateY(-100%)' }],
        { duration: 340, easing: 'cubic-bezier(0.4,0,0.2,1)', fill: 'forwards' }
      );
      logo.animate(
        [{ opacity: 1 }, { opacity: 0 }],
        { duration: 200, fill: 'forwards' }
      );
    }, 1100);

    const t = setTimeout(() => onComplete?.(), 1500);
    return () => clearTimeout(t);
  }, []);

  const flakePositions = [15, 28, 42, 55, 70, 85];

  return (
    <div ref={stageRef} style={{
      position: 'fixed', inset: 0, zIndex: 100,
      pointerEvents: 'none', overflow: 'hidden'
    }}>

      {/* Blue wipe */}
      <div className="ar-wipe" style={{
        position: 'absolute', left: 0, right: 0,
        top: 0, height: 0, background: '#0284c7'
      }} />

      {/* Snowflakes */}
      {flakePositions.map((left, i) => (
        <div key={i} className="ar-flake" style={{
          position: 'absolute',
          color: 'rgba(255,255,255,0.9)',
          left: `${left}%`,
          top: '30%',
          opacity: 0,
          width: 14 + (i % 2) * 6,
          height: 14 + (i % 2) * 6,
        }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '100%', height: '100%' }}>
            <line x1="2" y1="12" x2="22" y2="12"></line>
            <line x1="12" y1="2" x2="12" y2="22"></line>
            <path d="m20 16-4-4 4-4"></path>
            <path d="m4 8 4 4-4 4"></path>
            <path d="m16 4-4 4-4-4"></path>
            <path d="m8 20 4-4 4 4"></path>
          </svg>
        </div>
      ))}

      {/* Center logo */}
      <div className="ar-logo" style={{
        position: 'absolute', left: '50%', top: '50%',
        transform: 'translate(-50%,-50%)',
        opacity: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <svg width="40" height="40" viewBox="0 0 36 36" fill="none">
          <circle cx="18" cy="18" r="17" stroke="white" strokeWidth="1.5" />
          <path d="M13 23 L23 13" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="11" cy="25" r="2" fill="white" />
          <path d="M23 13 C 24 10, 27 11, 27 11 C 27 11, 26 14, 23 13 Z" fill="white" stroke="white" strokeWidth="1" strokeLinejoin="round" />
        </svg>
        <span style={{
          fontSize: 13,
          fontWeight: 500, color: 'white',
          letterSpacing: '0.05em', marginTop: 8,
          textAlign: 'center'
        }}>Repairing…</span>
      </div>

    </div>
  );
}
