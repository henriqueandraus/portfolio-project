# Responsividade do Portfolio — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Tornar todos os componentes do portfolio responsivos usando exclusivamente prefixos Tailwind mobile-first.

**Architecture:** Cada componente é editado individualmente adicionando prefixos responsivos (`sm:`, `md:`, `lg:`, `xl:`) nas classes Tailwind existentes. O Header recebe lógica de hamburger menu via `useState`. Nenhum CSS externo é adicionado.

**Tech Stack:** React 18, Tailwind CSS 3, Vite

## Global Constraints

- Usar apenas prefixos Tailwind nativos — sem CSS customizado novo em `index.css`
- Breakpoints: `sm` = 640px, `md` = 768px, `lg` = 1024px, `xl` = 1280px
- Manter todas as animações e classes existentes intactas
- Paleta de cores existente não muda: `#1E2235`, `#F9EFE7`, `#FFCC00`
- Verificação visual: rodar `npm run dev` e testar no DevTools com viewport 375px, 768px e 1280px

---

### Task 1: Header — Hamburger Menu

**Files:**
- Modify: `src/components/Header.jsx`

**Interfaces:**
- Consumes: nada de tarefas anteriores
- Produces: Header responsivo com hamburger funcional

- [ ] **Step 1: Verificar o estado atual**

Abrir `src/components/Header.jsx` e confirmar que já tem `useState` importado e em uso (para `scrolled`).

- [ ] **Step 2: Adicionar estado do menu mobile**

Adicionar `const [menuOpen, setMenuOpen] = useState(false)` abaixo do estado `scrolled` existente:

```jsx
const [scrolled, setScrolled] = useState(false)
const [menuOpen, setMenuOpen] = useState(false)
```

- [ ] **Step 3: Reescrever o JSX do Header**

Substituir todo o `return` pelo seguinte (mantém a lógica de scroll existente):

```jsx
return (
  <div className={`sticky top-0 z-50 sticky-wrapper${scrolled ? ' scrolled' : ''}`}>
    <div className="px-4 md:px-[50px] py-4 bg-[#F9EFE7]">
      <header className="flex justify-between items-center px-5 md:px-[60px] bg-[#1E2235] rounded-3xl text-[#F9EFE7]">

        {/* Logo */}
        <div>
          <h2 className="font-bold text-lg">Henrique Andraus</h2>
        </div>

        {/* Nav desktop */}
        <nav className="hidden md:block">
          <ul className="flex list-none gap-[80px] py-5">
            <li><a href="#about">About</a></li>
            <li><a href="#skills">Skills</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>

        {/* Localização desktop */}
        <h5 className="hidden md:block text-[#F9EFE7]/50 text-sm font-normal">
          Based in Curitiba, Brazil
        </h5>

        {/* Botão hamburger mobile */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5 py-4"
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-[#F9EFE7] transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-[#F9EFE7] transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-[#F9EFE7] transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>

      </header>

      {/* Menu mobile dropdown */}
      {menuOpen && (
        <nav className="md:hidden bg-[#1E2235] rounded-2xl mt-2 mx-0 px-6 py-4">
          <ul className="flex flex-col list-none gap-4 text-center">
            <li><a href="#about" onClick={() => setMenuOpen(false)}>About</a></li>
            <li><a href="#skills" onClick={() => setMenuOpen(false)}>Skills</a></li>
            <li><a href="#projects" onClick={() => setMenuOpen(false)}>Projects</a></li>
            <li><a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a></li>
          </ul>
        </nav>
      )}
    </div>
  </div>
)
```

- [ ] **Step 4: Verificar visualmente**

Rodar `npm run dev`, abrir DevTools, testar viewport 375px:
- Deve aparecer o botão `☰` animado no canto direito do header
- Clicar deve abrir o dropdown com os 4 links
- Clicar em qualquer link deve fechar o menu
- Em 768px+ o menu hamburger deve sumir e a nav horizontal aparecer

- [ ] **Step 5: Commit**

```bash
git add src/components/Header.jsx
git commit -m "feat: add responsive hamburger menu to Header"
```

---

### Task 2: About — Layout Responsivo

**Files:**
- Modify: `src/components/About.jsx`

**Interfaces:**
- Consumes: nada de tarefas anteriores
- Produces: seção About que empilha verticalmente em mobile

- [ ] **Step 1: Atualizar o wrapper da section**

Linha 5 — trocar:
```jsx
<section id="about" className="flex items-center justify-center gap-[100px] max-w-[1200px] mx-auto my-[80px] px-8">
```
Por:
```jsx
<section id="about" className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-[100px] max-w-[1200px] mx-auto my-[80px] px-8">
```

- [ ] **Step 2: Atualizar o bloco da imagem**

Linha 7 — trocar:
```jsx
<div className="shrink-0 relative float-anim">
  <img
    className="relative block w-[460px] h-[400px] object-cover rounded-2xl border border-[#1E2235]/20 p-2 bg-white shadow-xl"
```
Por:
```jsx
<div className="shrink-0 relative float-anim mx-auto md:mx-0">
  <img
    className="relative block w-full max-w-[340px] h-[300px] md:w-[460px] md:h-[400px] object-cover rounded-2xl border border-[#1E2235]/20 p-2 bg-white shadow-xl"
```

- [ ] **Step 3: Atualizar o bloco de texto**

Linha 20 — trocar:
```jsx
<div className="max-w-[560px] hero-text">
```
Por:
```jsx
<div className="max-w-[560px] hero-text text-center md:text-left">
```

- [ ] **Step 4: Atualizar o título**

Linha 24 — trocar:
```jsx
<h1 className="text-[50px] leading-[1.1] mb-6 text-[#1E2235] font-bold">
```
Por:
```jsx
<h1 className="text-[36px] md:text-[50px] leading-[1.1] mb-6 text-[#1E2235] font-bold">
```

- [ ] **Step 5: Atualizar os botões**

Linha 30 — trocar:
```jsx
<div className="flex gap-4 mt-10">
```
Por:
```jsx
<div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4 mt-10">
```

- [ ] **Step 6: Verificar visualmente**

Rodar `npm run dev`, testar 375px:
- Imagem centralizada acima do texto
- Texto centralizado abaixo da imagem
- Botões empilhados verticalmente
- Em 640px+ os botões ficam lado a lado
- Em 768px+ o layout vira horizontal (imagem à esquerda, texto à direita)

- [ ] **Step 7: Commit**

```bash
git add src/components/About.jsx
git commit -m "feat: make About section responsive"
```

---

### Task 3: Skills — Grid Responsivo

**Files:**
- Modify: `src/components/Skills.jsx`

**Interfaces:**
- Consumes: nada de tarefas anteriores
- Produces: grid de skills que vai de 2 colunas (mobile) a 4 colunas (desktop)

- [ ] **Step 1: Atualizar o grid**

Linha 18 — trocar:
```jsx
<div className="grid grid-cols-4 gap-5 max-w-[960px] mx-auto">
```
Por:
```jsx
<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 max-w-[960px] mx-auto">
```

- [ ] **Step 2: Atualizar o card**

Linha 22 — trocar:
```jsx
className={`skill-card flex flex-col items-center justify-center gap-4 bg-white border border-[#1E2235]/10 rounded-2xl p-8 transition-all duration-300 hover:-translate-y-2 hover:border-[#FFCC00] hover:shadow-xl cursor-default fade-up ${staggerClasses[i]}`}
```
Por:
```jsx
className={`skill-card flex flex-col items-center justify-center gap-4 bg-white border border-[#1E2235]/10 rounded-2xl p-5 md:p-8 transition-all duration-300 hover:-translate-y-2 hover:border-[#FFCC00] hover:shadow-xl cursor-default fade-up ${staggerClasses[i]}`}
```

- [ ] **Step 3: Atualizar o ícone**

Linha 24 — trocar:
```jsx
className="skill-img w-[70px] h-[70px] object-contain"
```
Por:
```jsx
className="skill-img w-[50px] h-[50px] md:w-[70px] md:h-[70px] object-contain"
```

- [ ] **Step 4: Verificar visualmente**

Testar 375px: deve mostrar 2 colunas de cards  
Testar 640px: deve mostrar 3 colunas  
Testar 1024px+: deve mostrar 4 colunas

- [ ] **Step 5: Commit**

```bash
git add src/components/Skills.jsx
git commit -m "feat: make Skills grid responsive"
```

---

### Task 4: Projects — Grid Responsivo

**Files:**
- Modify: `src/components/Projects.jsx`

**Interfaces:**
- Consumes: nada de tarefas anteriores
- Produces: grid de projetos que vai de 1 coluna (mobile) a 4 colunas (desktop wide)

- [ ] **Step 1: Atualizar o grid**

Linha 67 — trocar:
```jsx
<div className="grid grid-cols-4 gap-6 mx-auto items-start">
```
Por:
```jsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mx-auto items-start">
```

- [ ] **Step 2: Verificar visualmente**

Testar 375px: 1 coluna (cards full width)  
Testar 640px: 2 colunas  
Testar 1024px: 3 colunas  
Testar 1280px+: 4 colunas

- [ ] **Step 3: Commit**

```bash
git add src/components/Projects.jsx
git commit -m "feat: make Projects grid responsive"
```

---

### Task 5: Contact — Ajustes Responsivos

**Files:**
- Modify: `src/components/Contact.jsx`

**Interfaces:**
- Consumes: nada de tarefas anteriores
- Produces: seção Contact com tipografia e espaçamento responsivos

- [ ] **Step 1: Atualizar o título**

Linha 42 — trocar:
```jsx
<h2 className="text-[40px] font-bold text-[#1E2235] mt-0 mb-4">Get In Touch</h2>
```
Por:
```jsx
<h2 className="text-[32px] md:text-[40px] font-bold text-[#1E2235] mt-0 mb-4">Get In Touch</h2>
```

- [ ] **Step 2: Atualizar o gap do grid**

Linha 38 — trocar:
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
```
Por:
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
```

- [ ] **Step 3: Verificar visualmente**

Testar 375px:
- Formulário abaixo do texto (já funciona com `grid-cols-1`)
- Título menor (`32px`)
- Em 768px+: layout lado a lado com gap maior

- [ ] **Step 4: Commit**

```bash
git add src/components/Contact.jsx
git commit -m "feat: adjust Contact section for mobile"
```

---

## Verificação Final

Após todos os commits:

- [ ] Rodar `npm run dev`
- [ ] Testar cada seção em 375px (iPhone SE), 768px (iPad), 1280px (desktop)
- [ ] Confirmar que o hamburger menu abre/fecha corretamente e fecha ao clicar em links
- [ ] Confirmar que o `npm run build` passa sem erros: `npm run build`
