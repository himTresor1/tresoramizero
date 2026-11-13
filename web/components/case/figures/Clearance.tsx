/** Same question, two clearances: the answer changes because the sources the person can see change. */
export function ClearanceFigure() {
  const q = "What did we pay the EDMAS vendor in Q2?";
  return (
    <div className="sfig sfig-clearance" aria-label="Illustration: the same question answered differently for two clearance levels">
      {[
        {
          who: "Finance lead",
          clearance: "Finance · Procurement",
          answer: (
            <>
              RWF 184.6M across three invoices <span className="sfig-chip">1</span>, the last one settled on 28 June <span className="sfig-chip">2</span>.
            </>
          ),
          sources: ["Invoice register Q2.xlsx", "Bank reconciliation · June.pdf"],
        },
        {
          who: "Programme intern",
          clearance: "General",
          answer: (
            <>
              A Q2 payment to the EDMAS vendor exists, but the amount is in documents you don’t have access to. Finance owns them <span className="sfig-chip">1</span>.
            </>
          ),
          sources: ["People directory · Finance team"],
        },
      ].map((c) => (
        <div key={c.who} className="sfig-card">
          <div className="sfig-card-head">
            <span className="sfig-avatar" aria-hidden="true" />
            <span>
              <span className="sfig-who">{c.who}</span>
              <span className="sfig-clear">{c.clearance}</span>
            </span>
          </div>
          <div className="sfig-bubble sfig-bubble-user">{q}</div>
          <p className="sfig-mini-answer">{c.answer}</p>
          <div className="sfig-sources">
            {c.sources.map((s, i) => (
              <span key={s} className="sfig-source">
                {i + 1} · {s}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
