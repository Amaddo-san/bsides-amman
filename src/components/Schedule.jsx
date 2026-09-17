import { useLayoutEffect, useRef, useState, useSyncExternalStore } from 'react';
import { useMotionValue } from 'framer-motion';
import { ArrowDown, Check, Coffee, Flag, List, Map as MapIcon, Sun } from 'lucide-react';
import abbasSprite from '../assets/abbas-sprite.png';
import { SCHEDULE } from '../data/schedule';
import { clamp, createRoute, environmentAt, moodAt, pointAtY, sampleRoute, themeAt } from './scheduleJourney';
import { createAbbasAnimator } from './abbasAnimation';
import ScheduleWorld, { PixelSun, PixelMoon } from './ScheduleWorld';
import './Schedule.css';

const SPECIAL = { welcome: { icon: Sun, label: 'The beginning' }, break: { icon: Coffee, label: 'A moment to connect' }, closing: { icon: Flag, label: 'The grand finale' } };

// The installed Framer Motion version reads this preference only at mount.
// Subscribe explicitly so changing the OS setting also stops an active journey.
const motionQuery = '(prefers-reduced-motion: reduce)';
const readReducedMotion = () => window.matchMedia(motionQuery).matches;
const serverReducedMotion = () => true;
function subscribeReducedMotion(onChange) {
  const media = window.matchMedia(motionQuery);
  media.addEventListener('change', onChange);
  return () => media.removeEventListener('change', onChange);
}

function DayArc() {
  return (
    <div className="day-arc" aria-label="Day Arc: agenda journey progress, not the current time">
      <svg className="day-arc__sky" viewBox="0 0 144 54" aria-hidden="true" shapeRendering="crispEdges">
        <path d="M12 44V36H24V28H40V20H56V16H88V20H104V28H120V36H132V44" fill="none" stroke="currentColor" opacity=".45" />
        <path d="M 6 44 H 138" fill="none" stroke="currentColor" opacity=".25" />
        <g data-arc-orb transform="translate(12 43)">
          <g data-arc-sun transform="translate(-6 -6) scale(.5)"><PixelSun /></g>
          <g data-arc-moon transform="translate(-6 -6) scale(.5)" opacity="0"><PixelMoon /></g>
        </g>
      </svg>
      <div className="day-arc__caption"><span>Day Arc <b data-arc-mood>Dawn</b></span><small>Agenda progress · <span data-arc-percent>0</span>%</small></div>
    </div>
  );
}

export default function Schedule() {
  const sectionRef = useRef(null);
  const routeRef = useRef(null);
  const restoreRef = useRef(null);
  const progress = useMotionValue(0);
  const reducedMotion = useSyncExternalStore(subscribeReducedMotion, readReducedMotion, serverReducedMotion);
  const [mode, setMode] = useState('journey');

  function changeMode(next) {
    if (mode === next) return;
    const center = window.innerHeight * 0.52;
    const rows = [...sectionRef.current.querySelectorAll('[data-stop]')];
    const visible = rows.filter((row) => { const r = row.getBoundingClientRect(); return r.bottom > 150 && r.top < window.innerHeight; });
    const anchor = visible.sort((a, b) => Math.abs(a.getBoundingClientRect().top - center) - Math.abs(b.getBoundingClientRect().top - center))[0];
    if (anchor) restoreRef.current = { id: anchor.id, top: anchor.getBoundingClientRect().top };
    setMode(next);
  }

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const shell = section.closest('.site-shell');
    const route = routeRef.current;
    const rows = [...section.querySelectorAll('[data-stop]')];
    const svg = section.querySelector('[data-route-svg]');
    const path = section.querySelector('[data-route-base]');
    const completed = section.querySelector('[data-route-completed]');
    const mascot = section.querySelector('[data-abbas]');
    const actor = createAbbasAnimator(section.querySelector('[data-abbas-sprite]'));
    const world = section.querySelector('[data-world]');
    const markers = [...section.querySelectorAll('[data-route-marker]')];
    const branches = [...section.querySelectorAll('[data-route-branch]')];
    const orb = section.querySelector('[data-arc-orb]');
    const animated = mode === 'journey' && !reducedMotion;
    let geometry;
    let frame = 0;
    let previousPoint;
    let previousProgress;
    let activeIndex = -1;
    let disposed = false;
    let animationFailed = false;
    let needsMeasure = true;
    const oldStyles = new Map(Object.keys(themeAt(0)).map((key) => [key, shell.style.getPropertyValue(key)]));
    shell.dataset.scheduleActive = 'true';

    function paint(value) {
      if (disposed || !section.isConnected) return;
      const p = animated ? value : 0;
      Object.entries(themeAt(p)).forEach(([key, token]) => shell.style.setProperty(key, token));
      section.querySelector('[data-arc-mood]').textContent = animated ? moodAt(p) : 'Full agenda';
      section.querySelector('[data-arc-percent]').textContent = Math.round(p * 100);
      const scene = environmentAt(p);
      orb.setAttribute('transform', `translate(${Math.round((12 + 120 * p) / 2) * 2} ${Math.round((43 - 130 * p * (1 - p)) / 2) * 2})`);
      section.querySelector('[data-arc-sun]').setAttribute('opacity', scene.sunOpacity);
      section.querySelector('[data-arc-moon]').setAttribute('opacity', scene.moonOpacity);
      world.style.setProperty('--world-sun-opacity', scene.sunOpacity);
      world.style.setProperty('--world-moon-opacity', scene.moonOpacity);
      world.style.setProperty('--world-far-y', `${scene.farY}px`);
      world.style.setProperty('--world-near-y', `${scene.nearY}px`);
      world.style.setProperty('--world-cloud-x', `${scene.cloudX}px`);
      if (!geometry) return;
      world.style.setProperty('--world-sun-y', `${Math.round(scene.sunY * geometry.worldHeight / 100 / geometry.pixel) * geometry.pixel}px`);
      const targetY = geometry.first + p * geometry.span;
      const point = pointAtY(geometry.samples, targetY);
      completed.style.strokeDashoffset = geometry.length - point.distance;
      mascot.style.transform = `translate3d(${Math.round(point.x / geometry.pixel) * geometry.pixel}px, ${Math.round(point.y / geometry.pixel) * geometry.pixel}px, 0)`;
      if (animated && previousPoint && previousProgress !== p) {
        actor.move(point.x - previousPoint.x, point.y - previousPoint.y);
      }
      previousPoint = point;
      previousProgress = p;
      const nearest = geometry.points.reduce((best, candidate, index) => Math.abs(candidate.y - targetY) < Math.abs(geometry.points[best].y - targetY) ? index : best, 0);
      if (nearest !== activeIndex) {
        rows.forEach((row, index) => {
          row.dataset.focused = String(animated && index === nearest);
          markers[index].dataset.active = String(animated && index === nearest);
          markers[index].dataset.passed = String(animated && index < nearest);
        });
        activeIndex = nearest;
        section.querySelector('[data-journey-stop]').textContent = String(nearest + 1).padStart(2, '0');
      }
    }

    function measure() {
      const narrow = window.matchMedia('(max-width: 767px)').matches;
      const width = route.clientWidth;
      const centerX = narrow ? 32 : Math.round(width / 8) * 4;
      const bend = narrow ? 8 : 32;
      const points = rows.map((row, index) => ({ x: centerX + (index % 2 ? bend : -bend), y: Math.round((row.offsetTop + row.offsetHeight / 2) / 4) * 4 }));
      svg.setAttribute('viewBox', `0 0 ${width} ${route.offsetHeight}`);
      const d = createRoute(points);
      path.setAttribute('d', d);
      completed.setAttribute('d', d);
      const samples = sampleRoute(path);
      const length = samples[samples.length - 1].distance;
      completed.style.strokeDasharray = `${length} ${length}`;
      points.forEach((point, index) => {
        markers[index].setAttribute('x', point.x - 5);
        markers[index].setAttribute('y', point.y - 5);
        const edge = narrow ? 73 : width / 2 + (index % 2 ? 84 : -84);
        branches[index].setAttribute('d', `M ${point.x} ${point.y} H ${edge}`);
      });
      world.style.setProperty('--world-scale', Math.max(1, Math.ceil(section.clientWidth / 800)));
      geometry = { points, samples, length, first: points[0].y, span: points[points.length - 1].y - points[0].y, top: route.getBoundingClientRect().top + window.scrollY, worldHeight: world.clientHeight, pixel: narrow ? 1 : 2 };
      previousPoint = null;
      actor.stop();
      section.dataset.enhanced = 'true';
      needsMeasure = false;
    }

    function update() {
      frame = 0;
      if (disposed || animationFailed) return;
      try {
        if (needsMeasure) measure();
        const p = animated ? clamp((window.scrollY + window.innerHeight * 0.52 - geometry.top - geometry.first) / geometry.span) : 0;
        if (progress.get() === p) paint(p);
        else progress.set(p);
      } catch (error) {
        // Decorative initialization must never take the semantic agenda down.
        animationFailed = true;
        actor.stop();
        delete section.dataset.enhanced;
        console.warn('Schedule animation unavailable; the full agenda remains readable.', error);
      }
    }
    function scheduleUpdate() { if (!disposed && !frame) frame = requestAnimationFrame(update); }
    function invalidate() { if (disposed) return; needsMeasure = true; scheduleUpdate(); }
    function visibilityChanged() { if (disposed) return; if (document.hidden) actor.stop(); else invalidate(); }
    const unsubscribe = progress.on('change', paint);

    // Keep the same session at the same screen position across the layout change.
    if (restoreRef.current) {
      const { id, top } = restoreRef.current;
      const anchor = rows.find((row) => row.id === id);
      if (anchor) window.scrollTo({ top: window.scrollY + anchor.getBoundingClientRect().top - top, behavior: 'instant' });
      restoreRef.current = null;
    }
    update();
    const observer = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(invalidate) : null;
    observer?.observe(route);
    rows.forEach((row) => observer?.observe(row));
    if (animated) window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', invalidate, { passive: true });
    window.addEventListener('pageshow', invalidate);
    document.addEventListener('visibilitychange', visibilityChanged);
    document.fonts?.ready.then(() => { if (!disposed) invalidate(); });
    return () => {
      disposed = true;
      unsubscribe();
      observer?.disconnect();
      cancelAnimationFrame(frame);
      actor.destroy();
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', invalidate);
      window.removeEventListener('pageshow', invalidate);
      document.removeEventListener('visibilitychange', visibilityChanged);
      delete section.dataset.enhanced;
      delete shell.dataset.scheduleActive;
      oldStyles.forEach((value, key) => value ? shell.style.setProperty(key, value) : shell.style.removeProperty(key));
    };
  }, [mode, progress, reducedMotion]);

  return (
    <section id="schedule" ref={sectionRef} className="schedule" data-mode={mode} data-reduced={Boolean(reducedMotion)} aria-labelledby="schedule-title">
      <ScheduleWorld />
      <div className="schedule-inner">
        <header className="schedule-intro">
          <div className="schedule-eyebrow"><span className="schedule-diamond" />03 / The schedule<span className="schedule-edition">BSides Amman 2026</span></div>
          <div className="schedule-intro__grid">
            <div>
              <p className="schedule-kicker">19 September 2026 · Main stage</p>
              <h1 id="schedule-title">A full day.<br /><span>A shared journey.</span></h1>
              <p className="schedule-lead">Follow Abbas through a day of ideas, discoveries, and connection. From the first hello to the final applause.</p>
            </div>
            <p className="schedule-scene-caption" aria-hidden="true">Amman, from dawn<br />to after dark.</p>
          </div>
          <div className="schedule-meta"><span><b>{SCHEDULE.length}</b> agenda stops</span><span>{SCHEDULE[0].start}–{SCHEDULE[SCHEDULE.length - 1].end}</span><span>All times local to Amman · 24-hour</span></div>
        </header>

        <div className="schedule-toolbar">
          <DayArc />
          <span className="schedule-stop-count" aria-hidden="true">STOP <b data-journey-stop>01</b> / {SCHEDULE.length}</span>
          <div className="schedule-view-toggle" role="group" aria-label="Agenda view">
            <button type="button" aria-pressed={mode === 'journey'} aria-controls="main-stage-agenda" onClick={() => changeMode('journey')}><MapIcon size={15} aria-hidden="true" />Journey</button>
            <button type="button" aria-pressed={mode === 'list'} aria-controls="main-stage-agenda" onClick={() => changeMode('list')}><List size={16} aria-hidden="true" />List</button>
          </div>
        </div>

        <div className="schedule-trail-caption"><span><ArrowDown size={14} aria-hidden="true" /><span className="schedule-journey-hint">Scroll through the day</span><span className="schedule-static-hint">The day, at your own pace</span></span><span>Main stage / Amman</span></div>
        <div ref={routeRef} className="schedule-route">
          <svg data-route-svg className="schedule-route__svg" aria-hidden="true" preserveAspectRatio="none">
            {SCHEDULE.map((session) => <path key={session.id} data-route-branch className="schedule-route__branch" />)}
            <path data-route-base className="schedule-route__base" />
            <path data-route-completed className="schedule-route__completed" />
            {SCHEDULE.map((session) => <rect key={session.id} data-route-marker className="schedule-route__marker" width="10" height="10" shapeRendering="crispEdges" />)}
          </svg>
          <div data-abbas className="schedule-abbas" aria-hidden="true"><div className="schedule-abbas__frame"><div data-abbas-sprite className="schedule-abbas__sprite" style={{ backgroundImage: `url(${abbasSprite})` }} /></div></div>
          <ol id="main-stage-agenda" className="schedule-agenda" aria-label="Main stage agenda, 19 September 2026">
            {SCHEDULE.map((session, index) => {
              const special = SPECIAL[session.kind];
              const Icon = special?.icon;
              return (
                <li id={`session-${session.id}`} key={session.id} data-stop className={`schedule-stop${special ? ` schedule-stop--${session.kind}` : ''}`}>
                  <article className="schedule-card" aria-labelledby={`title-${session.id}`}>
                    <div className="schedule-card__meta"><span className="schedule-time"><time dateTime={`2026-09-19T${session.start}:00+03:00`}>{session.start}</time>–<time dateTime={`2026-09-19T${session.end}:00+03:00`}>{session.end}</time></span><span className="schedule-card__number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span></div>
                    <div className="schedule-card__body">
                      {special && <p className="schedule-card__occasion"><Icon size={15} aria-hidden="true" />{special.label}</p>}
                      <h2 id={`title-${session.id}`}>{session.title}</h2>
                      {session.speaker && <p className="schedule-speaker">{session.speaker}</p>}
                    </div>
                  </article>
                </li>
              );
            })}
          </ol>
        </div>
        <div className="schedule-finish"><span><Check size={16} aria-hidden="true" /></span><p>One day. A community that stays.</p><small>BSides Amman · See you on 19 September</small><a href="#schedule-title">Back to the agenda <ArrowDown size={13} aria-hidden="true" /></a></div>
      </div>
    </section>
  );
}
