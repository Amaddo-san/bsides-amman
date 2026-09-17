import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { navigationFallback, scheduleBootstrap, agendaDocument } from './scripts/app-fallback.js'

export default defineConfig({
  base: './',
  plugins: [react(), {
    name: 'schedule-html-fallback',
    transformIndexHtml(html) {
      return html.replace('<!--app-fallback-->', navigationFallback())
        .replace('<!--schedule-fallback-->', scheduleBootstrap())
    },
    configureServer(server) {
      server.middlewares.use('/agenda.html', (_request, response) => {
        response.setHeader('Content-Type', 'text/html; charset=utf-8')
        response.end(agendaDocument())
      })
    },
    generateBundle() {
      this.emitFile({ type: 'asset', fileName: 'agenda.html', source: agendaDocument() })
    },
  }],
})
