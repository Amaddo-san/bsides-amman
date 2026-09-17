import { NAV_LINKS } from '../src/constants.js';
import { isSchedulePath } from '../src/navigation.js';
import { scheduleFallback } from './schedule-fallback.js';

export function navigationFallback() {
  return `<main style="padding:32px;color:#e8e8e8;background:#0a0c0e;font:16px/1.8 system-ui,sans-serif"><a href="/">BSides Amman</a><nav aria-label="Site navigation" style="display:flex;gap:16px;flex-wrap:wrap;margin-top:16px">${NAV_LINKS.map(({ href, label }) => `<a href="${href}">${label}</a>`).join('')}<a href="/agenda.html">Plain HTML agenda</a></nav></main>`;
}

export function scheduleBootstrap() {
  // The template is inert on every URL. Only the intended schedule route mounts
  // it, synchronously before paint, even when the React bundle fails to load.
  return `<template id="schedule-fallback-template">${scheduleFallback()}</template>
<script>
  if ((${isSchedulePath.toString()})(window.location.pathname)) {
    document.getElementById('root').replaceChildren(
      document.getElementById('schedule-fallback-template').content.cloneNode(true)
    );
  }
</script>`;
}

export function agendaDocument() {
  return `<!doctype html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>BSides Amman — Main stage agenda</title></head><body style="margin:0">${scheduleFallback()}</body></html>`;
}
