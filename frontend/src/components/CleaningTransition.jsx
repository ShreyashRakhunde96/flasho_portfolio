import { useEffect, useRef } from 'react';

export default function CleanTransition({ onComplete }) {
  const stageRef = useRef(null);

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;

    const wipe = el.querySelector('.ct-wipe');
    const logo = el.querySelector('.ct-logo');
    const bubbles = el.querySelectorAll('.ct-bubble');

    // 1. Teal wipe sweeps down
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
    }, 300);

    // 3. Bubbles float up
    bubbles.forEach((b, i) => {
      setTimeout(() => {
        b.animate(
          [{ opacity: 0, transform: 'translateY(0) scale(0)' },
          { opacity: 0.8, transform: `translateY(-${55 + i * 16}px) scale(1)`, offset: 0.55 },
          { opacity: 0, transform: `translateY(-${100 + i * 20}px) scale(0.5)` }],
          { duration: 700, easing: 'ease-out', fill: 'forwards' }
        );
      }, 200 + i * 55);
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

  const bubblePositions = [10, 22, 34, 47, 58, 68, 79, 90];

  return (
    <div ref={stageRef} style={{
      position: 'fixed', inset: 0, zIndex: 100,
      pointerEvents: 'none', overflow: 'hidden'
    }}>

      {/* Teal wipe */}
      <div className="ct-wipe" style={{
        position: 'absolute', left: 0, right: 0,
        top: 0, height: 0, background: '#1D9E75'
      }} />

      {/* Bubbles */}
      {bubblePositions.map((left, i) => (
        <div key={i} className="ct-bubble" style={{
          position: 'absolute',
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.55)',
          border: '1px solid rgba(255,255,255,0.8)',
          width: 10 + (i % 3) * 6,
          height: 10 + (i % 3) * 6,
          left: `${left}%`,
          bottom: '18%',
        }} />
      ))}

      {/* Center logo */}
      <div className="ct-logo" style={{
        position: 'absolute', left: '50%', top: '50%',
        transform: 'translate(-50%,-50%)',
        textAlign: 'center', opacity: 0
      }}>
        <svg width="40" height="40" viewBox="0 0 36 36" fill="none">
          <circle cx="18" cy="18" r="17" stroke="white" strokeWidth="1.5" />
          <path d="M10 22 Q14 12 18 20 Q22 28 26 16"
            stroke="white" strokeWidth="2" strokeLinecap="round" fill="none" />
        </svg>
        <span style={{
          display: 'block', fontSize: 13,
          fontWeight: 500, color: 'white',
          letterSpacing: '0.05em', marginTop: 6
        }}>Cleaning…</span>
      </div>

    </div>
  );
}