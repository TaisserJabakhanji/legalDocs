import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Legal Docs Platform';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontFamily: 'system-ui',
        }}
      >
        <div style={{ fontSize: 72, fontWeight: 800, marginBottom: 16 }}>Legal Docs</div>
        <div style={{ fontSize: 32, opacity: 0.8 }}>Create Legal Documents Professionally</div>
      </div>
    ),
    { ...size }
  );
}