'use client';

import { useState, useMemo } from 'react';
import Script from 'next/script';

interface Kur {
  id: string;
  ad: string;
  detay: string;
  satis: number;
  degisim: number;
}

const veriler: Kur[] = [
  { id: 'GA', ad: 'Gram Altin', detay: '24 Ayar Saf Altin', satis: 7195.20, degisim: 1.45 },
  { id: 'CA', ad: 'Ceyrek Altin', detay: 'Yeni Tarihli Darphane', satis: 11745.00, degisim: 1.28 },
  { id: 'YA', ad: 'Yarim Altin', detay: 'Darphane Baski', satis: 23490.00, degisim: 1.25 },
  { id: 'TA', ad: 'Tam Altin', detay: 'Cumhuriyet Altini', satis: 46750.00, degisim: 1.30 },
  { id: 'USD', ad: 'Amerikan Dolari', detay: 'Dolar / TRY', satis: 48.12, degisim: 0.18 },
  { id: 'EUR', ad: 'Euro', detay: 'Avrupa Para Birimi', satis: 56.10, degisim: -0.12 },
  { id: 'GBP', ad: 'Ingiliz Sterlini', detay: 'Sterlin / TRY', satis: 65.75, degisim: 0.32 },
  { id: 'BTC', ad: 'Bitcoin', detay: 'Kripto Para / TRY', satis: 3825000.00, degisim: 2.15 },
];

export default function Home() {
  const [miktar, setMiktar] = useState<number>(1);
  const [secilen, setSecilen] = useState<string>('GA');

  const aktifKur = useMemo(() => {
    return veriler.find(k => k.id === secilen) || veriler[0];
  }, [secilen]);

  const toplam = useMemo(() => {
    return (miktar * aktifKur.satis).toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }, [miktar, aktifKur]);

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#05070f', color: '#f8fafc', fontFamily: 'system-ui, -apple-system, sans-serif', position: 'relative', overflowX: 'hidden' }}>
      
      <Script 
        src="https://unpkg.com/@splinetool/viewer@latest/build/spline-viewer.js" 
        strategy="lazyOnload" 
      />

      <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 1, pointerEvents: 'auto' }}>
        {/* @ts-expect-error custom spline element */}
        <spline-viewer 
          url="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode" 
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      <div style={{ position: 'relative', zIndex: 20, backgroundColor: 'rgba(10, 15, 30, 0.92)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255,255,255,0.08)', overflow: 'hidden', whiteSpace: 'nowrap', padding: '10px 0', pointerEvents: 'none' }}>
        <div style={{ display: 'inline-block', animation: 'kayanYazi 25s linear infinite' }}>
          {veriler.map((r, i) => (
            <span key={i} style={{ margin: '0 22px', fontSize: '0.9rem' }}>
              <span style={{ color: '#94a3b8', marginRight: '6px' }}>{r.ad}:</span>
              <strong style={{ color: '#f8fafc' }}>{r.satis.toLocaleString('tr-TR')} TL</strong>
              <span style={{ marginLeft: '6px', color: r.degisim >= 0 ? '#34d399' : '#f87171', fontWeight: 'bold' }}>
                {r.degisim >= 0 ? `+ %${r.degisim}` : `- %${Math.abs(r.degisim)}`}
              </span>
            </span>
          ))}
        </div>
      </div>

      <div style={{ position: 'relative', zIndex: 10, maxWidth: '1440px', margin: '0 auto', padding: '24px 20px 80px 20px', display: 'grid', gridTemplateColumns: 'minmax(330px, 480px) 1fr', gap: '40px', pointerEvents: 'none' }}>
        
        <div style={{ pointerEvents: 'auto' }}>
          <div style={{ marginBottom: '16px' }}>
            <span style={{ padding: '5px 12px', borderRadius: '9999px', background: 'rgba(56, 189, 248, 0.15)', border: '1px solid rgba(56, 189, 248, 0.35)', color: '#38bdf8', fontSize: '0.8rem', fontWeight: 'bold' }}>
              Canli Finans Takibi
            </span>
            <h1 style={{ margin: '10px 0 4px 0', fontSize: '2.1rem', fontWeight: '900', letterSpacing: '-0.02em', background: 'linear-gradient(135deg, #38bdf8, #818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Akilli Kur Cevirici
            </h1>
          </div>

          <div style={{ background: 'rgba(15, 23, 42, 0.88)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255, 255, 255, 0.12)', borderRadius: '20px', padding: '20px', marginBottom: '16px', boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '14px' }}>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontSize: '0.78rem', color: '#94a3b8', marginBottom: '6px', fontWeight: 'bold' }}>MIKTAR</label>
                <input
                  type="number"
                  min="1"
                  value={miktar}
                  onChange={(e) => setMiktar(Math.max(1, Number(e.target.value)))}
                  style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.15)', backgroundColor: '#090d16', color: '#fff', fontSize: '1.15rem', fontWeight: 'bold', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ flex: 1.6 }}>
                <label style={{ display: 'block', fontSize: '0.78rem', color: '#94a3b8', marginBottom: '6px', fontWeight: 'bold' }}>BIRIM SECIN</label>
                <select
                  value={secilen}
                  onChange={(e) => setSecilen(e.target.value)}
                  style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.15)', backgroundColor: '#090d16', color: '#fff', fontSize: '0.92rem', fontWeight: '600', cursor: 'pointer', outline: 'none', boxSizing: 'border-box' }}
                >
                  {veriler.map(r => (
                    <option key={r.id} value={r.id}>{r.ad}</option>
                  ))}
                </select>
              </div>
            </div>

            <div style={{ padding: '14px 18px', borderRadius: '14px', background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.18), rgba(99, 102, 241, 0.2))', border: '1px solid rgba(56, 189, 248, 0.4)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'block', fontWeight: 'bold' }}>HESAPLANAN TOPLAM TUTAR</span>
                <strong style={{ fontSize: '1.6rem', color: '#38bdf8' }}>{toplam} TL</strong>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '420px', overflowY: 'auto', paddingRight: '4px' }}>
            {veriler.map((item) => (
              <div
                key={item.id}
                onClick={() => setSecilen(item.id)}
                style={{
                  backgroundColor: secilen === item.id ? 'rgba(30, 41, 59, 0.95)' : 'rgba(15, 23, 42, 0.8)',
                  backdropFilter: 'blur(16px)',
                  border: secilen === item.id ? '1.5px solid #38bdf8' : '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '14px',
                  padding: '12px 16px',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  transition: 'all 0.15s ease'
                }}
              >
                <div>
                  <h4 style={{ margin: 0, fontSize: '0.98rem', fontWeight: '800', color: '#f8fafc' }}>{item.ad}</h4>
                  <span style={{ fontSize: '0.78rem', color: '#94a3b8', fontWeight: '500' }}>{item.detay}</span>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '1.05rem', color: '#f8fafc', fontWeight: '800' }}>
                    {item.satis.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} TL
                  </div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: item.degisim >= 0 ? '#34d399' : '#f87171' }}>
                    {item.degisim >= 0 ? `+ %${item.degisim}` : `- %${Math.abs(item.degisim)}`}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '10px' }}>
          <div style={{ maxWidth: '360px', background: 'rgba(15, 23, 42, 0.92)', backdropFilter: 'blur(24px)', border: '1.5px solid rgba(56, 189, 248, 0.5)', padding: '16px 20px', borderRadius: '20px', boxShadow: '0 20px 50px rgba(0,0,0,0.6)', textAlign: 'center', pointerEvents: 'auto' }}>
            <div style={{ fontSize: '0.8rem', color: '#38bdf8', fontWeight: '800', letterSpacing: '0.05em', marginBottom: '4px' }}>
              YAPAY ZEKA FINANS ASISTANI
            </div>
            <div style={{ fontSize: '1.1rem', color: '#f8fafc', fontWeight: '800', lineHeight: '1.4' }}>
              {miktar} Adet {aktifKur.ad} = <span style={{ color: '#38bdf8' }}>{toplam} TL</span>
            </div>
          </div>
        </div>

      </div>

      <style>{`
        @keyframes kayanYazi {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </main>
  );
}
