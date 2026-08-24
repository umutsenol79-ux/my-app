'use client';

import { useState, useMemo } from 'react';
import Script from 'next/script';

interface KurItem {
  id: string;
  ad: string;
  aciklama: string;
  satis: number;
  degisim: number;
  ikon: string;
}

const kurListesi: KurItem[] = [
  { id: 'GA', ad: 'Gram Altin', aciklama: '24 Ayar Saf Altin', satis: 7195.20, degisim: 1.45, ikon: '🪙' },
  { id: 'CA', ad: 'Ceyrek Altin', aciklama: 'Darphane Baski', satis: 11745.00, degisim: 1.28, ikon: '🥇' },
  { id: 'YA', ad: 'Yarim Altin', aciklama: 'Darphane Baski', satis: 23490.00, degisim: 1.25, ikon: '🏆' },
  { id: 'TA', ad: 'Tam Altin', aciklama: 'Cumhuriyet Altini', satis: 46750.00, degisim: 1.30, ikon: '👑' },
  { id: 'USD', ad: 'Amerikan Dolari', aciklama: 'Dolar Kuru (USD)', satis: 48.12, degisim: 0.18, ikon: '💵' },
  { id: 'EUR', ad: 'Euro', aciklama: 'Avrupa Kuru (EUR)', satis: 56.10, degisim: -0.12, ikon: '💶' },
  { id: 'GBP', ad: 'Ingiliz Sterlini', aciklama: 'Sterlin Kuru (GBP)', satis: 65.75, degisim: 0.32, ikon: '💷' },
  { id: 'BTC', ad: 'Bitcoin', aciklama: 'Kripto Para (BTC)', satis: 3825000.00, degisim: 2.15, ikon: '₿' },
];

export default function MobileFastFinanceApp() {
  const [miktar, setMiktar] = useState<number>(1);
  const [secilenId, setSecilenId] = useState<string>('GA');

  const secilenKur = useMemo(() => {
    return kurListesi.find(k => k.id === secilenId) || kurListesi[0];
  }, [secilenId]);

  const toplamTutar = useMemo(() => {
    return (miktar * secilenKur.satis).toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }, [miktar, secilenKur]);

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#05070f', color: '#f8fafc', fontFamily: 'system-ui, -apple-system, sans-serif', position: 'relative', overflowX: 'hidden' }}>
      
      <Script 
        src="https://unpkg.com/@splinetool/viewer@latest/build/spline-viewer.js" 
        strategy="lazyOnload" 
      />

      <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 1, opacity: 0.85, pointerEvents: 'auto' }}>
        {/* @ts-expect-error spline component */}
        <spline-viewer 
          url="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode" 
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      <div style={{ position: 'relative', zIndex: 20, backgroundColor: 'rgba(10, 15, 30, 0.94)', backdropFilter: 'blur(10px)', borderBottom: '1px solid rgba(255,255,255,0.08)', overflow: 'hidden', whiteSpace: 'nowrap', padding: '10px 0', pointerEvents: 'none' }}>
        <div style={{ display: 'inline-block', animation: 'kayanBant 25s linear infinite' }}>
          {kurListesi.map((r, i) => (
            <span key={i} style={{ margin: '0 18px', fontSize: '0.85rem' }}>
              <span style={{ color: '#94a3b8', marginRight: '5px' }}>{r.ad}:</span>
              <strong style={{ color: '#f8fafc' }}>{r.satis.toLocaleString('tr-TR')} TL</strong>
              <span style={{ marginLeft: '5px', color: r.degisim >= 0 ? '#34d399' : '#f87171', fontWeight: 'bold' }}>
                {r.degisim >= 0 ? `+ %${r.degisim}` : `- %${Math.abs(r.degisim)}`}
              </span>
            </span>
          ))}
        </div>
      </div>

      <div className="main-container">
        <div style={{ pointerEvents: 'auto' }}>
          
          <div style={{ marginBottom: '16px' }}>
            <span style={{ display: 'inline-block', padding: '4px 12px', borderRadius: '9999px', background: 'rgba(56, 189, 248, 0.15)', border: '1px solid rgba(56, 189, 248, 0.35)', color: '#38bdf8', fontSize: '0.78rem', fontWeight: 'bold' }}>
              Canli Piyasa Takibi
            </span>
            <h1 style={{ margin: '8px 0 4px 0', fontSize: '1.85rem', fontWeight: '900', letterSpacing: '-0.02em', background: 'linear-gradient(135deg, #38bdf8, #818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Akilli Kur Cevirici
            </h1>
          </div>

          <div style={{ background: 'rgba(15, 23, 42, 0.88)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255, 255, 255, 0.12)', borderRadius: '18px', padding: '16px', marginBottom: '16px', boxShadow: '0 15px 35px rgba(0,0,0,0.5)' }}>
            <div className="input-grid">
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '5px', fontWeight: 'bold' }}>ADET / MIKTAR</label>
                <input
                  type="number"
                  min="1"
                  value={miktar}
                  onChange={(e) => setMiktar(Math.max(1, Number(e.target.value)))}
                  style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.15)', backgroundColor: '#090d16', color: '#fff', fontSize: '1.1rem', fontWeight: 'bold', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '5px', fontWeight: 'bold' }}>BIRIM SECIMI</label>
                <select
                  value={secilenId}
                  onChange={(e) => setSecilenId(e.target.value)}
                  style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.15)', backgroundColor: '#090d16', color: '#fff', fontSize: '0.92rem', fontWeight: '600', cursor: 'pointer', outline: 'none', boxSizing: 'border-box' }}
                >
                  {kurListesi.map(r => (
                    <option key={r.id} value={r.id}>{r.ikon} {r.ad}</option>
                  ))}
                </select>
              </div>
            </div>

            <div style={{ marginTop: '12px', padding: '14px 16px', borderRadius: '12px', background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.2), rgba(99, 102, 241, 0.2))', border: '1px solid rgba(56, 189, 248, 0.4)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{ fontSize: '0.72rem', color: '#94a3b8', display: 'block', fontWeight: 'bold' }}>HESAPLANAN TOPLAM TUTAR</span>
                <strong style={{ fontSize: '1.5rem', color: '#38bdf8' }}>{toplamTutar} TL</strong>
              </div>
              <span style={{ fontSize: '1.4rem' }}>⚡</span>
            </div>
          </div>

          {/* Tam Metin Kur Listesi (Kısaltmasız) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '360px', overflowY: 'auto', paddingRight: '2px' }}>
            {kurListesi.map((item) => (
              <div
                key={item.id}
                onClick={() => setSecilenId(item.id)}
                style={{
                  backgroundColor: secilenId === item.id ? 'rgba(30, 41, 59, 0.95)' : 'rgba(15, 23, 42, 0.82)',
                  backdropFilter: 'blur(16px)',
                  border: secilenId === item.id ? '1.5px solid #38bdf8' : '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '12px',
                  padding: '12px 14px',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  transition: 'all 0.15s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '1.4rem' }}>{item.ikon}</span>
                  <div>
                    <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: '800', color: '#f8fafc' }}>{item.ad}</h4>
                    <span style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: '500' }}>{item.aciklama}</span>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '1rem', color: '#f8fafc', fontWeight: '800' }}>
                    {item.satis.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} TL
                  </div>
                  <span style={{ fontSize: '0.72rem', fontWeight: 'bold', color: item.degisim >= 0 ? '#34d399' : '#f87171' }}>
                    {item.degisim >= 0 ? `+ %${item.degisim}` : `- %${Math.abs(item.degisim)}`}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '10px' }}>
          <div style={{ width: '100%', maxWidth: '360px', background: 'rgba(15, 23, 42, 0.92)', backdropFilter: 'blur(20px)', border: '1.5px solid rgba(56, 189, 248, 0.5)', padding: '16px 20px', borderRadius: '18px', boxShadow: '0 20px 50px rgba(0,0,0,0.6)', textAlign: 'center', pointerEvents: 'auto' }}>
            <div style={{ fontSize: '0.78rem', color: '#38bdf8', fontWeight: '800', letterSpacing: '0.05em', marginBottom: '4px' }}>
              AI FINANS ASISTANI
            </div>
            <div style={{ fontSize: '1.05rem', color: '#f8fafc', fontWeight: '800', lineHeight: '1.4' }}>
              {miktar} Adet {secilenKur.ad} = <span style={{ color: '#38bdf8' }}>{toplamTutar} TL</span>
            </div>
          </div>
        </div>

      </div>

      <style>{`
        @keyframes kayanBant {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .main-container {
          position: relative;
          z-index: 10;
          max-width: 1400px;
          margin: 0 auto;
          padding: 16px 16px 60px 16px;
          display: grid;
          grid-template-columns: minmax(320px, 480px) 1fr;
          gap: 30px;
          pointer-events: none;
        }
        .input-grid {
          display: grid;
          grid-template-columns: 1fr 1.5fr;
          gap: 10px;
        }
        @media (max-width: 768px) {
          .main-container {
            grid-template-columns: 1fr;
            padding: 12px 12px 40px 12px;
            gap: 20px;
          }
          .input-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </main>
  );
}
