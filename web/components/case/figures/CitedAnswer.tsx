/**
 * A cited answer, rebuilt from Script's chat view: the question, a streamed answer with numbered
 * citation chips, and the source drawer with the passage highlighted. Script's tokens: Inter
 * Display, orange #F97316, neutrals, 16px card radius. Content is the product's own demo scenario
 * (fictional "Ubumwe Development Bank").
 */
export function CitedAnswerFigure() {
  return (
    <div className="sfig sfig-chat" aria-label="Illustration: a Script answer with three citations and the source drawer">
      <div className="sfig-chat-main">
        <div className="sfig-bubble sfig-bubble-user">Why didn’t Akanyaru Tech Partners win the EDMAS tender?</div>
        <div className="sfig-answer">
          <div className="sfig-orb" aria-hidden="true" />
          <p>
            Their bid scored lowest on the technical evaluation <span className="sfig-chip">1</span> and missed the mandatory ISO 27001 requirement set in the
            tender notice <span className="sfig-chip sfig-chip-active">2</span>. The committee minutes record the decision on 14 March <span className="sfig-chip">3</span>.
          </p>
          <div className="sfig-sources">
            <span className="sfig-source">1 · Evaluation report.pdf</span>
            <span className="sfig-source sfig-source-active">2 · Tender notice EDMAS-2026.pdf</span>
            <span className="sfig-source">3 · Committee minutes · 14 Mar.docx</span>
          </div>
        </div>
      </div>
      <aside className="sfig-drawer" aria-hidden="true">
        <div className="sfig-drawer-head">
          <span className="sfig-drawer-title">Tender notice EDMAS-2026.pdf</span>
          <span className="sfig-drawer-page">p. 4 · §3.2</span>
        </div>
        <p className="sfig-passage">
          Bidders shall demonstrate <mark>current ISO/IEC 27001 certification</mark> for the entity delivering the service. Bids that do not include evidence of certification{" "}
          <mark>will be disqualified at the technical stage.</mark>
        </p>
        <div className="sfig-drawer-foot">Opened from citation 2 · highlighted passage</div>
      </aside>
    </div>
  );
}
