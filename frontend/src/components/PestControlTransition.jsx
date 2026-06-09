import { useEffect, useRef } from 'react';

export default function PestControlTransition({ onComplete }) {
  const stageRef = useRef(null);

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;

    const wipe = el.querySelector('.pc-wipe');
    const logo = el.querySelector('.pc-logo');
    const bugs = el.querySelectorAll('.pc-bug');

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

    bugs.forEach((b, i) => {
      setTimeout(() => {
        b.animate(
          [{ opacity: 0, transform: 'translateX(0) scale(1)' },
          { opacity: 0.7, transform: `translateX(${(i % 2 === 0 ? 1 : -1) * (30 + i * 10)}px) translateY(${(i % 2 === 0 ? -1 : 1) * 20}px) scale(1)`, offset: 0.5 },
          { opacity: 0, transform: `translateX(${(i % 2 === 0 ? 1 : -1) * (60 + i * 20)}px) translateY(${(i % 2 === 0 ? -1 : 1) * 40}px) scale(0)` }],
          { duration: 600, easing: 'ease-out', fill: 'forwards' }
        );
      }, 200 + i * 40);
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

  const bugPositions = [20, 35, 50, 65, 80];

  return (
    <div ref={stageRef} style={{
      position: 'fixed', inset: 0, zIndex: 100,
      pointerEvents: 'none', overflow: 'hidden'
    }}>
      <div className="pc-wipe" style={{
        position: 'absolute', left: 0, right: 0,
        top: 0, height: 0, background: '#7e22ce' // purple-700
      }} />

      {bugPositions.map((left, i) => (
        <div key={i} className="pc-bug" style={{
          position: 'absolute',
          left: `${left}%`,
          top: '40%',
          opacity: 0,
          color: 'rgba(255,255,255,0.7)',
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 20h.01M18 10v10M14 14l-2-2M22 14l2-2M15 10a3 3 0 016 0M6 10v10M10 14l2-2M2 14l-2-2M3 10a3 3 0 006 0" />
          </svg>
        </div>
      ))}

      <div className="pc-logo" style={{
        position: 'absolute', left: '50%', top: '50%',
        transform: 'translate(-50%,-50%)', opacity: 0,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
      }}>
        <svg width="40" height="40" viewBox="0 0 36 36" fill="none">
          <circle cx="18" cy="18" r="17" stroke="white" strokeWidth="1.5" />
          <path d="M12 22a4 4 0 014-4h4a4 4 0 014 4v2H12v-2zM18 18v-6M15 14h6" stroke="white" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <span style={{
          fontSize: 13, fontWeight: 500, color: 'white',
          letterSpacing: '0.05em', marginTop: 8, textAlign: 'center'
        }}>Spraying…</span>
      </div>
    </div>
  );
}
