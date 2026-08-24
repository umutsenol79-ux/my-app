'use client';

import { useState, useEffect } from 'react';
import Script from 'next/script';

interface RateItem {
  name: string;
  code: string;
  buy: number;
  sell: number;
  change: number;
  icon: string;
}

const initialRates: RateItem[] = [
  { name: 'Gram Altın', code: 'GA', buy: 7115.50, sell: 7195.20, change: 1.45, icon: '🪙' },
  { name: 'Çeyrek Altın', code: 'CA', buy: 11620.00, sell: 11745.00, change: 1.28, icon: '🥇' },
  { name: 'Yarım Altın', code: 'YA', buy: 23240.00, sell: 23490.00, change: 1.25, icon: '🏆' },
  { name: 'Amerikan Doları', code: 'USD', buy: 48.05, sell: 48.12, change: 0.18, icon: '🇺🇸' },
  { name: 'Euro', code: 'EUR', buy: 55.90, sell: 56.10, change: -0.12, icon: '🇪🇺' },
  { name: 'ngiliz Sterlini', code: 'GBP', buy: 65.40, sell: 65.75, change: 0.32, icon: '🇬🇧' },
  { name: 'Bitcoin', code: 'BTC', buy: 3810000.00, sell: 3825000.00, change: 2.15, icon: '₿' },
];

export default function FinanceRobotApp() {
  const [rates] = useState<RateItem[]>(initialRates);
  const [calcAmount, setCalcAmount] = useState<number>(100);
  const [selectedCurrency, setSelectedCurrency] = useState<string>('USD');
  const [isThinking, setIsThinking] = useState<boolean>(false);
  const [robotSpeech, setRobotSpeech] = useState<string>('');

  const selectedItem = rates.find(r => r.code === selectedCurrency) || rates[0];
  const calculatedTotal = (calcAmount * selectedItem.sell).toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  useEffect(() => {
    setIsThinking(true);
    const timer = setTimeout(() => {
      setIsThinking(false);
      setRobotSpeech(`${calcAmount} ${selectedItem.name} = ${calculatedTotal} 🚀`);
    }, 350);

    return () => clearTimeout(timer);
  }, [calcAmount, selectedCurrency]);

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#05070f', color: '#f8fafc', fontFamily: 'system-ui, -apple-system, sans-serif', position: 'relative', overflowX: 'hidden' }}>
      
      {/* Spline Viewer Kütüphanesi */}
      <Script 
        src="https://unpkg.com/@splinetool/viewer@latest/build/spline-viewer.js" 
        strategy="beforeInteractive" 
        type="module"
      />

      {/* TÜM EKRANI KAPLAYAN 3D ROBOT KATMANI (Fareyi tüm ekranda takip eder) */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
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
      <div style={{ position: 'relative', zIndex: 30, backgroundColor: 'rgba(10, 15, 30, 0.85)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255,255,255,0.08)', overflow: 'hidden', whiteSpace: 'nowrap', padding: '10px 0', pointerEvents: 'none' }}>
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

      {/* Ana çerik Izgarası (Cam Efektli & Şeffaf) */}
      <div style={{
        position: 'relative',
        zIndex: 20,
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '30px 24px 80px 24px',
        display: 'grid',
        gridTemplateColumns: 'minmax(320px, 480px) 1fr',
        gap: '40px',
        pointerEvents: 'none'
      }}>
        
        {/* Sol Panel: Şık Cam Hesaplayıcı & Kurlar (Tıklanabilir) */}
        <div style={{ pointerEvents: 'auto' }}>
          
          <div style={{ marginBottom: '20px' }}>
            <span style={{ padding: '4px 12px', borderRadius: '9999px', background: 'rgba(56, 189, 248, 0.18)', border: '1px solid rgba(56, 189, 248, 0.4)', color: '#38bdf8', fontSize: '0.8rem', fontWeight: 'bold' }}>
              ⚡ 3D Canlı Finans Asistanı
            </span>
            <h1 style={{ margin: '12px 0 6px 0', fontSize: '2.3rem', fontWeight: '900', letterSpacing: '-0.02em', background: 'linear-gradient(135deg, #38bdf8 0%, #c084fc 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Akıllı Kur Çevirici
            </h1>
          </div>

          {/* Hesaplama Kartı */}
          <div style={{
            background: 'rgba(15, 23, 42, 0.72)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border: '1px solid rgba(255, 255, 255, 0.14)',
            borderRadius: '24px',
            padding: '22px',
            marginBottom: '22px',
            boxShadow: '0 20px 50px rgba(0,0,0,0.6)'
          }}>
            <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontSize: '0.78rem', color: '#94a3b8', marginBottom: '6px', fontWeight: 'bold' }}>MKTAR</label>
                <input
                  type="number"
                  min="1"
                  value={calcAmount}
                  onChange={(e) => setCalcAmount(Math.max(1, Number(e.target.value)))}
                  style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.15)', backgroundColor: 'rgba(5, 10, 25, 0.85)', color: '#fff', fontSize: '1.15rem', fontWeight: 'bold', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ flex: 1.5 }}>
                <label style={{ display: 'block', fontSize: '0.78rem', color: '#94a3b8', marginBottom: '6px', fontWeight: 'bold' }}>BRM</label>
                <select
                  value={selectedCurrency}
                  onChange={(e) => setSelectedCurrency(e.target.value)}
                  style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.15)', backgroundColor: 'rgba(5, 10, 25, 0.85)', color: '#fff', fontSize: '0.95rem', fontWeight: '600', cursor: 'pointer', outline: 'none', boxSizing: 'border-box' }}
                >
                  {rates.map(r => (
                    <option key={r.code} value={r.code}>{r.icon} {r.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* TL Sonuç Barı */}
            <div style={{
              padding: '16px 20px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.2), rgba(168, 85, 247, 0.2))',
              border: '1px solid rgba(56, 189, 248, 0.4)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <span style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'block', fontWeight: '600' }}>HESAPLANAN DEER</span>
                <strong style={{ fontSize: '1.6rem', color: '#38bdf8', letterSpacing: '-0.02em' }}>{calculatedTotal}</strong>
              </div>
              <span style={{ fontSize: '1.8rem' }}>✨</span>
            </div>
          </div>

          {/* Kurlar Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            {rates.map((item) => (
              <div
                key={item.code}
                onClick={() => setSelectedCurrency(item.code)}
                style={{
                  backgroundColor: selectedCurrency === item.code ? 'rgba(30, 41, 59, 0.88)' : 'rgba(15, 23, 42, 0.65)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  border: selectedCurrency === item.code ? '1.5px solid #38bdf8' : '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '16px',
                  padding: '14px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: '700', marginBottom: '4px' }}>
                  <span>{item.icon} {item.code}</span>
                  <span style={{ color: item.change >= 0 ? '#34d399' : '#f87171' }}>%{item.change}</span>
                </div>
                <div style={{ fontSize: '1.05rem', fontWeight: '800', color: '#f1f5f9' }}>
                  {item.sell.toLocaleString('tr-TR')}
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Sağ Taraf: Robotun Üzerinde Havada Duran Konuşma Baloncuğu */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '20px' }}>
          <div style={{
            maxWidth: '380px',
            background: 'rgba(15, 23, 42, 0.85)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border: '1.5px solid rgba(56, 189, 248, 0.45)',
            padding: '20px 24px',
            borderRadius: '24px',
            boxShadow: '0 20px 50px rgba(0,0,0,0.6)',
            textAlign: 'center',
            pointerEvents: 'auto',
            animation: 'floatingBubble 4s ease-in-out infinite alternate'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '6px' }}>
              <span style={{ fontSize: '1.3rem' }}>🤖</span>
              <span style={{ fontSize: '0.85rem', color: '#38bdf8', fontWeight: '800', letterSpacing: '0.05em' }}>AI ASSTAN DYOR K:</span>
            </div>
            <div style={{ fontSize: '1.1rem', color: '#f8fafc', fontWeight: '700', lineHeight: '1.4' }}>
              {isThinking ? 'Hesaplanıyor... ⏳' : robotSpeech}
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
          100% { transform: translateY(-10px); }
        }
      `}</style>
    </main>
  );
}