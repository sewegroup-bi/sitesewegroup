// DistribuidorScene — CSS-3D isometric distribution center, fully code-drawn.
// Mezzanine offices (suítes) with dashboards + people, data beams, warehouse
// racks, forklift, conveyor, SEWE GROUP dock building, trucks and street.
// Clickable pills: suítes → #suites (event 'sewe:suite'), Sewe Sales → #sales.

const DIST_C = {
  navy900: '#1a2844', navy800: '#223558', navy700: '#2d436c',
  turq: '#75e3e4', turq2: '#3fc9cb',
};

// One cuboid: top + front (+Y) + side (+X) faces in the rotated plane space.
function DSlab({ x, y, z = 0, w, d, h, top, front, side, rTop = 0, topChildren, frontChildren, sideChildren, topShadow }) {
  return (
    <div style={{ position: 'absolute', left: x, top: y, width: w, height: d, transformStyle: 'preserve-3d', transform: 'translateZ(' + z + 'px)', pointerEvents: 'none' }}>
      <div style={{ position: 'absolute', left: 0, top: 0, width: w, height: d, background: top, borderRadius: rTop, transform: 'translateZ(' + h + 'px)', boxShadow: topShadow, overflow: 'hidden' }}>{topChildren}</div>
      <div style={{ position: 'absolute', left: 0, top: d, width: w, height: h, transformOrigin: '0 0', transform: 'translateZ(' + h + 'px) rotateX(-90deg)', background: front, overflow: 'hidden' }}>{frontChildren}</div>
      <div style={{ position: 'absolute', left: w, top: 0, width: d, height: h, transformOrigin: '0 0', transform: 'translateZ(' + h + 'px) rotateZ(90deg) rotateX(-90deg)', background: side, overflow: 'hidden' }}>
        {sideChildren ? <div style={{ width: '100%', height: '100%', transform: 'scaleX(-1)' }}>{sideChildren}</div> : null}
      </div>
    </div>
  );
}

// Billboarded flat element that always faces the camera (people, plants).
function DBill({ x, y, z = 0, w, h, children }) {
  return (
    <div style={{
      position: 'absolute', left: x - w / 2, top: y - h, width: w, height: h,
      transformOrigin: (w / 2) + 'px ' + h + 'px',
      transform: 'translateZ(' + z + 'px) rotateZ(-45deg) rotateX(-57deg)',
      pointerEvents: 'none',
    }}>{children}</div>
  );
}

// pose: null | 'sit' | 'point' (seated, arm up at screen) | 'phone' | 'clipboard'
function DPerson({ x, y, z = 0, shirt = DIST_C.navy700, hair = '#3d3128', pose = null }) {
  const seated = pose === 'sit' || pose === 'point';
  return (
    <DBill x={x} y={y} z={z} w={26} h={seated ? 30 : 38}>
      <div style={{ position: 'relative', width: 22, margin: '0 auto' }}>
        <div style={{ width: 11, height: 11, borderRadius: '50%', background: '#e9bd93', margin: '0 auto', position: 'relative' }}>
          <div style={{ position: 'absolute', top: -2, left: 1, right: 1, height: 6, borderRadius: '6px 6px 2px 2px', background: hair }}></div>
          {pose === 'phone' ? <div style={{ position: 'absolute', top: 2, right: -2, width: 3, height: 8, borderRadius: 1.5, background: '#131b29' }}></div> : null}
        </div>
        <div style={{ width: 16, height: 15, borderRadius: '8px 8px 4px 4px', background: shirt, margin: '1px auto 0', position: 'relative' }}>
          {pose === 'point' ? <div style={{ position: 'absolute', top: -5, right: -7, width: 12, height: 4, borderRadius: 2, background: shirt, transform: 'rotate(-38deg)' }}></div> : null}
          {pose === 'phone' ? <div style={{ position: 'absolute', top: -7, right: 0, width: 4, height: 10, borderRadius: 2, background: shirt, transform: 'rotate(16deg)' }}></div> : null}
          {pose === 'clipboard' ? (
            <div style={{ position: 'absolute', top: 3, left: -8, width: 9, height: 12, borderRadius: 1.5, background: '#fff', border: '1px solid #b9c6db', boxSizing: 'border-box' }}>
              <div style={{ margin: '2px 1px 0', height: 1.5, background: DIST_C.turq2 }}></div>
              <div style={{ margin: '1.5px 1px 0', height: 1.5, background: '#c3cfe3' }}></div>
            </div>
          ) : null}
        </div>
        {seated ? null : (
          <div style={{ display: 'flex', justifyContent: 'center', gap: 2, marginTop: 0 }}>
            <div style={{ width: 5, height: 10, borderRadius: '0 0 3px 3px', background: '#26314a' }}></div>
            <div style={{ width: 5, height: 10, borderRadius: '0 0 3px 3px', background: '#26314a' }}></div>
          </div>
        )}
      </div>
    </DBill>
  );
}

function DBox({ x, y, z = 0, s = 22, h = 18, tone = 0 }) {
  const tones = [
    ['#e8c39a', '#d4a373', '#b8875a'],
    ['#dba76f', '#c08a5a', '#a06f42'],
    ['#f0d3b0', '#e0b183', '#c69158'],
  ];
  const c = tones[tone % 3];
  return <DSlab x={x} y={y} z={z} w={s} d={s} h={h} top={c[0]} front={c[1]} side={c[2]} rTop={2}/>;
}

function DChair({ x, y, z }) {
  const c = ['#2d3f5e', '#243554', '#1c2b45'];
  return (
    <div style={{ position: 'absolute', left: 0, top: 0, transformStyle: 'preserve-3d' }}>
      <div style={{ position: 'absolute', left: x - 4, top: y - 3, width: 22, height: 22, borderRadius: '50%', transform: 'translateZ(' + (z + 0.4) + 'px)', background: 'radial-gradient(circle, rgba(26,40,68,0.22) 0%, transparent 70%)' }}></div>
      <DSlab x={x} y={y} z={z} w={14} d={13} h={9} rTop={4} top={c[0]} front={c[1]} side={c[2]}/>
      <DSlab x={x} y={y + 11} z={z} w={14} d={3.5} h={23} rTop={2.5} top={c[0]} front={c[1]} side={c[2]}/>
    </div>
  );
}

// Desk with monitor + chair
function DDesk({ x, y, z }) {
  return (
    <div style={{ position: 'absolute', left: 0, top: 0, transformStyle: 'preserve-3d' }}>
      {/* micro floor shadow anchoring the desk */}
      <div style={{ position: 'absolute', left: x - 4, top: y - 3, width: 52, height: 28, borderRadius: '50%', transform: 'translateZ(' + (z + 0.4) + 'px)', background: 'radial-gradient(closest-side, rgba(26,40,68,0.20) 0%, rgba(26,40,68,0.08) 60%, transparent 100%)' }}></div>
      <DSlab x={x} y={y} z={z} w={44} d={18} h={12} rTop={3} top="#eef3fa" front="#cfd9ea" side="#bfcbdf"
        topChildren={<div style={{ position: 'absolute', inset: 1.5, borderRadius: 2, border: '1px solid rgba(122,138,165,0.35)', boxSizing: 'border-box' }}></div>}/>
      <DSlab x={x + 10} y={y + 3} z={z + 12} w={24} d={3} h={12} rTop={2} top="#223558" front="#141f38" side="#0f1830"
        frontChildren={
          <div style={{ position: 'absolute', inset: 2, borderRadius: 1, background: 'linear-gradient(180deg, #16264a, #0c1735)', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', left: 1, right: 1, top: 1.5, height: 1.4, background: '#7ff0f1', boxShadow: '0 0 3px #7ff0f1, 0 0 6px rgba(127,240,241,0.6)' }}></div>
            <div style={{ position: 'absolute', left: 1, right: 5, top: 4, height: 1.4, background: '#4ade80', boxShadow: '0 0 3px rgba(74,222,128,0.8)' }}></div>
            <div style={{ position: 'absolute', left: 1, right: 9, top: 6.2, height: 1.4, background: '#f7c948', boxShadow: '0 0 3px rgba(247,201,72,0.8)' }}></div>
          </div>
        }/>
      <DChair x={x + 16} y={y + 24} z={z}/>
    </div>
  );
}

// Flat status tag lying in the isometric plane, floating above a surface,
// with a projected ellipse shadow at shadowZ (height of the surface below).
function DBadge({ x, y, z, kind = 'ok', shadowZ = null }) {
  const base = { position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', color: '#fff', fontWeight: 700, fontFamily: 'Inter, sans-serif', boxSizing: 'border-box' };
  return (
    <div style={{ position: 'absolute', left: 0, top: 0, transformStyle: 'preserve-3d', pointerEvents: 'none' }}>
      {shadowZ != null ? (
        <div style={{ position: 'absolute', left: x - 21, top: y - 21, width: 42, height: 42, borderRadius: '50%', transform: 'translateZ(' + (shadowZ + 0.5) + 'px)', background: 'radial-gradient(circle, rgba(26,40,68,0.30) 0%, rgba(26,40,68,0.10) 45%, transparent 70%)' }}></div>
      ) : null}
      <div style={{ position: 'absolute', left: x - 21, top: y - 21, width: 42, height: 42, transform: 'translateZ(' + z + 'px) rotateZ(-45deg) rotateX(-57deg)', transformStyle: 'preserve-3d' }}>
        <div className="dist-bob" style={{ position: 'absolute', inset: 0 }}>
          {kind === 'warn' ? (
            <div style={{ ...base, color: '#6b4e00', background: '#ffd23e', clipPath: 'polygon(50% 0, 100% 100%, 0 100%)', fontSize: 19, paddingTop: 15 }}>!</div>
          ) : kind === 'risk' ? (
            <div style={{ ...base, background: '#e14b4b', borderRadius: 11, border: '2.5px solid #fff', fontSize: 19, boxShadow: '0 0 12px rgba(225,75,75,0.5)' }}>⚠</div>
          ) : kind === 'money' ? (
            <div style={{ ...base, background: '#27ae60', borderRadius: '50%', border: '2.5px solid #fff', fontSize: 18, boxShadow: '0 0 12px rgba(39,174,96,0.5)' }}>$</div>
          ) : (
            <div style={{ ...base, background: kind === 'ok' ? '#27ae60' : '#e14b4b', borderRadius: '50%', border: '2.5px solid #fff', fontSize: 21, boxShadow: '0 0 12px rgba(39,174,96,0.45)' }}>{kind === 'ok' ? '✓' : '✕'}</div>
          )}
        </div>
      </div>
    </div>
  );
}

// Storage rack: uprights + 2 shelf levels loaded with boxes
function DRack({ x, y }) {
  const up = ['#4a5f85', '#3a4d6f', '#2d3f5e'];
  const sh = ['#dde5f1', '#c3cfe3', '#b0bed4'];
  return (
    <div style={{ position: 'absolute', left: 0, top: 0, transformStyle: 'preserve-3d' }}>
      {[[0, 0], [156, 0], [0, 36], [156, 36]].map((p, i) => (
        <DSlab key={i} x={x + p[0]} y={y + p[1]} z={0} w={8} d={8} h={76} top={up[0]} front={up[1]} side={up[2]}/>
      ))}
      <DSlab x={x} y={y} z={34} w={164} d={44} h={5} top={sh[0]} front={sh[1]} side={sh[2]}/>
      <DSlab x={x} y={y} z={70} w={164} d={44} h={5} top={sh[0]} front={sh[1]} side={sh[2]}/>
      {/* ground row pulled to the rack's front edge so the shelf above doesn't hide their vertical faces */}
      {[0, 1, 2, 3, 4, 5].map(i => <DBox key={'a' + i} x={x + 10 + i * 25} y={y + 21} z={0} s={21} h={18} tone={i}/>)}
      {[0, 1, 2, 3, 4].map(i => <DBox key={'b' + i} x={x + 14 + i * 30} y={y + 16} z={39} s={20} h={15} tone={i + 1}/>)}
      {[0, 1, 2].map(i => <DBox key={'c' + i} x={x + 22 + i * 48} y={y + 12} z={75} s={19} h={14} tone={i}/>)}
    </div>
  );
}

// Themed screen content per suite
function DScreenContent({ screen }) {
  if (screen === 'kpi') { // Gestão Estratégica: executive cockpit — KPI cards + donuts
    return (
      <div style={{ position: 'absolute', inset: '13px 24px 7px 10px', display: 'flex', gap: 6, alignItems: 'stretch' }}>
        {[0, 1].map(k => (
          <div key={k} style={{ flex: 1, borderRadius: 3, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(117,227,228,0.25)', padding: 4, boxSizing: 'border-box' }}>
            <div style={{ width: '55%', height: 4, borderRadius: 1, background: k ? '#4ade80' : '#7ff0f1', boxShadow: '0 0 4px ' + (k ? 'rgba(74,222,128,0.8)' : 'rgba(127,240,241,0.8)') }}></div>
            <div style={{ width: '35%', height: 3, borderRadius: 1, background: 'rgba(255,255,255,0.25)', marginTop: 3 }}></div>
          </div>
        ))}
        {[['#7ff0f1', 72], ['#f7c948', 45]].map((d, k) => (
          <div key={'d' + k} style={{ width: 22, height: 22, alignSelf: 'center', borderRadius: '50%', background: 'conic-gradient(' + d[0] + ' ' + d[1] + '%, rgba(255,255,255,0.12) 0)', display: 'grid', placeItems: 'center', boxShadow: '0 0 6px rgba(127,240,241,0.4)' }}>
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#101d3c' }}></div>
          </div>
        ))}
      </div>
    );
  }
  if (screen === 'funnel') { // Comercial: sales funnel
    return (
      <div style={{ position: 'absolute', inset: '13px 24px 7px 10px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
        {[[100, '#7ff0f1'], [72, '#4ade80'], [48, '#f7c948'], [28, '#7ff0f1']].map((f, k) => (
          <div key={k} style={{ width: f[0] + '%', height: 6, borderRadius: 2, background: f[1], opacity: 0.92, boxShadow: '0 0 5px rgba(127,240,241,0.45)' }}></div>
        ))}
      </div>
    );
  }
  if (screen === 'cashflow') { // Financeiro: paired columns (in vs out)
    return (
      <div style={{ position: 'absolute', inset: '13px 24px 7px 10px', display: 'flex', alignItems: 'flex-end', gap: 5 }}>
        {[[62, 40], [78, 52], [55, 60], [88, 46], [70, 34]].map((p, k) => (
          <div key={k} style={{ flex: 1, display: 'flex', alignItems: 'flex-end', gap: 2, height: '100%' }}>
            <div style={{ flex: 1, height: p[0] + '%', borderRadius: 1.5, background: '#4ade80', boxShadow: '0 0 4px rgba(74,222,128,0.7)' }}></div>
            <div style={{ flex: 1, height: p[1] + '%', borderRadius: 1.5, background: '#f7c948', boxShadow: '0 0 4px rgba(247,201,72,0.6)' }}></div>
          </div>
        ))}
      </div>
    );
  }
  // 'stock' — Suprimentos: supply/demand peaks & valleys + threshold line
  return (
    <svg viewBox="0 0 100 40" preserveAspectRatio="none" style={{ position: 'absolute', inset: '13px 24px 7px 10px', overflow: 'visible' }}>
      <line x1="0" y1="10" x2="100" y2="10" stroke="rgba(247,201,72,0.7)" strokeWidth="1" strokeDasharray="4 3" vectorEffect="non-scaling-stroke"></line>
      <polyline points="0,30 12,10 24,34 38,8 52,30 66,6 80,32 100,14" fill="none" stroke="#7ff0f1" strokeWidth="2" strokeLinejoin="round" vectorEffect="non-scaling-stroke" style={{ filter: 'drop-shadow(0 0 4px rgba(127,240,241,1)) drop-shadow(0 0 9px rgba(127,240,241,0.55))' }}></polyline>
      <polyline points="0,36 20,28 40,34 60,24 80,30 100,26" fill="none" stroke="#4ade80" strokeWidth="1.4" vectorEffect="non-scaling-stroke" strokeLinejoin="round" style={{ filter: 'drop-shadow(0 0 3px rgba(74,222,128,0.9))' }}></polyline>
    </svg>
  );
}

// Elevated office platform: pillars, slab, dashboard wall, furniture, people
function DPlatform({ x, y, w, d, z, active, kind, screen, room, people = [] }) {
  return (
    <div style={{ position: 'absolute', left: 0, top: 0, transformStyle: 'preserve-3d' }}>
      {/* ground shadow */}
      <div style={{ position: 'absolute', left: x - 8, top: y - 8, width: w + 16, height: d + 16, borderRadius: 20, transform: 'translateZ(0.6px)', background: 'radial-gradient(ellipse at center, rgba(26,40,68,0.13) 0%, transparent 72%)' }}></div>
      {/* enclosed ground-floor room filling the void under the slab */}
      {room ? (
        <DSlab x={x + 18} y={y + 18} z={0} w={w - 36} d={d - 36} h={z}
          top="#e4eaf4"
          front="#e9eef6" side="#f3f6fb"
          frontChildren={
            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(to right, transparent 0 26px, rgba(122,138,165,0.22) 26px 27px)' }}></div>
          }
          sideChildren={<div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(to right, transparent 0 26px, rgba(122,138,165,0.16) 26px 27px)' }}></div>}/>
      ) : null}
      <DSlab x={x} y={y} z={z} w={w} d={d} h={12} rTop={8}
        top={active ? '#ffffff' : '#fbfcfe'} front="#dfe6f2" side="#cfd9ea"
        topShadow={active ? 'inset 0 0 0 2px ' + DIST_C.turq2 : 'inset 0 0 0 1px #e2e8f2'}/>
      {/* dashboard screen wall */}
      <DSlab x={x + 20} y={y + 8} z={z + 12} w={w - 40} d={7} h={52} rTop={3}
        top="#223558" front="linear-gradient(180deg, #17284e 0%, #101d3c 55%, #0b1530 100%)" side="#0f1830"
        frontChildren={
          <div style={{ width: '100%', height: '100%', position: 'relative', boxSizing: 'border-box' }}>
            <DScreenContent screen={screen}/>
            {/* micro UI: KPI chips, vertical gauge, indicator square */}
            <div style={{ position: 'absolute', top: 5, left: 10, display: 'flex', gap: 4 }}>
              {[14, 9, 11].map((wv, k) => (
                <div key={k} style={{ width: wv, height: 5, borderRadius: 1.5, background: 'rgba(117,227,228,' + (k === 0 ? 0.9 : 0.3) + ')', boxShadow: k === 0 ? '0 0 4px rgba(117,227,228,0.8)' : 'none' }}></div>
              ))}
            </div>
            <div style={{ position: 'absolute', top: 15, right: 8, bottom: 8, width: 7, borderRadius: 2, background: 'rgba(255,255,255,0.07)', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: '62%', background: 'linear-gradient(180deg, #4ade80, rgba(74,222,128,0.25))', boxShadow: '0 0 6px rgba(74,222,128,0.85)' }}></div>
            </div>
            <div style={{ position: 'absolute', bottom: 7, right: 20, width: 6, height: 6, borderRadius: 1.5, background: '#f7c948', boxShadow: '0 0 5px rgba(247,201,72,0.9)' }}></div>
            <div style={{ position: 'absolute', top: 6, right: 9, width: 6, height: 6, borderRadius: '50%', background: DIST_C.turq, boxShadow: '0 0 5px rgba(117,227,228,0.9)' }} className="dist-blink"></div>
            {active ? <div style={{ position: 'absolute', inset: 0, boxShadow: 'inset 0 0 18px rgba(117,227,228,0.55)' }}></div> : null}
          </div>
        }/>
      {kind === 'boardroom' ? (
        <div style={{ position: 'absolute', left: 0, top: 0, transformStyle: 'preserve-3d' }}>
          {/* oval directors' table with laptops */}
          <div style={{ position: 'absolute', left: x + w / 2 - 54, top: y + d / 2 - 15, width: 108, height: 60, borderRadius: '50%', transform: 'translateZ(' + (z + 12.4) + 'px)', background: 'radial-gradient(closest-side, rgba(26,40,68,0.20) 0%, rgba(26,40,68,0.08) 60%, transparent 100%)' }}></div>
          <DSlab x={x + w / 2 - 46} y={y + d / 2 - 8} z={z + 12} w={92} d={46} h={14} rTop={23} top="#eef3fa" front="#cfd9ea" side="#bfcbdf"
            topChildren={<div style={{ position: 'absolute', inset: 2.5, borderRadius: 21, border: '1.5px solid rgba(122,138,165,0.4)', boxSizing: 'border-box' }}></div>}/>
          {[0, 1, 2].map(i => (
            <DSlab key={i} x={x + w / 2 - 36 + i * 26} y={y + d / 2 + 4} z={z + 26} w={13} d={9} h={1.5} rTop={1} top="#c9d4e6" front="#b9c6db" side="#aab8d0"/>
          ))}
          {/* office chair under every director: seat centered on the avatar's base */}
          {people.map((p, i) => (
            <DChair key={'c' + i} x={x + p[0] - 7} y={y + p[1] - 9} z={z + 12}/>
          ))}
        </div>
      ) : (
        <div style={{ position: 'absolute', left: 0, top: 0, transformStyle: 'preserve-3d' }}>
          <DDesk x={x + 20} y={y + d - 66} z={z + 12}/>
          <DDesk x={x + w - 66} y={y + d - 66} z={z + 12}/>
          {/* glass divider between workstations */}
          <DSlab x={x + w / 2 - 2} y={y + d - 74} z={z + 12} w={4} d={62} h={24} rTop={2} top="rgba(214,230,244,0.75)" front="rgba(196,219,240,0.4)" side="rgba(196,219,240,0.32)"/>
        </div>
      )}
      {people.map((p, i) => (
        <DPerson key={i} x={x + p[0]} y={y + p[1]} z={z + 12} shirt={p[2]} hair={p[3]} pose={p[4]}/>
      ))}
    </div>
  );
}

// Holographic data beam: two crossed translucent walls + glow base
function DBeam({ cx, cy, h, active }) {
  const grad = 'linear-gradient(to bottom, rgba(117,227,228,0.06), rgba(117,227,228,' + (active ? 0.7 : 0.42) + '))';
  const sz = 46;
  return (
    <div style={{ position: 'absolute', left: 0, top: 0, transformStyle: 'preserve-3d', pointerEvents: 'none' }}>
      <div className="dist-pulse" style={{ position: 'absolute', left: cx - sz / 2, top: cy, width: sz, height: h, transformOrigin: '0 0', transform: 'translateZ(' + h + 'px) rotateX(-90deg)', background: grad }}></div>
      <div className="dist-pulse" style={{ position: 'absolute', left: cx, top: cy - sz / 2, width: sz, height: h, transformOrigin: '0 0', transform: 'translateZ(' + h + 'px) rotateZ(90deg) rotateX(-90deg)', background: grad }}></div>
      {/* neon core tubes rising through the column */}
      <div className="dist-rise" style={{ position: 'absolute', left: cx - 4, top: cy, width: 8, height: h, transformOrigin: '0 0', transform: 'translateZ(' + h + 'px) rotateX(-90deg)', borderRadius: 4, opacity: active ? 1 : 0.8 }}></div>
      <div className="dist-rise" style={{ position: 'absolute', left: cx, top: cy - 4, width: 8, height: h, transformOrigin: '0 0', transform: 'translateZ(' + h + 'px) rotateZ(90deg) rotateX(-90deg)', borderRadius: 4, opacity: active ? 1 : 0.8 }}></div>
      <div style={{ position: 'absolute', left: cx - 34, top: cy - 34, width: 68, height: 68, borderRadius: '50%', transform: 'translateZ(15px)', background: 'radial-gradient(circle, rgba(117,227,228,' + (active ? 0.6 : 0.42) + ') 0%, transparent 70%)' }}></div>
    </div>
  );
}

// Central data spine: thick neon waterfall descending from a platform to the floor
function DTrunk({ cx, cy, h }) {
  const halo = 'linear-gradient(to bottom, rgba(117,227,228,0.08), rgba(117,227,228,0.5))';
  const hw = 64;
  return (
    <div style={{ position: 'absolute', left: 0, top: 0, transformStyle: 'preserve-3d', pointerEvents: 'none' }}>
      {/* wide holographic curtains */}
      <div className="dist-pulse" style={{ position: 'absolute', left: cx - hw / 2, top: cy, width: hw, height: h, transformOrigin: '0 0', transform: 'translateZ(' + h + 'px) rotateX(-90deg)', background: halo }}></div>
      <div className="dist-pulse" style={{ position: 'absolute', left: cx, top: cy - hw / 2, width: hw, height: h, transformOrigin: '0 0', transform: 'translateZ(' + h + 'px) rotateZ(90deg) rotateX(-90deg)', background: halo }}></div>
      {/* fiber bundle: 3 falling tubes per plane */}
      {[-15, 0, 15].map((o, i) => (
        <div key={'a' + i} className="dist-fall" style={{ position: 'absolute', left: cx - 4.5 + o, top: cy, width: 9, height: h, transformOrigin: '0 0', transform: 'translateZ(' + h + 'px) rotateX(-90deg)', borderRadius: 4.5, animationDelay: (i * -0.45) + 's' }}></div>
      ))}
      {[-15, 0, 15].map((o, i) => (
        <div key={'b' + i} className="dist-fall" style={{ position: 'absolute', left: cx, top: cy - 4.5 + o, width: 9, height: h, transformOrigin: '0 0', transform: 'translateZ(' + h + 'px) rotateZ(90deg) rotateX(-90deg)', borderRadius: 4.5, animationDelay: (i * -0.45 - 0.2) + 's' }}></div>
      ))}
      {/* impact glow on the ground + connector glow at the top */}
      <div className="dist-pulse" style={{ position: 'absolute', left: cx - 52, top: cy - 52, width: 104, height: 104, borderRadius: '50%', transform: 'translateZ(1px)', background: 'radial-gradient(circle, rgba(127,240,241,0.75) 0%, rgba(127,240,241,0.25) 45%, transparent 70%)' }}></div>
      <div style={{ position: 'absolute', left: cx - 26, top: cy - 26, width: 52, height: 52, borderRadius: '50%', transform: 'translateZ(' + (h - 1) + 'px)', background: 'radial-gradient(circle, rgba(174,247,247,0.9) 0%, transparent 70%)' }}></div>
    </div>
  );
}

// Wooden pallet loaded with boxes
function DPallet({ x, y }) {
  return (
    <div style={{ position: 'absolute', left: 0, top: 0, transformStyle: 'preserve-3d' }}>
      {[[0, 2], [0, 34]].map((p, i) => (
        <DSlab key={'b' + i} x={x + p[0]} y={y + p[1]} z={0} w={56} d={5} h={3} top="#a8834f" front="#8f6c3e" side="#7a5a31"/>
      ))}
      {[0, 1, 2, 3].map(i => (
        <DSlab key={'s' + i} x={x + i * 14.5} y={y} z={3} w={10} d={41} h={2.5} top="#c9a26a" front="#b08850" side="#936f3e"/>
      ))}
      <DBox x={x + 4} y={y + 4} z={5.5} s={24} h={18} tone={1}/>
      <DBox x={x + 30} y={y + 10} z={5.5} s={22} h={16} tone={0}/>
      <DBox x={x + 16} y={y + 7} z={23.5} s={20} h={15} tone={2}/>
    </div>
  );
}

function DTruck({ y, badge }) {
  const wh = ['#26314a', '#1a2436', '#131b29'];
  return (
    <div style={{ position: 'absolute', left: 0, top: 0, transformStyle: 'preserve-3d' }}>
      {/* wheels: both sides of the axles (far side peeks under the trailer) */}
      {[[630, 11], [660, 11], [690, 11], [708, 11]].map((wp, i) => (
        <DSlab key={'f' + i} x={wp[0]} y={y + 2} z={0} w={wp[1]} d={wp[1]} h={wp[1]} top={wh[0]} front={wh[1]} side={wh[2]}/>
      ))}
      {[[630, 11], [660, 11], [690, 11], [708, 11]].map((wp, i) => (
        <DSlab key={i} x={wp[0]} y={y + 16} z={0} w={wp[1]} d={wp[1]} h={wp[1]} top={wh[0]} front={wh[1]} side={wh[2]}
          frontChildren={<div style={{ position: 'absolute', left: '28%', top: '28%', width: '44%', height: '44%', borderRadius: '50%', background: '#4a5a78' }}></div>}/>
      ))}
      {/* box trailer — rear against the dock (building side), square edges on the iso grid */}
      <DSlab x={620} y={y} z={10} w={82} d={28} h={34} top="#ffffff" front="#e6ebf4" side="#f4f7fc"
        frontChildren={
          <React.Fragment>
            {/* lateral panel seams + SEWE brand stripe */}
            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(to right, transparent 0 19px, rgba(122,138,165,0.28) 19px 20px)' }}></div>
            <div style={{ position: 'absolute', left: 0, right: 0, bottom: 5, height: 3, background: DIST_C.turq2, opacity: 0.85 }}></div>
            <div style={{ position: 'absolute', top: 8, left: 0, right: 0, display: 'grid', placeItems: 'center', fontFamily: 'Chakra Petch, sans-serif', fontWeight: 700, fontSize: 11, letterSpacing: '0.24em', color: DIST_C.navy700 }}>SEWE</div>
          </React.Fragment>
        }/>
      {/* cab facing the street (truck backed in) */}
      <DSlab x={704} y={y + 1} z={10} w={18} d={26} h={23} rTop={2} top="#3a4d6f" front="#2d3f5e" side="#243554"
        frontChildren={
          <React.Fragment>
            <div style={{ position: 'absolute', top: 3, left: 2, right: 2, height: 8, borderRadius: 2, background: 'rgba(117,227,228,0.8)' }}></div>
            <div style={{ position: 'absolute', bottom: 3, right: 2, width: 4, height: 3, borderRadius: 1, background: '#f7c948' }}></div>
          </React.Fragment>
        }
        sideChildren={
          <React.Fragment>
            {/* nose: grille + headlights */}
            <div style={{ position: 'absolute', left: 3, right: 3, bottom: 4, height: 6, borderRadius: 1.5, background: '#1c2b45', backgroundImage: 'repeating-linear-gradient(to bottom, transparent 0 1.5px, rgba(255,255,255,0.18) 1.5px 2.5px)' }}></div>
            <div style={{ position: 'absolute', bottom: 11, left: 3, width: 4, height: 3, borderRadius: 1, background: '#f7c948', boxShadow: '0 0 4px rgba(247,201,72,0.8)' }}></div>
            <div style={{ position: 'absolute', bottom: 11, right: 3, width: 4, height: 3, borderRadius: 1, background: '#f7c948', boxShadow: '0 0 4px rgba(247,201,72,0.8)' }}></div>
          </React.Fragment>
        }/>
      {badge ? <DBadge x={663} y={y + 13} z={108} kind={badge} shadowZ={45}/> : null}
    </div>
  );
}

function DForklift({ x, y }) {
  const body = ['#f2b45e', '#e09a3b', '#c07f28'];
  const dark = ['#26314a', '#1a2436', '#131b29'];
  return (
    <div style={{ position: 'absolute', left: 0, top: 0, transformStyle: 'preserve-3d' }}>
      {/* floor shadow anchoring the truck */}
      <div style={{ position: 'absolute', left: x - 6, top: y - 8, width: 66, height: 42, borderRadius: '50%', transform: 'translateZ(0.4px)', background: 'radial-gradient(closest-side, rgba(26,40,68,0.22) 0%, rgba(26,40,68,0.08) 60%, transparent 100%)' }}></div>
      {/* wheels */}
      {[[2, -2], [24, -2], [2, 15], [24, 15]].map((p, i) => (
        <DSlab key={i} x={x + p[0]} y={y + p[1] + 4} z={0} w={10} d={10} h={10} top={dark[0]} front={dark[1]} side={dark[2]}
          frontChildren={<div style={{ position: 'absolute', left: '28%', top: '28%', width: '44%', height: '44%', borderRadius: '50%', background: '#4a5a78' }}></div>}/>
      ))}
      {/* chassis + rear counterweight */}
      <DSlab x={x} y={y} z={9} w={34} d={22} h={12} rTop={3} top={body[0]} front={body[1]} side={body[2]}/>
      <DSlab x={x} y={y + 1} z={21} w={10} d={20} h={7} rTop={3} top={body[0]} front={body[1]} side={body[2]}/>
      {/* seat */}
      <DSlab x={x + 13} y={y + 6} z={21} w={9} d={10} h={4} rTop={2} top={dark[0]} front={dark[1]} side={dark[2]}/>
      <DSlab x={x + 11} y={y + 6} z={21} w={3} d={10} h={12} rTop={1.5} top={dark[0]} front={dark[1]} side={dark[2]}/>
      {/* overhead guard: slim rear posts + thin roof over the seat */}
      <DSlab x={x + 9} y={y + 3} z={21} w={2.5} d={2.5} h={21} top="#8593ab" front="#76839a" side="#67748b"/>
      <DSlab x={x + 9} y={y + 17} z={21} w={2.5} d={2.5} h={21} top="#8593ab" front="#76839a" side="#67748b"/>
      <DSlab x={x + 7} y={y + 1} z={42} w={22} d={20} h={2} rTop={2} top={body[0]} front={body[1]} side={body[2]}/>
      {/* front mast rails */}
      <DSlab x={x + 34} y={y + 4} z={0} w={3} d={3} h={36} top="#4a5f85" front="#3a4d6f" side="#2d3f5e"/>
      <DSlab x={x + 34} y={y + 15} z={0} w={3} d={3} h={36} top="#4a5f85" front="#3a4d6f" side="#2d3f5e"/>
      <DSlab x={x + 34} y={y + 4} z={30} w={3} d={14} h={3} top="#4a5f85" front="#3a4d6f" side="#2d3f5e"/>
      {/* forks + palletized box */}
      <DSlab x={x + 37} y={y + 3} z={0} w={15} d={4} h={2.5} top="#9aa7bd" front="#8593ab" side="#76839a"/>
      <DSlab x={x + 37} y={y + 14} z={0} w={15} d={4} h={2.5} top="#9aa7bd" front="#8593ab" side="#76839a"/>
      <DSlab x={x + 37} y={y + 2} z={2.5} w={16} d={17} h={2} top="#c9a26a" front="#b08850" side="#936f3e"/>
      <DBox x={x + 37} y={y + 2} z={4.5} s={16} h={13} tone={1}/>
    </div>
  );
}

function DistribuidorScene() {
  const [hover, setHover] = React.useState(null);
  const wrapRef = React.useRef(null);
  const [scale, setScale] = React.useState(0);

  React.useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const upd = () => setScale(el.clientWidth / 900);
    upd();
    const ro = new ResizeObserver(upd);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Perf: pausa todas as animações quando a cena sai da viewport
  const [paused, setPaused] = React.useState(false);
  React.useEffect(() => {
    const el = wrapRef.current;
    if (!el || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(
      (entries) => setPaused(!entries[0].isIntersecting),
      { rootMargin: '120px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const yy = el.getBoundingClientRect().top + window.pageYOffset - 72;
    window.scrollTo({ top: yy, behavior: 'smooth' });
  };
  const goSuite = (key) => {
    window.dispatchEvent(new CustomEvent('sewe:suite', { detail: key }));
    scrollToId('suites');
  };

  const platforms = [
    { key: 'estrategica', x: 60,  y: 60,  w: 185, d: 145, z: 140, kind: 'boardroom', screen: 'kpi',
      people: [[34, 94, DIST_C.navy700, '#3d3128', 'sit'], [152, 94, DIST_C.turq2, '#1f1a14', 'point'], [72, 130, '#586580', '#4a3826', 'point'], [110, 130, DIST_C.navy700, '#241d15', 'sit']] },
    { key: 'suprimentos', x: 55,  y: 330, w: 160, d: 145, z: 100, screen: 'stock',
      people: [[43, 110, DIST_C.navy700, '#241d15', 'sit'], [82, 124, '#586580', '#3d3128', 'clipboard']] },
    { key: 'comercial',   x: 330, y: 55,  w: 160, d: 145, z: 100, screen: 'funnel',
      people: [[117, 110, DIST_C.navy700, '#171310', 'sit'], [80, 124, DIST_C.turq2, '#3d3128', 'phone']] },
    { key: 'financeiro',  x: 245, y: 250, w: 150, d: 130, z: 55, screen: 'cashflow',
      people: [[43, 96, DIST_C.navy700, '#3d3128', 'sit'], [107, 96, '#586580', '#241d15', 'sit']] },
  ];

  // Pills on the outer margins; ax/ay = anchor point (%) on the matching floor.
  const pills = [
    { key: 'estrategica', label: 'Gestão Estratégica', icon: 'target',   l: 12, t: 12, ax: 48,   ay: 12.5 },
    { key: 'suprimentos', label: 'Suprimentos',        icon: 'boxes',    l: 12, t: 42, ax: 30,   ay: 32 },
    { key: 'comercial',   label: 'Comercial',          icon: 'trending', l: 88, t: 18, ax: 72,   ay: 30 },
    { key: 'financeiro',  label: 'Financeiro',         icon: 'dollar',   l: 76, t: 43, ax: 51.5, ay: 44 },
  ];
  const salesLeader = { key: 'sales', l: 44, t: 90, ax: 8, ay: 67 };

  const suiteMsgs = {
    estrategica: 'Consolidando filiais · margem, ruptura e positivação em uma só tela',
    suprimentos: 'Previsão de demanda e alerta de ruptura antes da falta na gôndola',
    comercial: 'Funil, metas e positivação por vendedor — em tempo real',
    financeiro: 'Entradas × saídas × caixa projetado, direto do ERP',
    sales: 'Pedido fechado no PDV do cliente cai na hora no CD',
  };

  return (
    <div className={'dist-scene' + (paused ? ' dist-paused' : '')} ref={wrapRef}>
      <div className="dist-stage" aria-hidden style={{ transform: 'scale(' + (scale || 0.001) + ')', opacity: scale ? 1 : 0 }}>
        <div className="dist-plane">
          {/* projected shadow: contact occlusion rim + soft ambient spread, in-plane so it follows the isometric tilt */}
          <div style={{ position: 'absolute', left: -14, top: -14, width: 700, height: 700, borderRadius: 70, transform: 'translateZ(-15.5px)', background: 'radial-gradient(closest-side, rgba(26,40,68,0.26) 42%, rgba(26,40,68,0.10) 70%, transparent 100%)', pointerEvents: 'none' }}></div>
          <div style={{ position: 'absolute', left: -9, top: -9, width: 638, height: 638, borderRadius: 34, transform: 'translateZ(-14.8px)', background: 'rgba(26,40,68,0.30)', boxShadow: '0 0 9px 9px rgba(26,40,68,0.30)', pointerEvents: 'none' }}></div>
          {/* ground plate: sunk so its TOP face sits at z=0 — objects placed at z=0 stand ON the floor instead of inside it */}
          <DSlab x={0} y={0} z={-14} w={620} d={620} h={14} rTop={24}
            top="#eaeff7" front="#c9d4e6" side="#b9c6db"
            topChildren={
              <div style={{ position: 'absolute', inset: 0 }}>
                <div style={{ position: 'absolute', inset: 0, opacity: 0.5, backgroundImage: 'linear-gradient(#dfe6f1 1px, transparent 1px), linear-gradient(90deg, #dfe6f1 1px, transparent 1px)', backgroundSize: '52px 52px' }}></div>
                <div style={{ position: 'absolute', left: 30, top: 420, width: 380, height: 170, borderRadius: 12, background: 'rgba(45,67,108,0.05)', border: '1px dashed rgba(45,67,108,0.15)' }}></div>
              </div>
            }/>

          {/* glass walls on the two back edges */}
          <div style={{ position: 'absolute', left: 0, top: 0, width: 620, height: 165, transformOrigin: '0 0', transform: 'translateZ(165px) rotateX(-90deg)', background: 'linear-gradient(to bottom, rgba(196,219,240,0.10), rgba(196,219,240,0.40))', boxShadow: 'inset 0 0 0 1px rgba(160,190,220,0.4)', pointerEvents: 'none' }}></div>
          <div style={{ position: 'absolute', left: 0, top: 0, width: 620, height: 165, transformOrigin: '0 0', transform: 'translateZ(165px) rotateZ(90deg) rotateX(-90deg)', background: 'linear-gradient(to bottom, rgba(196,219,240,0.10), rgba(196,219,240,0.40))', boxShadow: 'inset 0 0 0 1px rgba(160,190,220,0.4)', pointerEvents: 'none' }}></div>
          <DSlab x={-6} y={-6} z={0} w={12} d={12} h={172} top="#c3cede" front="#b0bed4" side="#a2b2ca"/>

          {/* ── DATA WATERFALL ── aerial branches entering each floor, straight to the back of the sc­reens */}
          {[
            { z: 152.8, id: 'L0', paths: ['M152 128 C 151 112, 150 96, 150 80'], nodes: [[150, 80]] },
            { z: 112.8, id: 'L1', paths: ['M152 132 C 230 122, 330 108, 408 76', 'M152 132 C 147 205, 140 285, 137 352'], nodes: [[408, 76], [137, 352]] },
            { z: 67.8,  id: 'L2', paths: ['M152 132 C 205 185, 255 230, 318 266'], nodes: [[318, 266]] },
            { z: 1.8,   id: 'L3', paths: [
              'M152 132 C 200 250, 250 368, 332 456 C 400 470, 470 472, 543 462',
              'M152 132 C 214 262, 268 392, 348 470 C 414 484, 482 484, 549 474',
              'M152 132 C 188 240, 228 344, 312 436 C 392 452, 466 452, 538 448',
              'M152 132 C 226 272, 292 404, 388 482 C 446 494, 506 496, 558 488',
            ], nodes: [[543, 462], [549, 474], [538, 448], [558, 488]] },
          ].map(layer => (
            <svg key={layer.id} viewBox="0 0 620 620" style={{ position: 'absolute', left: 0, top: 0, width: 620, height: 620, transform: 'translateZ(' + layer.z + 'px)', pointerEvents: 'none', overflow: 'visible' }}>
              <defs>
                <filter id={'distNeon' + layer.id} x="-60%" y="-60%" width="220%" height="220%">
                  <feGaussianBlur stdDeviation="4" result="b"></feGaussianBlur>
                  <feMerge><feMergeNode in="b"></feMergeNode><feMergeNode in="SourceGraphic"></feMergeNode></feMerge>
                </filter>
              </defs>
              <g fill="none" strokeLinecap="round">
                {layer.paths.map((p, i) => (
                  <g key={i}>
                    <path d={p} stroke="rgba(63,201,203,0.20)" strokeWidth="18"></path>
                    <path d={p} stroke="rgba(117,227,228,0.5)" strokeWidth="9" filter={'url(#distNeon' + layer.id + ')'}></path>
                    <path d={p} stroke="#9df4f5" strokeWidth="3.5" filter={'url(#distNeon' + layer.id + ')'}></path>
                    <path d={p} stroke="#ffffff" strokeWidth="4" strokeDasharray="20 142" className="dist-flow" style={{ animationDelay: (i * -1.6) + 's' }} filter={'url(#distNeon' + layer.id + ')'}></path>
                  </g>
                ))}
                {layer.nodes.map((n, i) => (
                  <g key={'n' + i}>
                    <circle cx={n[0]} cy={n[1]} r="12" fill="rgba(127,240,241,0.35)" filter={'url(#distNeon' + layer.id + ')'}></circle>
                    <circle cx={n[0]} cy={n[1]} r="6" fill="#aef7f7" stroke="#fff" strokeWidth="2" filter={'url(#distNeon' + layer.id + ')'}></circle>
                  </g>
                ))}
              </g>
            </svg>
          ))}

          {/* central data waterfall under Estratégica */}
          <DTrunk cx={152.5} cy={132.5} h={140}/>

          {/* escada: chão de fábrica → Financeiro (blocos sólidos) */}
          {[0, 1, 2, 3, 4, 5].map(i => (
            <DSlab key={'stA' + i} x={195 + i * 8.4} y={296} z={0} w={8.4} d={26} h={(i + 1) * 9.2}
              top="#dde4ef" front="#bcc8dc" side="#9fb0ca"/>
          ))}

          {/* estoque ocupando a parte de baixo dos mezaninos */}
          <DRack x={70} y={72}/>
          <DRack x={55} y={368}/>

          {/* paletes espalhados pelos vãos vazios + equipe extra */}
          <DPallet x={368} y={118}/>
          <DForklift x={428} y={148}/>
          <DPerson x={412} y={185} shirt="#e09a3b" hair="#241d15"/>
          <DPallet x={298} y={358}/>
          <DPerson x={352} y={390} shirt={DIST_C.navy700} hair="#3d3128" pose="clipboard"/>
          <DPallet x={64} y={243}/>

          {/* recepção dentro da laje, canto dos fundos junto às docas */}
          <div style={{ position: 'absolute', left: 0, top: 0, transformStyle: 'preserve-3d' }}>
            {/* parede da recepção voltada para o fundo do distribuidor */}
            <DSlab x={480} y={130} z={0} w={130} d={5} h={55} top="#e4eaf4" front="#eef2f8" side="#dfe6f2"
              frontChildren={
                <React.Fragment>
                  <div style={{ position: 'absolute', left: 18, top: 12, width: 24, height: 16, background: '#fff', border: '2px solid #8a99b5', boxSizing: 'border-box' }}>
                    <div style={{ position: 'absolute', inset: 2, background: 'linear-gradient(135deg, #7ff0f1 0 40%, #2d436c 40%)' }}></div>
                  </div>
                  <div style={{ position: 'absolute', right: 14, bottom: 0, width: 20, height: 34, borderRadius: '3px 3px 0 0', background: '#31405c', boxShadow: 'inset 0 0 0 2px #26314a' }}>
                    <div style={{ position: 'absolute', left: 3, top: 15, width: 3, height: 3, borderRadius: '50%', background: '#c9d4e6' }}></div>
                  </div>
                  <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 3, background: 'rgba(122,138,165,0.3)' }}></div>
                </React.Fragment>
              }/>
            {/* faixa de vidro seguindo ao lado da plataforma dos caminhões até a doca */}
            <DSlab x={604} y={140} z={0} w={4} d={100} h={55} top="rgba(214,230,244,0.75)" front="rgba(196,219,240,0.38)" side="rgba(196,219,240,0.3)"/>
            {/* balcão + recepcionista */}
            {/* balcão na mesma orientação dos caminhões */}
            <DSlab x={515} y={50} z={0} w={42} d={13} h={15} rTop={3} top="#eef3fa" front="#cfd9ea" side="#bfcbdf"
              topChildren={<div style={{ position: 'absolute', inset: 1.5, borderRadius: 2, border: '1px solid rgba(122,138,165,0.35)', boxSizing: 'border-box' }}></div>}/>
            <DChair x={529} y={26} z={0}/>
            <DPerson x={536} y={43} shirt={DIST_C.turq2} hair="#3d3128" pose="sit"/>
            {/* sofá encostado na parede de vidro existente do distribuidor */}
            <DSlab x={560} y={3} z={0} w={34} d={5} h={19} rTop={3} top="#3a4d6f" front="#2d3f5e" side="#243554"/>
            <DSlab x={560} y={7} z={0} w={34} d={12} h={9} rTop={3} top="#4a5f85" front="#3a4d6f" side="#2d3f5e"/>
            <DSlab x={557} y={5} z={0} w={4} d={14} h={13} rTop={2} top="#3a4d6f" front="#2d3f5e" side="#243554"/>
            <DSlab x={593} y={5} z={0} w={4} d={14} h={13} rTop={2} top="#3a4d6f" front="#2d3f5e" side="#243554"/>
            {/* plantinha ao lado do sofá */}
            <DSlab x={599} y={8} z={0} w={9} d={9} h={8} rTop={2} top="#d4a373" front="#c08a5a" side="#a06f42"/>
            <DBill x={603.5} y={16} z={8} w={22} h={22}>
              <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                <div style={{ position: 'absolute', left: 6, bottom: 8, width: 10, height: 14, borderRadius: '50% 50% 40% 40%', background: '#2e9e5b' }}></div>
                <div style={{ position: 'absolute', left: 1, bottom: 4, width: 9, height: 11, borderRadius: '50% 50% 40% 40%', background: '#27ae60', transform: 'rotate(-24deg)' }}></div>
                <div style={{ position: 'absolute', right: 1, bottom: 4, width: 9, height: 11, borderRadius: '50% 50% 40% 40%', background: '#1f8a4c', transform: 'rotate(24deg)' }}></div>
              </div>
            </DBill>
          </div>

          {/* esteira extra passando por baixo do Financeiro até as docas */}
          <DSlab x={252} y={318} z={0} w={338} d={30} h={16} rTop={8}
            top="#223558" front="#1a2844" side="#141c2a"
            topChildren={<div className="dist-belt-anim" style={{ position: 'absolute', inset: 3, borderRadius: 6 }}></div>}/>
          {[0, 1].map(i => (
            <div key={'fb' + i} style={{ position: 'absolute', left: 258, top: 322, transformStyle: 'preserve-3d', transform: 'translateZ(16px)' }}>
              <div className="dist-mover-b" style={{ transformStyle: 'preserve-3d', animationDelay: (i * -3.2) + 's' }}>
                <DBox x={0} y={0} z={0} s={22} h={16} tone={i + 1}/>
              </div>
            </div>
          ))}

          {/* office platforms */}
          {platforms.map(p => (
            <DPlatform key={p.key} x={p.x} y={p.y} w={p.w} d={p.d} z={p.z} active={hover === p.key} kind={p.kind} screen={p.screen} room={p.room} people={p.people}/>
          ))}

          {/* light burst crowning Gestão Estratégica */}
          <div className="dist-pulse" style={{ position: 'absolute', left: 62, top: 42, width: 180, height: 180, borderRadius: '50%', transform: 'translateZ(153px)', background: 'radial-gradient(circle, rgba(127,240,241,0.45) 0%, rgba(127,240,241,0.14) 45%, transparent 70%)', pointerEvents: 'none' }}></div>

          {/* warehouse racks (front-left) */}
          <DRack x={110} y={470}/>
          <DRack x={150} y={545}/>
          {/* warehouse workers + forklift */}
          <DPerson x={100} y={505} shirt={DIST_C.turq2} hair="#241d15" pose="clipboard"/>
          <DPerson x={300} y={575} shirt="#e09a3b" hair="#3d3128"/>
          <DForklift x={390} y={562}/>
          {/* alerta de estoque sobre o operador da esteira */}
          <DBadge x={385} y={528} z={84} kind="warn" shadowZ={0}/>
          {/* loose stock on a wooden pallet near the forklift */}
          {[[292, 506], [292, 538]].map((p, i) => (
            <DSlab key={'pb' + i} x={p[0]} y={p[1]} z={0} w={56} d={5} h={3} top="#a8834f" front="#8f6c3e" side="#7a5a31"/>
          ))}
          {[0, 1, 2, 3].map(i => (
            <DSlab key={'ps' + i} x={292 + i * 14.5} y={504} z={3} w={10} d={41} h={2.5} top="#c9a26a" front="#b08850" side="#936f3e"/>
          ))}
          <DBox x={296} y={508} z={5.5} s={24} h={18} tone={1}/>
          <DBox x={322} y={514} z={5.5} s={22} h={16} tone={0}/>
          <DBox x={308} y={511} z={23.5} s={20} h={15} tone={2}/>

          {/* conveyor to the dock */}
          <DSlab x={330} y={462} z={0} w={252} d={30} h={16} rTop={8}
            top="#223558" front="#1a2844" side="#141c2a"
            topChildren={<div className="dist-belt-anim" style={{ position: 'absolute', inset: 3, borderRadius: 6 }}></div>}/>
          {[0, 1].map(i => (
            <div key={i} style={{ position: 'absolute', left: 336, top: 466, transformStyle: 'preserve-3d', transform: 'translateZ(16px)' }}>
              <div className="dist-mover" style={{ transformStyle: 'preserve-3d', animationDelay: (i * -3) + 's' }}>
                <DBox x={0} y={0} z={0} s={22} h={16} tone={i}/>
              </div>
            </div>
          ))}
          <DPerson x={385} y={528} shirt={DIST_C.navy700} hair="#171310"/>
          <DBadge x={445} y={468} z={48} kind="ok" shadowZ={17}/>
          <DForklift x={435} y={508}/>

          {/* dock: fachada aberta — só o pórtico com letreiro e portas, sem bloco fechado */}
          <DSlab x={594} y={240} z={0} w={18} d={230} h={96} rTop={4}
            top="#f2f6fb" front="#e3e9f3" side="#fbfcfe"
            sideChildren={
              <div style={{ width: '100%', height: '100%', position: 'relative', boxSizing: 'border-box' }}>
                <div style={{ position: 'absolute', left: 0, right: 0, top: 8, height: 26, background: 'linear-gradient(90deg, ' + DIST_C.navy900 + ', ' + DIST_C.navy700 + ')', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, borderTop: '2px solid ' + DIST_C.turq2, borderBottom: '2px solid ' + DIST_C.turq2 }}>
                  <span style={{ fontFamily: 'Chakra Petch, sans-serif', fontWeight: 700, fontSize: 12, letterSpacing: '0.22em', color: '#fff' }}>S | SEWE GROUP</span>
                </div>
                <div style={{ position: 'absolute', left: 14, right: 14, bottom: 0, display: 'flex', justifyContent: 'space-between' }}>
                  {[0, 1, 2].map(i => {
                    const open = i !== 1;
                    return (
                      <div key={i} style={{ width: 52, height: 46, position: 'relative', overflow: 'hidden', borderRadius: '5px 5px 0 0', background: open ? '#101a2e' : '#31405c', backgroundImage: open ? 'none' : 'repeating-linear-gradient(to bottom, transparent 0 7px, rgba(255,255,255,0.09) 7px 9px)', boxShadow: open ? 'inset 0 5px 10px rgba(0,0,0,0.55)' : 'none' }}>
                        {open ? (
                          <React.Fragment>
                            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 13, background: '#31405c', backgroundImage: 'repeating-linear-gradient(to bottom, transparent 0 3px, rgba(255,255,255,0.12) 3px 5px)', borderBottom: '2px solid #4a5f85' }}></div>
                            <div style={{ position: 'absolute', bottom: 4, left: 8, width: 14, height: 12, background: '#c08a5a', borderRadius: 1 }}></div>
                            <div style={{ position: 'absolute', bottom: 4, left: 26, width: 12, height: 10, background: '#d4a373', borderRadius: 1 }}></div>
                          </React.Fragment>
                        ) : null}
                      </div>
                    );
                  })}
                </div>
              </div>
            }/>

          {/* street apron + trucks (trucks lifted onto the apron top) */}
          <DSlab x={614} y={225} z={0} w={126} d={250} h={5} rTop={6} top="#dde3ee" front="#c2cee0" side="#b3c0d5"/>
          <div style={{ position: 'absolute', left: 0, top: 0, transformStyle: 'preserve-3d', transform: 'translateZ(5px)' }}>
            <DTruck y={252} badge="ok"/>
            <DTruck y={345} badge="risk"/>
            <DTruck y={430}/>
          </div>

          {/* cliente do distribuidor: lojinha fora do CD + vendedor externo (Sewe Sales) */}
          <div style={{ position: 'absolute', left: 0, top: 0, transformStyle: 'preserve-3d', transform: 'translate3d(-40px, 200px, 0)' }}>
            <div style={{ position: 'absolute', left: 226, top: 616, width: 138, height: 118, borderRadius: 24, transform: 'translateZ(-7.5px)', background: 'rgba(26,40,68,0.22)', filter: 'blur(9px)' }}></div>
            {/* calçada da loja */}
            <DSlab x={235} y={625} z={-6} w={120} d={100} h={6} rTop={14} top="#e6ecf5" front="#c9d4e6" side="#b9c6db"/>
            {/* prédio da lojinha */}
            <DSlab x={255} y={635} z={0} w={80} d={45} h={38} top="#f6f9fd" front="#eef3fa" side="#dfe6f2"
              frontChildren={
                <React.Fragment>
                  <div style={{ position: 'absolute', top: 6, left: 3, right: 3, height: 9, borderRadius: '3px 3px 4px 4px', background: 'repeating-linear-gradient(90deg, ' + DIST_C.turq2 + ' 0 9px, #ffffff 9px 18px)', boxShadow: '0 1px 2px rgba(26,40,68,0.25)' }}></div>
                  <div style={{ position: 'absolute', bottom: 0, left: 10, width: 16, height: 18, borderRadius: '3px 3px 0 0', background: '#31405c' }}></div>
                  <div style={{ position: 'absolute', bottom: 5, left: 34, right: 8, height: 14, borderRadius: 2, background: 'linear-gradient(180deg, #cfe3f2, #a9c6de)', border: '1px solid #b9c6db', boxSizing: 'border-box' }}>
                    <div style={{ position: 'absolute', bottom: 2, left: 3, width: 6, height: 6, background: '#d4a373', borderRadius: 1 }}></div>
                    <div style={{ position: 'absolute', bottom: 2, left: 11, width: 5, height: 5, background: '#c08a5a', borderRadius: 1 }}></div>
                  </div>
                </React.Fragment>
              }/>
            {/* laje de cobertura */}
            <DSlab x={251} y={631} z={38} w={88} d={53} h={3} rTop={3} top="#dde5f1" front="#c3cfe3" side="#b0bed4"/>
            {/* dono da loja + vendedor externo fechando pedido */}
            <DPerson x={288} y={702} shirt="#586580" hair="#241d15"/>
            <DPerson x={314} y={708} shirt={DIST_C.turq2} hair="#3d3128" pose="clipboard"/>
            {/* venda fechada: dinheiro no ar */}
            <DBadge x={301} y={705} z={84} kind="money" shadowZ={0}/>
            {/* etiqueta discreta */}
            <DBill x={378} y={758} z={0} w={130} h={14}>
              <div style={{ width: '100%', textAlign: 'center', fontFamily: "'Chakra Petch', 'Inter', sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#44536f', whiteSpace: 'nowrap' }}>Cliente Distribuidor</div>
            </DBill>
          </div>
        </div>
      </div>

      {/* leader lines: pill → glowing dot on the matching floor */}
      <svg className="dist-leaders" viewBox="0 0 900 660" preserveAspectRatio="none" aria-hidden="true">
        {[...pills, salesLeader].map(p => {
          const x1 = p.l * 9, y1 = p.t * 6.6, x2 = p.ax * 9, y2 = p.ay * 6.6;
          const on = hover === p.key;
          return (
            <g key={p.key}>
              <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={on ? 'rgba(63,201,203,0.9)' : 'rgba(63,201,203,0.4)'} strokeWidth={on ? 2 : 1.25}></line>
              {/* glow node: energy plug where the suite docks into the floor */}
              <circle cx={x2} cy={y2} r="13" fill="rgba(63,201,203,0.16)"></circle>
              <circle cx={x2} cy={y2} r="10" fill="none" stroke="rgba(117,227,228,0.85)" strokeWidth="1.5" className="dist-dot-ping"></circle>
              <circle cx={x2} cy={y2} r="5.5" fill="#3fc9cb" style={{ filter: 'drop-shadow(0 0 4px rgba(63,201,203,1)) drop-shadow(0 0 10px rgba(63,201,203,0.7))' }}></circle>
              <circle cx={x2} cy={y2} r="2.2" fill="#eafffe"></circle>
            </g>
          );
        })}
      </svg>

      {/* clickable product pills (screen space) */}
      {pills.map(p => (
        <button key={p.key} onClick={() => goSuite(p.key)}
          onMouseEnter={() => setHover(p.key)} onMouseLeave={() => setHover(null)}
          onFocus={() => setHover(p.key)} onBlur={() => setHover(null)}
          className="dist-pill" style={{ left: p.l + '%', top: p.t + '%' }}
          aria-label={'Ver suíte ' + p.label}>
          <span className="dist-pill-ic"><Icon name={p.icon} size={13} stroke={2}></Icon></span>
          <span className="dist-pill-lb">{p.label}</span>
          <span className="dist-pill-plus"><Icon name="plus" size={14} stroke={2.2}></Icon></span>
        </button>
      ))}
      <button onClick={() => scrollToId('sales')}
        onMouseEnter={() => setHover('sales')} onMouseLeave={() => setHover(null)}
        onFocus={() => setHover('sales')} onBlur={() => setHover(null)}
        className="dist-pill" style={{ left: salesLeader.l + '%', top: salesLeader.t + '%' }} aria-label="Ver Sewe Sales">
        <span className="dist-pill-ic"><Icon name="store" size={13} stroke={2}></Icon></span>
        <span className="dist-pill-lb">Sewe Sales</span>
        <span className="dist-pill-plus"><Icon name="plus" size={14} stroke={2.2}></Icon></span>
      </button>

      {/* linha de mensagem do segmento (hover nas suítes) */}
      <div className="dist-msgline" aria-live="polite">
        <span className="dist-msg-chev">›</span>
        <span className="dist-msg-txt" style={{ opacity: hover && suiteMsgs[hover] ? 1 : 0.45 }}>
          {hover && suiteMsgs[hover] ? suiteMsgs[hover] : 'Passe o mouse sobre uma suíte para ver o que ela faz'}
        </span>
        <span className="dist-msg-cursor"></span>
      </div>

      <style>{`
        .dist-scene {
          position: relative;
          width: 100%;
          aspect-ratio: 900 / 660;
        }
        .dist-stage {
          position: absolute; left: 0; top: 0;
          width: 900px; height: 660px;
          transform-origin: 0 0;
        }
        .dist-plane {
          position: absolute; left: 140px; top: 10px;
          width: 620px; height: 620px;
          transform-style: preserve-3d;
          transform: rotateX(57deg) rotateZ(45deg);
        }
        .dist-leaders {
          position: absolute; inset: 0; width: 100%; height: 100%;
          z-index: 3; pointer-events: none; overflow: visible;
        }
        .dist-dot-ping {
          transform-origin: center; transform-box: fill-box;
          animation: distPing 2.4s ease-out infinite;
        }
        @keyframes distPing {
          0% { transform: scale(0.45); opacity: 0.85; }
          70% { transform: scale(2.1); opacity: 0; }
          100% { transform: scale(2.1); opacity: 0; }
        }
        .dist-msgline {
          position: absolute; left: 50%; bottom: -9%; transform: translateX(-50%);
          display: flex; align-items: center; gap: 8px; max-width: 92%;
          padding: 9px 18px; border-radius: 999px;
          background: rgba(255,255,255,0.85); border: 1px solid rgba(63,201,203,0.35);
          box-shadow: 0 6px 18px rgba(26,40,68,0.08);
          font-family: 'JetBrains Mono', monospace; font-size: 12.5px; letter-spacing: 0.02em;
          color: var(--navy-900); white-space: nowrap; overflow: hidden;
          pointer-events: none; z-index: 4;
        }
        .dist-msg-chev { color: var(--turquoise-2); font-weight: 700; flex-shrink: 0; }
        .dist-msg-txt { transition: opacity 0.25s ease; overflow: hidden; text-overflow: ellipsis; }
        .dist-msg-cursor {
          width: 7px; height: 14px; background: var(--turquoise-2); flex-shrink: 0;
          animation: distBlink 1.1s steps(1) infinite;
        }
        .dist-pill {
          position: absolute;
          transform: translate(-50%, -50%);
          display: inline-flex; align-items: center; gap: 10px;
          padding: 8px 8px 8px 18px;
          background: rgba(255,255,255,0.72);
          -webkit-backdrop-filter: blur(10px) saturate(1.3);
          backdrop-filter: blur(10px) saturate(1.3);
          border: 1px solid rgba(26,40,68,0.08);
          border-radius: 999px;
          box-shadow: 0 8px 24px rgba(26,40,68,0.10), inset 0 1px 0 rgba(255,255,255,0.9);
          cursor: pointer;
          font-family: 'Chakra Petch', sans-serif;
          font-weight: 600;
          white-space: nowrap;
          z-index: 5;
          transition: transform .25s ease, box-shadow .25s ease, border-color .25s ease, background .25s ease;
        }
        .dist-pill:hover, .dist-pill:focus-visible {
          transform: translate(-50%, calc(-50% - 4px));
          background: rgba(255,255,255,0.92);
          border-color: rgba(63,201,203,0.55);
          box-shadow: 0 0 0 6px rgba(117,227,228,0.18), 0 14px 30px rgba(63,201,203,0.25);
        }
        .dist-pill-ic {
          width: 26px; height: 26px; border-radius: 50%;
          background: rgba(117,227,228,0.25); color: var(--turquoise-ink);
          display: grid; place-items: center; flex-shrink: 0;
        }
        .dist-pill-lb { font-size: 13px; color: var(--navy-900); letter-spacing: 0.01em; }
        .dist-pill-plus {
          width: 26px; height: 26px; border-radius: 50%;
          background: var(--turquoise); color: var(--navy-900);
          display: grid; place-items: center; flex-shrink: 0;
          transition: background .2s ease;
        }
        .dist-pill:hover .dist-pill-plus { background: var(--turquoise-2); }
        .dist-belt-anim { overflow: hidden; }
        .dist-belt-anim::before {
          content: ''; position: absolute; top: 0; bottom: 0; left: -22px; right: 0;
          background: repeating-linear-gradient(90deg, transparent 0 14px, rgba(117,227,228,0.4) 14px 22px);
          animation: distBeltMove 1.6s linear infinite;
        }
        @keyframes distBeltMove { to { transform: translateX(22px); } }
        .dist-mover { animation: distConvey 6s linear infinite; }
        .dist-mover-b { animation: distConveyB 6.5s linear infinite; }
        @keyframes distConveyB {
          0% { transform: translateX(0) scale(0); }
          6% { transform: translateX(16px) scale(1); }
          90% { transform: translateX(300px) scale(1); }
          100% { transform: translateX(322px) scale(0); }
        }
        /* no opacity here: opacity < 1 flattens preserve-3d and turns the boxes 2D */
        @keyframes distConvey {
          0% { transform: translateX(0) scale(0); }
          8% { transform: translateX(14px) scale(1); }
          90% { transform: translateX(220px) scale(1); }
          100% { transform: translateX(240px) scale(0); }
        }
        .dist-pulse { animation: distPulse 3.2s ease-in-out infinite; }
        @keyframes distPulse {
          0%, 100% { opacity: 0.65; }
          50% { opacity: 1; }
        }
        .dist-blink { animation: distBlink 2.2s steps(1) infinite; }
        @keyframes distBlink { 50% { opacity: 0.2; } }
        .dist-flow { animation: distFlow 5.4s linear infinite; }
        @keyframes distFlow { to { stroke-dashoffset: -486; } }
        .dist-rise {
          overflow: hidden;
          box-shadow: 0 0 14px rgba(117,227,228,0.75);
        }
        .dist-rise::before {
          content: ''; position: absolute; left: 0; right: 0; top: 0; bottom: -32px;
          background: repeating-linear-gradient(to top, rgba(127,240,241,0.16) 0 9px, rgba(127,240,241,0.95) 9px 16px);
          animation: distRise 1.4s linear infinite;
          animation-delay: inherit;
        }
        @keyframes distRise { to { transform: translateY(-32px); } }
        .dist-fall {
          overflow: hidden;
          box-shadow: 0 0 18px rgba(117,227,228,0.9), 0 0 34px rgba(117,227,228,0.4);
        }
        .dist-fall::before {
          content: ''; position: absolute; left: 0; right: 0; top: -28px; bottom: 0;
          background: repeating-linear-gradient(to bottom, rgba(127,240,241,0.18) 0 10px, rgba(174,247,247,1) 10px 18px);
          animation: distFall 1.1s linear infinite;
          animation-delay: inherit;
        }
        @keyframes distFall { to { transform: translateY(28px); } }
        .dist-bob { animation: distBob 3s ease-in-out infinite; }
        @keyframes distBob {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        .dist-bob-z { animation: distBobZ 3s ease-in-out infinite; transform-style: preserve-3d; }
        @keyframes distBobZ {
          0%, 100% { transform: translateZ(0); }
          50% { transform: translateZ(7px); }
        }
        .dist-paused *, .dist-paused *::before, .dist-paused *::after {
          animation-play-state: paused !important;
        }
        @media (prefers-reduced-motion: reduce) {
          .dist-belt-anim, .dist-belt-anim::before, .dist-mover, .dist-mover-b, .dist-pulse, .dist-blink, .dist-flow, .dist-bob, .dist-bob-z, .dist-rise, .dist-rise::before, .dist-fall, .dist-fall::before, .dist-dot-ping { animation: none; }
        }
        @media (max-width: 640px) {
          .dist-pill-lb { font-size: 11px; }
          .dist-pill-ic { display: none; }
        }
      `}</style>
    </div>
  );
}

Object.assign(window, { DistribuidorScene });
