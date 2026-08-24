'use client';

import { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';

const Spline = dynamic(() => import('@splinetool/react-spline'), {
  ssr: false,
  loading: () => <div style={{ width: '100%', height: '100%', backgroundColor: '#05070f' }} />
});

interface RateItem {
  name: string;
  subTitle: string;
  code: string;
  buy: number;
  sell: number;
  change: number;
  icon: string;
  category: 'altin' | 'doviz' | 'kripto';
}

const kurListesi: RateItem[] = [
  // Altın & Değerli Madenler
  { name: 'Gram Altın', subTitle: '24 Ayar Has Altın', code: 'GA', buy: 7115.50, sell: 7195.20, change: 1.45, icon: '🪙', category: 'altin' },
  { name: 'Çeyrek Altın', subTitle: 'Yeni Tarihli', code: 'CA', buy: 11620.00, sell: 11745.00, change: 1.28, icon: '🥇', category: 'altin' },
  { name: 'Yarım Altın', subTitle: 'Darphane Baskı', code: 'YA', buy: 23240.00, sell: 23490.00, change: 1.25, icon: '🏆', category: 'altin' },
  { name: 'Tam (Cumhuriyet)', subTitle: 'Ata Lira', code: 'TA', buy: 46200.00, sell: 46750.00, change: 1.30, icon: '👑', category: 'altin' },
  { name: 'Gram Gümüş', subTitle: '999 Saflık', code: 'GUMUS', buy: 106.80, sell: 108.40, change: 0.95, icon: '🥈', category: 'altin' },

  // Döviz Kurları
  { name: 'Amerikan Doları', subTitle: 'ABD Doları (USD)', code: 'USD', buy: 48.05, sell: 48.12, change: 0.18, icon: '💵', category: 'doviz' },
  { name: 'Euro', subTitle: 'Avrupa Para Birimi (EUR)', code: 'EUR', buy: 55.90, sell: 56.10, change: -0.12, icon: '💶', category: 'doviz' },
  { name: 'ngiliz Sterlini', subTitle: 'Büyük Britanya (GBP)', code: 'GBP', buy: 65.40, sell: 65.75, change: 0.32, icon: '💷', category: 'doviz' },
  { name: 'sviçre Frangı', subTitle: 'sviçre (CHF)', code: 'CHF', buy: 59.50, sell: 60.10, change: -0.05, icon: '🇨🇭', category: 'doviz' },

  // Kripto
  { name: 'Bitcoin', subTitle: 'Lider Kripto (BTC)', code: 'BTC', buy: 3810000.00, sell: 3825000.00, change: 2.15, icon: '₿', category: 'kripto' },
];

export default function FinanceRobotApp() {
  const [activeCategory, setActiveCategory] = useState<'tumu' | 'altin' | 'doviz' | 'kripto'>('tumu');
  const [calcAmount, setCalcAmount] = useState<number>(100);
  const [selectedCurrency, setSelectedCurrency] = useState<string>('USD');

  const selectedItem = useMemo(() => {
    return kurListesi.find(r => r.code === selectedCurrency) || kurListesi[0];
  }, [selectedCurrency]);

  const calculatedTotal = useMemo(() => {
    return (calcAmount * selectedItem.sell).toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }, [calcAmount, selectedItem]);

  const filteredRates = useMemo(() => {
    if (activeCategory === 'tumu') return kurListesi;
    return kurListesi.filter(item => item.category === activeCategory);
  }, [activeCategory]);

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#05070f', color: '#f8fafc', fontFamily: 'system-ui, -apple-system, sans-serif', position: 'relative', overflowX: 'hidden' }}>
      
      {/* 3D Spline Robot Tuvali (Tam Ekran) */}
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

      {/* Üst Canlı Borsa Kayan Bandı */}
      <div style={{ position: 'relative', zIndex: 20, backgroundColor: 'rgba(10, 15, 30, 0.9)', backdropFilter: 'blur(10px)', borderBottom: '1px solid rgba(255,255,255,0.08)', overflow: 'hidden', whiteSpace: 'nowrap', padding: '10px 0', pointerEvents: 'none' }}>
        <div style={{ display: 'inline-block', animation: 'marquee 25s linear infinite' }}>
          {kurListesi.map((r, i) => (
            <span key={i} style={{ margin: '0 20px', fontSize: '0.9rem' }}>
              <span style={{ color: '#94a3b8', marginRight: '6px' }}>{r.name}:</span>
              <strong style={{ color: '#f8fafc' }}>{r.sell.toLocaleString('tr-TR')}</strong>
              <span style={{ marginLeft: '6px', color: r.change >= 0 ? '#10b981' : '#ef4444', fontWeight: 'bold' }}>
                {r.change >= 0 ? `▲ %${r.change}` : `▼ %${Math.abs(r.change)}`}
              </span>
            </span>
          ))}
        </div>
      </div>

      {/* Ana Arayüz */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        maxWidth: '1440px',
        margin: '0 auto',
        padding: '24px 20px 80px 20px',
        display: 'grid',
        gridTemplateColumns: 'minmax(330px, 520px) 1fr',
        gap: '36px',
        pointerEvents: 'none'
      }}>
        
        {/* Sol Panel: Çevirici ve Türkçe Kur Tablosu */}
        <div style={{ pointerEvents: 'auto' }}>
          
          <div style={{ marginBottom: '18px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '5px 12px', borderRadius: '9999px', background: 'rgba(56, 189, 248, 0.15)', border: '1px solid rgba(56, 189, 248, 0.35)', color: '#38bdf8', fontSize: '0.82rem', fontWeight: 'bold' }}>
              <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#10b981' }}></span>
              Canlı Serbest Piyasa & Kapalıçarşı
            </div>
            <h1 style={{ margin: '10px 0 4px 0', fontSize: '2.1rem', fontWeight: '900', letterSpacing: '-0.02em', background: 'linear-gradient(135deg, #38bdf8 0%, #a855f7 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Canlı Döviz & Altın Takibi
            </h1>
            <p style={{ margin: 0, fontSize: '0.88rem', color: '#94a3b8' }}>
              stediğiniz miktarı girin, robot anında Türk Lirası karşılığını hesaplasın.
            </p>
          </div>

          {/* Hesaplama / Çevirici Kartı */}
          <div style={{
            background: 'rgba(15, 23, 42, 0.8)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.14)',
            borderRadius: '20px',
            padding: '20px',
            marginBottom: '20px',
            boxShadow: '0 15px 35px rgba(0,0,0,0.5)'
          }}>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '14px' }}>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontSize: '0.78rem', color: '#94a3b8', marginBottom: '6px', fontWeight: 'bold' }}>MKTAR / ADET</label>
                <input
                  type="number"
                  min="1"
                  value={calcAmount}
                  onChange={(e) => setCalcAmount(Math.max(1, Number(e.target.value)))}
                  style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.15)', backgroundColor: 'rgba(5, 10, 25, 0.9)', color: '#fff', fontSize: '1.15rem', fontWeight: 'bold', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ flex: 1.6 }}>
                <label style={{ display: 'block', fontSize: '0.78rem', color: '#94a3b8', marginBottom: '6px', fontWeight: 'bold' }}>HESAPLANACAK BRM</label>
                <select
                  value={selectedCurrency}
                  onChange={(e) => setSelectedCurrency(e.target.value)}
                  style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.15)', backgroundColor: 'rgba(5, 10, 25, 0.9)', color: '#fff', fontSize: '0.92rem', fontWeight: '600', cursor: 'pointer', outline: 'none', boxSizing: 'border-box' }}
                >
                  {kurListesi.map(r => (
                    <option key={r.code} value={r.code}>{r.icon} {r.name} ({r.code})</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Toplam TL Tutarı */}
            <div style={{
              padding: '14px 18px',
              borderRadius: '14px',
              background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.18), rgba(168, 85, 247, 0.18))',
              border: '1px solid rgba(56, 189, 248, 0.4)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <span style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'block', fontWeight: 'bold' }}>TOPLAM TÜRK LRASI TUTARI</span>
                <strong style={{ fontSize: '1.55rem', color: '#38bdf8', letterSpacing: '-0.02em' }}>{calculatedTotal}</strong>
              </div>
              <span style={{ fontSize: '1.6rem' }}>💎</span>
            </div>
          </div>

          {/* Kategori Filtre Butonları */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: '14px', flexWrap: 'wrap' }}>
            {[
              { id: 'tumu', label: 'Tüm Kurlar' },
              { id: 'altin', label: '🪙 Altın & Gümüş' },
              { id: 'doviz', label: '💵 Döviz' },
              { id: 'kripto', label: '₿ Kripto' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id as any)}
                style={{
                  padding: '7px 14px',
                  borderRadius: '10px',
                  border: activeCategory === tab.id ? '1px solid #38bdf8' : '1px solid rgba(255,255,255,0.08)',
                  backgroundColor: activeCategory === tab.id ? 'rgba(56, 189, 248, 0.2)' : 'rgba(15, 23, 42, 0.7)',
                  color: activeCategory === tab.id ? '#38bdf8' : '#94a3b8',
                  fontSize: '0.82rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Türkçe Detaylı Kur Kartları */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '10px', maxHeight: '420px', overflowY: 'auto', paddingRight: '4px' }}>
            {filteredRates.map((item) => (
              <div
                key={item.code}
                onClick={() => setSelectedCurrency(item.code)}
                style={{
                  backgroundColor: selectedCurrency === item.code ? 'rgba(30, 41, 59, 0.95)' : 'rgba(15, 23, 42, 0.72)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  border: selectedCurrency === item.code ? '1.5px solid #38bdf8' : '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '14px',
                  padding: '12px 16px',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  transition: 'all 0.15s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '1.6rem' }}>{item.icon}</span>
                  <div>
                    <h4 style={{ margin: 0, fontSize: '0.98rem', fontWeight: '800', color: '#f8fafc' }}>{item.name}</h4>
                    <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>{item.subTitle}</span>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'flex-end', marginBottom: '2px' }}>
                    <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 'bold' }}>SATIŞ</span>
                    <strong style={{ fontSize: '1.05rem', color: '#f8fafc', fontWeight: '800' }}>
                      {item.sell.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}
                    </strong>
                  </div>
                  <span style={{ fontSize: '0.76rem', fontWeight: 'bold', color: item.change >= 0 ? '#34d399' : '#f87171' }}>
                    {item.change >= 0 ? `▲ %${item.change} Günlük Artış` : `▼ %${Math.abs(item.change)} Günlük Düşüş`}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Sağ Panel: Robotun Konuşma Baloncuğu */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '20px' }}>
          <div style={{
            maxWidth: '380px',
            background: 'rgba(15, 23, 42, 0.88)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1.5px solid rgba(56, 189, 248, 0.45)',
            padding: '18px 22px',
            borderRadius: '22px',
            boxShadow: '0 20px 50px rgba(0,0,0,0.6)',
            textAlign: 'center',
            pointerEvents: 'auto',
            animation: 'floatingBubble 4s ease-in-out infinite alternate'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '6px' }}>
              <span style={{ fontSize: '1.3rem' }}>🤖</span>
              <span style={{ fontSize: '0.82rem', color: '#38bdf8', fontWeight: '800', letterSpacing: '0.05em' }}>AI FNANS DANIŞMANI</span>
            </div>
            <div style={{ fontSize: '1.05rem', color: '#f8fafc', fontWeight: '700', lineHeight: '1.4' }}>
              {calcAmount} {selectedItem.name} = <span style={{ color: '#38bdf8' }}>{calculatedTotal}</span>
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
