import { useState } from 'react'
import projects from '../data/projects'

const staggerClasses = ['stagger-1', 'stagger-2', 'stagger-3']

function ProjectCard({ project, stagger }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div
      className={`bg-white rounded-2xl text-[#1E2235] border border-[#1E2235]/10 p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl fade-up ${stagger}`}
    >
      <h3 className="text-lg font-bold mt-0 mb-3">{project.title}</h3>

      <div className="relative">
        <p
          className={`text-[#1E2235]/65 text-sm leading-relaxed overflow-hidden transition-[max-height] duration-[400ms] ease-in-out ${
            expanded ? 'max-h-[500px]' : 'max-h-[72px]'
          }`}
        >
          {project.description}
        </p>
        {!expanded && (
          <div className="absolute bottom-0 left-0 w-full h-[40px] bg-gradient-to-b from-transparent to-white pointer-events-none" />
        )}
      </div>

      <button
        onClick={() => setExpanded(e => !e)}
        className="mt-3 bg-transparent border-none text-[#1E2235] font-bold cursor-pointer text-sm hover:text-[#FFCC00] transition-colors"
      >
        {expanded ? 'Read less' : 'Read more'}
      </button>

      <div className="flex gap-2 flex-wrap mt-4">
        {project.tags.map(tag => (
          <span
            key={tag}
            className="py-1.5 px-3 bg-[#FFCC00] border border-[#1E2235]/15 rounded-lg text-xs font-semibold"
          >
            {tag}
          </span>
        ))}
      </div>

      <a
        href={project.githubUrl}
        target="_blank"
        rel="noreferrer"
        className="inline-block mt-4 text-xs font-semibold text-[#1E2235]/50 hover:text-[#1E2235] transition-colors"
      >
        View on GitHub →
      </a>
    </div>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="max-w-[1200px] mx-auto my-[120px] px-8">

      <div className="text-center mb-[60px] fade-up">
        <h2 className="text-[40px] font-bold text-[#1E2235]">Projects</h2>
        <p className="text-[#1E2235]/50 mt-3 text-base">Things I've built</p>
      </div>

      <div className="grid grid-cols-3 gap-6 max-w-[1200px] mx-auto items-start">
        {projects.map((project, i) => (
          <ProjectCard key={project.title} project={project} stagger={staggerClasses[i]} />
        ))}
      </div>

    </section>
  )
}
