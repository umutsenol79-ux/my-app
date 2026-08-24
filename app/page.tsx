'use client';

import { useState, useEffect } from 'react';

interface RateItem {
  name: string;
  code: string;
  buy: number;
  sell: number;
  change: number;
  icon: string;
  type: 'gold' | 'currency' | 'crypto';
}

const initialRates: RateItem[] = [
  { name: 'Gram Altın', code: 'GA', buy: 7115.50, sell: 7195.20, change: 1.45, icon: '🪙', type: 'gold' },
  { name: 'Çeyrek Altın', code: 'CA', buy: 11620.00, sell: 11745.00, change: 1.28, icon: '🥇', type: 'gold' },
  { name: 'Yarım Altın', code: 'YA', buy: 23240.00, sell: 23490.00, change: 1.25, icon: '🏆', type: 'gold' },
  { name: 'Tam Altın', code: 'TA', buy: 46200.00, sell: 46750.00, change: 1.30, icon: '👑', type: 'gold' },
  { name: 'Amerikan Doları', code: 'USD', buy: 48.05, sell: 48.12, change: 0.18, icon: '🇺🇸', type: 'currency' },
  { name: 'Euro', code: 'EUR', buy: 55.90, sell: 56.10, change: -0.12, icon: '🇪🇺', type: 'currency' },
  { name: 'ngiliz Sterlini', code: 'GBP', buy: 65.40, sell: 65.75, change: 0.32, icon: '🇬🇧', type: 'currency' },
  { name: 'Bitcoin', code: 'BTC', buy: 3810000.00, sell: 3825000.00, change: 2.15, icon: '₿', type: 'crypto' },
];

export default function FinanceRobotApp() {
  const [rates, setRates] = useState<RateItem[]>(initialRates);
  const [calcAmount, setCalcAmount] = useState<number>(100);
  const [selectedCurrency, setSelectedCurrency] = useState<string>('USD');
  const [isThinking, setIsThinking] = useState<boolean>(false);
  const [robotSpeech, setRobotSpeech] = useState<string>('');

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

  const selectedItem = rates.find(r => r.code === selectedCurrency) || rates[0];
  const calculatedTotal = (calcAmount * selectedItem.sell).toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  useEffect(() => {
    setIsThinking(true);
    const timer = setTimeout(() => {
      setIsThinking(false);
      setRobotSpeech(`${calcAmount} ${selectedItem.name} tam olarak ${calculatedTotal} ediyor! 🚀`);
    }, 400);

    return () => clearTimeout(timer);
  }, [calcAmount, selectedCurrency]);

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#05070e', color: '#f8fafc', fontFamily: 'system-ui, -apple-system, sans-serif', position: 'relative', overflowX: 'hidden' }}>
      
      {/* 3D Spline Robot - Ekranın Sağ Tarafında Sabit */}
      <div style={{
        position: 'fixed',
        top: 0,
        right: 0,
        width: '55vw',
        height: '100vh',
        zIndex: 1,
        pointerEvents: 'auto'
      }}>
        {/* @ts-expect-error spline-viewer web component */}
        <spline-viewer 
          url="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode" 
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* Üst Canlı Kayan Şerit */}
      <div style={{ position: 'relative', zIndex: 10, backgroundColor: 'rgba(15, 23, 42, 0.85)', backdropFilter: 'blur(10px)', borderBottom: '1px solid rgba(255,255,255,0.08)', overflow: 'hidden', whiteSpace: 'nowrap', padding: '10px 0' }}>
        <div style={{ display: 'inline-block', animation: 'marquee 22s linear infinite' }}>
          {rates.map((r, i) => (
            <span key={i} style={{ margin: '0 18px', fontSize: '0.88rem' }}>
              <span style={{ color: '#94a3b8', marginRight: '6px' }}>{r.name}:</span>
              <strong style={{ color: '#f8fafc' }}>{r.sell.toLocaleString('tr-TR')}</strong>
              <span style={{ marginLeft: '6px', color: r.change >= 0 ? '#10b981' : '#ef4444', fontWeight: 'bold' }}>
                {r.change >= 0 ? `+${r.change}%` : `${r.change}%`}
              </span>
            </span>
          ))}
        </div>
      </div>

      {/* çerik Alanı (Sol Panel & Robot Baloncuğu) */}
      <div style={{ position: 'relative', zIndex: 10, maxWidth: '1350px', margin: '0 auto', padding: '30px 24px 60px 24px', display: 'grid', gridTemplateColumns: 'minmax(320px, 580px) 1fr', gap: '40px' }}>
        
        {/* Sol Taraf: Başlık, Çevirici ve Kurlar */}
        <div>
          <div style={{ marginBottom: '28px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '9999px', background: 'rgba(56, 189, 248, 0.12)', border: '1px solid rgba(56, 189, 248, 0.25)', color: '#38bdf8', fontSize: '0.85rem', fontWeight: '600', marginBottom: '12px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10b981' }}></span>
              Canlı AI Finans Asistanı
            </div>
            <h1 style={{ margin: '0 0 10px 0', fontSize: '2.4rem', fontWeight: '900', letterSpacing: '-0.03em', background: 'linear-gradient(135deg, #38bdf8 0%, #818cf8 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Akıllı Kur & Altın Çevirici
            </h1>
            <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.95rem' }}>
              Robot asistanınız serbest piyasa ve Kapalıçarşı verileriyle anında hesaplama yapar.
            </p>
          </div>

          {/* Robot Çevirici Form Kartı */}
          <div style={{
            background: 'rgba(15, 23, 42, 0.75)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            borderRadius: '24px',
            padding: '24px',
            boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
            marginBottom: '28px'
          }}>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '1.15rem', color: '#f8fafc', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>🤖</span> Robota Hesaplat
            </h3>

            <div style={{ display: 'flex', gap: '12px', marginBottom: '18px', flexWrap: 'wrap' }}>
              <div style={{ flex: '1', minWidth: '130px' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '6px', fontWeight: '600' }}>MKTAR</label>
                <input
                  type="number"
                  min="1"
                  value={calcAmount}
                  onChange={(e) => setCalcAmount(Math.max(1, Number(e.target.value)))}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: '12px',
                    border: '1px solid #334155',
                    backgroundColor: '#090d16',
                    color: '#fff',
                    fontSize: '1.1rem',
                    fontWeight: '700',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div style={{ flex: '1.5', minWidth: '180px' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '6px', fontWeight: '600' }}>BRM / ALTIN</label>
                <select
                  value={selectedCurrency}
                  onChange={(e) => setSelectedCurrency(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: '12px',
                    border: '1px solid #334155',
                    backgroundColor: '#090d16',
                    color: '#fff',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                >
                  {rates.map(r => (
                    <option key={r.code} value={r.code}>{r.icon} {r.name} ({r.code})</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Robot Hesaplama Sonuç Çubuğu */}
            <div style={{
              padding: '16px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.12), rgba(99, 102, 241, 0.15))',
              border: '1px solid rgba(56, 189, 248, 0.3)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <span style={{ fontSize: '0.8rem', color: '#94a3b8', display: 'block' }}>HESAPLANAN TL TUTARI</span>
                <span style={{ fontSize: '1.5rem', fontWeight: '900', color: '#38bdf8' }}>
                  {calculatedTotal}
                </span>
              </div>
              <span style={{ fontSize: '1.8rem' }}>⚡</span>
            </div>
          </div>

          {/* Güncel Kurlar Tablosu */}
          <h3 style={{ fontSize: '1.1rem', color: '#cbd5e1', marginBottom: '14px' }}>📊 Güncel Piyasa Kurları</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '14px' }}>
            {rates.map((item) => (
              <div
                key={item.code}
                onClick={() => setSelectedCurrency(item.code)}
                style={{
                  backgroundColor: selectedCurrency === item.code ? 'rgba(30, 41, 59, 0.9)' : 'rgba(15, 23, 42, 0.65)',
                  backdropFilter: 'blur(12px)',
                  border: selectedCurrency === item.code ? '1.5px solid #38bdf8' : '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '16px',
                  padding: '16px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '1.3rem' }}>{item.icon}</span>
                    <span style={{ fontSize: '0.95rem', fontWeight: '700', color: '#f8fafc' }}>{item.name}</span>
                  </div>
                  <span style={{ fontSize: '0.8rem', fontWeight: '700', color: item.change >= 0 ? '#34d399' : '#f87171' }}>
                    {item.change >= 0 ? `▲ %${item.change}` : `▼ %${Math.abs(item.change)}`}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#94a3b8' }}>
                  <span>Satış:</span>
                  <strong style={{ color: '#f1f5f9', fontSize: '0.95rem' }}>{item.sell.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}</strong>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sağ Taraf: Robotun Üstündeki Konuşma Balonu */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', paddingTop: '40px', pointerEvents: 'none' }}>
          <div style={{
            maxWidth: '380px',
            background: 'rgba(15, 23, 42, 0.85)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(56, 189, 248, 0.4)',
            padding: '20px 24px',
            borderRadius: '24px',
            boxShadow: '0 20px 50px rgba(0,0,0,0.6)',
            transition: 'all 0.3s ease',
            transform: isThinking ? 'scale(0.96)' : 'scale(1)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <span style={{ fontSize: '1.4rem' }}>🤖</span>
              <span style={{ fontWeight: '800', fontSize: '0.95rem', color: '#38bdf8' }}>AI HESAP ROBOTU</span>
            </div>
            <p style={{ margin: 0, fontSize: '1.05rem', lineHeight: '1.5', color: '#e2e8f0', fontWeight: '500' }}>
              {isThinking ? 'Hesaplanıyor... ⏳' : robotSpeech}
            </p>
          </div>
        </div>

      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </main>
  );
}