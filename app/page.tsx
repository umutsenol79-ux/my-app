'use client';

import { useEffect, useState } from 'react';

interface Particle {
  id: number;
  left: number;
  emoji: string;
  size: number;
  duration: number;
  drift: number;
}

export default function Home() {
  const [given, setGiven] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);

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

  const handleRobotGivesFlower = () => {
    setGiven(true);

    const emojis = ['🌸', '💐', '🌹', '💖', '✨', '🌷', '💝', '✨'];
    const newParticles: Particle[] = [];

    // Robotun merkezinden çevreye patlayan çiçekler
    for (let i = 0; i < 30; i++) {
      newParticles.push({
        id: Date.now() + i,
        left: 50 + (Math.random() * 20 - 10),
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
        size: Math.random() * 1.6 + 1.2,
        duration: Math.random() * 1.5 + 2.2,
        drift: Math.random() * 160 - 80
      });
    }

    setParticles(newParticles);
  };

  return (
    <main style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden', backgroundColor: '#06060c', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      
      {/* 3D Spline Robot Sahnesi */}
      {/* @ts-expect-error spline-viewer is a web component */}
      <spline-viewer 
        url="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode" 
        style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, zIndex: 1 }}
      />

      {/* Robotun Mesaj Balonu */}
      <div style={{
        position: 'absolute',
        top: '8%',
        left: '50%',
        transform: given ? 'translateX(-50%) scale(1)' : 'translateX(-50%) scale(0.8)',
        opacity: given ? 1 : 0,
        zIndex: 25,
        pointerEvents: 'none',
        transition: 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        width: '90%',
        maxWidth: '480px'
      }}>
        <div style={{
          background: 'rgba(20, 15, 30, 0.65)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1.5px solid rgba(244, 114, 182, 0.5)',
          padding: '22px 28px',
          borderRadius: '26px',
          boxShadow: '0 20px 50px rgba(236, 72, 153, 0.35)',
          textAlign: 'center',
          position: 'relative'
        }}>
          <div style={{ fontSize: '2.2rem', marginBottom: '4px' }}>🤖💐✨</div>
          <h2 style={{ margin: '0 0 6px 0', fontSize: '1.5rem', color: '#fff', fontWeight: '800', textShadow: '0 2px 10px rgba(0,0,0,0.6)' }}>
            Bunlar Senin İçin Ezgi! 🌸
          </h2>
          <p style={{ margin: 0, fontSize: '1rem', lineHeight: '1.5', color: '#fbcfe8' }}>
            Umut bu çiçekleri sana vermem için beni özel olarak görevlendirdi! Dünyanın en güzel sevgilisi, iyi ki varsın 💖
          </p>
          
          {/* Konuşma Baloncuğu Oku */}
          <div style={{
            position: 'absolute',
            bottom: '-12px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 0,
            height: 0,
            borderLeft: '12px solid transparent',
            borderRight: '12px solid transparent',
            borderTop: '12px solid rgba(244, 114, 182, 0.5)'
          }}></div>
        </div>
      </div>

      {/* Robotun Elinden Çıkan Büyük Hediye Çiçek Animasyonu */}
      {given && (
        <div style={{
          position: 'absolute',
          top: '45%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 20,
          pointerEvents: 'none',
          fontSize: '6rem',
          animation: 'robotGive 1.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
          filter: 'drop-shadow(0 0 35px rgba(236, 72, 153, 0.8))'
        }}>
          💐
        </div>
      )}

      {/* Alt Kısımdaki Buton */}
      <div style={{
        position: 'absolute',
        bottom: '8%',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 30,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <button
          onClick={handleRobotGivesFlower}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '16px 36px',
            fontSize: '1.2rem',
            fontWeight: '700',
            color: '#fff',
            background: given 
              ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' 
              : 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 50%, #f43f5e 100%)',
            border: '1.5px solid rgba(255, 255, 255, 0.4)',
            borderRadius: '9999px',
            cursor: 'pointer',
            boxShadow: '0 12px 35px rgba(236, 72, 153, 0.5)',
            transition: 'all 0.3s ease',
            outline: 'none'
          }}
          onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(0.94)')}
          onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          <span>{given ? 'Çiçekler Teslim Edildi 💖' : 'Robottan Çiçeğini Al 🌸'}</span>
          <span style={{ fontSize: '1.4rem' }}>{given ? '✨' : '🤖'}</span>
        </button>
      </div>

      {/* Robotun Etrafından Patlayan Çiçekler */}
      {particles.map((p) => (
        <div
          key={p.id}
          style={{
            position: 'absolute',
            top: '48%',
            left: `${p.left}%`,
            zIndex: 18,
            fontSize: `${p.size}rem`,
            pointerEvents: 'none',
            // @ts-expect-error css variable
            '--drift': `${p.drift}px`,
            animation: `burstOut ${p.duration}s cubic-bezier(0.25, 1, 0.5, 1) forwards`
          }}
        >
          {p.emoji}
        </div>
      ))}

      {/* Animasyonlar */}
      <style>{`
        @keyframes robotGive {
          0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.2) rotate(-30deg);
          }
          50% {
            opacity: 1;
            transform: translate(-50%, -65%) scale(1.4) rotate(10deg);
          }
          100% {
            opacity: 1;
            transform: translate(-50%, -55%) scale(1.1) rotate(0deg);
          }
        }

        @keyframes burstOut {
          0% {
            opacity: 1;
            transform: translate(0, 0) scale(0.5);
          }
          100% {
            opacity: 0;
            transform: translate(var(--drift), -350px) scale(1.2) rotate(45deg);
          }
        }
      `}</style>
    </main>
  );
}
