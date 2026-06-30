// Brand primitives: Logo, icon set, common UI atoms
// Keep lean — reused everywhere.

function SeweLogo({ size = 32, mono = false, light = false }) {
  const fg = light ? '#ffffff' : '#0b1220';
  // The S mark — angular, military-style, based on the SEWE logo reference
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
      <svg width={size} height={size} viewBox="0 0 40 40" aria-label="SEWE Group">
        <rect x="0" y="0" width="40" height="40" rx="4" fill={light ? 'rgba(255,255,255,0.06)' : '#ffffff'} stroke={light ? 'rgba(255,255,255,0.18)' : '#1a2030'} strokeWidth="1.25"/>
        {/* angular S */}
        <path
          d="M28 11 L15 11 L11 15 L11 19 L15 23 L25 23 L29 27 L29 29 L25 33 L12 33 M28 11 L28 14 M29 29 L29 33"
          fill="none"
          stroke={fg}
          strokeWidth="3.6"
          strokeLinejoin="miter"
          strokeLinecap="square"
        />
      </svg>
      {!mono && (
        <div style={{ fontFamily: 'Chakra Petch, sans-serif', fontWeight: 700, letterSpacing: '0.06em', fontSize: 14, color: light ? '#fff' : '#0b1220', lineHeight: 1 }}>
          SEWE
          <div style={{ fontSize: 9, letterSpacing: '0.2em', opacity: 0.65, marginTop: 2, fontWeight: 500 }}>GROUP</div>
        </div>
      )}
    </div>
  );
}

// Minimal icon set (lucide-inspired, inline SVG)
const Icon = ({ name, size = 18, stroke = 1.75, className = '', style = {} }) => {
  const common = {
    width: size, height: size, viewBox: '0 0 24 24',
    fill: 'none', stroke: 'currentColor', strokeWidth: stroke,
    strokeLinecap: 'round', strokeLinejoin: 'round',
    className, style,
  };
  const paths = {
    arrow:       <path d="M5 12h14M13 5l7 7-7 7"/>,
    arrowDown:   <path d="M12 5v14M5 13l7 7 7-7"/>,
    check:       <path d="M20 6 9 17l-5-5"/>,
    plus:        <path d="M12 5v14M5 12h14"/>,
    minus:       <path d="M5 12h14"/>,
    boxes:       <g><path d="M3 7 12 3l9 4M3 7v10l9 4 9-4V7M3 7l9 4 9-4M12 11v10"/></g>,
    trending:    <g><path d="M3 17 9 11l4 4 8-8"/><path d="M14 7h7v7"/></g>,
    dollar:      <g><path d="M12 2v20M17 6H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></g>,
    pie:         <g><path d="M21 12A9 9 0 1 1 12 3v9h9z"/></g>,
    shield:      <path d="M12 3 4 6v6c0 5 3.5 8.5 8 9 4.5-.5 8-4 8-9V6l-8-3z"/>,
    clock:       <g><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></g>,
    zap:         <path d="M13 2 3 14h7l-1 8 10-12h-7l1-8z"/>,
    brain:       <g><path d="M8 3a3 3 0 0 0-3 3c0 .5.1 1 .3 1.4A3 3 0 0 0 4 10c0 1 .4 1.8 1 2.4A3 3 0 0 0 5 15a3 3 0 0 0 3 3c.4 1.2 1.6 2 3 2s2.6-.8 3-2a3 3 0 0 0 3-3c0-.9-.4-1.7-1-2.4A3 3 0 0 0 17 10c0-1-.4-1.8-1-2.4.2-.4.3-.9.3-1.4a3 3 0 0 0-3-3c-1 0-1.8.4-2.4 1A3 3 0 0 0 8 3z"/></g>,
    chart:       <g><path d="M3 3v18h18"/><path d="M7 14l4-4 4 4 5-5"/></g>,
    bars:        <g><rect x="3" y="12" width="4" height="9"/><rect x="10" y="6" width="4" height="15"/><rect x="17" y="9" width="4" height="12"/></g>,
    users:       <g><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8"/></g>,
    truck:       <g><path d="M1 3h15v13H1zM16 8h4l3 3v5h-7"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></g>,
    pkg:         <g><path d="M21 16V8a2 2 0 0 0-1-1.7l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.7l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><path d="M3.3 7 12 12l8.7-5M12 22V12"/></g>,
    target:      <g><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5"/></g>,
    alert:       <g><path d="M12 9v4M12 17h.01"/><path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/></g>,
    sparkle:     <path d="M12 3l2 6 6 2-6 2-2 6-2-6-6-2 6-2 2-6z"/>,
    factory:     <g><path d="M2 20h20V10l-5 3V10l-5 3V7L2 11z"/><path d="M6 16v2M10 16v2M14 16v2M18 16v2"/></g>,
    store:       <g><path d="M3 9l1-5h16l1 5M3 9v11h18V9M3 9h18M8 20v-6h4v6"/></g>,
    warehouse:   <g><path d="M2 22V9l10-5 10 5v13M2 22h20M7 22v-8h10v8M7 14h10"/></g>,
    cpu:         <g><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3"/></g>,
    lock:        <g><rect x="3" y="11" width="18" height="10" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></g>,
    calendar:    <g><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></g>,
    link:        <g><path d="M10 14a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1"/><path d="M14 10a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1"/></g>,
    star:        <path d="m12 2 3 7 7 .6-5.3 4.7 1.6 7L12 17.7 5.7 21.3 7.3 14.3 2 9.6 9 9z"/>,
    trophy:      <g><path d="M6 9H4a2 2 0 0 1-2-2V5h4M18 9h2a2 2 0 0 0 2-2V5h-4"/><path d="M6 3h12v6a6 6 0 1 1-12 0V3zM9 21h6M10 17h4v4h-4z"/></g>,
    bolt:        <path d="M13 2 3 14h7l-1 8 10-12h-7l1-8z"/>,
    line:        <g><path d="M3 12h4l3-7 4 14 3-7h4"/></g>,
    search:      <g><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></g>,
    chevron:     <path d="m9 6 6 6-6 6"/>,
  };
  return <svg {...common}>{paths[name]}</svg>;
};

// ── Sub-brand "S" mark, recolorable via CSS mask of the official S ──
// BI = navy, Integration = green, Sewe Sales = orange. One asset, themed.
function SMark({ size = 34, color = '#2d436c' }) {
  return (
    <span
      aria-hidden
      style={{
        display: 'inline-block',
        width: size, height: size * (948 / 688),
        background: color,
        WebkitMaskImage: 'url(assets/sewe-s.png)',
        maskImage: 'url(assets/sewe-s.png)',
        WebkitMaskRepeat: 'no-repeat', maskRepeat: 'no-repeat',
        WebkitMaskSize: 'contain', maskSize: 'contain',
        WebkitMaskPosition: 'center', maskPosition: 'center',
        flexShrink: 0,
      }}
    />
  );
}

// Sub-brand lockup: S mark + "SEWE <Product>" stacked, themed by color.
function SubBrandLogo({ product = 'BI', color = '#2d436c', size = 30, light = false }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 11 }}>
      <SMark size={size} color={color}/>
      <div style={{ lineHeight: 1.05 }}>
        <div style={{ fontFamily: 'Chakra Petch, sans-serif', fontWeight: 700, fontSize: size * 0.5, letterSpacing: '0.04em', color: light ? '#fff' : 'var(--navy-900)' }}>SEWE</div>
        <div style={{ fontFamily: 'Chakra Petch, sans-serif', fontWeight: 600, fontSize: size * 0.42, letterSpacing: '0.02em', color, marginTop: 1 }}>{product}</div>
      </div>
    </div>
  );
}

// MinerConect lockup — its own product brand (cube mark + wordmark image).
function MinerLogo({ height = 40, variant = 'dark' }) {
  // 'dark' = full lockup cropped on navy; 'mark' = cube only.
  const src = variant === 'mark' ? 'assets/minerconect-mark.png' : 'assets/minerconect-logo-dark.png';
  return <img src={src} alt="MinerConect" style={{ height, width: 'auto', display: 'block' }}/>;
}

window.SeweLogo = SeweLogo;
window.SMark = SMark;
window.SubBrandLogo = SubBrandLogo;
window.MinerLogo = MinerLogo;
window.Icon = Icon;
