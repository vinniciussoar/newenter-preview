# 03 — Design System · Paleta · Tipografia · Microinterações

Conceito visual: **Board Room Digital** — sala de conselho, centro de controle, inteligência de negócios. Elegante, minimalista, premium, institucional. Animações discretas.

---

## A. Paleta de cores

### Primárias / institucionais
| Token | Hex | Uso |
|---|---|---|
| `--navy` | `#0A1733` | **Azul Executivo** — primária. Fundos imersivos, texto sobre claro, botões. |
| `--navy-2` | `#162A5C` | Secundária. Gradientes, hovers de botão. |
| `--navy-3` | `#0E1E45` | Intermediária para gradientes. |

### Acento
| Token | Hex | Uso |
|---|---|---|
| `--gold` | `#C8A96B` | **Dourado institucional** — acento. Pontuação fina: eyebrows, ícones em hover, gauge, conexões. |
| `--gold-2` | `#DABE89` | Dourado claro (texto/realce sobre navy). |
| `--gold-deep` | `#A98A4F` | Dourado profundo (texto sobre claro, ênfase em títulos). |

### Neutros
| Token | Hex | Uso |
|---|---|---|
| `--snow` | `#FFFFFF` | Base clara. |
| `--mist` | `#F7F8FA` | Seções alternadas. |
| `--cloud` | `#EAECEF` | Superfícies/divisores. |
| `--line` | `#E3E6EB` | Bordas de 1px. |

### Texto
| Token | Hex | Uso |
|---|---|---|
| `--ink` | `#0A1733` | Texto principal sobre claro. |
| `--ink-soft` | `#54607A` | Texto secundário. |
| `--ink-mute` | `#8791A6` | Texto terciário/legendas. |
| sobre navy | `#FFFFFF` / `rgba(255,255,255,.74)` / `.50` | Texto on-dark, soft, mute. |

**Regras de uso**
- Evitar cores vibrantes e aparência de startup. **Nada de magenta/verde-neon.**
- Dourado em **detalhe**, nunca em grandes áreas.
- Contraste mínimo AA; texto institucional preferencialmente em peso 300–400.
- Gradientes apenas navy↔navy-2, com halos dourados de baixa opacidade (`rgba(200,169,107,0.1–0.16)`).

---

## B. Tipografia

| Papel | Família | Pesos | Observação |
|---|---|---|---|
| **Display / títulos** | `Cormorant Garamond` (serif) | 400–600, itálico | Autoridade financeira; alternativa ao Canela/Playfair. Ênfase em itálico dourado. |
| **Texto / UI** | `Inter` (sans) | 300–700 | Neutra, executiva. Labels em `uppercase` + `letter-spacing`. |

> Opções equivalentes do brief: títulos em **Canela / Cormorant Garamond / Playfair Display**; textos em **Inter / Neue Haas Grotesk / Suisse International**. Foi escolhido **Cormorant Garamond + Inter** por disponibilidade aberta (Google Fonts) e fidelidade ao tom.

### Escala (clamp responsivo)
| Estilo | Tamanho | Família/peso |
|---|---|---|
| H1 (hero) | `clamp(2.7rem, 5.3vw, 4.4rem)` / line 1.06 | Cormorant 500 |
| H2 (seção) | `clamp(2.1rem, 4.4vw, 3.5rem)` / line 1.08 | Cormorant 500 |
| H3 (card) | `1.4–2rem` | Cormorant 600 |
| Eyebrow | `12px` · `letter-spacing .26em` · uppercase | Inter 600, dourado |
| Lead | `1.08rem` / line 1.75 | Inter 300 |
| Body | `0.92–1rem` / line 1.6–1.75 | Inter 300–400 |
| Label/KPI | `10–12px` uppercase | Inter 600 |

**Padrões**
- Ênfase nos títulos: `<em>` em itálico, cor dourada (`--gold-deep` no claro / `--gold-2` no escuro).
- Números e KPIs em serif (Cormorant) para sofisticação editorial.
- `font-feature-settings:"ss01","cv05"` no Inter para um traço mais institucional.

---

## C. Componentes (resumo do Design System)

| Componente | Especificação |
|---|---|
| **Botão primário (gold)** | bg `--gold`, texto `--navy`, radius `2px`, `padding 16×30`, hover → `--gold-2` + lift 2px. |
| **Botão primário (navy)** | bg `--navy`, texto branco, hover → `--navy-2`. |
| **Botão ghost** | borda `--line` (claro) / `rgba(255,255,255,.28)` (escuro), hover dourado. |
| **Card** | bg branco, borda 1px `--line`, radius `5–6px`, hover: borda dourada + sombra `0 24px 50px -28px rgba(10,23,51,.28)` + lift. Acento lateral/superior dourado que cresce em hover. |
| **Eyebrow** | rótulo uppercase com risco dourado de 26px antes do texto. |
| **Gauge** | círculo SVG r=54, trilho 9px, preenchimento gradiente dourado, número em serif. |
| **Console/KPI** | superfícies translúcidas sobre navy, barras com fill animado, "blip" de tempo real. |
| **Inputs** | bg `--mist`, borda 1px, foco navy + halo `rgba(10,23,51,.06)`. Radius `3px`. |

**Raio de borda:** `2–3px` (botões/inputs), `5–8px` (cards/superfícies). Geometria sóbria, quase arquitetônica — nada arredondado demais.

**Sombras:** sempre frias e profundas (`rgba(10,23,51,…)`), com offset alto e blur grande, opacidade baixa. Luxo = sombra difusa, não dura.

---

## D. Microinterações (discretas — "nada chamativo")

| Interação | Comportamento | Timing |
|---|---|---|
| **Reveal on scroll** | fade + `translateY(26px)→0`, via IntersectionObserver | `1s cubic-bezier(.16,1,.3,1)`, stagger 60–80ms |
| **Nav scroll** | transparente → fundo branco + blur + sombra | `.35s` |
| **Hover de card** | lift `-3 a -5px` + borda dourada + acento que cresce | `.5s cubic-bezier(.16,1,.3,1)` |
| **Botão** | lift `-2px` + sombra; seta `translateX(4px)` | `.4s` |
| **KPI bars** | `width: 0 → valor` ao entrar na viewport | `1.4s` |
| **Count-up** | KPIs e stats contam de 0 ao valor (easing cúbico) | `1.2–1.3s` |
| **Board Hub** | linhas SVG douradas tracejadas com `dashmove` + fade-in das conexões | dash 22s loop |
| **Gauge** | `stroke-dashoffset` anima até o índice; número conta junto | `1.3s` |
| **Anel do núcleo** | rotação contínua lenta de um anel pontilhado | `14s linear` |
| **"Blip" tempo real** | pulso suave de opacidade/halo | `2.4s` |

**Regras de movimento**
- Tudo deve poder ser ignorado: `@media (prefers-reduced-motion: reduce)` zera animações e revela conteúdo.
- Sem bounce, sem escalas exageradas, sem parallax agressivo. Easing padrão `cubic-bezier(.16,1,.3,1)` (saída suave, entrada confiante).
- Movimento serve à **leitura e à hierarquia**, nunca ao espetáculo.
