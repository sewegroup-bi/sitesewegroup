// Suites section with functional tabs + Qlik dashboards per suite
// Each tab shows a real-looking Qlik dashboard tailored to that suite.

function SuitesSection() {
  const [active, setActive] = React.useState(0);

  const suites = [
    {
      key: 'suprimentos',
      label: 'Suprimentos',
      icon: 'boxes',
      tagline: 'Estoque na medida exata.',
      title: 'Compre pela demanda real. Zere a ruptura de Curva A.',
      body: 'IA preditiva que lê 18 meses de histórico e ajusta pedidos em tempo real. Evita excesso de mercadoria parada e zera a ruptura nos itens que pagam a conta.',
      kpis: [{ v: '-15%', l: 'custos operacionais' }, { v: '+90%', l: 'assertividade' }, { v: '-20%', l: 'estoque parado' }],
      bullets: [
        'Alerta de ruptura antes que o item falte na prateleira',
        'Sugestão de compra automática enviada ao ERP',
        'Curva ABC viva com reclassificação contínua',
        'Identifica fornecedores com performance declinante',
      ],
      dashboard: 'suprimentos',
    },
    {
      key: 'comercial',
      label: 'Comercial',
      icon: 'trending',
      tagline: 'Cada vendedor, cada cliente, cada SKU.',
      title: 'Positivação, churn e cross-sell em tempo real.',
      body: 'Monitora metas por vendedor, detecta carteira em risco de churn pelo padrão de compra e sugere cross-sell contextual. A força de vendas recebe a "próxima ação" direto no celular.',
      kpis: [{ v: '+30%', l: 'reativação de inativos' }, { v: '+25%', l: 'aumento de LTV' }, { v: '+35%', l: 'produtividade de vendas' }],
      bullets: [
        'Positivação MTD por vendedor, rota e filial',
        'Alerta de Curva A com risco de churn',
        'Cross-sell automático por perfil do cliente',
        'Mapa de calor de oportunidades por região',
      ],
      dashboard: 'comercial',
    },
    {
      key: 'financeiro',
      label: 'Financeiro',
      icon: 'dollar',
      tagline: 'A margem que sobra, por SKU.',
      title: 'DRE automatizado, margem líquida real, fluxo de caixa vivo.',
      body: 'Descontando rebate, frete, verba, imposto e devolução. Closing de competência em 2 dias, com rastreabilidade até o documento fiscal de origem.',
      kpis: [{ v: '+1,1pp', l: 'margem líquida' }, { v: '100%', l: 'auditável' }, { v: '2 dias', l: 'até o closing' }],
      bullets: [
        'DRE gerencial automatizado por filial e centro de custo',
        'Margem líquida real por SKU, cliente e rota',
        'Previsão de inadimplência por padrão de pagamento',
        'Conciliação automática de rebate e verba',
      ],
      dashboard: 'financeiro',
    },
    {
      key: 'estrategica',
      label: 'Gestão Estratégica',
      icon: 'target',
      tagline: 'Uma tela. Quatro áreas. Zero ruído.',
      title: 'A visão 360° para quem toma a decisão difícil.',
      body: 'Um único painel com os KPIs que importam: Suprimentos, Comercial, Financeiro e Operacional, consolidados para o C-Level. Drill-down até o documento na mesma tela.',
      kpis: [{ v: '1 painel', l: '4 áreas consolidadas' }, { v: '100%', l: 'drill-down nativo' }, { v: 'Diário', l: 'ritmo de decisão' }],
      bullets: [
        'Consolidação multi-filial com comparativo horizontal',
        'Simulação de cenários (what-if) integrada',
        'Ranking de indicadores vs. benchmark setorial',
        'Relatório executivo semanal em e-mail',
      ],
      dashboard: 'estrategica',
    },
  ];

  const S = suites[active];

  return (
    <section id="suites" className="section" style={{ background: '#fff', borderTop: '1px solid var(--line-2)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: 760, margin: '0 auto 40px' }}>
          <div className="eyebrow">As quatro suítes</div>
          <h2 style={{ marginTop: 14 }}>Dashboards Qlik Sense prontos para sua operação.</h2>
          <p style={{ color: 'var(--text-2)', marginTop: 14, fontSize: 17 }}>
            Mesma plataforma que movimenta os dados globais da Volvo, Samsung e Accenture. Aqui, skinada com a identidade SEWE e pré-configurada para distribuidor brasileiro.
          </p>
        </div>

        {/* Tabs */}
        <div style={{
          display: 'flex', gap: 6, marginBottom: 24, padding: 6,
          background: 'var(--bg-soft)', border: '1px solid var(--line)', borderRadius: 14,
          overflowX: 'auto',
        }}>
          {suites.map((s, i) => (
            <button key={s.key} onClick={() => setActive(i)}
              style={{
                flex: 1,
                minWidth: 150,
                padding: '14px 18px',
                background: active === i ? '#fff' : 'transparent',
                border: active === i ? '1px solid var(--line)' : '1px solid transparent',
                borderRadius: 10,
                boxShadow: active === i ? 'var(--shadow-sm)' : 'none',
                textAlign: 'left',
                cursor: 'pointer',
                transition: 'all .2s ease',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 2 }}>
                <span style={{ width: 24, height: 24, borderRadius: 6, background: active === i ? 'var(--navy-900)' : 'var(--line)', color: active === i ? '#fff' : 'var(--text-2)', display: 'grid', placeItems: 'center' }}>
                  <Icon name={s.icon} size={13} stroke={2}/>
                </span>
                <span style={{ fontFamily: 'Chakra Petch', fontWeight: 700, fontSize: 15, color: 'var(--navy-900)', letterSpacing: '0.01em' }}>{s.label}</span>
              </div>
              <div style={{ fontSize: 11, color: 'var(--text-3)', marginLeft: 34 }}>{s.tagline}</div>
            </button>
          ))}
        </div>

        {/* Content: left text, right dashboard */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: 32, alignItems: 'start' }} className="suite-grid">
          <div>
            <h3 style={{ fontSize: 'clamp(22px, 2.4vw, 32px)', lineHeight: 1.15, marginBottom: 16 }}>{S.title}</h3>
            <p style={{ color: 'var(--text-2)', fontSize: 16, marginBottom: 24 }}>{S.body}</p>

            {/* KPIs */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: 24 }}>
              {S.kpis.map((k, i) => (
                <div key={i} style={{ padding: '14px 12px', background: 'var(--bg-soft)', border: '1px solid var(--line)', borderRadius: 10 }}>
                  <div style={{ fontFamily: 'Chakra Petch', fontWeight: 700, fontSize: 22, color: 'var(--navy-900)', lineHeight: 1 }}>{k.v}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-2)', marginTop: 6, letterSpacing: '0.03em' }}>{k.l}</div>
                </div>
              ))}
            </div>

            {/* Bullets */}
            <ul style={{ padding: 0, margin: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {S.bullets.map((b, i) => (
                <li key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <span style={{ marginTop: 2, width: 18, height: 18, borderRadius: 6, background: 'rgba(117,227,228,0.2)', color: 'var(--turquoise-ink)', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
                    <Icon name="check" size={12} stroke={2.5}/>
                  </span>
                  <span style={{ fontSize: 15, color: 'var(--text)' }}>{b}</span>
                </li>
              ))}
            </ul>

            <a href="#diagnostico" className="btn btn-primary" style={{ marginTop: 24 }}>
              Ver demonstração de {S.label}
              <Icon name="arrow" size={14} className="chev"/>
            </a>
          </div>

          <div>
            <SuiteDashboard kind={S.dashboard}/>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 960px) {
          .suite-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

function SuiteDashboard({ kind }) {
  if (kind === 'suprimentos') {
    return (
      <QlikFrame title="SUPRIMENTOS · CURVA ABC · RUPTURA" subtitle="MTD · 7 filiais" tabs={['Visão geral', 'Ruptura', 'Fornecedores', 'Giro']} activeTab={1}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginBottom: 10 }}>
          <QlikKPI compact label="Ruptura Curva A" value="2,1%" delta="-0,8pp" trend="up" color={Q.pos} spark={<Sparkline data={[3.5,3.2,2.9,2.7,2.4,2.3,2.1]} color={Q.pos} fill="rgba(46,139,87,0.15)"/>}/>
          <QlikKPI compact label="SKUs Ativos" value="3.482" delta="+12" trend="up" color={Q.navy}/>
          <QlikKPI compact label="Giro Médio" value="4,8x" delta="+0,6" trend="up" color={Q.navy}/>
          <QlikKPI compact label="Estoque Parado" value="R$ 1,2M" delta="-20%" trend="up" color={Q.pos}/>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 10 }}>
          <QlikHBars
            title="Top 8 SKUs com risco de ruptura · próx. 7 dias"
            rows={[
              { label: 'Ração Premier 15kg',  v: 92, display: '92%', color: '#c53030' },
              { label: 'Shampoo Pet 5L',      v: 84, display: '84%', color: '#c53030' },
              { label: 'Coleira Antipulgas',  v: 72, display: '72%', color: '#c27a00' },
              { label: 'Vacina Pol. V8',      v: 64, display: '64%', color: '#c27a00' },
              { label: 'Ração Felina Adult',  v: 48, display: '48%', color: '#c27a00' },
              { label: 'Cama Grande',         v: 35, display: '35%' },
              { label: 'Brinquedo Mordedor',  v: 22, display: '22%' },
              { label: 'Areia Sanitária 4kg', v: 14, display: '14%' },
            ]}
            max={100}
          />
          <div style={{ display: 'grid', gridTemplateRows: 'auto 1fr', gap: 10 }}>
            <div style={{ background: '#fff', border: `1px solid ${Q.line}`, borderRadius: 10, padding: 14 }}>
              <div style={{ fontFamily: 'Chakra Petch', fontWeight: 600, fontSize: 13, color: Q.ink, marginBottom: 10 }}>Curva ABC · Participação</div>
              <div style={{ display: 'flex', gap: 4, height: 22, borderRadius: 4, overflow: 'hidden' }}>
                <div style={{ flex: 68, background: Q.navy, display: 'grid', placeItems: 'center', color: '#fff', fontSize: 10, fontFamily: 'JetBrains Mono, monospace', fontWeight: 600 }}>A · 68%</div>
                <div style={{ flex: 22, background: Q.turq2, display: 'grid', placeItems: 'center', color: Q.navyDk, fontSize: 10, fontFamily: 'JetBrains Mono, monospace', fontWeight: 600 }}>B · 22%</div>
                <div style={{ flex: 10, background: Q.slateLt, display: 'grid', placeItems: 'center', color: '#fff', fontSize: 10, fontFamily: 'JetBrains Mono, monospace', fontWeight: 600 }}>C · 10%</div>
              </div>
            </div>
            <QlikArea
              title="Previsão de demanda próx. 30 dias"
              subtitle="IA · assertividade 91,4%"
              data={[82,78,84,88,92,95,98,104,108,112,118,125]}
              labels={['D+1','','','','D+15','','','','','','D+30','']}
              height={140}
            />
          </div>
        </div>
      </QlikFrame>
    );
  }

  if (kind === 'comercial') {
    return (
      <QlikFrame title="COMERCIAL · POSITIVAÇÃO · CHURN" subtitle="MTD · Todos os vendedores" tabs={['Visão geral', 'Positivação', 'Churn', 'Cross-sell']} activeTab={2}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginBottom: 10 }}>
          <QlikKPI compact label="Positivação MTD" value="84,2%" delta="+3,2pp" trend="up" color={Q.navy}/>
          <QlikKPI compact label="Clientes Ativos" value="1.248" delta="+38" trend="up" color={Q.navy}/>
          <QlikKPI compact label="Em risco · Curva A" value="17" delta="+3" trend="down" color={Q.neg}/>
          <QlikKPI compact label="LTV médio" value="R$ 128k" delta="+25%" trend="up" color={Q.navy}/>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 10 }}>
          <QlikArea title="Positivação diária" subtitle="MTD · Meta 80%" data={[72,74,73,76,78,77,80,79,82,81,83,84]} labels={['D1','','D5','','D9','','D13','','D17','','D21','']} height={150}/>
          <div style={{ background: '#fff', border: `1px solid ${Q.line}`, borderRadius: 10, padding: 14, display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
            <QlikDonut value={84} label="Positivação" sublabel="Meta 80%" color={Q.turq2}/>
            <div style={{ width: 1, alignSelf: 'stretch', background: Q.line }}/>
            <QlikDonut value={92} label="Meta ciclo" sublabel="R$ 4,7M" color={Q.navy}/>
          </div>
        </div>
        <QlikTable
          title="Carteira em risco de churn · Curva A (top 5)"
          columns={[
            { key: 'cli', label: 'Cliente' },
            { key: 'ltv', label: 'LTV', align: 'right', mono: true },
            { key: 'dias', label: 'Dias s/compra', align: 'right', mono: true },
            { key: 'sug', label: 'Ação sugerida pela IA' },
            { key: 'risk', label: 'Risco', align: 'center', render: (v) => (
              <span style={{ padding: '2px 8px', borderRadius: 4, background: v === 'Alto' ? '#fde7e7' : '#fff4dc', color: v === 'Alto' ? Q.neg : Q.warn, fontSize: 10, fontWeight: 700, letterSpacing: '0.06em' }}>{v.toUpperCase()}</span>
            )},
          ]}
          rows={[
            { cli: 'Distribuidora Sul',    ltv: 'R$ 142k', dias: 47, sug: 'Contato comercial hoje',       risk: 'Alto' },
            { cli: 'Agrocenter Sul',     ltv: 'R$ 98k',  dias: 38, sug: 'Reativação + cross-sell Curva B', risk: 'Alto' },
            { cli: 'Pet House Oeste',    ltv: 'R$ 76k',  dias: 31, sug: 'Ligação de relacionamento',    risk: 'Médio' },
            { cli: 'Vetclin Distrib.',   ltv: 'R$ 64k',  dias: 28, sug: 'Oferta programa fidelidade',   risk: 'Médio' },
            { cli: 'Multiagro Norte',    ltv: 'R$ 58k',  dias: 22, sug: 'Acompanhamento próx. ciclo',   risk: 'Médio' },
          ]}
          compact
        />
      </QlikFrame>
    );
  }

  if (kind === 'financeiro') {
    return (
      <QlikFrame title="FINANCEIRO · DRE · MARGEM LÍQUIDA" subtitle="Competência · Abril/2026" tabs={['DRE', 'Margem por SKU', 'Fluxo de Caixa', 'Rebate']} activeTab={0}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginBottom: 10 }}>
          <QlikKPI compact label="Receita Bruta" value="R$ 18,4M" delta="+14%" trend="up" color={Q.navy}/>
          <QlikKPI compact label="Margem Líquida" value="18,4%" delta="+1,1pp" trend="up" color={Q.navy}/>
          <QlikKPI compact label="Rebate Realizado" value="R$ 1,2M" delta="+8%" trend="up" color={Q.navy}/>
          <QlikKPI compact label="Inadimplência" value="2,4%" delta="-0,3pp" trend="up" color={Q.pos}/>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 10 }}>
          <QlikTable
            title="DRE Gerencial · consolidado"
            columns={[
              { key: 'conta', label: 'Conta' },
              { key: 'val',   label: 'R$',   align: 'right', mono: true },
              { key: 'pct',   label: '% RL', align: 'right', mono: true },
              { key: 'vs',    label: 'vs Mês Ant.', align: 'right', mono: true },
            ]}
            rows={[
              { conta: 'Receita Líquida',      val: '18.420.410', pct: '100,0%', vs: '+14,1%' },
              { conta: '(-) CMV',              val: '12.114.620', pct: '65,7%',  vs: '+12,8%' },
              { conta: '= Lucro Bruto',        val: '6.305.790',  pct: '34,3%',  vs: '+16,9%' },
              { conta: '(-) Despesas Operac.', val: '2.840.120',  pct: '15,4%',  vs: '+4,2%'  },
              { conta: '(+) Rebate',           val: '1.220.450',  pct: '6,6%',   vs: '+8,1%'  },
              { conta: '= EBITDA',             val: '4.686.120',  pct: '25,4%',  vs: '+22,4%' },
              { conta: '= Margem Líquida',     val: '3.389.356',  pct: '18,4%',  vs: '+19,7%' },
            ]}
            compact
            highlightCol="conta"
          />
          <div style={{ display: 'grid', gridTemplateRows: 'auto 1fr', gap: 10 }}>
            <QlikArea title="Fluxo de caixa · próx. 60 dias" subtitle="Projeção · IA 94% assert." data={[2.1,2.4,2.2,2.8,3.1,2.9,3.4,3.8,3.6,4.1,4.4,4.8]} labels={['D1','','','','D15','','','','D30','','','D60']} height={130}/>
            <div style={{ background: '#fff', border: `1px solid ${Q.line}`, borderRadius: 10, padding: 14 }}>
              <div style={{ fontFamily: 'Chakra Petch', fontWeight: 600, fontSize: 13, color: Q.ink, marginBottom: 10 }}>Top 5 SKUs por margem líquida real</div>
              <QlikHBars
                rows={[
                  { label: 'Ração Premium 15kg', v: 34.2, display: '34,2%' },
                  { label: 'Suplemento Línea',   v: 28.7, display: '28,7%' },
                  { label: 'Acessório Pet Pro',  v: 24.1, display: '24,1%' },
                  { label: 'Farmaco Vet Linha',  v: 18.9, display: '18,9%' },
                  { label: 'Higiene & Limpeza',  v: 14.2, display: '14,2%' },
                ]}
                max={40}
                color={Q.turq2}
              />
            </div>
          </div>
        </div>
      </QlikFrame>
    );
  }

  // estrategica
  return (
    <QlikFrame title="GESTÃO ESTRATÉGICA · VISÃO 360° · C-LEVEL" subtitle="Consolidado · 7 filiais · MTD" tabs={['Visão 360°', 'Comparativo YoY', 'Simulação', 'Benchmark']} activeTab={0}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginBottom: 10 }}>
        <QlikKPI compact label="Receita MTD" value="R$ 18,4M" delta="+14%" trend="up" color={Q.navy} spark={<Sparkline data={[12,13,14,15,16,17,18]}/>}/>
        <QlikKPI compact label="EBITDA" value="25,4%" delta="+2,1pp" trend="up" color={Q.navy} spark={<Sparkline data={[22,22.5,23,23.5,24.1,25,25.4]}/>}/>
        <QlikKPI compact label="Capital Giro" value="R$ 8,2M" delta="-12%" trend="up" color={Q.pos} spark={<Sparkline data={[9.5,9.2,9.0,8.8,8.5,8.3,8.2]} color={Q.pos} fill="rgba(46,139,87,0.15)"/>}/>
        <QlikKPI compact label="NPS clientes" value="72" delta="+8" trend="up" color={Q.navy} spark={<Sparkline data={[58,62,65,67,69,71,72]}/>}/>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 10 }}>
        <QlikHBars title="Performance por filial" rows={[
          { label: 'Florianópolis', v: 94, display: '94%', color: Q.pos },
          { label: 'Curitiba',      v: 88, display: '88%', color: Q.turq2 },
          { label: 'Porto Alegre',  v: 82, display: '82%', color: Q.turq2 },
          { label: 'São Paulo',     v: 76, display: '76%', color: Q.navy },
          { label: 'Campinas',      v: 68, display: '68%', color: Q.warn },
          { label: 'Goiânia',       v: 62, display: '62%', color: Q.warn },
          { label: 'Recife',        v: 54, display: '54%', color: Q.neg },
        ]} max={100} barH={18} gap={12}/>
        <QlikArea title="Receita · evolução 12m" subtitle="YoY +28%" data={[11,12,12.5,13,13.8,14.2,15,15.5,16.2,17,17.8,18.4]} labels={['M1','','','M4','','','M7','','','M10','','']} height={250}/>
        <div style={{ background: '#fff', border: `1px solid ${Q.line}`, borderRadius: 10, padding: 14 }}>
          <div style={{ fontFamily: 'Chakra Petch', fontWeight: 600, fontSize: 13, color: Q.ink, marginBottom: 12 }}>Saúde do negócio</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <QlikDonut value={84} label="Positivação" sublabel="Meta 80%" color={Q.turq2} size={80} thickness={9}/>
            <QlikDonut value={72} label="NPS" sublabel="Benchmark 58" color={Q.navy} size={80} thickness={9}/>
            <QlikDonut value={91} label="Assertividade IA" sublabel="Meta 85%" color={Q.pos} size={80} thickness={9}/>
          </div>
        </div>
      </div>
    </QlikFrame>
  );
}

Object.assign(window, { SuitesSection });
