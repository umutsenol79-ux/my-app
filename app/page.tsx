'use client';

import { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';

const Spline = dynamic(() => import('@splinetool/react-spline'), {
  ssr: false,
  loading: () => <div style={{ width: '100%', height: '100%', backgroundColor: '#05070f' }} />
});

interface RateItem {
  id: string;
  name: string;
  description: string;
  buy: number;
  sell: number;
  change: number;
}

const kurListesi: RateItem[] = [
  { id: 'GA', name: 'Gram Altın', description: '24 Ayar Saf Altın', buy: 7115.50, sell: 7195.20, change: 1.45 },
  { id: 'CA', name: 'Çeyrek Altın', description: 'Yeni Tarihli Darphane', buy: 11620.00, sell: 11745.00, change: 1.28 },
  { id: 'YA', name: 'Yarım Altın', description: 'T.C. Darphane Baskı', buy: 23240.00, sell: 23490.00, change: 1.25 },
  { id: 'TA', name: 'Tam Altın', description: 'Cumhuriyet Altını', buy: 46200.00, sell: 46750.00, change: 1.30 },
  { id: 'USD', name: 'Amerikan Doları', description: 'Dolar / Türk Lirası', buy: 48.05, sell: 48.12, change: 0.18 },
  { id: 'EUR', name: 'Euro', description: 'Euro / Türk Lirası', buy: 55.90, sell: 56.10, change: -0.12 },
  { id: 'GBP', name: 'ngiliz Sterlini', description: 'Sterlin / Türk Lirası', buy: 65.40, sell: 65.75, change: 0.32 },
  { id: 'BTC', name: 'Bitcoin', description: 'Kripto Para / TRY', buy: 3810000.00, sell: 3825000.00, change: 2.15 },
];

export default function FinanceRobotApp() {
  const [calcAmount, setCalcAmount] = useState<number>(1);
  const [selectedId, setSelectedId] = useState<string>('GA');

  const selectedItem = useMemo(() => {
    return kurListesi.find(r => r.id === selectedId) || kurListesi[0];
  }, [selectedId]);

  const calculatedTotal = useMemo(() => {
    return (calcAmount * selectedItem.sell).toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }, [calcAmount, selectedItem]);

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#05070f', color: '#f8fafc', fontFamily: 'system-ui, -apple-system, sans-serif', position: 'relative', overflowX: 'hidden' }}>
      
      {/* 3D Spline Robot Tuvali */}
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
              <span style={{ color: '#94a3b8', marginRight: '6px' }}>{r.name}:</span>
              <strong style={{ color: '#f8fafc' }}>{r.sell.toLocaleString('tr-TR')}</strong>
              <span style={{ marginLeft: '6px', color: r.change >= 0 ? '#34d399' : '#f87171', fontWeight: 'bold' }}>
                {r.change >= 0 ? `▲ %${r.change}` : `▼ %${Math.abs(r.change)}`}
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
        
        {/* Sol Panel: Çevirici ve Türkçe Kur Tablosu */}
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
                  value={calcAmount}
                  onChange={(e) => setCalcAmount(Math.max(1, Number(e.target.value)))}
                  style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.15)', backgroundColor: '#090d16', color: '#fff', fontSize: '1.15rem', fontWeight: 'bold', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ flex: 1.6 }}>
                <label style={{ display: 'block', fontSize: '0.78rem', color: '#94a3b8', marginBottom: '6px', fontWeight: 'bold' }}>ALTIN VEYA DÖVZ TÜRÜ</label>
                <select
                  value={selectedId}
                  onChange={(e) => setSelectedId(e.target.value)}
                  style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.15)', backgroundColor: '#090d16', color: '#fff', fontSize: '0.92rem', fontWeight: '600', cursor: 'pointer', outline: 'none', boxSizing: 'border-box' }}
                >
                  {kurListesi.map(r => (
                    <option key={r.id} value={r.id}>{r.name}</option>
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
                <strong style={{ fontSize: '1.6rem', color: '#38bdf8' }}>{calculatedTotal}</strong>
              </div>
            </div>
          </div>

          {/* Türkçe Kur Kartları Listesi (Kısaltmasız ve Net) */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '8px', maxHeight: '420px', overflowY: 'auto', paddingRight: '4px' }}>
            {kurListesi.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedId(item.id)}
                style={{
                  backgroundColor: selectedId === item.id ? 'rgba(30, 41, 59, 0.95)' : 'rgba(15, 23, 42, 0.8)',
                  backdropFilter: 'blur(16px)',
                  border: selectedId === item.id ? '1.5px solid #38bdf8' : '1px solid rgba(255, 255, 255, 0.08)',
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
                  <h4 style={{ margin: 0, fontSize: '0.98rem', fontWeight: '800', color: '#f8fafc' }}>{item.name}</h4>
                  <span style={{ fontSize: '0.78rem', color: '#94a3b8', fontWeight: '500' }}>{item.description}</span>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '1.05rem', color: '#f8fafc', fontWeight: '800' }}>
                    {item.sell.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}
                  </div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: item.change >= 0 ? '#34d399' : '#f87171' }}>
                    {item.change >= 0 ? `▲ %${item.change} Artış` : `▼ %${Math.abs(item.change)} Düşüş`}
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
              {calcAmount} Adet {selectedItem.name} = <span style={{ color: '#38bdf8' }}>{calculatedTotal}</span>
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
