import type { LogoProps } from 'sanity'

export function StudioLogo({ title }: LogoProps) {
  return (
    <div
      style={{
        alignItems: 'center',
        display: 'flex',
        gap: 12,
        minWidth: 0,
      }}
    >
      <div
        aria-hidden="true"
        style={{
          alignItems: 'center',
          background: 'linear-gradient(135deg, #d8b86a 0%, #816329 100%)',
          border: '1px solid rgba(255, 236, 181, 0.45)',
          borderRadius: 4,
          boxShadow: '0 0 0 1px rgba(255, 255, 255, 0.04), 0 10px 30px rgba(0, 0, 0, 0.28)',
          color: '#11100d',
          display: 'flex',
          fontSize: 11,
          fontWeight: 800,
          height: 32,
          justifyContent: 'center',
          letterSpacing: '0.08em',
          lineHeight: 1,
          width: 32,
        }}
      >
        03
      </div>
      <div style={{ minWidth: 0 }}>
        <div
          style={{
            color: '#f5efe2',
            fontSize: 14,
            fontWeight: 700,
            letterSpacing: '0.01em',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {title}
        </div>
        <div
          style={{
            color: 'rgba(216, 184, 106, 0.82)',
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: '0.18em',
            marginTop: 2,
            textTransform: 'uppercase',
          }}
        >
          Dealership CMS
        </div>
      </div>
    </div>
  )
}
