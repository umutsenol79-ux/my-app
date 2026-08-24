'use client';

import { useState, useEffect, useRef } from 'react';
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
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const selectedItem = rates.find(r => r.code === selectedCurrency) || rates[0];
  const calculatedTotal = (calcAmount * selectedItem.sell).toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  useEffect(() => {
    setIsThinking(true);
    const timer = setTimeout(() => {
      setIsThinking(false);
      setRobotSpeech(`${calcAmount} ${selectedItem.name} tam olarak ${calculatedTotal} ediyor! 🚀`);
    }, 350);

    return () => clearTimeout(timer);
  }, [calcAmount, selectedCurrency]);

  // Fare hareketini tüm pencerede takip edip 3D açı hesaplama
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 2; // -1 ile 1 arası
      const y = (e.clientY / innerHeight - 0.5) * 2; // -1 ile 1 arası
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#060813', color: '#f8fafc', fontFamily: 'system-ui, -apple-system, sans-serif', position: 'relative', overflowX: 'hidden' }}>
      
      {/* Spline Viewer Kütüphanesi */}
      <Script 
        src="https://unpkg.com/@splinetool/viewer@latest/build/spline-viewer.js" 
        strategy="beforeInteractive" 
        type="module"
      />

      {/* Üst Canlı Kayan Şerit */}
      <div style={{ position: 'relative', zIndex: 20, backgroundColor: 'rgba(15, 23, 42, 0.95)', borderBottom: '1px solid rgba(255,255,255,0.08)', overflow: 'hidden', whiteSpace: 'nowrap', padding: '10px 0' }}>
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

      {/* Ana Grid Alanı */}
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '24px 20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '30px', alignItems: 'center', position: 'relative', zIndex: 10 }}>
        
        {/* Sol Taraf: Hesaplama & Kurlar */}
        <div style={{ zIndex: 15 }}>
          <div style={{ marginBottom: '20px' }}>
            <span style={{ padding: '4px 12px', borderRadius: '9999px', background: 'rgba(56, 189, 248, 0.15)', border: '1px solid rgba(56, 189, 248, 0.3)', color: '#38bdf8', fontSize: '0.8rem', fontWeight: 'bold' }}>
              ⚡ Canlı Finans Botu
            </span>
            <h1 style={{ margin: '12px 0 6px 0', fontSize: '2.2rem', fontWeight: '900', letterSpacing: '-0.02em', background: 'linear-gradient(135deg, #38bdf8, #818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Akıllı Kur Çevirici
            </h1>
          </div>

          {/* Hesaplama Kutusu */}
          <div style={{ background: 'rgba(15, 23, 42, 0.85)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255, 255, 255, 0.12)', borderRadius: '20px', padding: '20px', marginBottom: '20px' }}>
            <div style={{ display: 'flex', gap: '12px', marginBottom: '14px' }}>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontSize: '0.78rem', color: '#94a3b8', marginBottom: '4px' }}>MKTAR</label>
                <input
                  type="number"
                  min="1"
                  value={calcAmount}
                  onChange={(e) => setCalcAmount(Math.max(1, Number(e.target.value)))}
                  style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #334155', backgroundColor: '#090d16', color: '#fff', fontSize: '1.1rem', fontWeight: 'bold', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ flex: 1.5 }}>
                <label style={{ display: 'block', fontSize: '0.78rem', color: '#94a3b8', marginBottom: '4px' }}>BRM</label>
                <select
                  value={selectedCurrency}
                  onChange={(e) => setSelectedCurrency(e.target.value)}
                  style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #334155', backgroundColor: '#090d16', color: '#fff', fontSize: '0.95rem', fontWeight: '600', cursor: 'pointer', boxSizing: 'border-box' }}
                >
                  {rates.map(r => (
                    <option key={r.code} value={r.code}>{r.icon} {r.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* TL Sonuç Barı */}
            <div style={{ padding: '14px 18px', borderRadius: '14px', background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.15), rgba(99, 102, 241, 0.15))', border: '1px solid rgba(56, 189, 248, 0.3)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>TL KARŞILII</span>
              <strong style={{ fontSize: '1.5rem', color: '#38bdf8' }}>{calculatedTotal}</strong>
            </div>
          </div>

          {/* Kurlar Listesi */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            {rates.map((item) => (
              <div
                key={item.code}
                onClick={() => setSelectedCurrency(item.code)}
                style={{
                  backgroundColor: selectedCurrency === item.code ? 'rgba(30, 41, 59, 0.95)' : 'rgba(15, 23, 42, 0.7)',
                  border: selectedCurrency === item.code ? '1.5px solid #38bdf8' : '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '12px',
                  padding: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: '700', marginBottom: '4px' }}>
                  <span>{item.icon} {item.code}</span>
                  <span style={{ color: item.change >= 0 ? '#34d399' : '#f87171' }}>%{item.change}</span>
                </div>
                <div style={{ fontSize: '1rem', fontWeight: '800', color: '#e2e8f0' }}>
                  {item.sell.toLocaleString('tr-TR')}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sağ Taraf: Farenin Yönüne Göre Eğilen & Bakan 3D Robot */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
          
          {/* Robot Mesaj Balonu */}
          <div style={{
            width: '100%',
            maxWidth: '380px',
            background: 'rgba(15, 23, 42, 0.92)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(56, 189, 248, 0.4)',
            padding: '18px 22px',
            borderRadius: '20px',
            boxShadow: '0 15px 35px rgba(0,0,0,0.5)',
            marginBottom: '10px',
            textAlign: 'center',
            transform: `translate3d(${mousePos.x * 6}px, ${mousePos.y * 4}px, 0)`,
            transition: 'transform 0.15s ease-out'
          }}>
            <div style={{ fontSize: '0.85rem', color: '#38bdf8', fontWeight: 'bold', marginBottom: '4px' }}>
              🤖 AI HESAP ASSTANI
            </div>
            <div style={{ fontSize: '1.05rem', color: '#f8fafc', fontWeight: '600' }}>
              {isThinking ? 'Hesaplanıyor... ⏳' : robotSpeech}
            </div>
          </div>

          {/* 3D Spline Robot Kutusu */}
          <div 
            style={{ 
              width: '100%', 
              height: '520px', 
              position: 'relative', 
              borderRadius: '24px', 
              overflow: 'hidden',
              perspective: '1000px',
              transform: `rotateY(${mousePos.x * 12}deg) rotateX(${-mousePos.y * 10}deg)`,
              transition: 'transform 0.1s ease-out'
            }}
          >
            {/* @ts-expect-error spline-viewer web component */}
            <spline-viewer 
              url="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode" 
              style={{ width: '100%', height: '100%' }}
            />
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