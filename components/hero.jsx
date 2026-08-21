// Hero section with Qlik-skinned dashboard mockup (header/footer now in layout.jsx)

// Hero with Qlik dashboard
function Hero({ headlineVariant = 0 }) {
  const headlines = [
    { a: tx('Menos ruptura.'), b: tx('Mais positivação.'), c: tx('Capital de giro livre.') },
    { a: tx('Decisões prontas'), b: tx('para distribuidores.'), c: tx('A IA trabalha nos bastidores.') },
    { a: 'R$ 5 bilhões', b: tx('em faturamento monitorado.'), c: '30 dias até o go-live.' },
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
        {/* Empilhado: a foto do CD precisa da largura inteira para os balões
            caberem legíveis. Em duas colunas ela ficaria com ~520px. */}
        <div className="hero-split">
        <div className="hero-copy">
        {/* proof pill above headline */}
        <div className="reveal in" style={{ display: 'flex', marginBottom: 24 }}>
          <div className="badge badge-outline" style={{ padding: '8px 14px', gap: 12, fontSize: 12, fontWeight: 500, color: 'var(--text)', border: '1px solid var(--line)', flexWrap: 'wrap' }}>
            <span className="dot"/>
            <span>{tx('+500 distribuidores')}</span>
            <span style={{ color: 'var(--line)' }}>·</span>
            <span><b style={{ color: 'var(--navy-900)' }}>R$ 5 Bi</b> monitorados</span>
            <span style={{ color: 'var(--line)' }}>·</span>
            <span>99,8% uptime</span>
            <span style={{ color: 'var(--line)' }}>·</span>
            <span>{tx('Go-live em 30 dias')}</span>
          </div>
        </div>

        {/* headline e lead lado a lado para o bloco de texto ocupar a mesma
            largura da foto abaixo, sem estourar a medida de leitura do lead */}
        <div className="hero-line">
          <h1 className="display" style={{ margin: 0, fontSize: 'clamp(36px, 4.2vw, 58px)' }}>
            <span style={{ color: 'var(--navy-900)' }}>{H.a}</span>{' '}
            <span style={{ color: 'var(--navy-900)' }}>{H.b}</span><br/>
            <span style={{
              background: 'linear-gradient(120deg, var(--navy-900) 0%, var(--navy-700) 40%, var(--turquoise-ink) 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>{H.c}</span>
          </h1>

          {/* coluna direita: lead no topo e credenciais embaixo, para o bloco
              encostar na base da headline em vez de deixar o canto vazio */}
          <div className="hero-side">
            <p className="hero-lead">{tx('BI e IA sob medida para distribuidores e atacadistas. Em 30 dias no ar, entregando')} <b style={{ color: 'var(--navy-900)' }}>{tx('decisão pronta')}</b>{tx(' — não mais um gráfico para interpretar.')}</p>
            <div className="hero-cred">
              <span className="hero-cred-row">
                <img src="/assets/qlik-logo.png" alt="Qlik" style={{ height: 15, width: 'auto', display: 'block' }}/>{tx('Parceiro oficial Qlik no Brasil')}</span>
              <span className="hero-cred-row">
                <span className="hero-cred-ic"><Icon name="trophy" size={14} stroke={1.9}/></span>{tx('Leader no Gartner')}<sup>®</sup> Magic Quadrant<sup>™</sup> de Analytics &amp; BI por 16 anos consecutivos
              </span>
            </div>
          </div>
        </div>
        </div>

        {/* o CD com os balões sobre cada área */}
        <div className="hero-scene reveal in">
          <DistribuidorPhoto/>
        </div>
        </div>

        <style>{`
          .hero-split { display: grid; gap: 32px; }
          .hero-line { display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 48px; align-items: stretch; }
          .hero-side { display: flex; flex-direction: column; justify-content: space-between; gap: 20px; padding-top: 6px; }
          .hero-lead { margin: 0; font-size: 17px; color: var(--text-2); line-height: 1.6; }
          .hero-cred { display: grid; gap: 9px; padding-top: 16px; border-top: 1px solid var(--line); }
          .hero-cred-row { display: flex; align-items: flex-start; gap: 9px; font-size: 12.5px; color: var(--text-2); line-height: 1.45; }
          .hero-cred-row img { flex-shrink: 0; margin-top: 1px; }
          .hero-cred-ic { color: var(--turquoise-ink); display: inline-flex; flex-shrink: 0; margin-top: 1px; }
          .hero-cred sup { font-size: 0.7em; }
          @media (max-width: 1080px) {
            .hero-line { grid-template-columns: 1fr; gap: 22px; }
            .hero-copy { text-align: center; }
            .hero-copy .reveal, .hero-copy > div { justify-content: center; }
            .hero-side { max-width: 640px; margin: 0 auto; gap: 18px; }
            .hero-cred-row { justify-content: center; text-align: left; }
          }
        `}</style>

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
  // The hero dashboard, a realistic "Painel Comercial · Hoje" Qlik app
  const salesData = [112, 108, 120, 135, 128, 142, 148, 155, 162, 168, 175, 182];
  const labels = ['01', '03', '05', '07', '09', '11', '13', '15', '17', '19', '21', 'HOJE'];

  return (
    <QlikFrame
      title={tx('PAINEL COMERCIAL · MULTISEG DISTRIBUIÇÃO')}
      subtitle={tx('MTD · Consolidado · Hoje')}
      tabs={[tx('Visão 360°'), tx('Faturamento'), tx('Positivação'), tx('Ruptura · Curva A'), 'Churn', 'Margem']}
      activeTab={0}
      toolbar={<div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
        <span style={{ fontSize: 11, color: 'var(--text-3)' }}>{tx('Filial:')}</span>
        <span style={{ fontSize: 11, fontFamily: 'JetBrains Mono, monospace', padding: '3px 8px', background: Q.turq, color: Q.navyDk, borderRadius: 3, fontWeight: 600 }}>{tx('TODAS (7)')}</span>
        <span style={{ fontSize: 11, color: 'var(--text-3)', marginLeft: 8 }}>{tx('Período:')}</span>
        <span style={{ fontSize: 11, fontFamily: 'JetBrains Mono, monospace', padding: '3px 8px', background: '#fff', border: `1px solid ${Q.line}`, color: Q.ink, borderRadius: 3 }}>{tx('ABR/2026')}</span>
      </div>}
    >
      {/* Row 1: KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginBottom: 10 }}>
        <QlikKPI
          label={tx('Faturamento MTD')}
          value="R$ 4.287.310"
          delta="+12,4%"
          trend="up"
          spark={<Sparkline data={salesData}/>}
          color={Q.navy}
        />
        <QlikKPI
          label={tx('Positivação')}
          value="84,2%"
          delta="+3,2pp"
          trend="up"
          color={Q.navy}
          spark={<Sparkline data={[76, 78, 77, 80, 81, 82, 84]} color={Q.turq2}/>}
        />
        <QlikKPI
          label={tx('Ruptura · Curva A')}
          value="2,1%"
          delta="-0,8pp"
          trend="up"
          color={Q.pos}
          spark={<Sparkline data={[3.5, 3.2, 2.9, 2.7, 2.4, 2.3, 2.1]} color={Q.pos} fill="rgba(46,139,87,0.15)"/>}
        />
        <QlikKPI
          label={tx('Margem Líquida')}
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
          title={tx('Faturamento diário · Meta vs Realizado')}
          subtitle={tx('Em R$ mil · MTD · Todas as filiais')}
          bars={[142, 156, 148, 162, 170, 158, 175, 182, 168, 190, 195, 210]}
          line={[150, 150, 155, 160, 165, 165, 170, 175, 180, 185, 190, 195]}
          labels={labels}
          height={220}
        />
        <div style={{ display: 'grid', gridTemplateRows: 'auto auto 1fr', gap: 10 }}>
          <div style={{ background: '#fff', border: `1px solid ${Q.line}`, borderRadius: 10, padding: 14 }}>
            <div style={{ fontFamily: 'Chakra Petch', fontWeight: 600, fontSize: 13, color: Q.ink, marginBottom: 10 }}>{tx('Curva ABC · Participação')}</div>
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

          <QlikDonut value={84} label={tx('Positivação MTD')} sublabel={tx('Meta: 80% · +3,2pp')}/>
        </div>
      </div>

      {/* Row 3: AI suggestion callout */}
      <div style={{ background: '#fff', border: `1px solid ${Q.line}`, borderLeft: `3px solid ${Q.turq2}`, borderRadius: 10, padding: 14, display: 'flex', alignItems: 'center', gap: 14 }}>
        <div style={{ width: 36, height: 36, borderRadius: 8, background: Q.turq, display: 'grid', placeItems: 'center', color: Q.navyDk, flexShrink: 0 }}>
          <Icon name="sparkle" size={18}/>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: 'Chakra Petch', fontWeight: 600, fontSize: 13, color: Q.ink, marginBottom: 2 }}>{tx('Cliente em risco de churn · Curva A')}</div>
          <div style={{ fontSize: 11, color: Q.muted, fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.04em' }}>{tx('ÚLTIMA COMPRA: 47 DIAS · LTV R$ 142K · AÇÃO SUGERIDA: CONTATO COMERCIAL HOJE')}</div>
        </div>
        <button style={{ padding: '8px 14px', borderRadius: 6, background: Q.navy, color: '#fff', fontSize: 12, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>{tx('Ver no CRM')}<Icon name="arrow" size={12}/>
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
          <div style={{ fontSize: 11, color: 'var(--text-3)', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 600 }}>{tx('DISTRIBUIDOR · HOJE')}</div>
          <div style={{ fontFamily: 'Chakra Petch', fontWeight: 700, fontSize: 16, color: 'var(--navy-900)' }}>{tx('+R$ 382k recuperados')}</div>
          <div style={{ fontSize: 11, color: 'var(--text-2)' }}>{tx('cross-sell sugerido pela IA')}</div>
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
          <div style={{ fontSize: 11, color: 'var(--text-3)', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 600 }}>{tx('RUPTURA DETECTADA')}</div>
          <div style={{ fontFamily: 'Chakra Petch', fontWeight: 700, fontSize: 16, color: 'var(--navy-900)' }}>17 SKUs · Curva A</div>
          <div style={{ fontSize: 11, color: 'var(--text-2)' }}>{tx('pedido sugerido enviado ao ERP')}</div>
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

Object.assign(window, { Hero });
