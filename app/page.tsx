'use client';

import { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';

const Spline = dynamic(() => import('@splinetool/react-spline'), {
  ssr: false,
  loading: () => <div style={{ width: '100%', height: '100%', backgroundColor: '#05070f' }} />
});

interface KurElemani {
  id: string;
  ad: string;
  aciklama: string;
  alis: number;
  satis: number;
  degisim: number;
}

const kurListesi: KurElemani[] = [
  { id: 'GA', ad: 'Gram Altın', aciklama: '24 Ayar Saf Altın', alis: 7115.50, satis: 7195.20, degisim: 1.45 },
  { id: 'CA', ad: 'Çeyrek Altın', aciklama: 'Yeni Tarihli Darphane', alis: 11620.00, satis: 11745.00, degisim: 1.28 },
  { id: 'YA', ad: 'Yarım Altın', aciklama: 'Darphane Baskı Altın', alis: 23240.00, satis: 23490.00, degisim: 1.25 },
  { id: 'TA', ad: 'Tam Altın', aciklama: 'Cumhuriyet Altını', alis: 46200.00, satis: 46750.00, degisim: 1.30 },
  { id: 'USD', ad: 'Amerikan Doları', aciklama: 'Dolar / Türk Lirası', alis: 48.05, satis: 48.12, degisim: 0.18 },
  { id: 'EUR', ad: 'Euro', aciklama: 'Euro / Türk Lirası', alis: 55.90, satis: 56.10, degisim: -0.12 },
  { id: 'GBP', ad: 'ngiliz Sterlini', aciklama: 'Sterlin / Türk Lirası', alis: 65.40, satis: 65.75, degisim: 0.32 },
  { id: 'BTC', ad: 'Bitcoin', aciklama: 'Kripto Para / TRY', alis: 3810000.00, satis: 3825000.00, degisim: 2.15 },
];

export default function Home() {
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
      
      {/* 3D Robot */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 1,
        pointerEvents: 'auto'
      }}>
        <Spline scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode" />
      </div>

      {/* Üst Kayan Borsa Şeridi */}
      <div style={{ position: 'relative', zIndex: 20, backgroundColor: 'rgba(10, 15, 30, 0.92)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255,255,255,0.08)', overflow: 'hidden', whiteSpace: 'nowrap', padding: '10px 0', pointerEvents: 'none' }}>
        <div style={{ display: 'inline-block', animation: 'marquee 25s linear infinite' }}>
          {kurListesi.map((r, i) => (
            <span key={i} style={{ margin: '0 22px', fontSize: '0.88rem' }}>
              <span style={{ color: '#94a3b8', marginRight: '6px' }}>{r.ad}:</span>
              <strong style={{ color: '#f8fafc' }}>{r.satis.toLocaleString('tr-TR')}</strong>
              <span style={{ marginLeft: '6px', color: r.degisim >= 0 ? '#34d399' : '#f87171', fontWeight: 'bold' }}>
                {r.degisim >= 0 ? `▲ %${r.degisim}` : `▼ %${Math.abs(r.degisim)}`}
              </span>
            </span>
          ))}
        </div>
      </div>

      {/* Ana Arayüz Grid */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        maxWidth: '1440px',
        margin: '0 auto',
        padding: '24px 24px 80px 24px',
        display: 'grid',
        gridTemplateColumns: 'minmax(340px, 480px) 1fr',
        gap: '40px',
        pointerEvents: 'none'
      }}>
        
        {/* Sol Panel: Çevirici ve Türkçe Liste */}
        <div style={{ pointerEvents: 'auto' }}>
          
          <div style={{ marginBottom: '16px' }}>
            <span style={{ padding: '5px 12px', borderRadius: '9999px', background: 'rgba(56, 189, 248, 0.15)', border: '1px solid rgba(56, 189, 248, 0.35)', color: '#38bdf8', fontSize: '0.8rem', fontWeight: 'bold' }}>
              Canlı Serbest Piyasa
            </span>
            <h1 style={{ margin: '10px 0 4px 0', fontSize: '2.1rem', fontWeight: '900', letterSpacing: '-0.02em', background: 'linear-gradient(135deg, #38bdf8, #818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Akıllı Kur Çevirici
            </h1>
          </div>

          {/* Hesaplama Kartı */}
          <div style={{
            background: 'rgba(15, 23, 42, 0.88)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            borderRadius: '20px',
            padding: '20px',
            marginBottom: '16px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.5)'
          }}>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '14px' }}>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontSize: '0.78rem', color: '#94a3b8', marginBottom: '6px', fontWeight: 'bold' }}>MKTAR</label>
                <input
                  type="number"
                  min="1"
                  value={miktar}
                  onChange={(e) => setMiktar(Math.max(1, Number(e.target.value)))}
                  style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.15)', backgroundColor: '#090d16', color: '#fff', fontSize: '1.15rem', fontWeight: 'bold', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ flex: 1.6 }}>
                <label style={{ display: 'block', fontSize: '0.78rem', color: '#94a3b8', marginBottom: '6px', fontWeight: 'bold' }}>ALTIN VEYA DÖVZ TÜRÜ</label>
                <select
                  value={secilenId}
                  onChange={(e) => setSecilenId(e.target.value)}
                  style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.15)', backgroundColor: '#090d16', color: '#fff', fontSize: '0.92rem', fontWeight: '600', cursor: 'pointer', outline: 'none', boxSizing: 'border-box' }}
                >
                  {kurListesi.map(r => (
                    <option key={r.id} value={r.id}>{r.ad}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* TL Sonuç Barı */}
            <div style={{
              padding: '14px 18px',
              borderRadius: '14px',
              background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.18), rgba(99, 102, 241, 0.2))',
              border: '1px solid rgba(56, 189, 248, 0.4)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <span style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'block', fontWeight: 'bold' }}>TOPLAM TÜRK LRASI TUTARI</span>
                <strong style={{ fontSize: '1.6rem', color: '#38bdf8' }}>{toplamTutar}</strong>
              </div>
            </div>
          </div>

          {/* Türkçe Net Kur Listesi */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '8px', maxHeight: '420px', overflowY: 'auto', paddingRight: '4px' }}>
            {kurListesi.map((item) => (
              <div
                key={item.id}
                onClick={() => setSecilenId(item.id)}
                style={{
                  backgroundColor: secilenId === item.id ? 'rgba(30, 41, 59, 0.95)' : 'rgba(15, 23, 42, 0.8)',
                  backdropFilter: 'blur(16px)',
                  border: secilenId === item.id ? '1.5px solid #38bdf8' : '1px solid rgba(255, 255, 255, 0.08)',
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
                  <span style={{ fontSize: '0.78rem', color: '#94a3b8', fontWeight: '500' }}>{item.aciklama}</span>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '1.05rem', color: '#f8fafc', fontWeight: '800' }}>
                    {item.satis.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}
                  </div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: item.degisim >= 0 ? '#34d399' : '#f87171' }}>
                    {item.degisim >= 0 ? `▲ %${item.degisim} Artış` : `▼ %${Math.abs(item.degisim)} Düşüş`}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Sağ Panel: Konuşma Baloncuğu */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '10px' }}>
          <div style={{
            maxWidth: '360px',
            background: 'rgba(15, 23, 42, 0.92)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border: '1.5px solid rgba(56, 189, 248, 0.5)',
            padding: '16px 20px',
            borderRadius: '20px',
            boxShadow: '0 20px 50px rgba(0,0,0,0.6)',
            textAlign: 'center',
            pointerEvents: 'auto',
            animation: 'floatingBubble 4s ease-in-out infinite alternate'
          }}>
            <div style={{ fontSize: '0.8rem', color: '#38bdf8', fontWeight: '800', letterSpacing: '0.05em', marginBottom: '4px' }}>
              YAPAY ZEKA FNANS ASSTANI
            </div>
            <div style={{ fontSize: '1.1rem', color: '#f8fafc', fontWeight: '800', lineHeight: '1.4' }}>
              {miktar} Adet {secilenKur.ad} = <span style={{ color: '#38bdf8' }}>{toplamTutar}</span>
            </div>
          </div>
        </div>

      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        @keyframes floatingBubble {
          0% { transform: translateY(0px); }
          100% { transform: translateY(-8px); }
        }
      `}</style>
    </main>
  );
}
