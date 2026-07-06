// Logos strip + Brag bar (big numbers)

function LogosStrip() {
  const clients = [
    'WMG', 'Eletro Transol', 'Mocelin', 'KGM', 'PetSul', 'Multiseg',
    'Speed Distribuidora', 'Diamaju', 'CentralPec', 'Route 66',
    'RealPet', 'Dihol', 'Excelência', 'W&Z',
  ];
  return (
    <section style={{ padding: '56px 0 24px', background: '#fff', borderTop: '1px solid var(--line-2)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', fontSize: 12, letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 600, color: 'var(--text-3)', marginBottom: 28 }}>
          Distribuidores que confiam na SEWE
        </div>
      </div>
      <div className="logos-marquee" aria-label="Clientes SEWE">
        <div className="logos-track">
          {[...clients, ...clients].map((name, i) => (
            <span key={i} className="logos-item" aria-hidden={i >= clients.length}>{name}</span>
          ))}
        </div>
      </div>
      <style>{`
        .logos-marquee {
          overflow: hidden;
          -webkit-mask-image: linear-gradient(90deg, transparent, black 10%, black 90%, transparent);
          mask-image: linear-gradient(90deg, transparent, black 10%, black 90%, transparent);
        }
        .logos-track {
          display: flex; align-items: center; width: max-content; padding: 4px 0;
          animation: logos-scroll 45s linear infinite;
        }
        .logos-marquee:hover .logos-track { animation-play-state: paused; }
        .logos-item {
          font-family: 'Chakra Petch', sans-serif; font-weight: 700; font-size: 18px;
          letter-spacing: 0.08em; color: var(--slate); opacity: 0.78;
          text-transform: uppercase; white-space: nowrap; margin-right: 64px;
          transition: opacity .2s ease, color .2s ease;
        }
        .logos-item:hover { opacity: 1; color: var(--navy-900); }
        @keyframes logos-scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @media (prefers-reduced-motion: reduce) {
          .logos-marquee { -webkit-mask-image: none; mask-image: none; }
          .logos-track { animation: none; width: auto; flex-wrap: wrap; justify-content: center; row-gap: 18px; padding: 0 24px; }
          .logos-track .logos-item[aria-hidden="true"] { display: none; }
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
