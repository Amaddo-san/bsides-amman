import { SCHEDULE } from '../src/data/schedule.js';

const escapeHTML = (text) => String(text).replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character]));

// Used only for the schedule route's startup template and /agenda.html.
// Other routes must never render agenda content as their default document.
export function scheduleFallback() {
  return `<main aria-labelledby="fallback-title" style="background:#10121f;color:#fefcf6;padding:40px 20px;font:16px/1.6 system-ui,sans-serif;min-height:100vh"><div style="max-width:780px;margin:auto">
    <a href="/" style="color:#f0aeb9">BSides Amman</a>
    <h1 id="fallback-title" style="font-size:36px;margin:24px 0 8px">Main stage schedule</h1>
    <p>19 September 2026 · ${SCHEDULE.length} agenda stops · All times local to Amman (24-hour).</p>
    <p style="margin:12px 0 24px">The complete agenda is available below. The interactive journey loads when JavaScript is available.</p>
    <ol style="list-style:none;padding:0">${SCHEDULE.map((session) => `<li style="padding:20px 0;border-top:1px solid #46414e"><p style="color:#f0aeb9"><time datetime="2026-09-19T${session.start}:00+03:00">${session.start}</time>–<time datetime="2026-09-19T${session.end}:00+03:00">${session.end}</time></p><h2 style="font-size:21px;margin:6px 0">${escapeHTML(session.title)}</h2>${session.speaker ? `<p>${escapeHTML(session.speaker)}</p>` : ''}</li>`).join('')}</ol>
  </div></main>`;
}
