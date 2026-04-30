# BSides Amman — Landing Page

Jordan's first InfoSec & Hacking Conference website.

## Tech Stack

| Layer      | Library                  |
|------------|--------------------------|
| Framework  | React 18 + Vite          |
| Styling    | Tailwind CSS v3          |
| Animation  | Framer Motion v11        |
| Icons      | Lucide React             |
| Fonts      | Bebas Neue · Share Tech Mono (Google Fonts) |

## Project Structure

```
bsides-amman/
├── public/
├── src/
│   ├── assets/
│   │   └── logo.png           ← official BSides Amman logo
│   ├── components/
│   │   ├── Shared.jsx         ← FadeIn, Section, SectionHeading
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx           ← logo-centred hero (simple & clean)
│   │   ├── About.jsx          ← intro + 5 village cards
│   │   ├── Schedule.jsx       ← filterable day timeline
│   │   ├── Speakers.jsx
│   │   ├── Team.jsx
│   │   ├── Gallery.jsx        ← masonry placeholder grid
│   │   ├── Sponsors.jsx
│   │   ├── FAQ.jsx
│   │   └── Footer.jsx
│   ├── constants.js           ← design tokens + nav links
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev

# 3. Build for production
npm run build
```

## Customisation Checklist

### Hero
- Logo is loaded from `src/assets/logo.png` — replace with updated artwork if needed.

### Team cards
- Replace `initials` with `photo` prop and swap the initials `<div>` for `<img src={m.photo} />`.
- Update `href="#"` LinkedIn links with real profile URLs.

### Speaker cards
- Same pattern — swap initials placeholder with a real headshot `<img>`.

### Gallery
- Each `ITEMS` entry has a `bg` colour placeholder.
- Replace with `backgroundImage: 'url(/images/your-photo.jpg)'` on the card's style, or drop in an `<img>` tag.

### Schedule
- Edit the `SCHEDULE` array in `Schedule.jsx`.

### Sponsors
- Each tier renders empty logo boxes. Pass a real `logo` URL to each entry and render `<img>` inside the `motion.div`.

### Contact / Social
- Update `href="#"` on social links in `Footer.jsx` and `Navbar.jsx` to real profile URLs.

## Colour Palette

| Token   | Hex       | Usage                    |
|---------|-----------|--------------------------|
| red     | `#ce2028` | Jordanian flag red · CTAs |
| green   | `#007a3d` | Jordanian flag green      |
| amber   | `#f0a500` | Logo gold · accents       |
| bg      | `#0a0c0e` | Terminal black background |
| bgCard  | `#111418` | Card surfaces             |
| border  | `#1e2530` | Subtle dividers           |

## Contact

**info@bsidesamman.org**
Applied Science University, Amman, Jordan
