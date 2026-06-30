// Header with nav + Hero section with Qlik-skinned dashboard mockup

// Print-1 style logo: official SEWE GROUP mark (horizontal lockup)
function SeweWordmark() {
  return (
    <a href="#" style={{ display: 'inline-flex', alignItems: 'center', textDecoration: 'none' }}>
      <img src="assets/sewe-logo.png" alt="SEWE GROUP" style={{ height: 38, width: 'auto', display: 'block' }}/>
    </a>
  );
}

function Header() {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { label: 'Sewe BI', href: '#bi' },
    { label: 'Integration', href: '#integration' },
    { label: 'Sewe Sales', href: '#sales' },
    { label: 'MinerConect', href: 'minerconect.html' },
    { label: 'FAQ', href: '#faq' },
  ];

  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 50,
      background: scrolled ? 'rgba(255,255,255,0.92)' : 'rgba(255,255,255,0.85)',
      backdropFilter: 'saturate(1.4) blur(14px)',
      WebkitBackdropFilter: 'saturate(1.4) blur(14px)',
      borderBottom: scrolled ? '1px solid var(--line)' : '1px solid var(--line-2)',
      transition: 'background .25s ease, border-color .25s ease',
    }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', gap: 24, padding: '12px var(--gutter)' }}>
        <SeweWordmark/>
        <div style={{ flex: 1 }}/>
        <nav style={{ display: 'flex', alignItems: 'center', gap: 4 }} className="nav-desktop">
          {links.map(l => (
            <a key={l.label} href={l.href} style={{
              padding: '8px 12px', fontSize: 14, color: 'var(--text-2)', fontWeight: 500, borderRadius: 8,
              transition: 'color .15s ease', display: 'inline-flex', alignItems: 'center', gap: 4,
            }} onMouseEnter={e => e.currentTarget.style.color = 'var(--navy-900)'}
               onMouseLeave={e => e.currentTarget.style.color = 'var(--text-2)'}>
              {l.label}{l.drop && <span style={{ fontSize: 10 }}>▾</span>}
            </a>
          ))}
        </nav>
        <a href="#diagnostico" className="nav-desktop" style={{
          fontSize: 14, fontWeight: 600, color: 'var(--navy)', padding: '9px 22px',
          border: '1.5px solid var(--navy)', borderRadius: 99, transition: 'all .15s ease',
        }} onMouseEnter={e => { e.currentTarget.style.background = 'var(--navy)'; e.currentTarget.style.color = '#fff'; }}
           onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--navy)'; }}>
          Fale Conosco
        </a>
        <button
          onClick={() => setOpen(v => !v)}
          className="nav-mobile"
          aria-label="Menu"
          style={{ width: 40, height: 40, borderRadius: 8, border: '1px solid var(--line)', display: 'none', alignItems: 'center', justifyContent: 'center' }}
        >
          <Icon name={open ? 'minus' : 'bars'} size={18}/>
        </button>
      </div>
      {open && (
        <div className="nav-mobile-panel" style={{ borderTop: '1px solid var(--line)', background: '#fff' }}>
          <div className="container" style={{ padding: '12px var(--gutter) 18px', display: 'flex', flexDirection: 'column', gap: 2 }}>
            {links.map(l => (
              <a key={l.label} href={l.href} onClick={() => setOpen(false)} style={{ padding: '12px 8px', borderBottom: '1px solid var(--line-2)', fontSize: 15, color: 'var(--navy-900)' }}>{l.label}</a>
            ))}
            <a href="#diagnostico" onClick={() => setOpen(false)} style={{ padding: '12px 8px', fontSize: 15, fontWeight: 600, color: 'var(--navy)' }}>Fale Conosco</a>
          </div>
        </div>
      )}
      <style>{`
        @media (max-width: 960px) {
          .nav-desktop { display: none !important; }
          .nav-mobile { display: flex !important; }
        }
        @media (min-width: 961px) {
          .nav-mobile-panel { display: none !important; }
        }
      `}</style>
    </header>
  );
}

// Hero with Qlik dashboard
function Hero({ headlineVariant = 0 }) {
  const headlines = [
    { a: 'Menos ruptura.', b: 'Mais positivação.', c: 'Capital de giro livre.' },
    { a: 'Decisões prontas', b: 'para distribuidores.', c: 'A IA trabalha nos bastidores.' },
    { a: 'R$ 5 bilhões', b: 'em faturamento monitorado.', c: '30 dias até o go-live.' },
  ];
  const H = headlines[headlineVariant] || headlines[0];

  return (
    <section style={{ position: 'relative', overflow: 'hidden', paddingTop: 48, paddingBottom: 80 }}>
      {/* Soft tinted backdrop */}
      <div aria-hidden style={{
        position: 'absolute', inset: 0, zIndex: 0,
        background: `
          radial-gradient(1200px 600px at 80% -10%, rgba(117,227,228,0.18), transparent 60%),
          radial-gradient(800px 400px at 10% 20%, rgba(45,67,108,0.06), transparent 60%),
          linear-gradient(180deg, #fafbfd 0%, #ffffff 100%)
        `,
      }}/>
      {/* subtle grid */}
      <div aria-hidden style={{
        position: 'absolute', inset: 0, zIndex: 0, opacity: 0.5,
        backgroundImage: 'linear-gradient(var(--line-2) 1px, transparent 1px), linear-gradient(90deg, var(--line-2) 1px, transparent 1px)',
        backgroundSize: '56px 56px',
        maskImage: 'radial-gradient(ellipse 70% 60% at 50% 30%, black 40%, transparent 80%)',
        WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 30%, black 40%, transparent 80%)',
      }}/>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* proof pill above headline */}
        <div className="reveal in" style={{ display: 'flex', justifyContent: 'center', marginBottom: 28 }}>
          <div className="badge badge-outline" style={{ padding: '8px 14px', gap: 16, fontSize: 12, fontWeight: 500, color: 'var(--text)', border: '1px solid var(--line)' }}>
            <span className="dot"/>
            <span>+500 distribuidores</span>
            <span style={{ color: 'var(--line)' }}>·</span>
            <span><b style={{ color: 'var(--navy-900)' }}>R$ 5 Bi</b> monitorados</span>
            <span style={{ color: 'var(--line)' }}>·</span>
            <span>99,8% uptime</span>
            <span style={{ color: 'var(--line)' }}>·</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <img src="assets/qlik-logo.png" alt="Qlik" style={{ height: 14, width: 'auto', display: 'block' }}/>
              Parceiro Oficial Qlik
            </span>
          </div>
        </div>

        <p style={{ textAlign: 'center', fontFamily: 'var(--ff-display)', fontWeight: 600, color: 'var(--navy-700)', fontSize: 'clamp(16px, 2vw, 22px)', letterSpacing: '0.01em', margin: '0 auto 14px' }}>
          Especialistas em Soluções para Distribuidores.
        </p>

        <h1 className="display" style={{ textAlign: 'center', maxWidth: 1100, margin: '0 auto', fontSize: 'clamp(40px, 5.6vw, 74px)' }}>
          <span style={{ color: 'var(--navy-900)' }}>{H.a}</span>{' '}
          <span style={{ color: 'var(--navy-900)' }}>{H.b}</span><br/>
          <span style={{
            background: 'linear-gradient(120deg, var(--navy-900) 0%, var(--navy-700) 40%, var(--turquoise-ink) 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}>{H.c}</span>
        </h1>

        <p style={{ textAlign: 'center', maxWidth: 720, margin: '24px auto 0', fontSize: 18, color: 'var(--text-2)', lineHeight: 1.55 }}>
          BI sob medida para distribuidores e atacadistas. Go-live em 30 dias.
          IA invisível que limpa outliers, cruza dados e entrega <b style={{ color: 'var(--navy-900)' }}>decisões prontas</b>, não mais gráficos para interpretar.
        </p>

        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 32, flexWrap: 'wrap' }}>
          <a href="#diagnostico" className="btn btn-primary btn-lg">
            Agendar Diagnóstico
            <Icon name="arrow" size={16} className="chev"/>
          </a>
          <a href="#suites" className="btn btn-outline btn-lg">
            Ver Suítes em ação
          </a>
        </div>
        <div style={{ textAlign: 'center', marginTop: 14, fontSize: 12, color: 'var(--text-3)' }}>
          Resposta em até 4h úteis · Diagnóstico gratuito
        </div>

        {/* Dashboard mockup */}
        <div className="reveal" style={{ marginTop: 72, position: 'relative' }}>
          <HeroDashboard/>
          {/* floating KPI cards */}
          <FloatingKPIs/>
        </div>
      </div>
    </section>
  );
}

function HeroDashboard() {
  // The hero dashboard — a realistic "Painel Comercial · Hoje" Qlik app
  const salesData = [112, 108, 120, 135, 128, 142, 148, 155, 162, 168, 175, 182];
  const labels = ['01', '03', '05', '07', '09', '11', '13', '15', '17', '19', '21', 'HOJE'];

  return (
    <QlikFrame
      title="PAINEL COMERCIAL · MULTISEG DISTRIBUIÇÃO"
      subtitle="MTD · Consolidado · Hoje"
      tabs={['Visão 360°', 'Faturamento', 'Positivação', 'Ruptura · Curva A', 'Churn', 'Margem']}
      activeTab={0}
      toolbar={<div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
        <span style={{ fontSize: 11, color: 'var(--text-3)' }}>Filial:</span>
        <span style={{ fontSize: 11, fontFamily: 'JetBrains Mono, monospace', padding: '3px 8px', background: Q.turq, color: Q.navyDk, borderRadius: 3, fontWeight: 600 }}>TODAS (7)</span>
        <span style={{ fontSize: 11, color: 'var(--text-3)', marginLeft: 8 }}>Período:</span>
        <span style={{ fontSize: 11, fontFamily: 'JetBrains Mono, monospace', padding: '3px 8px', background: '#fff', border: `1px solid ${Q.line}`, color: Q.ink, borderRadius: 3 }}>ABR/2026</span>
      </div>}
    >
      {/* Row 1: KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginBottom: 10 }}>
        <QlikKPI
          label="Faturamento MTD"
          value="R$ 4.287.310"
          delta="+12,4%"
          trend="up"
          spark={<Sparkline data={salesData}/>}
          color={Q.navy}
        />
        <QlikKPI
          label="Positivação"
          value="84,2%"
          delta="+3,2pp"
          trend="up"
          color={Q.navy}
          spark={<Sparkline data={[76, 78, 77, 80, 81, 82, 84]} color={Q.turq2}/>}
        />
        <QlikKPI
          label="Ruptura · Curva A"
          value="2,1%"
          delta="-0,8pp"
          trend="up"
          color={Q.pos}
          spark={<Sparkline data={[3.5, 3.2, 2.9, 2.7, 2.4, 2.3, 2.1]} color={Q.pos} fill="rgba(46,139,87,0.15)"/>}
        />
        <QlikKPI
          label="Margem Líquida"
          value="18,4%"
          delta="+1,1pp"
          trend="up"
          color={Q.navy}
          spark={<Sparkline data={[15.8, 16.2, 16.8, 17.2, 17.6, 18.0, 18.4]}/>}
        />
      </div>

      {/* Row 2: combo + filters/side */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 10, marginBottom: 10 }}>
        <QlikCombo
          title="Faturamento diário · Meta vs Realizado"
          subtitle="Em R$ mil · MTD · Todas as filiais"
          bars={[142, 156, 148, 162, 170, 158, 175, 182, 168, 190, 195, 210]}
          line={[150, 150, 155, 160, 165, 165, 170, 175, 180, 185, 190, 195]}
          labels={labels}
          height={220}
        />
        <div style={{ display: 'grid', gridTemplateRows: 'auto auto 1fr', gap: 10 }}>
          <div style={{ background: '#fff', border: `1px solid ${Q.line}`, borderRadius: 10, padding: 14 }}>
            <div style={{ fontFamily: 'Chakra Petch', fontWeight: 600, fontSize: 13, color: Q.ink, marginBottom: 10 }}>Curva ABC · Participação</div>
            <div style={{ display: 'flex', gap: 4, height: 26, borderRadius: 4, overflow: 'hidden', marginBottom: 8 }}>
              <div style={{ flex: 68, background: Q.navy, position: 'relative' }}>
                <span style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', color: '#fff', fontSize: 10, fontFamily: 'JetBrains Mono, monospace', fontWeight: 600 }}>A · 68%</span>
              </div>
              <div style={{ flex: 22, background: Q.turq2, position: 'relative' }}>
                <span style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', color: Q.navyDk, fontSize: 10, fontFamily: 'JetBrains Mono, monospace', fontWeight: 600 }}>B · 22%</span>
              </div>
              <div style={{ flex: 10, background: Q.slateLt, position: 'relative' }}>
                <span style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', color: '#fff', fontSize: 10, fontFamily: 'JetBrains Mono, monospace', fontWeight: 600 }}>C·10%</span>
              </div>
            </div>
            <div style={{ fontSize: 10, color: Q.muted, fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.04em' }}>
              3.482 SKUs ativos · 412 em Curva A
            </div>
          </div>

          <QlikDonut value={84} label="Positivação MTD" sublabel="Meta: 80% · +3,2pp"/>
        </div>
      </div>

      {/* Row 3: AI suggestion callout */}
      <div style={{ background: '#fff', border: `1px solid ${Q.line}`, borderLeft: `3px solid ${Q.turq2}`, borderRadius: 10, padding: 14, display: 'flex', alignItems: 'center', gap: 14 }}>
        <div style={{ width: 36, height: 36, borderRadius: 8, background: Q.turq, display: 'grid', placeItems: 'center', color: Q.navyDk, flexShrink: 0 }}>
          <Icon name="sparkle" size={18}/>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: 'Chakra Petch', fontWeight: 600, fontSize: 13, color: Q.ink, marginBottom: 2 }}>
            Cliente em risco de churn · Curva A
          </div>
          <div style={{ fontSize: 11, color: Q.muted, fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.04em' }}>
            ÚLTIMA COMPRA: 47 DIAS · LTV R$ 142K · AÇÃO SUGERIDA: CONTATO COMERCIAL HOJE
          </div>
        </div>
        <button style={{ padding: '8px 14px', borderRadius: 6, background: Q.navy, color: '#fff', fontSize: 12, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
          Ver no CRM
          <Icon name="arrow" size={12}/>
        </button>
      </div>
    </QlikFrame>
  );
}

function FloatingKPIs() {
  return (
    <>
      <div className="float-card float-a" style={{
        position: 'absolute', top: 40, left: -24,
        background: '#fff', border: '1px solid var(--line)', borderRadius: 12,
        padding: '12px 14px', boxShadow: 'var(--shadow-md)',
        display: 'flex', alignItems: 'center', gap: 10,
        transform: 'rotate(-2deg)',
      }}>
        <div style={{ width: 34, height: 34, borderRadius: 8, background: 'rgba(46,139,87,0.1)', display: 'grid', placeItems: 'center', color: 'var(--success)' }}>
          <Icon name="trending" size={18}/>
        </div>
        <div>
          <div style={{ fontSize: 11, color: 'var(--text-3)', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 600 }}>DISTRIBUIDOR · HOJE</div>
          <div style={{ fontFamily: 'Chakra Petch', fontWeight: 700, fontSize: 16, color: 'var(--navy-900)' }}>+R$ 382k recuperados</div>
          <div style={{ fontSize: 11, color: 'var(--text-2)' }}>cross-sell sugerido pela IA</div>
        </div>
      </div>

      <div className="float-card float-b" style={{
        position: 'absolute', bottom: 60, right: -30,
        background: '#fff', border: '1px solid var(--line)', borderRadius: 12,
        padding: '12px 14px', boxShadow: 'var(--shadow-md)',
        display: 'flex', alignItems: 'center', gap: 10,
        transform: 'rotate(1.5deg)',
      }}>
        <div style={{ width: 34, height: 34, borderRadius: 8, background: 'rgba(197,48,48,0.08)', display: 'grid', placeItems: 'center', color: 'var(--danger)' }}>
          <Icon name="alert" size={18}/>
        </div>
        <div>
          <div style={{ fontSize: 11, color: 'var(--text-3)', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 600 }}>RUPTURA DETECTADA</div>
          <div style={{ fontFamily: 'Chakra Petch', fontWeight: 700, fontSize: 16, color: 'var(--navy-900)' }}>17 SKUs · Curva A</div>
          <div style={{ fontSize: 11, color: 'var(--text-2)' }}>pedido sugerido enviado ao ERP</div>
        </div>
      </div>

      <style>{`
        @keyframes floaty {
          0%, 100% { transform: translateY(0) rotate(var(--r, 0deg)); }
          50% { transform: translateY(-6px) rotate(var(--r, 0deg)); }
        }
        .float-card { animation: floaty 6s ease-in-out infinite; }
        .float-a { --r: -2deg; }
        .float-b { --r: 1.5deg; animation-delay: -3s; }
        @media (max-width: 900px) {
          .float-card { display: none; }
        }
      `}</style>
    </>
  );
}

Object.assign(window, { Header, Hero });
