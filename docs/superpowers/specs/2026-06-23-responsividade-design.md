# Responsividade do Portfolio — Design Spec

**Data:** 2026-06-23  
**Abordagem:** Tailwind Mobile-First puro (prefixos `sm:`, `md:`, `lg:`, `xl:`)  
**Breakpoints ativos:** `md` (768px) para header, `sm`/`lg`/`xl` para grids

---

## Header

- Hamburger menu (`☰`/`✕`) visível em `< md` via `md:hidden`
- Nav links horizontais visíveis em `md:flex`, escondidos em mobile (`hidden md:flex`)
- Menu mobile: `absolute top-full left-0 w-full bg-[#1E2235]`, links empilhados `flex-col py-4 text-center`
- "Based in Curitiba, Brazil": `hidden md:block` — removido do mobile por falta de espaço
- Estado do menu controlado por `useState` (já presente no componente)

## About (Hero)

- Layout: `flex-col` mobile → `md:flex-row`
- Gap: `gap-10 md:gap-[100px]`
- Imagem: `w-full max-w-[340px] h-[300px] mx-auto` → `md:w-[460px] md:h-[400px]`
- Texto: `text-center md:text-left`
- Título: `text-[36px] md:text-[50px]`
- Botões: `flex-col sm:flex-row`

## Skills

- Grid: `grid-cols-2 sm:grid-cols-3 lg:grid-cols-4`
- Cards: padding `p-5 md:p-8`, ícone `w-[50px] h-[50px] md:w-[70px] md:h-[70px]`

## Projects

- Grid: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`
- `max-w-[1600px]` mantido

## Contact

- Título: `text-[32px] md:text-[40px]`
- Gap: `gap-10 md:gap-16`
- Resto já responsivo com `md:grid-cols-2`

## Footer

- Sem alterações necessárias.
