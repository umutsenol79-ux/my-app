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
  { name: 'Ata Altın', code: 'ATA', buy: 47100.00, sell: 47650.00, change: 1.38, icon: '🎖️', type: 'gold' },
  { name: 'Gram Gümüş', code: 'GUMUS', buy: 106.80, sell: 108.40, change: 0.95, icon: '🥈', type: 'gold' },
  { name: 'Amerikan Doları', code: 'USD', buy: 48.05, sell: 48.12, change: 0.18, icon: '🇺🇸', type: 'currency' },
  { name: 'Euro', code: 'EUR', buy: 55.90, sell: 56.10, change: -0.12, icon: '🇪🇺', type: 'currency' },
  { name: 'ngiliz Sterlini', code: 'GBP', buy: 65.40, sell: 65.75, change: 0.32, icon: '🇬🇧', type: 'currency' },
  { name: 'sviçre Frangı', code: 'CHF', buy: 59.50, sell: 60.10, change: -0.05, icon: '🇨🇭', type: 'currency' },
  { name: 'Bitcoin', code: 'BTC', buy: 3810000.00, sell: 3825000.00, change: 2.15, icon: '₿', type: 'crypto' },
  { name: 'Ethereum', code: 'ETH', buy: 138000.00, sell: 139500.00, change: -0.75, icon: 'Ξ', type: 'crypto' },
];

export default function FinanceDashboard() {
  const [rates, setRates] = useState<RateItem[]>(initialRates);
  const [filter, setFilter] = useState<'all' | 'gold' | 'currency' | 'crypto'>('all');
  const [calcAmount, setCalcAmount] = useState<number>(1);
  const [selectedCurrency, setSelectedCurrency] = useState<string>('GA');
  const [lastUpdated, setLastUpdated] = useState<string>('');
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    setLastUpdated(new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
  }, []);

  const refreshData = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setRates(prev =>
        prev.map(item => {
          const delta = (Math.random() * 0.4 - 0.2);
          const newBuy = Number((item.buy * (1 + delta / 100)).toFixed(2));
          const newSell = Number((item.sell * (1 + delta / 100)).toFixed(2));
          const newChange = Number((item.change + delta).toFixed(2));
          return { ...item, buy: newBuy, sell: newSell, change: newChange };
        })
      );
      setLastUpdated(new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
      setIsRefreshing(false);
    }, 600);
  };

  const filteredRates = filter === 'all' ? rates : rates.filter(r => r.type === filter);
  const selectedItem = rates.find(r => r.code === selectedCurrency) || rates[0];
  const calculatedTotal = (calcAmount * selectedItem.sell).toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#090d16', color: '#f1f5f9', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      
      {/* Üst Canlı Kayan Şerit */}
      <div style={{ backgroundColor: '#0f172a', borderBottom: '1px solid #1e293b', overflow: 'hidden', whiteSpace: 'nowrap', padding: '10px 0' }}>
        <div style={{ display: 'inline-block', animation: 'marquee 25s linear infinite' }}>
          {rates.map((r, i) => (
            <span key={i} style={{ margin: '0 20px', fontSize: '0.88rem' }}>
              <span style={{ color: '#94a3b8', marginRight: '6px' }}>{r.name}:</span>
              <strong style={{ color: '#f8fafc' }}>{r.sell.toLocaleString('tr-TR')}</strong>
              <span style={{ marginLeft: '6px', color: r.change >= 0 ? '#10b981' : '#ef4444', fontWeight: 'bold' }}>
                {r.change >= 0 ? `+${r.change}%` : `${r.change}%`}
              </span>
            </span>
          ))}
        </div>
      </div>

      {/* Header */}
      <header style={{ maxWidth: '1200px', margin: '0 auto', padding: '30px 20px 20px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'linear-gradient(135deg, #f59e0b, #e11d48)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem' }}>
              📈
            </div>
            <div>
              <h1 style={{ margin: 0, fontSize: '1.75rem', fontWeight: '800', letterSpacing: '-0.02em', background: 'linear-gradient(135deg, #fbbf24 0%, #f43f5e 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Canlı Döviz & Altın Piyasası
              </h1>
              <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748b' }}>
                Serbest Piyasa & Kapalıçarşı Anlık Fiyatları • Son Güncelleme: <span style={{ color: '#94a3b8' }}>{lastUpdated}</span>
              </p>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <button
            onClick={refreshData}
            disabled={isRefreshing}
            style={{
              padding: '10px 18px',
              backgroundColor: '#1e293b',
              border: '1px solid #334155',
              borderRadius: '12px',
              color: '#f8fafc',
              fontSize: '0.9rem',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <span>🔄</span>
            {isRefreshing ? 'Güncelleniyor...' : 'Kurları Yenile'}
          </button>
        </div>
      </header>

      {/* Ana Gövde */}
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px 60px 20px' }}>
        
        {/* Çevirici Kartı */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.7), rgba(15, 23, 42, 0.7))',
          backdropFilter: 'blur(16px)',
          border: '1px solid #334155',
          borderRadius: '20px',
          padding: '24px',
          marginBottom: '32px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px'
        }}>
          <div>
            <h3 style={{ margin: '0 0 6px 0', fontSize: '1.2rem', color: '#f8fafc' }}>🧮 Hızlı Kur & Altın Hesaplayıcı</h3>
            <p style={{ margin: 0, fontSize: '0.9rem', color: '#94a3b8' }}>Miktar girin, güncel satış kuruna göre TL karşılığını hesaplayın.</p>
          </div>

          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
            <input
              type="number"
              min="1"
              value={calcAmount}
              onChange={(e) => setCalcAmount(Math.max(1, Number(e.target.value)))}
              style={{
                width: '100px',
                padding: '12px',
                borderRadius: '12px',
                border: '1px solid #475569',
                backgroundColor: '#0f172a',
                color: '#fff',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                textAlign: 'center'
              }}
            />

            <select
              value={selectedCurrency}
              onChange={(e) => setSelectedCurrency(e.target.value)}
              style={{
                padding: '12px 16px',
                borderRadius: '12px',
                border: '1px solid #475569',
                backgroundColor: '#0f172a',
                color: '#fff',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              {rates.map(r => (
                <option key={r.code} value={r.code}>{r.name} ({r.code})</option>
              ))}
            </select>

            <div style={{
              padding: '12px 20px',
              backgroundColor: 'rgba(16, 185, 129, 0.15)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              borderRadius: '12px',
              fontSize: '1.25rem',
              fontWeight: '800',
              color: '#34d399'
            }}>
              = {calculatedTotal}
            </div>
          </div>
        </div>

        {/* Filtreleme Butonları */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '24px', flexWrap: 'wrap' }}>
          {[
            { id: 'all', label: 'Tümü' },
            { id: 'gold', label: '🪙 Altın & Kıymetli Maden' },
            { id: 'currency', label: '💵 Döviz Kurları' },
            { id: 'crypto', label: '₿ Kripto Varlıklar' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id as any)}
              style={{
                padding: '10px 20px',
                borderRadius: '12px',
                border: filter === tab.id ? '1px solid #f59e0b' : '1px solid #334155',
                backgroundColor: filter === tab.id ? 'rgba(245, 158, 11, 0.15)' : '#1e293b',
                color: filter === tab.id ? '#fbbf24' : '#94a3b8',
                fontWeight: '600',
                fontSize: '0.9rem',
                cursor: 'pointer'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Fiyat Kartları */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))', gap: '20px' }}>
          {filteredRates.map((item) => (
            <div
              key={item.code}
              style={{
                backgroundColor: '#131c2e',
                border: '1px solid #1e293b',
                borderRadius: '18px',
                padding: '20px',
                boxShadow: '0 10px 25px rgba(0,0,0,0.3)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '1.6rem' }}>{item.icon}</span>
                  <div>
                    <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: '700', color: '#f8fafc' }}>{item.name}</h4>
                    <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: '600' }}>{item.code}</span>
                  </div>
                </div>
                <div style={{
                  padding: '4px 10px',
                  borderRadius: '8px',
                  fontSize: '0.85rem',
                  fontWeight: '700',
                  backgroundColor: item.change >= 0 ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                  color: item.change >= 0 ? '#34d399' : '#f87171'
                }}>
                  {item.change >= 0 ? `▲ %${item.change}` : `▼ %${Math.abs(item.change)}`}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', paddingTop: '12px', borderTop: '1px solid #1e293b' }}>
                <div>
                  <span style={{ fontSize: '0.78rem', color: '#94a3b8', display: 'block', marginBottom: '2px' }}>ALIŞ</span>
                  <span style={{ fontSize: '1.15rem', fontWeight: '800', color: '#cbd5e1' }}>
                    {item.buy.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}
                  </span>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '0.78rem', color: '#94a3b8', display: 'block', marginBottom: '2px' }}>SATIŞ</span>
                  <span style={{ fontSize: '1.25rem', fontWeight: '800', color: '#38bdf8' }}>
                    {item.sell.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </main>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}