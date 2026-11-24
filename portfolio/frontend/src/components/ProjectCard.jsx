export default function ProjectCard({ p }) {
  return (
    <article className="card project">
      <h3>{p.name}</h3>
      <p>{p.desc}</p>
      <div className="tags">{p.tech.map(t => <span key={t}>{t}</span>)}</div>
      <ul>{p.features.map(f => <li key={f}>{f}</li>)}</ul>
      <div className="links">
        {p.github ? <a href={p.github} target="_blank" rel="noreferrer">GitHub</a> : <span className="muted">GitHub link: coming soon</span>}
        {p.demo ? <a href={p.demo} target="_blank" rel="noreferrer">Live Demo</a> : <span className="muted">Demo: coming soon</span>}
      </div>
    </article>
  );
}
