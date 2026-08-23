'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [showHeart, setShowHeart] = useState(false);
  const [flowers, setFlowers] = useState<number[]>([]);

  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'module';
    script.src = 'https://unpkg.com/@splinetool/viewer@latest/build/spline-viewer.js';
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const handleGiveFlower = () => {
    setShowHeart(true);
    setFlowers(prev => [...prev, Date.now()]);
    setTimeout(() => {
      setShowHeart(false);
    }, 4000);
  };

  return (
    <main style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden', backgroundColor: '#09090b', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      
      {/* 3D Spline Robot */}
      {/* @ts-expect-error spline-viewer is a web component */}
      <spline-viewer 
        url="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode" 
        style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, zIndex: 1 }}
      />

      {/* Üstte Çıkan Mesaj Balonu */}
      <div style={{
        position: 'absolute',
        top: '12%',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 10,
        pointerEvents: 'none',
        transition: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        opacity: showHeart ? 1 : 0,
        transformOrigin: 'center bottom',
        scale: showHeart ? '1' : '0.8'
      }}>
        <div style={{
          background: 'rgba(255, 255, 255, 0.15)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          padding: '16px 28px',
          borderRadius: '24px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
          textAlign: 'center'
        }}>
          <h2 style={{ margin: 0, fontSize: '1.6rem', color: '#fff', fontWeight: '700', textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
            Bunlar senin için! 🌸✨
          </h2>
          <p style={{ margin: '4px 0 0 0', fontSize: '0.95rem', color: '#fbcfe8' }}>
            Robot hediyeni çok sevdi 💖
          </p>
        </div>
      </div>

      {/* Alt Kısımdaki Çiçek Verme Butonu */}
      <div style={{
        position: 'absolute',
        bottom: '8%',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '12px'
      }}>
        <button
          onClick={handleGiveFlower}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '16px 36px',
            fontSize: '1.2rem',
            fontWeight: '600',
            color: '#fff',
            background: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)',
            border: 'none',
            borderRadius: '9999px',
            cursor: 'pointer',
            boxShadow: '0 10px 25px rgba(236, 72, 153, 0.4)',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            outline: 'none'
          }}
          onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(0.95)')}
          onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          <span>Robota Çiçek Ver</span>
          <span style={{ fontSize: '1.4rem' }}>🌸</span>
        </button>
      </div>

      {/* Uçuşan Çiçek Efektleri */}
      {flowers.map((id) => (
        <div
          key={id}
          style={{
            position: 'absolute',
            bottom: '15%',
            left: `${45 + (Math.random() * 10 - 5)}%`,
            zIndex: 15,
            fontSize: '2.5rem',
            pointerEvents: 'none',
            animation: 'flyUp 2s ease-out forwards'
          }}
        >
          💐
        </div>
      ))}

      {/* Animasyon CSS */}
      <style>{`
        @keyframes flyUp {
          0% {
            opacity: 1;
            transform: translateY(0) scale(0.6) rotate(0deg);
          }
          50% {
            opacity: 1;
            transform: translateY(-200px) scale(1.3) rotate(20deg);
          }
          100% {
            opacity: 0;
            transform: translateY(-400px) scale(1) rotate(-15deg);
          }
        }
      `}</style>
    </main>
  );
}
