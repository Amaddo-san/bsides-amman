import test from 'node:test';
import assert from 'node:assert/strict';
import { runInNewContext } from 'node:vm';
import { matchPath } from 'react-router-dom';
import { navigationFallback, scheduleBootstrap, agendaDocument } from '../scripts/app-fallback.js';
import { isSchedulePath, routeScrollTarget } from '../src/navigation.js';

test('bootstrap and cursor gating agree with the installed router route matching', () => {
  for (const path of ['/schedule', '/schedule/', '/Schedule', '/schedule//', '/', '/speakers', '/schedule-other', '/schedule/speakers']) {
    assert.equal(isSchedulePath(path), Boolean(matchPath('/schedule', path)), path);
  }
});

test('startup mounts the agenda only on the intended schedule route', () => {
  const bootstrap = scheduleBootstrap();
  const script = bootstrap.match(/<script>([\s\S]*?)<\/script>/)[1];
  for (const pathname of ['/', '/about', '/speakers', '/team', '/gallery', '/sponsors', '/faq', '/schedule', '/schedule/', '/Schedule', '/schedule-other']) {
    let replacements = 0;
    let clones = 0;
    runInNewContext(script, {
      window: { location: { pathname } },
      document: { getElementById(id) {
        if (id === 'root') return { replaceChildren() { replacements++; } };
        if (id === 'schedule-fallback-template') return { content: { cloneNode() { clones++; return {}; } } };
        throw new Error(`Unexpected DOM access: ${id}`);
      } },
    });
    assert.equal(replacements, isSchedulePath(pathname) ? 1 : 0, pathname);
    assert.equal(clones, replacements, `no agenda DOM created for ${pathname}`);
  }
});

test('the common startup fallback is navigation, not a temporary agenda view', () => {
  const fallback = navigationFallback();
  assert.ok(!fallback.includes('Main stage schedule'));
  assert.ok(!fallback.includes('Welcoming'));
  assert.ok(!fallback.includes('<time'));
  assert.ok(fallback.includes('href="/agenda.html"'));
  const bootstrap = scheduleBootstrap();
  assert.ok(bootstrap.startsWith('<template id="schedule-fallback-template">'));
  assert.ok(bootstrap.indexOf('</template>') < bootstrap.indexOf('<script>'));
  const standalone = agendaDocument();
  assert.equal((standalone.match(/<li /g) || []).length, 14);
  assert.ok(!standalone.includes('<script'));
});

test('page changes reset directly; Back/Forward restore middle and end positions', () => {
  for (const pathname of ['/speakers', '/team', '/gallery', '/faq', '/schedule']) {
    assert.deepEqual(routeScrollTarget({ pathname, hash: '', action: 'PUSH', initial: false, pageChanged: true }), { position: { left: 0, top: 0 } });
    for (const top of [1300, 2800]) {
      const saved = { left: 0, top };
      assert.deepEqual(routeScrollTarget({ pathname, hash: '', action: 'POP', saved, initial: false, pageChanged: true }), { position: saved });
    }
  }
});

test('direct hashes work while native same-page anchors retain ordinary scrolling', () => {
  assert.deepEqual(routeScrollTarget({ pathname: '/schedule', hash: '#session-lunch', action: 'POP', initial: true, pageChanged: true }), { anchor: 'session-lunch', block: 'center' });
  assert.deepEqual(routeScrollTarget({ pathname: '/about', hash: '', action: 'PUSH', pageChanged: true }), { anchor: 'about', block: 'start' });
  assert.equal(routeScrollTarget({ pathname: '/', hash: '#about', action: 'POP', saved: { left: 0, top: 50 }, initial: false, pageChanged: false }), null);
  assert.equal(routeScrollTarget({ pathname: '/schedule', hash: '#schedule-title', action: 'POP', initial: false, pageChanged: false }), null);
  assert.equal(routeScrollTarget({ pathname: '/schedule', hash: '#%invalid', initial: true }), null);
  assert.equal(routeScrollTarget({ pathname: '/schedule', hash: '', action: 'POP', initial: true, documentNavigation: 'reload' }), null);
});
