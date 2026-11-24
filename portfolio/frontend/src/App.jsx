import Navbar from './components/Navbar.jsx';
import Section from './components/Section.jsx';
import ProjectCard from './components/ProjectCard.jsx';
import ContactForm from './components/ContactForm.jsx';
import { profile, about, skills, projects, experience } from './data.js';
const RESUME = import.meta.env.VITE_RESUME_URL || '/resume.pdf';
export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <section id="home" className="hero">
          <div className="hero-text">
            <p className="hello">Hello, I'm</p>
            <h1>{profile.name}</h1>
            <h2 className="role">{profile.role}</h2>
            <p>{profile.intro}</p>
            <div className="btns">
              <a className="btn primary" href={RESUME} download>Download Resume</a>
              <a className="btn ghost" href="#projects">View Projects</a>
            </div>
            <div className="social">
              <a href={profile.github} target="_blank" rel="noreferrer">GitHub</a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
            </div>
          </div>
          <div className="photo">{profile.photo ? <img src={profile.photo} alt={profile.name} /> : <span>MH</span>}</div>
        </section>
        <Section id="about" title="About Me"><div className="card">{about.map(t => <p key={t}>{t}</p>)}</div></Section>
        <Section id="skills" title="Skills">
          <div className="grid">
            {Object.entries(skills).map(([cat, items], i) => (
              <div className={`card c${i % 3}`} key={cat}><h3>{cat}</h3><div className="tags">{items.map(s => <span key={s}>{s}</span>)}</div></div>
            ))}
          </div>
        </Section>
        <Section id="projects" title="Projects"><div className="grid">{projects.map(p => <ProjectCard key={p.name} p={p} />)}</div></Section>
        <Section id="experience" title="Experience & Achievements">
          <div className="grid">{experience.map(e => <div className="card" key={e.title}><h3>{e.title}</h3><p>{e.body}</p></div>)}</div>
        </Section>
        <Section id="resume" title="Resume">
          <div className="card center"><p>Get a copy of my latest resume.</p><a className="btn primary" href={RESUME} download>Download Resume (PDF)</a></div>
        </Section>
        <Section id="contact" title="Contact"><p className="muted">Email: {profile.email}</p><ContactForm /></Section>
      </main>
      <footer>© {new Date().getFullYear()} {profile.name}. Built with React, Node.js &amp; MongoDB.</footer>
    </>
  );
}
