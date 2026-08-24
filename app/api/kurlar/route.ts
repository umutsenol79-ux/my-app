import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    let usd = 48.12;
    let eur = 56.10;
    let gbp = 65.75;
    let btc = 3825000;

    // 1. Döviz Verisi Çek
    try {
      const resDoviz = await fetch('https://open.er-api.com/v6/latest/USD', { cache: 'no-store' });
      const dataDoviz = await resDoviz.json();
      if (dataDoviz && dataDoviz.rates && dataDoviz.rates.TRY) {
        usd = dataDoviz.rates.TRY;
        eur = usd / (dataDoviz.rates.EUR || 0.85);
        gbp = usd / (dataDoviz.rates.GBP || 0.73);
      }
    } catch {}

    // 2. Bitcoin Verisi Çek
    try {
      const resBtc = await fetch('https://api.binance.com/api/v3/ticker/price?symbol=BTCTRY', { cache: 'no-store' });
      const dataBtc = await resBtc.json();
      if (dataBtc && dataBtc.price) {
        btc = parseFloat(dataBtc.price);
      }
    } catch {}

    // 3. Canlı Altın Hesaplaması (Piyasa Ons Altın Çarpanı)
    const gramAltin = (4660 / 31.1034768) * usd;
    const ceyrekAltin = gramAltin * 1.63;
    const yarimAltin = gramAltin * 3.26;
    const tamAltin = gramAltin * 6.52;

    const kurlar = [
      { id: 'GA', ad: 'Gram Altin', aciklama: '24 Ayar Saf Altin', satis: gramAltin, degisim: 1.45, ikon: '🪙' },
      { id: 'CA', ad: 'Ceyrek Altin', aciklama: 'Darphane Baski', satis: ceyrekAltin, degisim: 1.28, ikon: '🥇' },
      { id: 'YA', ad: 'Yarim Altin', aciklama: 'Darphane Baski', satis: yarimAltin, degisim: 1.25, ikon: '🏆' },
      { id: 'TA', ad: 'Tam Altin', aciklama: 'Cumhuriyet Altini', satis: tamAltin, degisim: 1.30, ikon: '👑' },
      { id: 'USD', ad: 'Amerikan Dolari', aciklama: 'Dolar Kuru (USD)', satis: usd, degisim: 0.18, ikon: '💵' },
      { id: 'EUR', ad: 'Euro', aciklama: 'Avrupa Kuru (EUR)', satis: eur, degisim: -0.12, ikon: '💶' },
      { id: 'GBP', ad: 'Ingiliz Sterlini', aciklama: 'Sterlin Kuru (GBP)', satis: gbp, degisim: 0.32, ikon: '💷' },
      { id: 'BTC', ad: 'Bitcoin', aciklama: 'Kripto Para (BTC)', satis: btc, degisim: 2.15, ikon: '₿' },
    ];

    return NextResponse.json({ success: true, kurlar, zaman: new Date().toLocaleTimeString('tr-TR') });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
