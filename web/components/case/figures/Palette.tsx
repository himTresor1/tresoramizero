/** Script's tokens, rendered rather than screenshotted: the orange, its tints, the neutrals, semantics, spacing and radii. */
export function PaletteFigure() {
  const neutrals = ["#FFFFFF", "#FAFAFA", "#F5F5F5", "#F0F0F0", "#E6E6E6", "#D4D4D4", "#A3A3A3", "#737373", "#525252", "#404040", "#262626", "#171717", "#0A0A0A"];
  const semantic = [
    { n: "Success", c: "#16A34A" },
    { n: "Warning", c: "#D97706" },
    { n: "Error", c: "#DC2626" },
    { n: "Info", c: "#0284C7" },
  ];
  const spacing = [4, 8, 12, 16, 20, 24, 32, 40, 48, 64];
  const radii = [4, 6, 8, 10, 12, 16, 20];
  return (
    <div className="sfig sfig-palette" aria-label="Illustration: Script's design tokens">
      <div className="sfig-pal-row">
        <div className="sfig-pal-primary" style={{ background: "linear-gradient(180deg, #FFA03B, #F97216)" }}>
          <span>Primary</span>
          <span className="sfig-pal-hex">#F97316</span>
        </div>
        <div className="sfig-pal-tints">
          {[0.2, 0.16, 0.1, 0.08].map((a) => (
            <div key={a} style={{ background: `rgba(249, 115, 22, ${a})` }}>
              <span className="sfig-pal-hex">{Math.round(a * 100)}%</span>
            </div>
          ))}
          <div style={{ background: "#FFF7ED" }}>
            <span className="sfig-pal-hex">chip</span>
          </div>
          <div style={{ background: "#FFFAF5" }}>
            <span className="sfig-pal-hex">hero</span>
          </div>
        </div>
      </div>
      <div className="sfig-pal-neutrals">
        {neutrals.map((c, i) => (
          <div key={c} style={{ background: c }} title={c}>
            <span className="sfig-pal-hex" style={{ color: i > 6 ? "#fff" : "#525252" }}>
              {i === 0 ? "0" : i === 1 ? "25" : i === 2 ? "50" : (i - 2) * 100}
            </span>
          </div>
        ))}
      </div>
      <div className="sfig-pal-row sfig-pal-bottom">
        <div className="sfig-pal-semantic">
          {semantic.map((s) => (
            <div key={s.n}>
              <span className="sfig-pal-dot" style={{ background: s.c }} />
              <span>{s.n}</span>
            </div>
          ))}
        </div>
        <div className="sfig-pal-spacing">
          {spacing.map((s) => (
            <span key={s} style={{ width: s, height: s }} title={`${s}px`} />
          ))}
          <span className="sfig-pal-hex">4px base</span>
        </div>
        <div className="sfig-pal-radii">
          {radii.map((r) => (
            <span key={r} style={{ borderRadius: r }} title={`${r}px`} />
          ))}
          <span className="sfig-pal-hex">4 → 20</span>
        </div>
      </div>
    </div>
  );
}
