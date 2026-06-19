# React Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrar o portfolio de HTML/CSS/JS vanilla para React 18 + Vite + Tailwind CSS (npm), mantendo visual idêntico e adicionando os 3 projetos reais do GitHub.

**Architecture:** Cada seção do portfolio vira um componente React isolado. Os dados (skills, projects) ficam em arquivos separados em `src/data/`. Um hook `useFadeUp` encapsula o IntersectionObserver global que aplica animações de scroll. O Tailwind é processado via PostCSS em build time, sem CDN.

**Tech Stack:** React 18, Vite 5, Tailwind CSS 3, PostCSS, autoprefixer

## Global Constraints

- React 18 — não usar `ReactDOM.render`, usar `createRoot`
- Tailwind v3 — content scan em `['./index.html', './src/**/*.{js,jsx}']`
- Preservar exatamente as cores: `#F9EFE7`, `#1E2235`, `#FFCC00`
- Preservar todos os nomes de classe CSS customizadas: `fade-up`, `float-anim`, `hero-text`, `skill-card`, `skill-img`, `sticky-wrapper`, `scrolled`
- Google Fonts (Inter) carregada via `<link>` em `index.html`, não via CSS `@import`
- Imagens ficam em `src/assets/images/` — importadas como módulos ES no Vite
- Sem TypeScript, sem testes unitários (projeto de portfolio puro)

---

### Task 1: Scaffolding — Vite + Tailwind + CSS base

**Files:**
- Create: `package.json`
- Create: `vite.config.js`
- Create: `tailwind.config.js`
- Create: `postcss.config.js`
- Create: `.gitignore`
- Replace: `index.html`
- Create: `src/index.css`
- Create: `src/main.jsx`
- Create: `src/App.jsx` (shell vazia)
- Create: `src/assets/images/` (mover de `Resources/images/`)
- Delete: `style.css`, `script.js`, `Resources/`

**Interfaces:**
- Produces: dev server funcional em `http://localhost:5173` com Tailwind ativo

- [ ] **Step 1: Criar `package.json`**

```json
{
  "name": "portfolio",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.1",
    "autoprefixer": "^10.4.20",
    "postcss": "^8.4.47",
    "tailwindcss": "^3.4.14",
    "vite": "^5.4.10"
  }
}
```

- [ ] **Step 2: Criar `vite.config.js`**

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
```

- [ ] **Step 3: Criar `tailwind.config.js`**

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

- [ ] **Step 4: Criar `postcss.config.js`**

```js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

- [ ] **Step 5: Criar `.gitignore`**

```
node_modules
dist
.env
```

- [ ] **Step 6: Substituir `index.html`**

Sobrescrever o `index.html` existente com:

```html
<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Henrique Andraus - Full Stack Developer</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap" rel="stylesheet">
  </head>
  <body class="bg-[#F9EFE7]">
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

- [ ] **Step 7: Criar `src/index.css`** (todas as animações do `style.css` original + Tailwind directives)

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  font-family: 'Inter', sans-serif;
}

/* Sticky header */
.sticky-wrapper {
  transition: box-shadow 0.3s ease;
}
.sticky-wrapper.scrolled {
  box-shadow: 0 4px 24px rgba(30, 34, 53, 0.1);
}

/* Nav link underline slide */
nav a {
  position: relative;
  color: #F9EFE7;
  text-decoration: none;
  font-size: 16px;
  font-weight: 500;
  transition: color 0.25s ease;
}
nav a::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 2px;
  background-color: #FFCC00;
  transition: width 0.3s ease;
}
nav a:hover {
  color: #FFCC00;
}
nav a:hover::after {
  width: 100%;
}

/* Skill image SVG filter */
.skill-img {
  filter:
    brightness(0)
    saturate(100%)
    invert(12%)
    sepia(14%)
    saturate(1438%)
    hue-rotate(198deg)
    brightness(94%)
    contrast(93%);
  transition: transform 0.3s ease, filter 0.3s ease;
}
.skill-card:hover .skill-img {
  transform: scale(1.15);
}

/* Hero entrance animations */
@keyframes fadeInLeft {
  from { opacity: 0; transform: translateX(-60px); }
  to   { opacity: 1; transform: translateX(0); }
}

@keyframes fadeInRight {
  from { opacity: 0; transform: translateX(60px); }
  to   { opacity: 1; transform: translateX(0); }
}

.hero-text {
  animation: fadeInLeft 0.8s ease forwards;
}

/* Profile image float + entrance */
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50%       { transform: translateY(-14px); }
}

.float-anim {
  animation:
    fadeInRight 0.8s ease forwards,
    float 5s ease-in-out 0.8s infinite;
}

/* Scroll fade-up */
.fade-up {
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.65s ease, transform 0.65s ease;
}
.fade-up.visible {
  opacity: 1;
  transform: translateY(0);
}

.stagger-1 { transition-delay: 0.05s; }
.stagger-2 { transition-delay: 0.10s; }
.stagger-3 { transition-delay: 0.15s; }
.stagger-4 { transition-delay: 0.20s; }
.stagger-5 { transition-delay: 0.25s; }
.stagger-6 { transition-delay: 0.30s; }
.stagger-7 { transition-delay: 0.35s; }
.stagger-8 { transition-delay: 0.40s; }
```

- [ ] **Step 8: Criar `src/main.jsx`**

```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

- [ ] **Step 9: Criar `src/App.jsx` (shell temporária)**

```jsx
export default function App() {
  return <div className="text-[#1E2235] p-8">Scaffolding OK</div>
}
```

- [ ] **Step 10: Mover imagens para `src/assets/images/`**

Execute no PowerShell:
```powershell
New-Item -ItemType Directory -Force "src\assets\images"
Move-Item "Resources\images\*" "src\assets\images\"
Remove-Item -Recurse -Force "Resources"
```

- [ ] **Step 11: Deletar arquivos legados**

```powershell
Remove-Item "style.css"
Remove-Item "script.js"
```

- [ ] **Step 12: Instalar dependências**

```powershell
npm install
```

Expected: `node_modules/` criado sem erros. Pode levar 30-60 segundos.

- [ ] **Step 13: Verificar que o dev server sobe**

```powershell
npm run dev
```

Expected: saída semelhante a:
```
  VITE v5.x.x  ready in XXX ms

  ➜  Local:   http://localhost:5173/
```

Abrir `http://localhost:5173/` no browser. Deve mostrar o texto "Scaffolding OK" com fundo bege (`#F9EFE7`). Confirmar que o Tailwind está ativo (o fundo do `body` é `bg-[#F9EFE7]`).

Parar o servidor com `Ctrl+C`.

- [ ] **Step 14: Commit**

```powershell
git add package.json vite.config.js tailwind.config.js postcss.config.js .gitignore index.html src/index.css src/main.jsx src/App.jsx src/assets/images/
git commit -m "chore: scaffold Vite + React + Tailwind, migrate images"
```

---

### Task 2: Data Files

**Files:**
- Create: `src/data/skills.js`
- Create: `src/data/projects.js`

**Interfaces:**
- Produces: `skills` (default export, array of `{ name: string, icon: string }`) from `src/data/skills.js`
- Produces: `projects` (default export, array of `{ title, description, tags, githubUrl }`) from `src/data/projects.js`

- [ ] **Step 1: Criar `src/data/skills.js`**

```js
import htmlIcon from '../assets/images/html5-brands-solid-full.svg'
import cssIcon from '../assets/images/css3-brands-solid-full.svg'
import jsIcon from '../assets/images/js-brands-solid-full.svg'
import figmaIcon from '../assets/images/figma-brands-solid-full.svg'
import gitIcon from '../assets/images/git-alt-brands-solid-full.svg'
import nodeIcon from '../assets/images/node-js-brands-solid-full.svg'
import reactIcon from '../assets/images/react-brands-solid-full.svg'
import githubIcon from '../assets/images/github-brands-solid-full.svg'

const skills = [
  { name: 'HTML5',      icon: htmlIcon },
  { name: 'CSS3',       icon: cssIcon },
  { name: 'JavaScript', icon: jsIcon },
  { name: 'Figma',      icon: figmaIcon },
  { name: 'Git',        icon: gitIcon },
  { name: 'Node.js',    icon: nodeIcon },
  { name: 'React',      icon: reactIcon },
  { name: 'GitHub',     icon: githubIcon },
]

export default skills
```

- [ ] **Step 2: Criar `src/data/projects.js`**

```js
const projects = [
  {
    title: 'Message Generator CLI',
    description:
      'A command-line application built with Node.js that generates motivational and random messages directly in the terminal. The project was published as an NPM package and focuses on JavaScript fundamentals, package publishing, and CLI development.',
    tags: ['JavaScript', 'Node.js', 'NPM'],
    githubUrl: 'https://github.com/henriqueandraus/message-generator',
  },
  {
    title: 'Jammming',
    description:
      'Web app to search for songs and create custom playlists synced directly to your Spotify account. Built with React + Vite and integrated with the Spotify Web API.',
    tags: ['React', 'Vite', 'Spotify API', 'CSS Modules'],
    githubUrl: 'https://github.com/henriqueandraus/Jammming',
  },
  {
    title: 'Threadly',
    description:
      'A modern Reddit client that lets users browse posts by subreddit, switch between list and grid views, search by category, and read comment threads. Supports dark mode and responsive layouts.',
    tags: ['React', 'Redux', 'Vite', 'Jest'],
    githubUrl: 'https://github.com/henriqueandraus/reddit-app',
  },
]

export default projects
```

- [ ] **Step 3: Verificar imports no dev server**

Adicionar temporariamente ao `src/App.jsx`:
```jsx
import skills from './data/skills'
import projects from './data/projects'
console.log(skills, projects)
export default function App() {
  return <div className="text-[#1E2235] p-8">Data OK</div>
}
```

Rodar `npm run dev`, abrir o browser em `http://localhost:5173/`, abrir o console do DevTools (`F12`). Confirmar que os arrays aparecem sem erro. Parar o servidor.

Reverter `App.jsx` para a shell temporária:
```jsx
export default function App() {
  return <div className="text-[#1E2235] p-8">Scaffolding OK</div>
}
```

- [ ] **Step 4: Commit**

```powershell
git add src/data/skills.js src/data/projects.js src/App.jsx
git commit -m "feat: add skills and projects data files"
```

---

### Task 3: Hook useFadeUp + Componente Header

**Files:**
- Create: `src/hooks/useFadeUp.js`
- Create: `src/components/Header.jsx`
- Modify: `src/App.jsx`

**Interfaces:**
- Consumes: nada (hook sem parâmetros)
- Produces: `useFadeUp()` (default export de `src/hooks/useFadeUp.js`) — hook sem retorno, efeito colateral: observa todos os `.fade-up` do DOM e adiciona classe `visible` quando visíveis
- Produces: `<Header />` (default export de `src/components/Header.jsx`) — componente sem props

- [ ] **Step 1: Criar `src/hooks/useFadeUp.js`**

```js
import { useEffect } from 'react'

export default function useFadeUp() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) entry.target.classList.add('visible')
        })
      },
      { threshold: 0.12 }
    )
    document.querySelectorAll('.fade-up').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}
```

- [ ] **Step 2: Criar `src/components/Header.jsx`**

```jsx
import { useState, useEffect } from 'react'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className={`sticky top-0 z-50 sticky-wrapper${scrolled ? ' scrolled' : ''}`}>
      <div className="px-[50px] py-4 bg-[#F9EFE7]">
        <header className="flex justify-between items-center px-[60px] bg-[#1E2235] rounded-3xl text-[#F9EFE7]">
          <div>
            <h2 className="font-bold text-lg">Henrique Andraus</h2>
          </div>
          <nav>
            <ul className="flex list-none gap-[80px] py-5">
              <li><a href="#about">About</a></li>
              <li><a href="#skills">Skills</a></li>
              <li><a href="#projects">Projects</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </nav>
          <h5 className="text-[#F9EFE7]/50 text-sm font-normal">Based in Curitiba, Brazil</h5>
        </header>
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Atualizar `src/App.jsx`**

```jsx
import useFadeUp from './hooks/useFadeUp'
import Header from './components/Header'

export default function App() {
  useFadeUp()

  return (
    <>
      <Header />
      <main>
        <p className="p-8 text-[#1E2235]">Components coming soon...</p>
      </main>
    </>
  )
}
```

- [ ] **Step 4: Verificar no browser**

Rodar `npm run dev`. Confirmar:
- Header dark azul (`#1E2235`) com logo, nav e texto "Based in Curitiba, Brazil"
- Links do nav mudam de cor para amarelo (`#FFCC00`) com underline slide no hover
- Ao scrollar (se a página for grande o suficiente), o header ganha shadow

Parar o servidor.

- [ ] **Step 5: Commit**

```powershell
git add src/hooks/useFadeUp.js src/components/Header.jsx src/App.jsx
git commit -m "feat: add useFadeUp hook and Header component"
```

---

### Task 4: Componentes About e Skills

**Files:**
- Create: `src/components/About.jsx`
- Create: `src/components/Skills.jsx`
- Modify: `src/App.jsx`

**Interfaces:**
- Consumes: `profilePhoto` importado de `../assets/images/Foto Henrique.JPG` (em About)
- Consumes: `skills` de `../data/skills` (em Skills) — array de `{ name: string, icon: string }`
- Produces: `<About />` — sem props
- Produces: `<Skills />` — sem props

- [ ] **Step 1: Criar `src/components/About.jsx`**

```jsx
import profilePhoto from '../assets/images/Foto Henrique.JPG'

export default function About() {
  return (
    <section id="about" className="flex items-center justify-center gap-[100px] max-w-[1200px] mx-auto my-[80px] px-8">

      <div className="shrink-0 relative float-anim">
        <img
          className="relative block w-[460px] h-[400px] object-cover rounded-2xl border border-[#1E2235]/20 p-2 bg-white shadow-xl"
          style={{ zIndex: 1 }}
          src={profilePhoto}
          alt="Henrique Andraus"
        />
        <div
          className="absolute -bottom-5 -right-5 w-full h-full bg-[#FFCC00] rounded-2xl"
          style={{ zIndex: 0 }}
        />
      </div>

      <div className="max-w-[560px] hero-text">
        <span className="inline-block text-xs font-bold tracking-[0.2em] text-[#FFCC00] bg-[#1E2235] px-4 py-2 rounded-full mb-6 uppercase">
          Full Stack Developer
        </span>
        <h1 className="text-[50px] leading-[1.1] mb-6 text-[#1E2235] font-bold">
          Hello, I'm<br />Henrique Andraus
        </h1>
        <p className="text-lg leading-[1.8] text-[#1E2235]/75">
          I'm a passionate Full Stack Developer with experience in building web applications using JavaScript, React, Node.js, and more. I enjoy creating efficient and scalable solutions to solve complex problems.
        </p>
        <div className="flex gap-4 mt-10">
          <a
            href="#projects"
            className="inline-block px-8 py-3.5 bg-[#1E2235] text-[#F9EFE7] rounded-xl font-semibold transition-all duration-300 hover:bg-[#FFCC00] hover:text-[#1E2235] hover:shadow-lg hover:-translate-y-0.5"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="inline-block px-8 py-3.5 border-2 border-[#1E2235] text-[#1E2235] rounded-xl font-semibold transition-all duration-300 hover:bg-[#1E2235] hover:text-[#F9EFE7] hover:-translate-y-0.5"
          >
            Contact Me
          </a>
        </div>
      </div>

    </section>
  )
}
```

- [ ] **Step 2: Criar `src/components/Skills.jsx`**

```jsx
import skills from '../data/skills'

const staggerClasses = [
  'stagger-1', 'stagger-2', 'stagger-3', 'stagger-4',
  'stagger-5', 'stagger-6', 'stagger-7', 'stagger-8',
]

export default function Skills() {
  return (
    <section id="skills" className="max-w-[1100px] mx-auto my-[120px] px-8">

      <div className="text-center mb-[60px] fade-up">
        <h2 className="text-[40px] font-bold text-[#1E2235]">Skills & Technologies</h2>
        <p className="text-[#1E2235]/50 mt-3 text-base">Tools I work with every day</p>
      </div>

      <div className="grid grid-cols-4 gap-5 max-w-[960px] mx-auto">
        {skills.map((skill, i) => (
          <div
            key={skill.name}
            className={`skill-card flex flex-col items-center justify-center gap-4 bg-white border border-[#1E2235]/10 rounded-2xl p-8 transition-all duration-300 hover:-translate-y-2 hover:border-[#FFCC00] hover:shadow-xl cursor-default fade-up ${staggerClasses[i]}`}
          >
            <img
              src={skill.icon}
              alt={skill.name}
              className="skill-img w-[70px] h-[70px] object-contain"
            />
            <h3 className="text-sm font-semibold text-[#1E2235]">{skill.name}</h3>
          </div>
        ))}
      </div>

    </section>
  )
}
```

- [ ] **Step 3: Atualizar `src/App.jsx`**

```jsx
import useFadeUp from './hooks/useFadeUp'
import Header from './components/Header'
import About from './components/About'
import Skills from './components/Skills'

export default function App() {
  useFadeUp()

  return (
    <>
      <Header />
      <main>
        <About />
        <Skills />
      </main>
    </>
  )
}
```

- [ ] **Step 4: Verificar no browser**

Rodar `npm run dev`. Confirmar:
- Seção About: foto com float animation, badge amarelo, título, parágrafo, botões CTA com hover correto
- Seção Skills: 8 cards em grid 4 colunas, ícones SVG com cor azul escura via CSS filter, hover sobe o card e ícone cresce
- Scroll fade-up: Skills section aparece com animação ao scrollar

Parar o servidor.

- [ ] **Step 5: Commit**

```powershell
git add src/components/About.jsx src/components/Skills.jsx src/App.jsx
git commit -m "feat: add About and Skills components"
```

---

### Task 5: Componente Projects

**Files:**
- Create: `src/components/Projects.jsx`
- Modify: `src/App.jsx`

**Interfaces:**
- Consumes: `projects` de `../data/projects` — array de `{ title: string, description: string, tags: string[], githubUrl: string }`
- Produces: `<Projects />` — sem props

- [ ] **Step 1: Criar `src/components/Projects.jsx`**

O sub-componente `ProjectCard` é definido no mesmo arquivo (não precisa de arquivo separado — só é usado aqui).

```jsx
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
```

- [ ] **Step 2: Atualizar `src/App.jsx`**

```jsx
import useFadeUp from './hooks/useFadeUp'
import Header from './components/Header'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'

export default function App() {
  useFadeUp()

  return (
    <>
      <Header />
      <main>
        <About />
        <Skills />
        <Projects />
      </main>
    </>
  )
}
```

- [ ] **Step 3: Verificar no browser**

Rodar `npm run dev`. Confirmar:
- 3 cards de projeto em grid 3 colunas
- Cada card mostra título, descrição truncada com gradiente fade na base
- Botão "Read more" expande a descrição; muda para "Read less" ao expandir
- Tags amarelas no fundo de cada card
- Link "View on GitHub →" abre o repositório correto em nova aba
- Cards somem e aparecem com fade-up ao scrollar

Parar o servidor.

- [ ] **Step 4: Commit**

```powershell
git add src/components/Projects.jsx src/App.jsx
git commit -m "feat: add Projects component with real GitHub projects"
```

---

### Task 6: Contact, Footer e Montagem Final

**Files:**
- Create: `src/components/Contact.jsx`
- Create: `src/components/Footer.jsx`
- Modify: `src/App.jsx` (versão final)

**Interfaces:**
- Consumes: nada
- Produces: `<Contact />` — sem props
- Produces: `<Footer />` — sem props

- [ ] **Step 1: Criar `src/components/Contact.jsx`**

```jsx
export default function Contact() {
  return (
    <section id="contact" className="max-w-[700px] mx-auto my-[120px] px-8 text-center fade-up">
      <h2 className="text-[40px] font-bold text-[#1E2235] mb-4">Get In Touch</h2>
      <p className="text-lg text-[#1E2235]/65 leading-relaxed mb-10 max-w-[480px] mx-auto">
        I'm currently open to new opportunities. Whether you have a question or just want to say hi, feel free to reach out!
      </p>
      <a
        href="mailto:hpmtandraus@gmail.com"
        className="inline-block px-12 py-4 bg-[#1E2235] text-[#F9EFE7] rounded-xl text-base font-semibold transition-all duration-300 hover:bg-[#FFCC00] hover:text-[#1E2235] hover:shadow-xl hover:-translate-y-1"
      >
        Say Hello →
      </a>
    </section>
  )
}
```

- [ ] **Step 2: Criar `src/components/Footer.jsx`**

```jsx
export default function Footer() {
  return (
    <footer className="bg-[#1E2235] text-[#F9EFE7] text-center py-8 mt-20">
      <p className="text-sm opacity-40">© 2026 Henrique Andraus</p>
    </footer>
  )
}
```

- [ ] **Step 3: Finalizar `src/App.jsx`**

```jsx
import useFadeUp from './hooks/useFadeUp'
import Header from './components/Header'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  useFadeUp()

  return (
    <>
      <Header />
      <main>
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
```

- [ ] **Step 4: Verificar visual completo no browser**

Rodar `npm run dev`. Percorrer a página do topo ao rodapé e confirmar:

| Elemento | Comportamento esperado |
|---|---|
| Header | Sticky, shadow ao scrollar, links com underline amarelo no hover |
| About | Foto flutua, animação fade-in da esquerda/direita, botões com hover |
| Skills | 8 cards, ícones azuis, card sobe e borda amarela no hover |
| Projects | 3 cards reais, Read More funciona, links abrem no GitHub |
| Contact | Seção centralizada, botão "Say Hello →" com hover amarelo |
| Footer | Fundo azul escuro, texto "© 2026 Henrique Andraus" |
| Scroll | Todas as seções aparecem com fade-up ao entrar na viewport |

Parar o servidor.

- [ ] **Step 5: Verificar build de produção**

```powershell
npm run build
```

Expected: saída sem erros, criando `dist/`. Exemplo:
```
vite v5.x.x building for production...
✓ XX modules transformed.
dist/index.html          X.XX kB
dist/assets/index-XXX.css   XX kB
dist/assets/index-XXX.js   XXX kB
✓ built in XXXms
```

Se houver warnings de `unused import` ou similar, corrigir antes de commitar.

- [ ] **Step 6: Commit final**

```powershell
git add src/components/Contact.jsx src/components/Footer.jsx src/App.jsx
git commit -m "feat: add Contact and Footer, complete React migration"
```
