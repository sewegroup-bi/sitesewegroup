// Logos strip + Brag bar (big numbers)

function LogosStrip() {
  const clients = [
    { name: 'WMG', style: 'text' },
    { name: 'Eletro Transol', style: 'text' },
    { name: 'MOCELIN', style: 'text' },
    { name: 'KGM', style: 'text' },
    { name: 'PETSUL', style: 'text' },
    { name: 'Multiseg', style: 'text' },
  ];
  return (
    <section style={{ padding: '56px 0 24px', background: '#fff', borderTop: '1px solid var(--line-2)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', fontSize: 12, letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 600, color: 'var(--text-3)', marginBottom: 28 }}>
          Distribuidores que confiam na SEWE
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(6, 1fr)',
          gap: 24,
          alignItems: 'center',
        }} className="logos-grid">
          {clients.map(c => (
            <div key={c.name} style={{
              fontFamily: 'Chakra Petch, sans-serif',
              fontWeight: 700,
              fontSize: 18,
              letterSpacing: '0.08em',
              color: 'var(--slate)',
              textAlign: 'center',
              opacity: 0.78,
              transition: 'opacity .2s ease, color .2s ease',
              textTransform: 'uppercase',
            }} onMouseEnter={e => { e.currentTarget.style.opacity = 1; e.currentTarget.style.color = 'var(--navy-900)'; }}
               onMouseLeave={e => { e.currentTarget.style.opacity = 0.78; e.currentTarget.style.color = 'var(--slate)'; }}
            >
              {c.name}
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 720px) {
          .logos-grid { grid-template-columns: repeat(3, 1fr) !important; row-gap: 32px !important; }
        }
      `}</style>
    </section>
  );
}

function BragBar() {
  const stats = [
    { value: 'R$ 5 Bi+', label: 'em faturamento monitorado', detail: 'dados consolidados de 500+ distribuidores' },
    { value: '500+',     label: 'distribuidores atendidos', detail: 'em Pet, Vet, Agro, Tecnologia e Indústrias' },
    { value: '99,8%',    label: 'uptime da plataforma',     detail: 'sobre +200 mil acessos mensais' },
    { value: '30 dias',  label: 'até o go-live',            detail: 'do contrato à primeira decisão em produção' },
  ];
  return (
    <section style={{ background: 'var(--bg-soft)', borderTop: '1px solid var(--line-2)', borderBottom: '1px solid var(--line-2)', padding: '48px 0' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0 }} className="brag-grid">
          {stats.map((s, i) => (
            <div key={i} style={{
              padding: '24px 28px',
              borderLeft: i === 0 ? 'none' : '1px solid var(--line)',
            }} className="brag-item">
              <div className="display" style={{ fontSize: 'clamp(36px, 4.2vw, 56px)', fontWeight: 700, color: 'var(--navy-900)', lineHeight: 1, marginBottom: 10 }}>
                {s.value}
              </div>
              <div style={{ fontSize: 14, color: 'var(--navy-900)', fontWeight: 600, marginBottom: 4 }}>{s.label}</div>
              <div style={{ fontSize: 12, color: 'var(--text-3)', lineHeight: 1.4 }}>{s.detail}</div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 860px) {
          .brag-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .brag-item:nth-child(1), .brag-item:nth-child(3) { border-left: none !important; }
          .brag-item:nth-child(3), .brag-item:nth-child(4) { border-top: 1px solid var(--line); }
        }
      `}</style>
    </section>
  );
}

Object.assign(window, { LogosStrip, BragBar });
