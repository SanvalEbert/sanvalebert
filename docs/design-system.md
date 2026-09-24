# Design System — Sanval Ebert

## 1. Princípio visual

**Deep Tech + Pesquisa + Educação + Produto Digital**

A identidade deve transmitir:
- rigor;
- contemporaneidade;
- clareza;
- tecnologia;
- humanidade;
- experimentação.

Evitar:
- estética genérica de “consultoria de IA”;
- robôs humanoides;
- cérebro com circuitos;
- excesso de neon;
- partículas decorativas sem função;
- cards excessivamente brilhantes;
- visual de dashboard corporativo genérico.

---

## 2. Paleta base

Herança refinada do projeto `wla_2026`.

### Dark

```css
--bg-950: #06101D;
--surface-900: #0B1929;
--surface-850: #10263B;
--text-050: #EDF5FF;
--text-300: #91A6BC;
--cyan-400: #42D7E8;
--blue-500: #5F86FF;
--line: rgba(255,255,255,.12);
```

### Uso

- fundo principal: `--bg-950`;
- superfícies: `--surface-900`;
- destaque primário: `--cyan-400`;
- destaque secundário: `--blue-500`;
- texto principal: `--text-050`;
- texto secundário: `--text-300`.

### Regra

Ciano é sinal de ação, conexão e estado ativo.  
Azul é profundidade, apoio e variação.  
Nenhuma seção deve competir com mais de um destaque dominante.

---

## 3. Light mode futuro

O sistema deve ser preparado para modo claro, principalmente em:
- artigos;
- publicações;
- conteúdos longos;
- cursos;
- materiais.

O dark mode permanece como identidade principal da Home.

---

## 4. Tipografia

### Direção

Fonte sans-serif contemporânea, excelente em interfaces e textos editoriais.

### Hierarquia

**Display / Hero**
- 56–96px desktop
- 42–56px tablet
- 38–48px mobile
- tracking negativo moderado

**H2**
- 40–72px desktop
- 32–48px mobile

**Body**
- 17–20px
- line-height 1.55–1.7

**Labels**
- 11–13px
- uppercase apenas em elementos curtos
- tracking positivo

### Regra

Evitar textos longos em caixa alta.  
Evitar peso 900 fora de números ou palavras pontuais.

---

## 5. Grid

### Container
- máximo: 1280px;
- padding desktop: 32–48px;
- tablet: 28–32px;
- mobile: 20–24px.

### Espaçamento vertical
- seção desktop: 120–160px;
- tablet: 96–120px;
- mobile: 72–96px.

### Radius
- cards: 20–24px;
- botões pill: 999px;
- elementos pequenos: 12–16px.

---

## 6. Superfícies

Cards não devem parecer blocos isolados. Devem pertencer ao mesmo campo visual.

Base:

```css
background:
  linear-gradient(
    155deg,
    rgba(255,255,255,.035),
    rgba(255,255,255,.014)
  );
border: 1px solid rgba(255,255,255,.11);
```

Hover/focus:

```css
border-color: rgba(66,215,232,.55);
background:
  linear-gradient(
    155deg,
    rgba(66,215,232,.075),
    rgba(95,134,255,.025)
  );
```

---

## 7. Motion

### Duração
- hover: 180–240ms;
- expansão: 240–320ms;
- entrada de seção: 400–600ms;
- movimento ambiental: 5–12s.

### Curva
Preferir curvas suaves, sem bounce.

### Transform
- hover: `translateY(-3px)` a `-5px`;
- entrada: máximo 24px;
- evitar zoom de texto.

### Acessibilidade

```css
@media (prefers-reduced-motion: reduce) {
  * {
    scroll-behavior: auto !important;
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 8. Estados interativos

Todo elemento clicável terá:

- default;
- hover;
- focus-visible;
- active;
- disabled, quando aplicável.

Foco nunca será removido.

Exemplo:

```css
:focus-visible {
  outline: 3px solid #EDF5FF;
  outline-offset: 3px;
}
```

---

## 9. Botões

### Primário
- fundo ciano;
- texto escuro;
- forte contraste;
- usado apenas para ação principal.

### Secundário
- transparente;
- borda discreta;
- texto claro;
- glow no hover/foco.

### Ghost
- navegação auxiliar;
- baixa saliência.

---

## 10. Ícones

- SVG;
- traço simples;
- mesma família visual;
- evitar mistura de estilos;
- ícones nunca substituem labels importantes.

---

## 11. Fotografia

A fotografia de Sanval será tratada como elemento editorial, e não como avatar ampliado.

Direção:
- enquadramento do tórax para cima;
- fundo neutro ou recorte limpo;
- luz lateral suave;
- integração com linhas e nós do ecossistema;
- nenhuma moldura circular padrão no Hero.

---

## 12. Sistema de conteúdo

### Kicker
Pequeno rótulo contextual.

### Headline
Uma afirmação curta.

### Supporting copy
1–3 frases.

### Evidence
Projeto, dado, publicação ou experiência.

### CTA
Uma ação.

A combinação deve aparecer de forma consistente em todas as seções.

---

## 13. Qualidade visual

Antes de aprovar uma seção, verificar:

- existe uma hierarquia clara?
- existe espaço negativo suficiente?
- o destaque principal é único?
- o texto pode ser lido sem animação?
- hover e foco são equivalentes?
- a seção funciona em 320px?
- a seção continua elegante sem fotografia?
- o conteúdo permanece compreensível em modo de alto contraste?

---

## 14. Relação com WLA 2026

Elementos que permanecem:
- fundo profundo;
- ciano + azul;
- tipografia grande;
- bordas sutis;
- microinterações;
- linhas narrativas;
- motion reduzido e intencional.

Elementos que mudam:
- sem scroll-snap global;
- menos densidade visual;
- mais espaço editorial;
- navegação persistente;
- páginas independentes;
- componentes reutilizáveis;
- estrutura preparada para conteúdo, cursos e produtos.
