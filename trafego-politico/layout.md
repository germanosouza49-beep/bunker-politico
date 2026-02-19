# Layout Spec - Trafego Politico

## Design System (Referencia Global)

### Paleta de Cores
- `--bg-primary: #0c0c14` (fundo principal)
- `--bg-secondary: #12121e` (fundo secoes alternadas)
- `--bg-tertiary: #1a1a2e` (fundo de destaque)
- `--bg-card: #14142a` (cards)
- `--bg-card-hover: #1e1e38` (cards hover)
- `--text-primary: #f5f5f7` (texto principal)
- `--text-secondary: #a0a0b0` (texto secundario)
- `--text-muted: #5c5c70` (texto apagado)
- `--accent: #7B2FF2` (roxo principal)
- `--accent-light: #9B5FF6` (roxo claro)
- `--accent-dim: #6A1FE0` (roxo hover)
- `--accent-glow: rgba(123, 47, 242, 0.15)` (glow roxo)
- `--accent-glow-strong: rgba(123, 47, 242, 0.30)` (glow forte)
- `--navy: #2B2D42` (navy da marca)
- `--navy-light: #3D3F56` (navy claro)
- `--danger: #ef4444` (vermelho erro/problema)
- `--danger-dim: rgba(239, 68, 68, 0.12)` (vermelho fundo)

### Fontes
- Heading: Clash Display (Fontshare) - pesos 500, 600, 700
- Body: General Sans (Fontshare) - pesos 400, 500, 600

### Espacamentos
- `--space-xs: 0.5rem` | `--space-sm: 1rem` | `--space-md: 1.5rem`
- `--space-lg: 2.5rem` | `--space-xl: 4rem` | `--space-2xl: 6rem` | `--space-3xl: 8rem`

### Container
- `--container-max: 1280px`
- `--container-narrow: 960px`
- `--gutter: clamp(1.25rem, 4vw, 3rem)`

### Breakpoints
- Desktop: > 1024px
- Tablet: 768px - 1024px
- Mobile: < 768px
- Small mobile: < 480px

---

## Secao 1: Hero (JA IMPLEMENTADO)

- Arquetipo: Hero Dominante (centralizado empilhado)
- Constraints: Headline >150px (Tipografia), Dark Mode (Cor), Noise Texture (Efeitos)
- Badge "Eleicoes 2026" com dot pulsante + headline + subheadline centralizados
- VSL player abaixo (max-width 800px)
- CTA aparece apos timer da VSL
- Glow radial roxo no canto superior direito

---

## Secao 2: Barra de Urgencia (JA IMPLEMENTADO)

- Marquee infinito com texto duplicado
- Background `--bg-secondary` com bordas `--border`
- Texto com destaques em `--accent`

---

## Secao 3: O Problema (JA IMPLEMENTADO)

- Arquetipo: Stagger Vertical
- Constraints: Hover Lift (Interacao), Selective Color (Cor)
- Cards empilhados com icone SVG vermelho + titulo + texto
- AOS fade-up com stagger delay

---

## Secao 4: O Que Entregamos

### Arquetipo e Constraints
- Arquetipo: **Bento Box** -- celulas de tamanhos variados criando composicao assimetrica
- Constraints: **Glassmorphism** (Efeitos Especiais), **Hover Glow** (Interacao), **Gradiente em Texto** (Tipografia)
- Justificativa: O Bento Box cria hierarquia visual entre os 4 servicos sem cair no padrao generico de 4 cards iguais. O servico principal (Gestao de Anuncios no Meta) ocupa mais espaco, comunicando importancia. Glassmorphism reforpca a sofisticacao da marca.

### Conteudo
- Titulo da secao: "Trafego pago + consultoria estrategica para sua campanha"
- Card 1 (GRANDE): "Gestao de Anuncios no Meta" / "Criamos, gerenciamos e otimizamos suas campanhas no Instagram e Facebook com segmentacao geografica precisa para o seu eleitorado."
- Card 2: "Relatorios Semanais" / "Toda semana voce recebe um relatorio com resultados claros e direcionamento do que produzir: o que esta funcionando e o que precisa mudar."
- Card 3: "Planejamento de Verba" / "Definimos junto com voce a melhor forma de distribuir seu orcamento de midia ao longo de toda a campanha."
- Card 4: "Acompanhamento Quinzenal" / "Reunioes a cada 15 dias para revisar a evolucao, ajustar a estrategia e manter tudo no rumo certo."

### Layout
- Container: `max-width: 1280px`, `padding-inline: var(--gutter)`
- Grid Bento: `grid-template-columns: repeat(3, 1fr)`, `gap: 1.25rem`
- Card 1 (Gestao Meta): ocupa `grid-column: span 2`, `grid-row: span 2` -- card dominante
- Card 2 (Relatorios): `grid-column: span 1`, `grid-row: span 1`
- Card 3 (Planejamento): `grid-column: span 1`, `grid-row: span 1`
- Card 4 (Acompanhamento): `grid-column: span 3` -- barra horizontal embaixo
- Padding da secao: `padding-block: var(--space-3xl)` (8rem top/bottom)

### Tipografia
- Titulo da secao: Clash Display, 700, `clamp(2rem, 4vw, 3.5rem)`, line-height 1.15, letter-spacing -0.02em, color `--text-primary`. Palavra "campanha" em `--accent` via `<em>`
- Titulo do card grande: Clash Display, 600, `clamp(1.5rem, 2.5vw, 2rem)`, line-height 1.2, color `--text-primary`
- Titulo dos cards menores: Clash Display, 600, `clamp(1.1rem, 1.5vw, 1.35rem)`, line-height 1.25, color `--text-primary`
- Texto dos cards: General Sans, 400, `clamp(0.9rem, 1.1vw, 1rem)`, line-height 1.65, color `--text-secondary`

### Cores
- Background da secao: `--bg-primary` (#0c0c14)
- Background dos cards: `rgba(20, 20, 42, 0.6)` com `backdrop-filter: blur(12px)` (glassmorphism)
- Borda dos cards: `1px solid rgba(123, 47, 242, 0.1)` (roxo sutil)
- Borda hover: `1px solid rgba(123, 47, 242, 0.3)`
- Card grande: borda left `3px solid var(--accent)` como destaque lateral

### Elementos Visuais
- Cada card tem um icone SVG inline (24x24, stroke, `--accent`) no canto superior esquerdo do titulo
- Card 1 icone: grafico de barras (chart-bar)
- Card 2 icone: documento (document-text)
- Card 3 icone: moedas (currency-dollar)
- Card 4 icone: calendario (calendar)
- Card grande: sutil background gradient `linear-gradient(135deg, rgba(123,47,242,0.08) 0%, transparent 60%)`
- Numero indicador sutil no canto: "01", "02", "03", "04" em Clash Display, 700, 4rem, color `rgba(123,47,242,0.06)`, position absolute top-right

### Animacoes
- Titulo da secao: AOS `fade-up`, duration 700ms, easing ease-out-cubic, once true
- Cards: AOS `fade-up`, duration 700ms, stagger delay: Card1=0ms, Card2=100ms, Card3=200ms, Card4=300ms
- Glow na borda ao hover: `transition: border-color 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1)`

### Interatividade
- Hover card: `translateY(-4px)` + `box-shadow: 0 8px 32px rgba(123, 47, 242, 0.12)` + borda roxo 0.3
- Hover card grande: glow mais intenso `box-shadow: 0 12px 40px rgba(123, 47, 242, 0.18)`
- Hover icone do card: `color: var(--accent-light)`, transicao 0.3s

### Responsividade
- **Tablet (<=1024px):** Grid muda para `grid-template-columns: repeat(2, 1fr)`. Card1 ocupa `span 2`. Card4 ocupa `span 2`.
- **Mobile (<=768px):** Grid muda para `grid-template-columns: 1fr`. Todos os cards ocupam `span 1`. Padding secao: `4rem 0`.
- **Small mobile (<=480px):** Card padding reduzido para `1.25rem`.

---

## Secao 5: Como Funciona

### Arquetipo e Constraints
- Arquetipo: **Timeline** -- linha vertical com steps numerados, progressao visual clara
- Constraints: **Counter Animation** (Movimento), **Stagger** (Movimento), **Selective Color** (Cor)
- Justificativa: Timeline vertical comunica processo linear de forma clara. Os numeros grandes criam hierarquia visual e a linha conectora comunica progressao. Diferencia do Bento Box da secao anterior.

### Conteudo
- Titulo da secao: "Do primeiro contato a campanha rodando"
- Passo 1: "Reuniao Inicial" / "Entendemos seu cenario: cargo, regiao, concorrentes, orcamento. Saimos com um plano de acao."
- Passo 2: "Onboarding" / "Configuramos tudo: acesso ao gerenciador de anuncios, estrutura de campanhas, publicos e segmentacao."
- Passo 3: "Gestao Continua" / "Anuncios rodando, relatorios semanais, reunioes quinzenais. Voce foca na campanha, a gente cuida do digital."

### Layout
- Container: `max-width: 960px` (container narrow, centralizado)
- Padding secao: `padding-block: var(--space-3xl)` (8rem)
- Background: `--bg-secondary` (#12121e) para alternar com secao anterior
- Estrutura: Flexbox column, gap `3rem` entre steps
- Cada step: grid `grid-template-columns: 80px 3px 1fr`, gap `2rem`
- Coluna esquerda (80px): numero grande centralizado
- Coluna central (3px): linha vertical conectora
- Coluna direita: titulo + texto

### Tipografia
- Titulo da secao: Clash Display, 700, `clamp(2rem, 4vw, 3.5rem)`, line-height 1.15, letter-spacing -0.02em, color `--text-primary`, text-align center. "campanha rodando" em `--accent`
- Numero do step: Clash Display, 700, `clamp(2.5rem, 4vw, 3.5rem)`, color `--accent`, text-align center
- Titulo do step: Clash Display, 600, `clamp(1.2rem, 1.8vw, 1.5rem)`, line-height 1.3, color `--text-primary`
- Texto do step: General Sans, 400, `var(--fs-body)`, line-height 1.65, color `--text-secondary`

### Cores
- Background secao: `--bg-secondary` (#12121e)
- Linha conectora: gradiente vertical `linear-gradient(180deg, var(--accent) 0%, rgba(123,47,242,0.15) 100%)`
- Numero: `--accent` (#7B2FF2)
- Circulo ao redor do numero: `border: 2px solid rgba(123, 47, 242, 0.25)`, background `rgba(123, 47, 242, 0.08)`, `border-radius: 50%`, `width: 72px`, `height: 72px`

### Elementos Visuais
- Circulo com numero no centro (flexbox center center)
- Linha vertical de 3px conectando os circulos, com gradiente que vai de roxo forte (topo) para roxo fadeado (base)
- A linha para no ultimo step (sem prolongar alem)
- Sutil glow no circulo: `box-shadow: 0 0 20px rgba(123, 47, 242, 0.15)`

### Animacoes
- Titulo: AOS `fade-up`, 700ms, ease-out-cubic
- Cada step: AOS `fade-up`, stagger: Step1=0ms, Step2=150ms, Step3=300ms
- Numeros: CSS `counter-animation` -- numeros contam de 0 ao valor (01, 02, 03) usando JS simples com IntersectionObserver, duracao 600ms
- Linha conectora: `clip-path: inset(0 0 100% 0)` para `clip-path: inset(0)`, duracao 1200ms, ease-out, triggered no scroll via IntersectionObserver

### Interatividade
- Hover no step inteiro: numero scale `1.1` + glow mais forte `box-shadow: 0 0 30px rgba(123, 47, 242, 0.25)`, transicao 0.4s cubic-bezier(0.16, 1, 0.3, 1)

### Responsividade
- **Tablet (<=1024px):** Manter mesma estrutura, reduzir gap para `2rem`
- **Mobile (<=768px):** Grid muda para `grid-template-columns: 56px 3px 1fr`. Numero font-size: `2rem`. Circulo: `56px x 56px`. Step title: `1.15rem`.
- **Small mobile (<=480px):** Grid muda para `grid-template-columns: 48px 2px 1fr`. Gap `1rem`.

---

## Secao 6: Investimento

### Arquetipo e Constraints
- Arquetipo: **Split Vertical** -- dois planos lado a lado com enfase visual no plano recomendado
- Constraints: **Hover Lift** (Interacao), **Color Blocking** (Cor), **Overlap Elements** (Layout)
- Justificativa: Dois planos de preco lado a lado e o padrao mais intuitivo para comparacao. O plano Performance recebe destaque visual com borda accent e badge "Recomendado". Overlap do badge cria dinamismo.

### Conteudo
- Titulo: "Investimento claro, sem surpresa"
- Plano Base: R$ 3.000/mes / Para investimentos em midia de ate R$ 5.000/mes / Inclui: Gestao completa dos anuncios + relatorios semanais + consultoria de conteudo + reunioes quinzenais
- Plano Performance: R$ 3.000/mes + 10% do valor investido em midia / Para investimentos acima de R$ 5.000/mes / Mesmo escopo, com gestao proporcional ao volume de campanhas e otimizacao intensificada
- Observacao: "O orcamento de midia (valor investido nos anuncios) e definido junto com voce na reuniao inicial, de acordo com sua estrategia e verba disponivel."
- CTA: "AGENDAR MINHA REUNIAO"

### Layout
- Container: `max-width: 1080px`, centralizado
- Padding secao: `padding-block: var(--space-3xl)` (8rem)
- Grid dos planos: `grid-template-columns: 1fr 1fr`, gap `1.5rem`
- Cada card de plano: padding `2.5rem`, border-radius `var(--radius-lg)` (20px)
- Plano Performance: `transform: scale(1.03)` para ser ligeiramente maior
- Observacao: abaixo dos cards, text-align center, max-width 680px
- CTA: centralizado abaixo da observacao, margin-top `var(--space-lg)`

### Tipografia
- Titulo secao: Clash Display, 700, `clamp(2rem, 4vw, 3.5rem)`, line-height 1.15, letter-spacing -0.02em, color `--text-primary`, text-align center
- Nome do plano: Clash Display, 600, `1.35rem`, letter-spacing 0.04em, text-transform uppercase, color `--text-secondary`
- Preco: Clash Display, 700, `clamp(2rem, 3vw, 2.75rem)`, color `--text-primary`. "R$" em font-size 60% do preco, vertical-align top, color `--text-muted`. "/mes" em General Sans, 400, `0.875rem`, color `--text-muted`
- Condicao (para investimentos...): General Sans, 400, `0.875rem`, color `--text-muted`, margin-bottom `1.5rem`
- Lista de inclui: General Sans, 500, `var(--fs-body)`, color `--text-secondary`, line-height 1.8. Cada item precedido por bullet `--accent` (pequeno circulo 6px)
- Observacao: General Sans, 400, `var(--fs-small)`, color `--text-muted`, font-style italic

### Cores
- Background secao: `--bg-primary` (#0c0c14)
- Card Plano Base: background `--bg-card` (#14142a), border `1px solid var(--border)`
- Card Plano Performance: background `linear-gradient(135deg, rgba(123,47,242,0.1) 0%, var(--bg-card) 100%)`, border `1px solid rgba(123,47,242,0.3)`
- Badge "Recomendado": background `--accent` (#7B2FF2), color `#ffffff`, padding `0.35rem 1rem`, border-radius 100px, font-size `0.7rem`, font-weight 700, uppercase, letter-spacing 0.06em. Position absolute, `top: -14px`, center horizontal
- Divider horizontal entre preco e lista: `1px solid var(--border)`, margin block `1.5rem`

### Elementos Visuais
- Badge "Recomendado" no Plano Performance: posicao absolute top center, overlap de -14px
- Sutil gradient glow atras do Plano Performance: `box-shadow: 0 0 60px rgba(123, 47, 242, 0.08)`
- Bullets da lista: circulo 6px, `--accent`, margin-right 12px, vertical-align middle
- Linha separadora entre preco e features: `var(--border)`

### Animacoes
- Titulo: AOS `fade-up`, 700ms
- Card Base: AOS `fade-up`, delay 0ms
- Card Performance: AOS `fade-up`, delay 100ms
- Observacao: AOS `fade-up`, delay 200ms
- CTA: AOS `fade-up`, delay 300ms

### Interatividade
- Hover Card Base: `translateY(-4px)`, `box-shadow: 0 8px 32px rgba(0,0,0,0.3)`, border `rgba(255,255,255,0.1)`. Transicao 0.4s cubic-bezier(0.16, 1, 0.3, 1)
- Hover Card Performance: `translateY(-6px)`, `box-shadow: 0 12px 40px rgba(123, 47, 242, 0.2)`, border `rgba(123,47,242,0.5)`. Transicao 0.4s cubic-bezier(0.16, 1, 0.3, 1)
- CTA: `.btn--primary` -- `translateY(-2px)`, `box-shadow: 0 8px 24px rgba(123,47,242,0.3)`, bg `--accent-dim`

### Responsividade
- **Tablet (<=1024px):** Manter grid 2 colunas. Plano Performance sem `scale(1.03)`.
- **Mobile (<=768px):** Grid muda para `1fr`. Cards empilhados. Card padding `2rem`. Performance aparece primeiro (`order: -1`).
- **Small mobile (<=480px):** Card padding `1.5rem`. Preco font-size `1.75rem`.

---

## Secao 7: Por Que Comecar Agora

### Arquetipo e Constraints
- Arquetipo: **Before/After** -- comparacao visual lado a lado com contraste dramatico
- Constraints: **Selective Color** (Cor), **Color Blocking** (Cor), **Stagger** (Movimento)
- Justificativa: A comparacao direta cria urgencia emocional. O lado "agora" usa verde para positividade, o lado "tarde" usa vermelho/cinza apagado. Contraste visual forte sem precisar de argumentacao -- o visual FAZ o argumento.

### Conteudo
- Titulo: "Tempo e a maior vantagem no trafego eleitoral"
- Coluna Esquerda (AGORA - positivo):
  - Label: "Quem comeca agora (Fev-Mar)"
  - Testa criativos com custo baixo
  - Acumula dados reais do eleitorado
  - Chega no periodo eleitoral com estrategia validada
  - Reconhecimento de nome ja construido
- Coluna Direita (TARDE - negativo):
  - Label: "Quem comeca tarde (Jul-Ago)"
  - Custo por alcance nas alturas
  - Zero dados pra otimizar
  - Concorrentes ja dominam o feed
  - Fundo eleitoral desperdicado

### Layout
- Container: `max-width: 1080px`, centralizado
- Padding secao: `padding-block: var(--space-3xl)` (8rem)
- Background: `--bg-secondary` (#12121e)
- Grid comparacao: `grid-template-columns: 1fr 1fr`, gap `1.5rem`
- Cada coluna: padding `2.5rem`, border-radius `var(--radius-lg)` (20px)
- Separador visual: pseudo-element `::after` no container do grid, position absolute, `left: 50%`, `top: 15%`, `height: 70%`, `width: 2px`, background `var(--border)` -- linha vertical entre colunas

### Tipografia
- Titulo secao: Clash Display, 700, `clamp(2rem, 4vw, 3.5rem)`, text-align center, color `--text-primary`. "trafego eleitoral" em `--accent`
- Label da coluna: Clash Display, 600, `1.1rem`, text-transform uppercase, letter-spacing 0.04em, margin-bottom `1.5rem`
- Label AGORA: color `#4ade80` (verde)
- Label TARDE: color `--danger` (#ef4444)
- Items da lista: General Sans, 500, `var(--fs-body)`, line-height 2.2, color `--text-secondary`

### Cores
- Coluna Agora: background `rgba(74, 222, 128, 0.04)`, border `1px solid rgba(74, 222, 128, 0.12)`
- Coluna Tarde: background `rgba(239, 68, 68, 0.04)`, border `1px solid rgba(239, 68, 68, 0.10)`
- Icone check (antes dos items AGORA): `#4ade80`, SVG check circle, 18px
- Icone X (antes dos items TARDE): `#ef4444`, SVG x-circle, 18px

### Elementos Visuais
- Cada item da lista tem icone SVG inline a esquerda (18px)
- Agora: check circle verde
- Tarde: x-circle vermelho
- Sutil glow na coluna Agora: `box-shadow: inset 0 1px 0 rgba(74, 222, 128, 0.1)`
- Sutil glow na coluna Tarde: `box-shadow: inset 0 1px 0 rgba(239, 68, 68, 0.08)`

### Animacoes
- Titulo: AOS `fade-up`, 700ms
- Coluna Agora: AOS `fade-right`, 800ms, delay 0ms
- Coluna Tarde: AOS `fade-left`, 800ms, delay 150ms
- Items dentro das colunas: stagger CSS com `animation-delay` de 100ms cada item, `fade-up` + `opacity: 0 → 1`, triggered quando a coluna entra na viewport

### Interatividade
- Hover coluna Agora: border `rgba(74, 222, 128, 0.25)`, `box-shadow: 0 0 40px rgba(74, 222, 128, 0.06)`. Transicao 0.4s
- Hover coluna Tarde: border `rgba(239, 68, 68, 0.2)`. Transicao 0.4s

### Responsividade
- **Tablet (<=1024px):** Manter grid 2 colunas. Reduzir padding card para `2rem`. Remover separador vertical.
- **Mobile (<=768px):** Grid muda para `1fr`. Colunas empilhadas. Agora aparece primeiro.
- **Small mobile (<=480px):** Card padding `1.25rem`.

---

## Secao 8: FAQ

### Arquetipo e Constraints
- Arquetipo: **Reveal on Demand** -- accordion com animacao de revelacao suave
- Constraints: **Hover Underline** (Interacao), **Clip Reveal** (Movimento), **Container Narrow** (Layout)
- Justificativa: FAQ em accordion e funcional, mas o Reveal on Demand com animacao de clip cria uma experiencia mais premium. Container narrow foca a atencao. Nao e accordion generico -- cada item tem linha decorativa e transicao suave.

### Conteudo
- Titulo: "Duvidas frequentes"
- Q1: "Quanto custa?" / "R$ 3.000/mes fixo para investimentos em midia de ate R$ 5.000. Acima disso, R$ 3.000 + 10% do valor investido. O orcamento de midia e a parte e definido em conjunto na reuniao inicial."
- Q2: "Voces produzem o conteudo?" / "Nao. Voce produz os criativos (videos, fotos, textos). Nosso papel e direcionar que tipo de conteudo funciona melhor com base nos dados reais das campanhas e gerenciar os anuncios."
- Q3: "Funciona pra qualquer cargo?" / "Sim. Vereador, deputado estadual, federal, senador, governador. A estrategia e adaptada ao cargo e a regiao."
- Q4: "Como funciona o impulsionamento legalmente?" / "Na pre-campanha, os anuncios sao impulsionados pelo CPF do pre-candidato. Apos o registro de candidatura, todo investimento em midia passa a ser feito pelo CNPJ de campanha, com disclaimers obrigatorios e prestacao de contas ao TSE. Nos cuidamos de toda essa estrutura e transicao."
- Q5: "O Google nao faz mais anuncios politicos?" / "Correto. O Google proibiu anuncios politicos no Brasil. Todo o trafego pago eleitoral hoje acontece no Meta (Instagram e Facebook)."

### Layout
- Container: `max-width: 760px` (narrow centralizado)
- Padding secao: `padding-block: var(--space-3xl)` (8rem)
- Background: `--bg-primary` (#0c0c14)
- Items empilhados, gap `0` -- separados por borda bottom apenas
- Cada item: padding block `1.5rem`, border-bottom `1px solid var(--border)`
- Primeiro item: border-top tambem

### Tipografia
- Titulo secao: Clash Display, 700, `clamp(2rem, 4vw, 3.5rem)`, text-align center, color `--text-primary`, margin-bottom `var(--space-2xl)`
- Pergunta: Clash Display, 600, `clamp(1.05rem, 1.3vw, 1.2rem)`, color `--text-primary`, cursor pointer
- Resposta: General Sans, 400, `var(--fs-body)`, line-height 1.7, color `--text-secondary`, padding-top `0.75rem`, padding-bottom `0.5rem`

### Cores
- Pergunta normal: `--text-primary`
- Pergunta hover: `--accent`
- Icone toggle (+ / -): `--accent`, 20px, transicao rotate 0.3s
- Resposta: `--text-secondary`
- Borda: `var(--border)` (#rgba 255,255,255,0.06)

### Elementos Visuais
- Cada pergunta tem um icone toggle no lado direito: um `+` que rotaciona 45 graus para virar `x` quando aberto
- Icone: SVG ou pseudo-element com `+`, Clash Display, 500, 1.5rem, color `--accent`
- Flexbox: pergunta texto a esquerda, icone a direita, `justify-content: space-between`
- Sutil highlight roxo na pergunta ativa: background `rgba(123, 47, 242, 0.04)`, border-radius `8px`, padding inline `0.75rem`

### Animacoes
- Titulo: AOS `fade-up`, 700ms
- Items: AOS `fade-up`, stagger 80ms cada
- Abertura da resposta: `max-height: 0` para `max-height: 300px`, `opacity: 0` para `opacity: 1`, duracao 400ms, easing `cubic-bezier(0.16, 1, 0.3, 1)`
- Icone toggle: `rotate(0deg)` para `rotate(45deg)`, duracao 300ms
- Apenas um item aberto por vez (accordion exclusivo)

### Interatividade
- Click na pergunta: toggle abertura/fechamento
- Hover na pergunta: color `--accent`, transicao 0.2s. Icone tambem muda para `--accent-light`.
- Apenas um FAQ aberto por vez -- clicar em outro fecha o anterior
- Implementar com JS vanilla: `querySelectorAll`, toggle class `.faq-item--active`

### Responsividade
- **Tablet (<=1024px):** Mesma estrutura. Container ja e narrow.
- **Mobile (<=768px):** Pergunta font-size `1rem`. Padding item `1.25rem`.
- **Small mobile (<=480px):** Padding inline `0`.

---

## Secao 9: CTA Final

### Arquetipo e Constraints
- Arquetipo: **Isolated Element** -- elemento unico com muito espaco negativo, foco total
- Constraints: **Gradiente Radial** (Cor), **Scale In** (Movimento), **Glow** (Efeitos)
- Justificativa: A ultima secao antes do footer deve ser um ponto focal unico. Espaco negativo extremo forca atencao no CTA. O glow radial roxo cria gravidade visual puxando o olhar para o botao.

### Conteudo
- Titulo: "Pronto pra profissionalizar o digital da sua campanha?"
- Texto: "Agende uma reuniao com nossa equipe. Vamos analisar seu cenario e montar um plano real pra 2026."
- CTA: "AGENDAR REUNIAO"
- Micro-copy: "Reuniao sem compromisso. Resposta em ate 2 horas."

### Layout
- Container: `max-width: 700px`, centralizado
- Padding secao: `padding-block: var(--space-3xl) calc(var(--space-3xl) + 2rem)` (generoso)
- Background: `--bg-secondary` (#12121e)
- Flexbox column, align-items center, text-align center, gap `var(--space-md)`
- Posicao relativa para o glow decorativo

### Tipografia
- Titulo: Clash Display, 700, `clamp(1.75rem, 3.5vw, 2.75rem)`, line-height 1.15, letter-spacing -0.02em, color `--text-primary`. "campanha" em `--accent`
- Texto: General Sans, 400, `clamp(1rem, 1.3vw, 1.15rem)`, line-height 1.65, color `--text-secondary`, max-width 500px
- CTA: General Sans, 600, `var(--fs-body)`, letter-spacing 0.03em
- Micro-copy: General Sans, 400, `var(--fs-micro)`, color `--text-muted`

### Cores
- Background: `--bg-secondary`
- Glow decorativo: pseudo-element `::before`, position absolute, `width: 400px`, `height: 400px`, `background: radial-gradient(circle, rgba(123,47,242,0.12) 0%, transparent 70%)`, `top: 50%`, `left: 50%`, `transform: translate(-50%, -50%)`, `z-index: 0`
- Botao: `.btn--primary` (roxo com texto branco)

### Elementos Visuais
- Glow radial roxo suave atras do bloco de texto (pseudo-element)
- Sutil noise texture no background (mesma do hero)

### Animacoes
- Todo o bloco: AOS `fade-up`, 800ms, ease-out-cubic
- Glow: pulsacao sutil `opacity: 0.8 → 1`, duracao 3s, ease-in-out, infinite, alternate

### Interatividade
- CTA: mesmos estilos do `.btn--primary` (translateY -2px, glow shadow, bg dim)

### Responsividade
- **Mobile (<=768px):** Padding secao: `4rem 0`. Titulo font-size `1.5rem`.
- **Small mobile (<=480px):** Titulo font-size `1.35rem`.

---

## Secao 10: Footer

### Arquetipo e Constraints
- Arquetipo: **Minimal** -- pouquissimos elementos
- Constraints: **Low Contrast** (Cor)
- Justificativa: Footer deve ser discreto e nao competir com o CTA final. Apenas info legal obrigatoria.

### Conteudo
- Linha 1: "BNKR Advertising" (ou logo)
- Linha 2: "Este servico e de assessoria em marketing digital. Nao garantimos resultados eleitorais."
- Linha 3: "Politica de Privacidade | Termos de Uso"
- Linha 4: copyright ano

### Layout
- Container: `max-width: var(--container-max)`, centralizado
- Padding: `var(--space-lg) 0 var(--space-md) 0`
- Flexbox column, align-items center, text-align center, gap `0.75rem`
- Border-top: `1px solid var(--border)`

### Tipografia
- Nome: Clash Display, 600, `1rem`, letter-spacing 0.04em, text-transform uppercase, color `--text-muted`
- Disclaimer: General Sans, 400, `0.75rem`, color `--text-muted`
- Links: General Sans, 400, `0.75rem`, color `--text-muted`
- Copyright: General Sans, 400, `0.7rem`, color `var(--text-muted)`, opacity 0.6

### Cores
- Background: `--bg-primary` (#0c0c14)
- Todos os textos: `--text-muted` (#5c5c70)
- Links hover: `--text-secondary` (#a0a0b0)

### Interatividade
- Links hover: color `--text-secondary`, transicao 0.2s

### Responsividade
- Mesma estrutura em todos os breakpoints. Apenas ajustar padding.

---

## Resumo de Arquetipos

| Secao | Arquetipo | Constraints |
|-------|-----------|-------------|
| 1. Hero | Hero Dominante (centralizado) | Headline >150px, Dark Mode, Noise Texture |
| 2. Barra Urgencia | Marquee | -- |
| 3. O Problema | Stagger Vertical | Hover Lift, Selective Color |
| 4. O Que Entregamos | Bento Box | Glassmorphism, Hover Glow, Gradiente Texto |
| 5. Como Funciona | Timeline | Counter Animation, Stagger, Selective Color |
| 6. Investimento | Split Vertical | Hover Lift, Color Blocking, Overlap Elements |
| 7. Por Que Comecar | Before/After | Selective Color, Color Blocking, Stagger |
| 8. FAQ | Reveal on Demand | Hover Underline, Clip Reveal, Container Narrow |
| 9. CTA Final | Isolated Element | Gradiente Radial, Scale In, Glow |
| 10. Footer | Minimal | Low Contrast |
