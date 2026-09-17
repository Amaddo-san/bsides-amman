// Match the existing React Router route (case-insensitive, optional trailing slash).
export function isSchedulePath(pathname) {
  return /^\/schedule\/*$/i.test(pathname);
}

// Native same-page anchors keep their ordinary scrolling behavior. Page changes
// and saved history positions are resolved before paint by RouteScroll.
export function routeScrollTarget({ pathname, hash, action, saved, initial, pageChanged, documentNavigation }) {
  if (hash && !initial && !pageChanged) return null;
  if (action === 'POP' && saved) return { position: saved };
  if (hash) {
    try {
      const anchor = decodeURIComponent(hash.slice(1));
      return { anchor, block: anchor.startsWith('session-') ? 'center' : 'start' };
    } catch { return null; }
  }
  if (/^\/about\/*$/i.test(pathname)) return { anchor: 'about', block: 'start' };
  if (initial && ['reload', 'back_forward'].includes(documentNavigation)) return null;
  return { position: { left: 0, top: 0 } };
}
