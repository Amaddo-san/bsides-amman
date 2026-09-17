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
- Edit the `SCHEDULE` array in `src/data/schedule.js`. Journey, List, and the initial HTML fallback use this single source.
- Internal desktop, mobile, and footer links use React Router. Route changes and Back/Forward scroll restoration run before paint; same-page anchors retain normal scrolling.
- The startup agenda stays in an inert template and is mounted only for the schedule route. Never use it as the default HTML for every URL: that causes an agenda flash during document navigation. `/agenda.html` provides the full agenda with JavaScript disabled.
- The `/schedule` page measures its SVG route against the agenda rows. One Framer Motion value drives Abbas, route completion, and the Day Arc without React renders on scroll.
- Abbas reuses `src/assets/abbas-sprite.png` and the original frame mapping extracted from `HistoryTimeline.jsx` into `abbasAnimation.js`. Running frames advance on a separate 120 ms clock, facing follows travel direction, and the original idle pose returns when scrolling stops. The cursor-following instance is disabled on this page; its behavior elsewhere is preserved.
- List mode and the OS reduced-motion preference disable scroll effects. Session links such as `/schedule#session-lunch` open the corresponding stop.
- `ScheduleWorld.jsx` supplies a contained, sticky pixel sky, deterministic stars, pixel sun/moon/clouds, and two Amman-inspired silhouette layers. Integer SVG scales keep the pixel grid crisp. Parallax and lighting share agenda progress; List mode and reduced motion keep the environment static.
- Theme styles are scoped to the schedule page and retain the site's dark identity at dawn, morning, afternoon, sunset, and night. Opaque cards keep the reading area quiet. Other pages retain their existing appearance.
- Run `node --test tests/*.test.js` for agenda, route, sprite animation, no-JavaScript fallback, and Day Arc contrast checks. Run `npm run build` for the production build. No deployment is needed for validation.

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

**contact@bsidesamman.org**
Applied Science University, Amman, Jordan
