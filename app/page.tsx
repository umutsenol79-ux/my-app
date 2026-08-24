'use client';

import { useEffect } from 'react';

export default function Home() {
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

  return (
    <main style={{ position: 'relative', width: '100vw', minHeight: '100vh', overflowX: 'hidden', backgroundColor: '#050508', color: '#fff', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      
      {/* 3D Robot */}
      {/* @ts-expect-error spline-viewer is a web component */}
      <spline-viewer 
        url="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode" 
        style={{ width: '100%', height: '100vh', position: 'fixed', top: 0, left: 0, zIndex: 1 }}
      />

      {/* Üst Navbar */}
      <nav style={{
        position: 'fixed',
        top: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '90%',
        maxWidth: '1200px',
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '14px 28px',
        background: 'rgba(15, 15, 25, 0.65)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '20px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.5)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: '800', fontSize: '1.25rem' }}>
          <span style={{ background: 'linear-gradient(135deg, #38bdf8 0%, #818cf8 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            NEXUS AI
          </span>
        </div>

        <div style={{ display: 'flex', gap: '24px', fontSize: '0.95rem', color: '#94a3b8', fontWeight: '500' }}>
          <span style={{ color: '#cbd5e1' }}>Özellikler</span>
          <span style={{ color: '#cbd5e1' }}>Modeller</span>
          <span style={{ color: '#cbd5e1' }}>Entegrasyon</span>
        </div>

        <button style={{
          padding: '10px 22px',
          fontSize: '0.9rem',
          fontWeight: '600',
          color: '#fff',
          background: 'linear-gradient(135deg, #6366f1 0%, #3b82f6 100%)',
          border: 'none',
          borderRadius: '12px',
          cursor: 'pointer'
        }}>
          Konsolu Aç
        </button>
      </nav>

      {/* Hero Alanı */}
      <section style={{
        position: 'relative',
        zIndex: 10,
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '0 8%',
        pointerEvents: 'none'
      }}>
        <div style={{ maxWidth: '560px', marginTop: '60px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 14px',
            borderRadius: '9999px',
            background: 'rgba(99, 102, 241, 0.15)',
            border: '1px solid rgba(99, 102, 241, 0.3)',
            color: '#a5b4fc',
            fontSize: '0.85rem',
            fontWeight: '600',
            marginBottom: '20px'
          }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#4ade80' }}></span>
            Gelecek Nesil Otonom Zeka
          </div>

          <h1 style={{
            fontSize: '3.5rem',
            fontWeight: '900',
            lineHeight: '1.1',
            letterSpacing: '-0.04em',
            margin: '0 0 20px 0',
            background: 'linear-gradient(180deg, #ffffff 0%, #94a3b8 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Yapay Zekanın Yeni Boyutu.
          </h1>

          <p style={{
            fontSize: '1.15rem',
            lineHeight: '1.6',
            color: '#94a3b8',
            marginBottom: '32px'
          }}>
            Karmaşık veri modellerini anında işleyen, 3D etkileşimli ve gerçek zamanlı öğrenen yapay zeka altyapısı ile projelerinizi güçlendirin.
          </p>

          <div style={{ display: 'flex', gap: '16px', pointerEvents: 'auto' }}>
            <button style={{
              padding: '14px 30px',
              fontSize: '1rem',
              fontWeight: '700',
              color: '#050508',
              backgroundColor: '#fff',
              border: 'none',
              borderRadius: '12px',
              cursor: 'pointer'
            }}>
              Hemen Deneyin →
            </button>
          </div>
        </div>
      </section>

      {/* Özellik Kartları */}
      <section style={{
        position: 'relative',
        zIndex: 10,
        padding: '0 8% 80px 8%',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '24px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {[
          { title: 'Otonom Çıkarım', desc: 'Saniyeler içinde yüksek hassasiyetli doğal dil ve veri analizleri.', icon: '⚡' },
          { title: 'Gerçek Zamanlı 3D', desc: 'Etkileşimli ortamlar ve simülasyonlarla tam uyumlu derin öğrenme.', icon: '🌐' },
          { title: 'Gelişmiş Güvenlik', desc: 'Uçtan uca şifrelenmiş veri akışı ve kurumsal veri gizliliği.', icon: '🛡️' }
        ].map((feat, idx) => (
          <div key={idx} style={{
            background: 'rgba(15, 15, 25, 0.65)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            padding: '28px',
            borderRadius: '20px'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '14px' }}>{feat.icon}</div>
            <h3 style={{ margin: '0 0 8px 0', fontSize: '1.25rem', fontWeight: '700', color: '#f8fafc' }}>{feat.title}</h3>
            <p style={{ margin: 0, fontSize: '0.95rem', color: '#94a3b8', lineHeight: '1.5' }}>{feat.desc}</p>
          </div>
        ))}
      </section>

    </main>
  );
}
