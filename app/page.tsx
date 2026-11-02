"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, CircleX, GitBranch, Mail, UsersRound } from "lucide-react";
import { useState } from "react";
import { Universe } from "./components/universe";

export type Project = {
  id: string;
  index: string;
  title: string;
  type: string;
  description: string;
  stack: string;
  color: string;
};

const projects: Project[] = [
  {
    id: "studypilot",
    index: "01",
    title: "StudyPilot AI",
    type: "Intelligent learning system",
    description:
      "A focused study companion that turns complex material into adaptive learning paths, revision prompts, and clear next steps.",
    stack: "Product / AI / Full-stack",
    color: "#b28cff",
  },
  {
    id: "uefa",
    index: "02",
    title: "UEFA Match Engine",
    type: "Predictive analysis",
    description:
      "A match prediction engine exploring historical football data, feature engineering, and the uncertainty behind a forecast.",
    stack: "Data / Python / ML",
    color: "#76c6ff",
  },
  {
    id: "future",
    index: "03",
    title: "Future / 03",
    type: "An open direction",
    description:
      "A space reserved for the next experiment at the edge of software, artificial intelligence, and visual culture.",
    stack: "Exploration / 2026",
    color: "#e5a5ff",
  },
];

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <main className="universe-shell">
      <Universe projects={projects} onProjectSelect={setSelectedProject} />
      <div className="grain" aria-hidden="true" />

      <header className="minimal-header">
        <a className="wordmark" href="#home" aria-label="Bhavya Mudgal home">
          BM<span>/</span>
        </a>
        <div className="header-meta">
          <span className="live-mark"><i /> Online / 2026</span>
          <a href="#work">Index <ArrowDownRight size={13} /></a>
        </div>
      </header>

      <section className="hero-scene" id="home">
        <div className="hero-annotation annotation-left">
          <span>01 — Digital native</span>
          <span>New Delhi / India</span>
        </div>
        <div className="hero-annotation annotation-right">
          <span>Move through</span>
          <span>the noise ↓</span>
        </div>
        <div className="hero-intro">
          <p className="technical-label">Student / Aspiring Software Engineer / AI &amp; ML Enthusiast</p>
          <p className="hero-note">
            Designing quiet interfaces<br />
            for loud ideas.
          </p>
        </div>
        <motion.h1
          className="hero-name"
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.15, ease: [0.22, 1, 0.36, 1] }}
        >
          Bhavya <em>Mudgal</em>
        </motion.h1>
        <div className="scroll-cue">
          <span>Scroll to enter</span>
          <span className="scroll-cue-line" />
        </div>
      </section>

      <section className="manifesto-scene" id="about">
        <p className="scene-index">02 / Signal</p>
        <div className="manifesto-copy">
          <p className="technical-label">A small introduction</p>
          <h2>
            I make things for the space between <i>logic</i> and <i>wonder.</i>
          </h2>
          <p className="manifesto-detail">
            Currently learning in public, building at the intersection of software engineering,
            artificial intelligence, and the human side of technology.
          </p>
        </div>
        <span className="side-coordinate">28°36&apos;N / 77°13&apos;E</span>
      </section>

      <section className="work-scene" id="work">
        <div className="work-heading">
          <div>
            <p className="scene-index">03 / Experiments</p>
            <h2>Selected <i>signals.</i></h2>
          </div>
          <p className="work-instruction">Hover a signal<br />to tune in</p>
        </div>
        <div className="work-list" aria-label="Selected projects">
          {projects.map((project) => (
            <button
              className="work-list-item"
              type="button"
              key={project.id}
              onClick={() => setSelectedProject(project)}
              style={{ "--signal-color": project.color } as React.CSSProperties}
            >
              <span>{project.index}</span>
              <strong>{project.title}</strong>
              <small>{project.type}</small>
              <ArrowUpRight size={17} />
            </button>
          ))}
        </div>
        <p className="work-footer">Three visible traces / many more forming</p>
      </section>

      <footer className="contact-scene" id="contact">
        <p className="scene-index">04 / Transmission</p>
        <h2>Let&apos;s make<br /><i>something strange.</i></h2>
        <a className="contact-link" href="mailto:hello@bhavyamudgal.dev">
          hello@bhavyamudgal.dev <ArrowUpRight size={19} />
        </a>
        <div className="contact-bottom">
          <span>© Bhavya Mudgal / built with curiosity</span>
          <div className="socials">
            <a href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub"><GitBranch size={16} /></a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn"><UsersRound size={16} /></a>
            <a href="mailto:hello@bhavyamudgal.dev" aria-label="Email"><Mail size={16} /></a>
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="project-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label={`${selectedProject.title} project details`}
          >
            <motion.div
              className="project-detail"
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.97 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              <button
                className="close-detail"
                type="button"
                onClick={() => setSelectedProject(null)}
                aria-label="Close project details"
              >
                <CircleX size={25} />
              </button>
              <span className="detail-index">{selectedProject.index} / PROJECT TRACE</span>
              <div className="detail-orb" style={{ "--signal-color": selectedProject.color } as React.CSSProperties} />
              <p className="technical-label">{selectedProject.type}</p>
              <h2>{selectedProject.title}</h2>
              <p className="detail-description">{selectedProject.description}</p>
              <span className="detail-stack">{selectedProject.stack}</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
