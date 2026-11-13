/** A Markdown workflow (left) and the tracked steps the runner makes of it (right). */
export function WorkflowFigure() {
  const lines = [
    "# New supplier onboarding",
    "",
    "- [ ] Collect the RDB certificate and TIN",
    "- [ ] Check the supplier against the blacklist",
    "- [ ] Draft the contract from the template",
    "- [ ] Send for legal review",
    "- [ ] Create the vendor in the finance system",
  ];
  const steps = [
    { t: "Collect the RDB certificate and TIN", s: "done" },
    { t: "Check the supplier against the blacklist", s: "done" },
    { t: "Draft the contract from the template", s: "agent" },
    { t: "Send for legal review", s: "todo" },
    { t: "Create the vendor in the finance system", s: "todo" },
  ];
  return (
    <div className="sfig sfig-workflow" aria-label="Illustration: a Markdown workflow and its guided runner">
      <pre className="sfig-md">
        {lines.map((l, i) => (
          <span key={i} className={l.startsWith("- [ ]") ? "sfig-md-step" : l.startsWith("#") ? "sfig-md-title" : ""}>
            {l || " "}
            {"\n"}
          </span>
        ))}
      </pre>
      <div className="sfig-runner">
        <div className="sfig-runner-head">
          <span className="sfig-runner-title">New supplier onboarding</span>
          <span className="sfig-runner-progress">2 of 5</span>
        </div>
        <ol>
          {steps.map((st, i) => (
            <li key={st.t} className={`sfig-run-step sfig-run-${st.s}`}>
              <span className="sfig-run-box" aria-hidden="true" />
              <span className="sfig-run-text">{st.t}</span>
              {st.s === "agent" && <span className="sfig-run-badge">Agent drafting · approve to save</span>}
              {i === 2 && st.s === "agent" && null}
            </li>
          ))}
        </ol>
        <div className="sfig-confirm">
          <span>Script wants to create “Contract — Akanyaru Tech Partners.docx”</span>
          <span className="sfig-confirm-btns">
            <span className="sfig-btn-ghost">Review</span>
            <span className="sfig-btn-primary">Approve</span>
          </span>
        </div>
      </div>
    </div>
  );
}
