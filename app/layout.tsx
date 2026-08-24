import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Canlı Finans & Kur Asistanı',
  description: 'Canlı altın ve döviz takip platformu',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body style={{ margin: 0, padding: 0, backgroundColor: '#05070f' }}>{children}</body>
    </html>
  );
}
