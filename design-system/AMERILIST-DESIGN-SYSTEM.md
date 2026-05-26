# AmeriList design system (reference for reuse)

Source of truth: `css/figma.css`, `css/figma-pages.css` (Amerilistdata project).

Use this when building **other sites** that should match the same look and feel.

---

## Typography

| Role | Font | Notes |
|------|------|--------|
| **Family** | **Plus Jakarta Sans** | Load via Google Fonts in HTML (not `@import` in CSS) |
| **Fallback** | `system-ui, sans-serif` | |
| **Body** | 15px / 1.65 | Color `--muted` |
| **Nav links** | 14px / weight 500 | |
| **Hero H1** | `clamp(2.1rem, 5vw, 52px)` / weight **800** / letter-spacing **-1.5px** | On navy hero, color `--text-light` |
| **Hero highlight** | Same H1, color **`--lime`** | Class `.highlight` inside `h1` |
| **Hero lead** | `clamp(16px, 1.6vw, 18px)` / 1.75 | |
| **Section titles** | ~30px / weight 800 | Often `--ink` on light sections |
| **Eyebrow / badge** | 12px / weight 700 | Pill on white, text `--blue` |
| **Footer nav** | 14px | Color `#9da5c0`, hover `#fff` |

**Google Fonts link (copy into `<head>`):**

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap">
```

---

## Color palette

| Token | Hex | Usage |
|-------|-----|--------|
| `--blue` | `#074eb9` | Primary brand, links, solid buttons |
| `--blue-bright` | `#0070ab` | Link hover, gradient start |
| `--navy` | `#252840` | Hero backgrounds |
| `--navy-deep` | `#1e2033` | Footer, mobile menu, deep surfaces |
| `--ink` | `#1e2033` | Headings on light backgrounds |
| `--muted` | `#7d8087` | Body text |
| `--text-light` | `#eff2f9` | Text on dark (hero, footer) |
| `--lime` | `#81e92f` | Accent highlight in hero titles |
| `--surface` | `#eff2f9` | Header bg, alternate section bg |
| `--white` | `#ffffff` | Page background |
| `--border` | `#dde6fb` | Header border, badges |
| `--input-border` | `#e2e8f8` | Form fields |

**Brand gradient (CTA buttons, accent bars):**

```css
--gradient: linear-gradient(90deg, #0070ab 0%, #e31937 100%);
```

**Footer link colors:** `#9da5c0` (default), `#c8d0e8` (contact), `#fff` (hover).

**Extra UI grays used in components:** `#434653`, `#f8faff` (btn-white hover).

---

## Layout & spacing

| Token | Value |
|-------|--------|
| `--max` | `1120px` content width |
| `--pad-section` | `clamp(1.5rem, 8vw, 135px)` horizontal section padding |
| `--pad-hero` | `clamp(1.5rem, 15vw, 300px)` hero horizontal padding |
| **Hero** | Min-height `clamp(420px, 55vh, 520px)`, centered text |
| **Header** | Sticky, min-height 81px, bg `--surface`, border `--border` |
| **Logo** | Height ~42px in header, ~32px in footer |

Wrapper pattern: `.figma-wrap` full width, `.figma-inner` = `min(var(--max), 100%)` centered.

---

## Components (patterns)

### Primary CTA — `.btn-gradient`
- Background: `--gradient`
- Text: white, weight 700, 13px (header) / 15px (`.btn-gradient-md`)
- Border-radius: **58px** (pill) or **10px** on medium variant
- Hover: `translateY(-3px)`, brightness + shadow `rgba(7, 78, 185, 0.35)`

### Secondary — `.btn-white`
- White bg, `--blue` text, radius 10px, hover `#f8faff`

### Tertiary — `.btn-light`
- Bg `--text-light`, text `#434653`, radius 10px

### Hero — `.figma-hero`
- Bg `--navy`, text `--text-light`, centered
- Badge: white pill, border `--border`, text `--blue`

### Header — `.figma-header`
- Sticky, `--surface`, nav gap 36px

### Footer — `.figma-footer`
- Bg `--navy-deep`, social icons 22×22px PNG

### Sections
- Light content on white; alternate blocks often `--surface`
- Audience grids: cards on `--surface` (not navy)

---

## Motion (scroll reveal)

```css
--reveal-ease: cubic-bezier(0.22, 1, 0.36, 1);
--reveal-duration: 1.75s;
--reveal-stagger-duration: 1.45s;
--reveal-stagger-step: 0.2s;
```

Implemented in `js/figma.js` (respect reduced motion; no reveal on form embed areas).

---

## HTML / CSS conventions

- Page class: `body.figma-page`
- Prefix components with `figma-` (BEM-like blocks)
- Two stylesheets: base `figma.css` + page-specific `figma-pages.css`
- Icons: PNG in `/icons/` (facebook, instagram, linkedin, x)
- Forms: 123FormBuilder embed pattern optional; slot `.figma-form-embed-slot`

---

## Quick `:root` block (copy-paste)

```css
:root {
  --font: "Plus Jakarta Sans", system-ui, sans-serif;
  --blue: #074eb9;
  --blue-bright: #0070ab;
  --navy: #252840;
  --navy-deep: #1e2033;
  --ink: #1e2033;
  --muted: #7d8087;
  --text-light: #eff2f9;
  --lime: #81e92f;
  --surface: #eff2f9;
  --white: #ffffff;
  --border: #dde6fb;
  --input-border: #e2e8f8;
  --gradient: linear-gradient(90deg, #0070ab 0%, #e31937 100%);
  --max: 1120px;
  --pad-section: clamp(1.5rem, 8vw, 135px);
  --pad-hero: clamp(1.5rem, 15vw, 300px);
}
```

---

*Last synced from Amerilistdata project — reuse on new sites by copying tokens + component patterns above.*
