export default function Section({ id, title, children }) {
  return (<section id={id} className="section"><h2><span>/</span> {title}</h2>{children}</section>);
}
