# 02 — Wireframe, Arquitetura UX/UI, Conversão Enterprise e SEO

---

## A. Wireframe detalhado (low-fi)

Layout desktop (≥1080px). Tudo dentro de um container central de `max-width: 1240px`.

```
┌───────────────────────────────────────────────────────────────┐
│ NAV (fixa, transparente → sólida no scroll)                    │
│ NEWENTER.        [links de seção]        [ Diagnóstico Exec. ] │
└───────────────────────────────────────────────────────────────┘

① HERO  — fundo navy + grid sutil + halo dourado            (100vh)
┌────────────────────────────┬──────────────────────────────────┐
│ • Brasil · América Latina  │   ┌── CONSOLE (Board Room) ───┐   │
│ H1 serif (3 linhas)        │   │ One Business Board · live  │   │
│ subheadline                │   │ [KPI][KPI][KPI]            │   │
│ [Diagnóstico][Reunião]     │   │ gráfico dourado            │   │
│ ── pilares · pilares ──    │   │ chips de governança       │   │
└────────────────────────────┴───└────────────────────────────┘──┘

② DOR DO C-LEVEL — fundo mist
   eyebrow / H2 / lead
   ┌──────┬──────┬──────┐
   │ 01   │ 02   │ 03   │   (grid 3×2, bordas finas)
   ├──────┼──────┼──────┤
   │ 04   │ 05   │ 06   │
   └──────┴──────┴──────┘
   [ faixa navy: "Origem comum → ausência de visão integrada" ]

③ ONE BUSINESS BOARD — fundo branco  (SEÇÃO PRINCIPAL)
   eyebrow / H2 / lead (centralizados)
   ┌─────────┐        ┌──────────────┐        ┌─────────┐
   │ pilar 1 │╲       │              │       ╱│ pilar 4 │
   ├─────────┤ ╲──────│  NÚCLEO      │──────╱ ├─────────┤
   │ pilar 2 │────────│  One Business│────────│ pilar 5 │
   ├─────────┤ ╱──────│  Board       │──────╲ ├─────────┤
   │ pilar 3 │╱       │  (6·1·∞)     │       ╲│ pilar 6 │
   └─────────┘        └──────────────┘        └─────────┘
   (linhas SVG conectando cada pilar ao núcleo)

④ ESPECIALIZAÇÕES — fundo navy
   ┌──────────────────────┬──────────────────────┐
   │ Vertical 01          │ Vertical 02          │
   │ Comércio Exterior    │ Hotelaria            │
   │ • 5 itens            │ • 5 itens            │
   └──────────────────────┴──────────────────────┘

⑤ METODOLOGIA — fundo mist
   ●───────●───────●───────●───────●
   I       II      III     IV      V
   linha executiva horizontal de 5 etapas
   [ fecho em itálico serif ]

⑥ RESULTADOS — fundo branco
   grid 3×2 de cards com ícone + título + 1 linha

⑦ DIAGNÓSTICO TRIBUTÁRIO — card central elevado
   eyebrow / H2 / texto
   [faturamento][regime]
   [setor][estágio]
   [ Gerar análise preliminar ]
   ── resultado (navy) ──
   ( gauge | índice + headline + sub )
   • pontos de atenção
   disclaimer
   [ Receber Diagnóstico Executivo ]

⑧ AUTORIDADE — fundo branco
   ┌─ stats 2×2 ─┐   │  • Atuação Brasil/AL
   │ 1 · 6       │   │  • Especialização setorial
   │ 2 · 5       │   │  • Metodologia proprietária
   └─────────────┘   │  • Ecossistema integrado

⑨ CTA FINAL — fundo navy + grid
   H2 / sub / [Diagnóstico][Reunião]
   faixa: Atuação · Relacionamento · Atendimento

⑩ FAQ — fundo mist, acordeão (1 aberto por vez)

FOOTER — navy escuro, 4 colunas + LGPD + crédito
[ Floating CTA: Diagnóstico Executivo ]  [ Cookie banner LGPD ]
```

Mobile (≤960px): tudo em coluna única. O diagrama do Board vira **núcleo no topo + 6 pilares empilhados** (linhas SVG ocultas). A metodologia vira lista vertical numerada. Nav vira menu hambúrguer.

---

## B. Arquitetura UX/UI

### Princípios
1. **Altitude executiva.** Hierarquia tipográfica forte (serif display + sans neutra), muito espaço em branco, linhas de 1px, nada de "card party". O luxo está na contenção.
2. **Ritmo de fundo alternado.** `navy → mist → branco → navy → mist → branco → mist → branco → navy → mist`. O contraste cria capítulos e sensação de "Board Room".
3. **Dourado como pontuação, não como preenchimento.** Acento `#C8A96B` reservado a detalhes (eyebrows, ícones em hover, gauge, linhas de conexão). Nunca grandes áreas douradas.
4. **Uma ação por seção.** Cada bloco conduz a um único próximo passo, sempre convergindo para *Diagnóstico Executivo*.
5. **Prova por estrutura, não por gritos.** Em vez de "+300 clientes / 98%", credibilidade vem de método, verticais, cobertura regional e do próprio produto (One Business Board).

### Grid e espaçamento
- Container `1240px`; gutters laterais `6%`.
- Seções: `padding-block: 118px` (desktop) → `84px` (mobile).
- Cabeçalho de seção: `max-width: 760px`, margem inferior `64px`.
- Grid base de 12 colunas conceituais; na prática, `grid-template-columns` específicos por seção (ver `index.html`).

### Componentes-chave
| Componente | Função UX |
|---|---|
| **Nav transparente→sólida** | Imersão no hero; orientação após o scroll. |
| **Console (hero)** | Materializa o produto "Board Room Digital" em 1 olhar. |
| **Board Hub** | Explica o conceito central por diagrama, não por texto. |
| **Gauge do diagnóstico** | Traduz "inteligência" em indicador visual sóbrio. |
| **Acordeão FAQ** | Remove objeção sem poluir a página. |

---

## C. Estratégia de conversão Enterprise

> Ciclo B2B longo, comitê de decisão (CFO/CEO/conselho), ticket alto. A conversão não é impulso — é **construção de confiança + baixa fricção para o primeiro contato qualificado**.

### Funil
1. **Topo (Hero):** posicionar e qualificar em 5 segundos ("isto é para empresas como a minha"). Dois CTAs: ação (Diagnóstico) e consideração (Reunião).
2. **Meio (Dor → Board → Verticais → Metodologia → Resultados):** construir a tese de valor — problema → solução integrada → especialização → método → impacto.
3. **Ferramenta de engajamento (Diagnóstico Tributário):** micro-compromisso de baixo risco que entrega valor imediato (índice + insights) e captura intenção. **Vende inteligência, não desconto.**
4. **Fundo (Autoridade → CTA Final → FAQ):** remover risco percebido e converter para conversa com especialista.

### Conversões (CTAs) — hierarquia
- **Primária (macro):** `Solicitar Diagnóstico Executivo` (hero, diagnóstico, CTA final, nav, floating, footer).
- **Secundária:** `Agendar Reunião Estratégica`.
- **Micro:** preencher e gerar a análise preliminar; abrir FAQ; rolar até o Board.

### Boas práticas aplicadas
- **Sem fricção desnecessária:** o diagnóstico não exige e-mail para mostrar o índice — pede o contato só no CTA de aprofundamento.
- **Linguagem do comprador:** "previsibilidade", "exposição", "governança", "due diligence" — vocabulário de CFO/conselho.
- **Consistência de promessa:** todo CTA leva ao mesmo destino (#contato / WhatsApp executivo), reduzindo ambiguidade.
- **Confiança institucional:** LGPD, política de privacidade e tom sóbrio sinalizam maturidade.

### Métricas sugeridas (quando instrumentar)
- Taxa de início e de conclusão do Diagnóstico Tributário.
- Cliques em "Solicitar Diagnóstico Executivo" por seção (atribuição de origem).
- Scroll-depth até a seção Board e até o CTA final.
- Tempo na página e taxa de retorno (ciclo longo).
- Eventos de microconversão → CRM (lead qualificado por porte/setor/estágio informados no diagnóstico).

---

## D. Estrutura SEO

### On-page (já no `index.html`)
- `<title>`: **NEWENTER — Inteligência Empresarial, Governança e Performance**
- `meta description`: foco em "plataforma integrada… visão executiva… Brasil e América Latina".
- `meta keywords`, `author`, `theme-color`, `canonical`.
- **Open Graph** completo (`og:title`, `og:description`, `og:url`, `og:type`, `og:locale=pt_BR`).
- **JSON-LD** `ProfessionalService` com `areaServed`, `knowsAbout`, `slogan`.
- **Um único `<h1>`** (hero). H2 por seção; H3 nos blocos. Hierarquia semântica limpa.
- `lang="pt-BR"`, `prefers-reduced-motion`, contraste AA, `alt`/`aria` nos elementos relevantes.

### Arquitetura de informação / palavras-chave
| Intenção | Termos-alvo |
|---|---|
| Categoria | inteligência empresarial, governança corporativa, controladoria, BI |
| Dor | planejamento tributário, compliance, passivo tributário, previsibilidade financeira |
| Vertical CE | contabilidade comércio exterior, regimes aduaneiros, drawback, benefícios fiscais |
| Vertical Hotelaria | controladoria hoteleira, pool hoteleiro, lucro real hotelaria, A&B |
| Persona | contabilidade para CFO, holding, family office, grupo empresarial |

### Roadmap SEO (pós-MVP)
1. **Migração para Next.js** → SSR/SSG para indexação e Core Web Vitals (ver doc 04).
2. **Sitemap.xml + robots.txt** e Google Search Console.
3. **Blog/Insights institucional** (autoridade temática): artigos por vertical e por dor de C-level.
4. **Páginas de pilar** dedicadas: `/comercio-exterior`, `/hotelaria`, `/controladoria`, com JSON-LD `Service`.
5. **Performance:** `next/font` (self-host das fontes), `next/image`, lazy de seções abaixo da dobra.
6. **Schema adicional:** `FAQPage` (a partir do bloco FAQ) e `BreadcrumbList` nas páginas internas.
