import {useEffect, useId, useState, type KeyboardEvent} from "react";

const notes = [
  {
    title: "Own the whole application.",
    label: "Ownership",
    text: "React + TypeScript micro-frontends span architecture, state management, API integration, testing, CI/CD, and deployment. Try the example search above."
  },
  {
    title: "Patterns teams can build on.",
    label: "Platform",
    text: "Module Federation, shared singleton dependencies, and reusable authentication and authorization libraries provide shared foundations across engineering teams."
  },
  {
    title: "Think beyond the screen.",
    label: "Automation",
    text: "Step Functions workflows with CloudFormation, Glue, S3, and DynamoDB save 10+ hours of manual work per week."
  }
];

const datasets = [
  {name: "Customer insights", category: "Analytics", initials: "CI"},
  {name: "Portfolio activity", category: "Reporting", initials: "PA"},
  {name: "Pipeline health", category: "Operations", initials: "PH"}
];

export default function ProjectExplorer() {
  const id = useId();
  const [mode, setMode] = useState<"interface" | "architecture">("interface");
  const [active, setActive] = useState(0);
  const [query, setQuery] = useState("");
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  const results = datasets.filter(item =>
    `${item.name} ${item.category}`.toLowerCase().includes(query.toLowerCase())
  );

  function changeTab(event: KeyboardEvent<HTMLButtonElement>) {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const next =
      event.key === "Home"
        ? "interface"
        : event.key === "End"
          ? "architecture"
          : mode === "interface"
            ? "architecture"
            : "interface";
    setMode(next);
    document.getElementById(`${id}-${next}`)?.focus();
  }

  return (
    <div className="project-explorer">
      <div className="explorer-toolbar">
        <span className="explorer-label">
          <span className="live-dot" /> Under the hood
        </span>
        <div
          className="explorer-tabs"
          role="tablist"
          aria-label="Project preview"
        >
          {(["interface", "architecture"] as const).map(tab => (
            <button
              type="button"
              role="tab"
              id={`${id}-${tab}`}
              aria-selected={mode === tab}
              aria-controls={`${id}-panel`}
              tabIndex={mode === tab ? 0 : -1}
              onClick={() => setMode(tab)}
              onKeyDown={changeTab}
              disabled={!ready}
              key={tab}
            >
              {tab === "interface" ? "Interface" : "Architecture"}
            </button>
          ))}
        </div>
      </div>

      <div
        className="explorer-panel"
        role="tabpanel"
        id={`${id}-panel`}
        aria-labelledby={`${id}-${mode}`}
      >
        {mode === "interface" ? (
          <div className="mini-app">
            <div className="mini-sidebar" aria-hidden="true">
              <span className="mini-logo">d.</span>
              <span className="mini-nav is-selected">▦</span>
              <span className="mini-nav">⌕</span>
              <span className="mini-nav">≡</span>
              <span className="mini-avatar">IV</span>
            </div>
            <div className="mini-workspace">
              <div className="mini-breadcrumb">
                <span>WORKSPACE / DISCOVERY</span>
                <span className="mini-sample">Example</span>
              </div>
              <p className="mini-heading">
                Good data.
                <br />
                <span>Within reach.</span>
              </p>
              <label className="mini-search">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  aria-hidden="true"
                >
                  <circle cx="10" cy="10" r="6" />
                  <path d="m15 15 5 5" />
                </svg>
                <input
                  type="search"
                  aria-label="Search example datasets"
                  placeholder="Find a dataset…"
                  value={query}
                  onChange={event => {
                    setQuery(event.target.value);
                    setActive(0);
                  }}
                  disabled={!ready}
                />
              </label>
              <div className="mini-table-label">
                <span>DATASETS</span>
                <span>COLLECTION</span>
              </div>
              <div
                className="mini-datasets"
                aria-live="polite"
                aria-atomic="true"
              >
                {results.length ? (
                  results.map(item => (
                    <div className="mini-dataset" key={item.name}>
                      <span className="dataset-initials">{item.initials}</span>
                      <span className="dataset-name">
                        {item.name}
                        <small>Example dataset</small>
                      </span>
                      <span className="dataset-category">{item.category}</span>
                    </div>
                  ))
                ) : (
                  <p className="mini-empty">
                    No example datasets found. Try “analytics”.
                  </p>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="mini-architecture">
            <p className="mono">FROM INTERFACE TO INFRASTRUCTURE</p>
            <div className="architecture-flow">
              <button
                className="architecture-node"
                type="button"
                onClick={() => setActive(0)}
              >
                <span>01 / EXPERIENCE</span>
                <strong>React + TypeScript</strong>
                <small>Micro-frontends · State · APIs</small>
              </button>
              <span className="flow-connector" aria-hidden="true">
                ↓
              </span>
              <button
                className="architecture-node"
                type="button"
                onClick={() => setActive(1)}
              >
                <span>02 / CONNECTION</span>
                <strong>Shared platform libraries</strong>
                <small>Module Federation · Auth · Singletons</small>
              </button>
              <span className="flow-connector" aria-hidden="true">
                ↓
              </span>
              <button
                className="architecture-node"
                type="button"
                onClick={() => setActive(2)}
              >
                <span>03 / ORCHESTRATION</span>
                <strong>AWS workflows</strong>
                <small>Step Functions · Glue · S3 · DynamoDB</small>
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="explorer-notes">
        <div className="annotation-buttons" aria-label="Engineering notes">
          {notes.map((note, index) => (
            <button
              type="button"
              aria-pressed={active === index}
              aria-controls={`${id}-note`}
              onClick={() => setActive(index)}
              disabled={!ready}
              key={note.label}
            >
              <span>0{index + 1}</span>
              {note.label}
            </button>
          ))}
        </div>
        <div
          className="annotation-content"
          id={`${id}-note`}
          aria-live="polite"
          aria-atomic="true"
        >
          <strong>{notes[active].title}</strong>
          <p>{notes[active].text}</p>
        </div>
      </div>
      <p className="explorer-disclaimer">
        Portfolio illustration · Example data · Simplified system map
      </p>
    </div>
  );
}
