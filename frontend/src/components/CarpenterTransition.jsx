import { useEffect, useRef } from 'react';

export default function CarpenterTransition({ onComplete }) {
  const stageRef = useRef(null);

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;

    const wipe = el.querySelector('.ca-wipe');
    const logo = el.querySelector('.ca-logo');
    const chips = el.querySelectorAll('.ca-chip');

    wipe.animate(
      [{ height: '0%' }, { height: '100%' }],
      { duration: 380, easing: 'cubic-bezier(0.4,0,0.2,1)', fill: 'forwards' }
    );

    setTimeout(() => {
      logo.animate(
        [{ opacity: 0, transform: 'translate(-50%,-50%) scale(0.88)' },
        { opacity: 1, transform: 'translate(-50%,-50%) scale(1)' }],
        { duration: 220, fill: 'forwards' }
      );
    }, 280);

    chips.forEach((c, i) => {
      setTimeout(() => {
        c.animate(
          [{ opacity: 0, transform: 'translateY(-10px) rotate(0deg) scale(0)' },
          { opacity: 0.8, transform: `translateY(${50 + i * 15}px) rotate(180deg) scale(1)`, offset: 0.5 },
          { opacity: 0, transform: `translateY(${110 + i * 20}px) rotate(360deg) scale(0.5)` }],
          { duration: 700, easing: 'ease-out', fill: 'forwards' }
        );
      }, 100 + i * 50);
    });

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

  const chipPositions = [15, 30, 45, 60, 75, 90];

  return (
    <div ref={stageRef} style={{
      position: 'fixed', inset: 0, zIndex: 100,
      pointerEvents: 'none', overflow: 'hidden'
    }}>
      <div className="ca-wipe" style={{
        position: 'absolute', left: 0, right: 0,
        top: 0, height: 0, background: '#9a3412'
      }} />

      {chipPositions.map((left, i) => (
        <div key={i} className="ca-chip" style={{
          position: 'absolute',
          background: 'rgba(255, 235, 180, 0.9)',
          borderRadius: i % 2 === 0 ? '2px' : '4px',
          width: 8 + (i % 3) * 2,
          height: 8 + (i % 3) * 2,
          left: `${left}%`,
          top: '20%',
          opacity: 0,
        }} />
      ))}

      <div className="ca-logo" style={{
        position: 'absolute', left: '50%', top: '50%',
        transform: 'translate(-50%,-50%)', opacity: 0,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
      }}>
        <svg width="40" height="40" viewBox="0 0 36 36" fill="none">
          <circle cx="18" cy="18" r="17" stroke="white" strokeWidth="1.5" />
          <path d="M12 24l8-8m0 0a3 3 0 004-4 3 3 0 00-4 4zm0 0l-3-3" stroke="white" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <span style={{
          fontSize: 13, fontWeight: 500, color: 'white',
          letterSpacing: '0.05em', marginTop: 8, textAlign: 'center'
        }}>Building…</span>
      </div>
    </div>
  );
}
