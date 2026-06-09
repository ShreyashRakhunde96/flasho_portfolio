import { useEffect, useRef } from 'react';

export default function ElectricianTransition({ onComplete }) {
  const stageRef = useRef(null);

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;

    const wipe = el.querySelector('.el-wipe');
    const logo = el.querySelector('.el-logo');
    const sparks = el.querySelectorAll('.el-spark');

    // 1. Amber wipe sweeps down
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

    // 3. Sparks fly
    sparks.forEach((s, i) => {
      setTimeout(() => {
        s.animate(
          [{ opacity: 0, transform: 'translateY(0) scale(0)' },
          { opacity: 1, transform: `translateY(-${50 + i * 20}px) translateX(${(i % 2 === 0 ? 1 : -1) * (10 + i * 5)}px) scale(1)`, offset: 0.5 },
          { opacity: 0, transform: `translateY(-${100 + i * 30}px) translateX(${(i % 2 === 0 ? 1 : -1) * (20 + i * 10)}px) scale(0)` }],
          { duration: 600, easing: 'ease-out', fill: 'forwards' }
        );
      }, 150 + i * 40);
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

  const sparkPositions = [15, 30, 45, 60, 75, 85];

  return (
    <div ref={stageRef} style={{
      position: 'fixed', inset: 0, zIndex: 100,
      pointerEvents: 'none', overflow: 'hidden'
    }}>
      <div className="el-wipe" style={{
        position: 'absolute', left: 0, right: 0,
        top: 0, height: 0, background: '#d97706' // amber-600
      }} />

      {sparkPositions.map((left, i) => (
        <div key={i} className="el-spark" style={{
          position: 'absolute',
          background: 'rgba(255, 230, 0, 0.9)',
          boxShadow: '0 0 10px rgba(255, 255, 0, 0.8)',
          borderRadius: '50%',
          width: 6 + (i % 3) * 2,
          height: 12 + (i % 3) * 4,
          left: `${left}%`,
          bottom: '25%',
          opacity: 0,
        }} />
      ))}

      <div className="el-logo" style={{
        position: 'absolute', left: '50%', top: '50%',
        transform: 'translate(-50%,-50%)', opacity: 0,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
      }}>
        <svg width="40" height="40" viewBox="0 0 36 36" fill="none">
          <circle cx="18" cy="18" r="17" stroke="white" strokeWidth="1.5" />
          <path d="M20 10 L13 20 L18 20 L16 28 L23 18 L18 18 Z" fill="white" stroke="white" strokeWidth="1" strokeLinejoin="round" />
        </svg>
        <span style={{
          fontSize: 13, fontWeight: 500, color: 'white',
          letterSpacing: '0.05em', marginTop: 8, textAlign: 'center'
        }}>Connecting…</span>
      </div>
    </div>
  );
}
