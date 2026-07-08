// Suites section with functional tabs + Qlik dashboards per suite
// Each tab shows a real-looking Qlik dashboard tailored to that suite.

function SuitesSection() {
  const [active, setActive] = React.useState(0);

  const suites = [
    {
      key: 'estrategica',
      label: 'Gestão Estratégica',
      icon: 'target',
      tagline: 'Uma tela. Quatro áreas. Zero ruído.',
      title: 'A visão 360° para quem toma a decisão difícil.',
      body: 'Um único painel com os KPIs que importam: Suprimentos, Comercial, Financeiro e Operacional, consolidados para o C-Level. Drill-down até o documento na mesma tela.',
      kpis: [{ v: '7 filiais', l: 'unificadas em tempo real' }, { v: 'Zero', l: 'planilhas paralelas na diretoria' }, { v: '< 2 min', l: 'para consolidar toda a DRE' }],
      bullets: [
        'Consolidação multi-filial em uma única tela, sem planilha manual',
        'Simulação de cenários (what-if) para preço e custo logístico',
        'Crescimento YoY, ciclo de caixa e produtividade lado a lado',
        'Alerta automático quando EBITDA ou ruptura fogem do planejado',
      ],
      dashboard: 'estrategica',
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
        <QlikKPI compact label="Faturamento Líquido" value="R$ 18,4M" delta="+14%" trend="up" color={Q.navy} spark={<Sparkline data={[12,13,14,15,16,17,18]}/>}/>
        <QlikKPI compact label="EBITDA" value="25,4%" delta="+2,1pp" trend="up" color={Q.navy} spark={<Sparkline data={[22,22.5,23,23.5,24.1,25,25.4]}/>}/>
        <QlikKPI compact label="Ciclo de Caixa" value="42 dias" delta="-6 dias" trend="up" color={Q.pos} spark={<Sparkline data={[52,50,48,47,45,43,42]} color={Q.pos} fill="rgba(46,139,87,0.15)"/>}/>
        <QlikKPI compact label="OTIF Global" value="94,2%" delta="+1,8pp" trend="up" color={Q.navy} spark={<Sparkline data={[89,90,91,92,92.8,93.5,94.2]}/>}/>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.25fr 0.85fr', gap: 10, marginBottom: 10 }}>
        <QlikHBars title="Performance por filial" rows={[
          { label: 'Florianópolis', v: 94, display: '94%', color: Q.pos },
          { label: 'Curitiba',      v: 88, display: '88%', color: Q.pos },
          { label: 'Porto Alegre',  v: 82, display: '82%', color: Q.turq2 },
          { label: 'São Paulo',     v: 76, display: '76%', color: Q.warn },
          { label: 'Campinas',      v: 68, display: '68%', color: Q.warn },
          { label: 'Goiânia',       v: 62, display: '62%', color: Q.warn },
          { label: 'Recife',        v: 54, display: '54%', color: Q.neg },
        ]} max={100} barH={16} gap={12} labelW={86} valueW={40}/>
        <StratRevenueChart/>
        <div style={{ background: '#fff', border: `1px solid ${Q.line}`, borderRadius: 10, padding: 14, display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontFamily: 'Chakra Petch', fontWeight: 600, fontSize: 13, color: Q.ink, marginBottom: 10 }}>Saúde do negócio</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1, justifyContent: 'space-evenly' }}>
            {[
              { v: '84%', l: 'Positivação', s: 'Meta 80%', color: Q.turq2, data: [76,78,79,80,81,83,84] },
              { v: '94%', l: 'OTIF', s: 'Meta 90%', color: Q.navy, data: [88,89,90,91,92,93,94] },
              { v: '91%', l: 'Assertividade IA', s: 'Meta 85%', color: Q.pos, data: [84,85,87,88,89,90,91] },
            ].map((k, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, padding: '8px 10px', background: Q.bgSoft, borderRadius: 8 }}>
                <div>
                  <div style={{ fontFamily: 'Chakra Petch', fontWeight: 700, fontSize: 22, color: k.color, lineHeight: 1.1 }}>{k.v}</div>
                  <div style={{ fontSize: 10.5, fontWeight: 600, color: Q.ink, textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: 2 }}>{k.l}</div>
                  <div style={{ fontSize: 10, color: Q.muted }}>{k.s}</div>
                </div>
                <Sparkline data={k.data} color={k.color} fill="rgba(117,227,228,0.12)" width={72} height={30}/>
              </div>
            ))}
          </div>
        </div>
      </div>
    </QlikFrame>
  );
}

// Receita 12m + projeção IA pontilhada, para o painel estratégico
function StratRevenueChart() {
  const hist = [14.2, 15.1, 16.0, 17.2, 19.8, 18.9, 17.6, 18.1, 17.4, 18.0, 18.2, 18.4];
  const proj = [18.4, 19.2, 20.1];
  const W = 520, H = 250;
  const padL = 34, padR = 14, padT = 16, padB = 40;
  const iw = W - padL - padR, ih = H - padT - padB;
  const n = hist.length + proj.length - 1;
  const all = hist.concat(proj);
  const max = Math.max(...all) * 1.08, min = Math.min(...all) * 0.9;
  const X = i => padL + (i / n) * iw;
  const Y = v => padT + ih - ((v - min) / (max - min)) * ih;
  const histPts = hist.map((v, i) => [X(i), Y(v)]);
  const projPts = proj.map((v, i) => [X(hist.length - 1 + i), Y(v)]);
  const line = histPts.map((p, i) => (i === 0 ? `M${p[0]},${p[1]}` : `L${p[0]},${p[1]}`)).join(' ');
  const area = line + ` L${histPts[histPts.length-1][0]},${padT+ih} L${histPts[0][0]},${padT+ih} Z`;
  const projLine = projPts.map((p, i) => (i === 0 ? `M${p[0]},${p[1]}` : `L${p[0]},${p[1]}`)).join(' ');
  const bestI = hist.indexOf(Math.max(...hist));
  const worstI = hist.indexOf(Math.min(...hist));
  return (
    <div style={{ background: '#fff', border: `1px solid ${Q.line}`, borderRadius: 10, padding: 14, display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 6 }}>
        <div>
          <div style={{ fontFamily: 'Chakra Petch', fontWeight: 600, fontSize: 13, color: Q.ink }}>Receita · evolução 12m</div>
          <div style={{ fontSize: 11, color: Q.muted, marginTop: 2 }}>YoY +28%</div>
        </div>
        <div style={{ fontSize: 9.5, fontWeight: 600, color: Q.navy, background: 'rgba(117,227,228,0.22)', border: `1px solid ${Q.turq2}`, borderRadius: 99, padding: '3px 9px', letterSpacing: '0.06em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>Projeção IA</div>
      </div>
      <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ display: 'block', flex: 1 }}>
        <defs>
          <linearGradient id="stratGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={Q.turq} stopOpacity="0.5"/>
            <stop offset="100%" stopColor={Q.turq} stopOpacity="0"/>
          </linearGradient>
        </defs>
        {[0, 0.25, 0.5, 0.75, 1].map((f, i) => (
          <line key={i} x1={padL} x2={W-padR} y1={padT + ih*f} y2={padT + ih*f} stroke={Q.grid} strokeWidth="1"/>
        ))}
        <path d={area} fill="url(#stratGrad)"/>
        <path d={line} fill="none" stroke={Q.turq2} strokeWidth="2.5"/>
        <path d={projLine} fill="none" stroke={Q.navy} strokeWidth="2" strokeDasharray="5 5"/>
        {histPts.map((p, i) => (
          <circle key={i} cx={p[0]} cy={p[1]} r={i === bestI || i === worstI ? 4 : 2.5} fill={i === bestI ? Q.pos : i === worstI ? Q.neg : '#fff'} stroke={Q.turq2} strokeWidth="1.5"/>
        ))}
        <circle cx={projPts[projPts.length-1][0]} cy={projPts[projPts.length-1][1]} r="4" fill={Q.navy}/>
        <circle cx={projPts[projPts.length-1][0]} cy={projPts[projPts.length-1][1]} r="8" fill={Q.navy} opacity="0.18"/>
        <text x={histPts[bestI][0]} y={histPts[bestI][1] - 9} fontSize="10" fontWeight="600" fill={Q.pos} textAnchor="middle" fontFamily="JetBrains Mono, monospace">R$ 19,8M</text>
        <text x={histPts[worstI][0] + 6} y={histPts[worstI][1] + 16} fontSize="10" fontWeight="600" fill={Q.neg} textAnchor="start" fontFamily="JetBrains Mono, monospace">R$ 14,2M</text>
        {['Jan','','Mar','','Mai','','Jul','','Set','','Nov','','Jan+','Fev+'].map((l, i) => (
          l ? <text key={i} x={X(i)} y={H - 24} fontSize="9" fill={Q.muted} textAnchor="middle" fontFamily="JetBrains Mono, monospace">{l}</text> : null
        ))}
      </svg>
      <div style={{ display: 'flex', gap: 14, fontSize: 10.5, color: Q.muted, marginTop: 4, flexWrap: 'wrap' }}>
        <span><span style={{ color: Q.pos, fontWeight: 700 }}>●</span> Melhor mês: R$ 19,8M (Mai/25)</span>
        <span><span style={{ color: Q.neg, fontWeight: 700 }}>●</span> Pior mês: R$ 14,2M (Jan/25)</span>
        <span><span style={{ color: Q.navy, fontWeight: 700 }}>┄</span> Projeção IA · próx. 2 meses</span>
      </div>
    </div>
  );
}

Object.assign(window, { SuitesSection });
