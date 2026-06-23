# 04 — Implementação em Next.js + Tailwind + Framer Motion

Diretrizes para migrar o protótipo `index.html` para uma stack de produção. O HTML serve como **fonte de verdade visual**; abaixo está o mapeamento para componentes.

---

## A. Stack e estrutura

```
app/
  layout.tsx            # fonts, metadata, JSON-LD
  page.tsx              # composição das seções
components/
  Nav.tsx
  Hero.tsx
  Console.tsx           # board room digital (hero visual)
  PainPoints.tsx        # dor do C-level
  OneBusinessBoard.tsx  # hub central + conectores
  Verticals.tsx
  Methodology.tsx
  Results.tsx
  TaxDiagnostic.tsx     # client component (estado + gauge)
  Authority.tsx
  FinalCTA.tsx
  Faq.tsx
  Footer.tsx
  ui/
    Reveal.tsx          # wrapper de animação (Framer Motion)
    Button.tsx
    Eyebrow.tsx
    SectionHeading.tsx
lib/
  motion.ts             # variants compartilhados
  copy.ts               # textos centralizados (i18n-ready)
```

- **App Router**, a maioria das seções como **Server Components** (estáticas → SSG).
- `TaxDiagnostic`, `Nav` (toggle), `Console`/contadores e `Reveal` são **Client Components** (`"use client"`).
- `next/font/google` para self-host de **Cormorant Garamond** e **Inter** (zero CLS, sem request externo).

---

## B. Tailwind — tokens

`tailwind.config.ts`:

```ts
import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy:  { DEFAULT: "#0A1733", 2: "#162A5C", 3: "#0E1E45" },
        gold:  { DEFAULT: "#C8A96B", 2: "#DABE89", deep: "#A98A4F" },
        snow:  "#FFFFFF",
        mist:  "#F7F8FA",
        cloud: "#EAECEF",
        line:  "#E3E6EB",
        ink:   { DEFAULT: "#0A1733", soft: "#54607A", mute: "#8791A6" },
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        sans:  ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      letterSpacing: { eyebrow: "0.26em" },
      borderRadius:  { xs: "2px", sm: "3px", md: "6px", lg: "8px" },
      boxShadow: {
        card: "0 24px 50px -28px rgba(10,23,51,0.28)",
        lift: "0 40px 90px -40px rgba(10,23,51,0.6)",
      },
      transitionTimingFunction: { exec: "cubic-bezier(0.16,1,0.3,1)" },
      maxWidth: { wrap: "1240px" },
    },
  },
  plugins: [],
} satisfies Config;
```

`app/layout.tsx` (fonts + metadata + JSON-LD):

```tsx
import { Cormorant_Garamond, Inter } from "next/font/google";

const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["400","500","600"], style:["normal","italic"], variable: "--font-cormorant" });
const inter = Inter({ subsets: ["latin"], weight: ["300","400","500","600","700"], variable: "--font-inter" });

export const metadata = {
  title: "NEWENTER — Inteligência Empresarial, Governança e Performance",
  description: "Plataforma integrada de inteligência empresarial que conecta contabilidade estratégica, controladoria, tributação, compliance e governança em uma única visão executiva.",
  alternates: { canonical: "https://www.newenter.com.br/" },
  openGraph: { type: "website", locale: "pt_BR", siteName: "NEWENTER", title: "NEWENTER — Inteligência Empresarial", description: "Transformamos obrigações em inteligência para decisões empresariais." },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="bg-snow text-ink font-sans antialiased">
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context":"https://schema.org","@type":"ProfessionalService","name":"NEWENTER",
          "areaServed":["Brasil","América Latina"],"slogan":"Transformamos obrigações em inteligência para decisões empresariais."
        })}} />
      </body>
    </html>
  );
}
```

---

## C. Framer Motion — variants compartilhados

`lib/motion.ts`:

```ts
import type { Variants } from "framer-motion";

export const reveal: Variants = {
  hidden: { opacity: 0, y: 26 },
  show:   { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } },
};

export const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};
```

`components/ui/Reveal.tsx`:

```tsx
"use client";
import { motion, useReducedMotion } from "framer-motion";
import { reveal } from "@/lib/motion";

export function Reveal({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      variants={reveal}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -40px 0px" }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}
```

> **Sempre** respeitar `useReducedMotion()` — coerente com o `prefers-reduced-motion` do protótipo.

---

## D. Padrões de componente (exemplos)

**Botão** (`components/ui/Button.tsx`):

```tsx
const styles = {
  gold:  "bg-gold text-navy font-semibold hover:bg-gold-2 hover:-translate-y-0.5 hover:shadow-[0_16px_38px_-14px_rgba(200,169,107,0.6)]",
  navy:  "bg-navy text-white hover:bg-navy-2 hover:-translate-y-0.5",
  ghost: "border border-line text-navy hover:bg-mist",
  ghostLight: "border border-white/30 text-white hover:border-gold hover:text-gold-2",
};
// radius-xs, px-7 py-4, transition-all duration-300 ease-exec, inline-flex items-center gap-3
```

**Seção CTA com seta animada:**

```tsx
<a className="group ...">
  Solicitar Diagnóstico Executivo
  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
</a>
```

**One Business Board (conectores):** portar a função `drawBoardLines()` para um hook `useBoardLines(ref)` que usa `ResizeObserver` + `getBoundingClientRect` para desenhar as `<line>` SVG entre pilares e núcleo; desabilitar `< md` (mobile vira empilhado). Alternativa: usar pseudo-elementos/`framer-motion` `pathLength` para o draw das linhas.

**TaxDiagnostic (client):** estado controlado (`faturamento`, `regime`, `setor`, `estagio`); a função de cálculo do índice (ver `index.html` → `gerarDiagnostico`) vira `computeEfficiency(input): { index, headline, sub, points }`. Gauge animado com `framer-motion` (`strokeDashoffset`) e `animate` do número. **Nunca exibir economia em R$** — apenas índice + pontos + CTA.

---

## E. Performance & Core Web Vitals
- `next/font` (sem FOIT/FOUT), `display: swap`.
- `next/image` para qualquer imagem futura; SVGs inline para ícones (sem libs pesadas) ou `lucide-react` tree-shakeable.
- Lazy/`dynamic()` para seções abaixo da dobra que usam Framer Motion.
- Evitar animar `width/top/left` em produção — preferir `transform`/`opacity` (GPU).
- Lighthouse alvo: **95+** em Performance/SEO/Best Practices/Accessibility.

## F. Acessibilidade
- Hierarquia de headings preservada (1×H1, H2 por seção).
- Foco visível, navegação por teclado no acordeão FAQ e modais.
- Contraste AA (texto sobre navy usa branco ≥74% de opacidade).
- `aria-expanded` no FAQ; `aria-label` no toggle de menu; `role="dialog"` no modal de privacidade.

## G. Internacionalização (futuro)
- Centralizar copy em `lib/copy.ts` (ou `next-intl`) — o posicionamento "Brasil + América Latina" abre caminho para **PT/ES**. Estruturar com `params.locale` no App Router.
