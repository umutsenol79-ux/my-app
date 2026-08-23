'use client';

import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'module';
    script.src = 'https://unpkg.com/@splinetool/viewer@latest/build/spline-viewer.js';
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <main style={{ width: '100vw', height: '100vh', margin: 0, padding: 0, overflow: 'hidden', backgroundColor: '#000' }}>
      {/* @ts-expect-error spline-viewer is a web component */}
      <spline-viewer url="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode" style={{ width: '100%', height: '100%' }}></spline-viewer>
    </main>
  );
}
