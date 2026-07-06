// Qlik Sense-skinned dashboard components with SEWE identity
// Navy #2d436c + Turquoise #75e3e4, layout close to Qlik Sense's visual grammar:
// header strip, app tabs, KPI cards with sparklines, combo charts, dense tables.

const Q = {
  navy:    '#2d436c',
  navy2:   '#1f3158',
  navyDk:  '#15243d',
  slate:   '#586580',
  slateLt: '#8a94aa',
  turq:    '#75e3e4',
  turq2:   '#3fc9cb',
  turqDk:  '#0e7a7c',
  grid:    '#eef1f6',
  line:    '#e6e9ef',
  bg:      '#ffffff',
  bgSoft:  '#f7f8fb',
  ink:     '#15243d',
  muted:   '#6b7386',
  pos:     '#2e8b57',
  neg:     '#c53030',
  warn:    '#c27a00',
};

function QlikFrame({ title = 'PAINEL · COMERCIAL · HOJE', subtitle, time = '14:22', tabs, activeTab = 0, children, toolbar, compact = false, style = {} }) {
  return (
    <div className="qlik" style={{ ...style }}>
      {/* top chrome: logo + app name + clock */}
      <div className="qlik-head" style={{ background: Q.navy, color: '#fff', borderBottom: 'none', gap: 10, padding: '10px 14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 22, height: 22, background: Q.turq, borderRadius: 4, display: 'grid', placeItems: 'center', color: Q.navyDk, fontFamily: 'Chakra Petch', fontWeight: 700, fontSize: 13 }}>S</div>
          <div style={{ fontFamily: 'Chakra Petch, sans-serif', fontWeight: 600, fontSize: 12, letterSpacing: '0.12em' }}>SEWE · INTELLIGENCE</div>
        </div>
        <div style={{ flex: 1 }}/>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 11, color: 'rgba(255,255,255,0.72)', fontFamily: 'JetBrains Mono, monospace' }}>
          <span>HOJE · {time}</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 6, height: 6, borderRadius: 99, background: Q.turq, boxShadow: `0 0 0 3px rgba(117,227,228,0.25)` }}/>
            LIVE
          </span>
        </div>
      </div>

      {/* breadcrumb / app title strip */}
      <div style={{ padding: '10px 14px', background: '#fff', borderBottom: `1px solid ${Q.line}`, display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ fontFamily: 'Chakra Petch', fontSize: 13, fontWeight: 600, color: Q.ink, letterSpacing: '0.02em' }}>{title}</div>
        {subtitle && <div style={{ fontSize: 11, color: Q.muted }}>{subtitle}</div>}
        <div style={{ flex: 1 }}/>
        {toolbar}
      </div>

      {tabs && (
        <div className="qlik-tabs">
          {tabs.map((t, i) => (
            <div key={i} className={'qlik-tab' + (i === activeTab ? ' active' : '')}>{t}</div>
          ))}
        </div>
      )}

      <div style={{ padding: compact ? 12 : 16, background: Q.bgSoft }}>
        {children}
      </div>
    </div>
  );
}

function QlikKPI({ label, value, delta, trend = 'up', spark, color = Q.navy, compact = false, icon }) {
  const pos = trend === 'up';
  return (
    <div style={{ background: '#fff', border: `1px solid ${Q.line}`, borderRadius: 10, padding: compact ? 12 : 14, minWidth: 0 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: Q.muted, fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 600 }}>
          {icon}
          {label}
        </div>
        {delta != null && (
          <div style={{ fontSize: 11, color: pos ? Q.pos : Q.neg, fontWeight: 600, fontFamily: 'JetBrains Mono, monospace' }}>
            {pos ? '▲' : '▼'} {delta}
          </div>
        )}
      </div>
      <div style={{ fontFamily: 'Chakra Petch, sans-serif', fontSize: compact ? 22 : 28, fontWeight: 700, color, letterSpacing: '-0.01em', lineHeight: 1 }}>
        {value}
      </div>
      {spark && <div style={{ marginTop: 8 }}>{spark}</div>}
    </div>
  );
}

function Sparkline({ data, color = Q.turq2, fill = 'rgba(117,227,228,0.18)', height = 28, width = 120 }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const pts = data.map((v, i) => [
    (i / (data.length - 1)) * width,
    height - ((v - min) / range) * (height - 2) - 1,
  ]);
  const d = pts.map((p, i) => (i === 0 ? `M${p[0]},${p[1]}` : `L${p[0]},${p[1]}`)).join(' ');
  const area = d + ` L${width},${height} L0,${height} Z`;
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" style={{ display: 'block', width: '100%' }}>
      <path d={area} fill={fill}/>
      <path d={d} fill="none" stroke={color} strokeWidth="1.75"/>
      <circle cx={pts[pts.length - 1][0]} cy={pts[pts.length - 1][1]} r="2.75" fill={color}/>
    </svg>
  );
}

// Combo chart: bars + line, with y-axis labels and x-axis labels, Qlik's staple.
function QlikCombo({
  bars, line, labels, height = 220,
  yMax,
  barColor = Q.navy, barColor2 = Q.slate,
  lineColor = Q.turq2,
  title, subtitle,
  showLegend = true,
}) {
  const W = 520;
  const padL = 36, padR = 12, padT = 20, padB = 28;
  const iw = W - padL - padR;
  const ih = height - padT - padB;
  const max = yMax || Math.max(...bars, ...line) * 1.15;
  const bw = iw / bars.length * 0.62;
  const step = iw / bars.length;

  const yTicks = 4;
  const ticks = Array.from({length: yTicks + 1}, (_, i) => (max / yTicks) * i);

  const linePts = line.map((v, i) => [
    padL + step * i + step / 2,
    padT + ih - (v / max) * ih,
  ]);
  const lineD = linePts.map((p, i) => (i === 0 ? `M${p[0]},${p[1]}` : `L${p[0]},${p[1]}`)).join(' ');

  return (
    <div style={{ background: '#fff', border: `1px solid ${Q.line}`, borderRadius: 10, padding: 14 }}>
      {(title || subtitle) && (
        <div style={{ marginBottom: 10 }}>
          {title && <div style={{ fontFamily: 'Chakra Petch', fontWeight: 600, fontSize: 13, color: Q.ink }}>{title}</div>}
          {subtitle && <div style={{ fontSize: 11, color: Q.muted, marginTop: 2 }}>{subtitle}</div>}
        </div>
      )}
      <svg width="100%" viewBox={`0 0 ${W} ${height}`} style={{ display: 'block' }}>
        {/* grid */}
        {ticks.map((t, i) => {
          const y = padT + ih - (t / max) * ih;
          return (
            <g key={i}>
              <line x1={padL} x2={W - padR} y1={y} y2={y} stroke={Q.grid} strokeWidth="1"/>
              <text x={padL - 6} y={y + 3} fontSize="9" fill={Q.muted} textAnchor="end" fontFamily="JetBrains Mono, monospace">
                {t >= 1000 ? (t/1000).toFixed(0) + 'k' : t.toFixed(0)}
              </text>
            </g>
          );
        })}
        {/* bars */}
        {bars.map((v, i) => {
          const bh = (v / max) * ih;
          const x = padL + step * i + (step - bw) / 2;
          const y = padT + ih - bh;
          return (
            <g key={i}>
              <rect x={x} y={y} width={bw} height={bh} fill={barColor} rx="1"/>
              <text x={x + bw/2} y={height - 10} fontSize="9" fill={Q.muted} textAnchor="middle" fontFamily="JetBrains Mono, monospace">
                {labels[i]}
              </text>
            </g>
          );
        })}
        {/* line */}
        <path d={lineD} fill="none" stroke={lineColor} strokeWidth="2"/>
        {linePts.map((p, i) => (
          <circle key={i} cx={p[0]} cy={p[1]} r="3" fill="#fff" stroke={lineColor} strokeWidth="2"/>
        ))}
      </svg>
      {showLegend && (
        <div style={{ display: 'flex', gap: 16, marginTop: 8, fontSize: 10, color: Q.muted, fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.04em' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 10, height: 10, background: barColor, borderRadius: 2 }}/> FATURAMENTO
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 14, height: 2, background: lineColor }}/> META
          </span>
        </div>
      )}
    </div>
  );
}

// Horizontal bar chart, great for curva ABC, top N
function QlikHBars({ rows, valueKey = 'v', labelKey = 'label', color = Q.turq2, title, max: maxProp, barH = 14, gap = 8 }) {
  const max = maxProp || Math.max(...rows.map(r => r[valueKey])) * 1.1;
  return (
    <div style={{ background: '#fff', border: `1px solid ${Q.line}`, borderRadius: 10, padding: 14, height: '100%', boxSizing: 'border-box', display: 'flex', flexDirection: 'column' }}>
      {title && <div style={{ fontFamily: 'Chakra Petch', fontWeight: 600, fontSize: 13, color: Q.ink, marginBottom: 10 }}>{title}</div>}
      <div style={{ display: 'flex', flexDirection: 'column', gap, flex: 1, justifyContent: 'space-evenly' }}>
        {rows.map((r, i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '110px 1fr 60px', alignItems: 'center', gap: 10, fontSize: 11 }}>
            <div style={{ color: Q.ink, fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r[labelKey]}</div>
            <div style={{ background: Q.grid, height: barH, borderRadius: 2, overflow: 'hidden', position: 'relative' }}>
              <div style={{ width: `${(r[valueKey] / max) * 100}%`, height: '100%', background: r.color || color, borderRadius: 2, transition: 'width .6s ease' }}/>
            </div>
            <div style={{ color: Q.ink, fontFamily: 'JetBrains Mono, monospace', fontWeight: 600, textAlign: 'right' }}>
              {r.display || r[valueKey]}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Area chart for trends
function QlikArea({ data, labels, color = Q.turq2, fill = 'url(#qlikGrad)', height = 150, title, subtitle, yUnit = '' }) {
  const W = 520;
  const padL = 36, padR = 12, padT = 14, padB = 22;
  const iw = W - padL - padR;
  const ih = height - padT - padB;
  const max = Math.max(...data) * 1.1;
  const min = Math.min(...data) * 0.9;
  const range = max - min || 1;
  const pts = data.map((v, i) => [
    padL + (i / (data.length - 1)) * iw,
    padT + ih - ((v - min) / range) * ih,
  ]);
  const d = pts.map((p, i) => (i === 0 ? `M${p[0]},${p[1]}` : `L${p[0]},${p[1]}`)).join(' ');
  const area = d + ` L${pts[pts.length-1][0]},${padT + ih} L${pts[0][0]},${padT + ih} Z`;

  return (
    <div style={{ background: '#fff', border: `1px solid ${Q.line}`, borderRadius: 10, padding: 14 }}>
      {(title || subtitle) && (
        <div style={{ marginBottom: 8 }}>
          {title && <div style={{ fontFamily: 'Chakra Petch', fontWeight: 600, fontSize: 13, color: Q.ink }}>{title}</div>}
          {subtitle && <div style={{ fontSize: 11, color: Q.muted, marginTop: 2 }}>{subtitle}</div>}
        </div>
      )}
      <svg width="100%" viewBox={`0 0 ${W} ${height}`} style={{ display: 'block' }}>
        <defs>
          <linearGradient id="qlikGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={Q.turq} stopOpacity="0.45"/>
            <stop offset="100%" stopColor={Q.turq} stopOpacity="0"/>
          </linearGradient>
        </defs>
        {[0, 0.25, 0.5, 0.75, 1].map((f, i) => {
          const y = padT + ih * f;
          return <line key={i} x1={padL} x2={W-padR} y1={y} y2={y} stroke={Q.grid} strokeWidth="1"/>;
        })}
        <path d={area} fill={fill}/>
        <path d={d} fill="none" stroke={color} strokeWidth="2"/>
        <circle cx={pts[pts.length-1][0]} cy={pts[pts.length-1][1]} r="3.5" fill={color}/>
        <circle cx={pts[pts.length-1][0]} cy={pts[pts.length-1][1]} r="6" fill={color} opacity="0.25"/>
        {labels && labels.map((l, i) => (
          <text key={i} x={padL + (i / (labels.length-1)) * iw} y={height - 6} fontSize="9" fill={Q.muted} textAnchor="middle" fontFamily="JetBrains Mono, monospace">{l}</text>
        ))}
      </svg>
    </div>
  );
}

// Data table, Qlik's staple
function QlikTable({ columns, rows, title, highlightCol, compact = false }) {
  return (
    <div style={{ background: '#fff', border: `1px solid ${Q.line}`, borderRadius: 10, overflow: 'hidden' }}>
      {title && <div style={{ padding: '12px 14px', borderBottom: `1px solid ${Q.line}`, fontFamily: 'Chakra Petch', fontWeight: 600, fontSize: 13, color: Q.ink }}>{title}</div>}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 11.5 }}>
          <thead>
            <tr>
              {columns.map((c, i) => (
                <th key={i} style={{
                  textAlign: c.align || 'left',
                  padding: compact ? '8px 10px' : '10px 12px',
                  background: Q.bgSoft,
                  borderBottom: `1px solid ${Q.line}`,
                  color: Q.muted,
                  fontWeight: 600,
                  fontSize: 10,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  whiteSpace: 'nowrap',
                }}>{c.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} style={{ borderBottom: `1px solid ${Q.grid}` }}>
                {columns.map((c, j) => (
                  <td key={j} style={{
                    padding: compact ? '7px 10px' : '10px 12px',
                    textAlign: c.align || 'left',
                    color: Q.ink,
                    fontFamily: c.mono ? 'JetBrains Mono, monospace' : 'Inter, sans-serif',
                    fontWeight: highlightCol === c.key ? 600 : 400,
                    fontVariantNumeric: 'tabular-nums',
                    whiteSpace: 'nowrap',
                  }}>
                    {c.render ? c.render(r[c.key], r) : r[c.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Donut / gauge, for positivação, ruptura
function QlikDonut({ value, label, sublabel, color = Q.turq2, track = Q.grid, size = 120, thickness = 12, valueFormat }) {
  const r = (size - thickness) / 2;
  const c = 2 * Math.PI * r;
  const off = c - (value / 100) * c;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={track} strokeWidth={thickness}/>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={thickness}
          strokeDasharray={c} strokeDashoffset={off} strokeLinecap="round"/>
      </svg>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <div style={{ fontFamily: 'Chakra Petch', fontSize: 24, fontWeight: 700, color: Q.ink, lineHeight: 1 }}>
          {valueFormat ? valueFormat(value) : `${value}%`}
        </div>
        <div style={{ fontSize: 11, color: Q.muted, letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 600 }}>{label}</div>
        {sublabel && <div style={{ fontSize: 11, color: Q.slate }}>{sublabel}</div>}
      </div>
    </div>
  );
}

// Filter chips (selection pills, Qlik Sense signature)
function QlikFilters({ filters }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
      {filters.map((f, i) => (
        <div key={i} style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          padding: '4px 10px',
          background: f.active ? Q.turq : '#fff',
          color: f.active ? Q.navyDk : Q.muted,
          border: `1px solid ${f.active ? Q.turq2 : Q.line}`,
          borderRadius: 4,
          fontSize: 11,
          fontFamily: 'JetBrains Mono, monospace',
          fontWeight: 500,
          letterSpacing: '0.04em',
        }}>
          <span style={{ fontSize: 9, color: f.active ? Q.navyDk : Q.slateLt, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{f.label}:</span>
          {f.value}
        </div>
      ))}
    </div>
  );
}

Object.assign(window, { Q, QlikFrame, QlikKPI, Sparkline, QlikCombo, QlikHBars, QlikArea, QlikTable, QlikDonut, QlikFilters });
