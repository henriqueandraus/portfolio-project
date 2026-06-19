# Design: Migração do Portfolio para React.js

**Data:** 2026-06-19
**Status:** Aprovado

---

## Objetivo

Migrar o site de portfolio (HTML/CSS/JS vanilla + Tailwind CDN) para uma aplicação React usando Vite como build tool e Tailwind CSS instalado via npm. O visual, conteúdo e animações devem ser mantidos fielmente. Os projetos reais do GitHub do autor serão adicionados substituindo os placeholders.

---

## Stack

| Ferramenta | Versão | Função |
|---|---|---|
| Vite | latest | Build tool e dev server |
| React | 18 | UI framework |
| Tailwind CSS | latest | Estilização via npm + PostCSS |
| PostCSS | latest | Processador CSS para Tailwind |

---

## Estrutura de Pastas

```
Portfolio Project/
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── About.jsx
│   │   ├── Skills.jsx
│   │   ├── Projects.jsx
│   │   ├── Contact.jsx
│   │   └── Footer.jsx
│   ├── data/
│   │   ├── skills.js
│   │   └── projects.js
│   ├── hooks/
│   │   └── useFadeUp.js
│   ├── assets/
│   │   └── images/         ← migrado de Resources/images/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html              ← template do Vite
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

**Arquivos legados removidos após migração:** `style.css`, `script.js`, pasta `Resources/`

---

## Dados

### `src/data/projects.js`

Array de objetos com os 3 projetos reais do GitHub:

```js
[
  {
    title: "Message Generator CLI",
    description: "A command-line application built with Node.js that generates motivational and random messages directly in the terminal. The project was published as an NPM package and focuses on JavaScript fundamentals, package publishing, and CLI development.",
    tags: ["JavaScript", "Node.js", "NPM"],
    githubUrl: "https://github.com/henriqueandraus/message-generator"
  },
  {
    title: "Jammming",
    description: "Web app to search for songs and create custom playlists synced directly to your Spotify account. Built with React + Vite and integrated with the Spotify Web API.",
    tags: ["React", "Vite", "Spotify API", "CSS Modules"],
    githubUrl: "https://github.com/henriqueandraus/Jammming"
  },
  {
    title: "Threadly",
    description: "A modern Reddit client that lets users browse posts by subreddit, switch between list and grid views, search by category, and read comment threads. Supports dark mode and responsive layouts.",
    tags: ["React", "Redux", "Vite", "Jest"],
    githubUrl: "https://github.com/henriqueandraus/reddit-app"
  }
]
```

### `src/data/skills.js`

Array das 8 skills atuais (HTML5, CSS3, JavaScript, Figma, Git, Node.js, React, GitHub), cada item com `name` e `icon` (importado como asset do Vite).

---

## Componentes

### `Header`
- Navbar sticky com logo e links de navegação
- Shadow on scroll: `useEffect` com `window.addEventListener('scroll', ...)` + `useState(scrolled)`
- Cleanup do event listener no return do `useEffect`

### `About`
- Hero com foto (float animation), badge, título, parágrafo e botões CTA
- Animações de entrada (`fadeInLeft`, `fadeInRight`) aplicadas via classes CSS em `index.css`

### `Skills`
- Importa array de `skills.js`
- Mapeia para grid de cards com ícone SVG e nome
- Recebe animação fade-up via hook `useFadeUp`

### `Projects`
- Importa array de `projects.js`
- Mapeia para grid de cards
- Cada card tem: título, descrição com "Read More / Read Less" via `useState` local, tags e link para o GitHub
- Recebe animação fade-up via hook `useFadeUp`

### `Contact`
- Seção estática com link `mailto:`
- Recebe animação fade-up via hook `useFadeUp`

### `Footer`
- Rodapé estático com copyright

---

## Hook `useFadeUp`

Encapsula o `IntersectionObserver` atual do `script.js`. Retorna uma `ref` e uma classe CSS condicional. Componentes que precisam da animação chamam o hook e aplicam a ref ao elemento raiz.

```js
// uso em um componente
const { ref, className } = useFadeUp();
return <section ref={ref} className={className}>...</section>;
```

---

## CSS (`index.css`)

Mantém todas as animações customizadas do `style.css` atual:
- `@keyframes fadeInLeft` / `fadeInRight` — entrada do hero
- `@keyframes float` — flutuação da foto
- `.fade-up` / `.fade-up.visible` — animação de scroll
- `.stagger-1` a `.stagger-8` — delays escalonados para os cards
- `.sticky-wrapper.scrolled` — shadow do header
- `.skill-img` com filter SVG e hover scale
- `.project-description.expanded` — expand do Read More

Adiciona as directives do Tailwind no topo:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

## Configuração do Tailwind

```js
// tailwind.config.js
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: { extend: {} },
  plugins: [],
}
```

---

## Processo de Migração (Ordem)

1. `npm create vite@latest . -- --template react` na pasta atual
2. Instalar dependências: `npm install`
3. Instalar Tailwind: `npm install -D tailwindcss postcss autoprefixer` + `npx tailwindcss init -p`
4. Configurar `tailwind.config.js` e `index.css`
5. Mover imagens de `Resources/images/` → `src/assets/images/`
6. Criar `src/data/skills.js` e `src/data/projects.js`
7. Criar `src/hooks/useFadeUp.js`
8. Criar os 6 componentes
9. Montar `App.jsx` e `main.jsx`
10. Deletar arquivos legados (`style.css`, `script.js`, `Resources/`)

---

## Critérios de Sucesso

- Visual idêntico ao atual (cores, layout, animações, tipografia)
- Os 3 projetos reais aparecem na seção Projects com link para o GitHub
- `npm run dev` sobe o dev server sem erros
- `npm run build` gera o build de produção sem erros
