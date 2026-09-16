import { useRef, useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import Icon from './components/Icon.jsx'
import { waMessage, whatsappLink } from './lib/data.js'
import { prefersReducedMotion, useCustomCursor, useScrollProgress, useScrollToTopVisible } from './lib/hooks.js'

// Header, footer and the whole-viewport effects (scroll progress, cursor, scroll-to-top)
// persist across every route; only the <Outlet /> content changes between pages.
export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = () => setMenuOpen(false)
  const cursorRef = useRef(null)
  const progress = useScrollProgress()
  const showScrollTop = useScrollToTopVisible()
  useCustomCursor(cursorRef)
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' })

  return (
    <div className="site-shell">
      <div className="cursor-dot" ref={cursorRef} aria-hidden="true"></div>
      <div className="scroll-progress" aria-hidden="true">
        <div className="scroll-progress-track">
          <div className="scroll-progress-fill" style={{ transform: `scaleY(${progress})` }}></div>
          <div className="scroll-progress-marker" style={{ '--progress': progress }}><Icon id="icon-spark" /></div>
        </div>
      </div>
      <header className="site-header">
        <Link className="brand" to="/" aria-label="Jaqueline Lima, início">
          <span className="brand-mark"><img src="/logo.png" alt="" /></span><span className="brand-name">Jaqueline Lima</span>
        </Link>
        <nav id="site-nav" className={menuOpen ? 'is-open' : ''} aria-label="Navegação principal">
          <a href="/#sobre" onClick={closeMenu}>Sobre</a>
          <a href="/#servicos" onClick={closeMenu}>Serviços</a>
          <a href="/#contato" onClick={closeMenu}>Contato</a>
        </nav>
        <div className="header-actions">
          <a className="header-cta" href={whatsappLink} target="_blank" rel="noreferrer">
            <span className="cta-full">Agendar avaliação</span>
            <span className="cta-short">Agendar</span>
            <Icon id="icon-arrow-up-right" />
          </a>
          <button
            type="button"
            className="menu-toggle"
            aria-expanded={menuOpen}
            aria-controls="site-nav"
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="menu-toggle-bar"></span>
            <span className="menu-toggle-bar"></span>
            <span className="menu-toggle-bar"></span>
          </button>
        </div>
      </header>

      <main>
        <Outlet />
      </main>

      <footer className="site-footer">
        <div className="site-footer-inner">
          <span><span className="footer-mark"><img src="/logo.png" alt="" loading="lazy" decoding="async" /></span>Jaqueline Lima</span>
          <span>Fisioterapia e Quiropraxia · Padre Bernardo - GO</span>
          <a href="/#inicio">Voltar ao início <Icon id="icon-arrow-up" /></a>
        </div>
        <div className="site-footer-credit">{'<prototype by Arthur>'}</div>
      </footer>

      <a
        className="whatsapp-float"
        href={waMessage('Olá! Gostaria de agendar uma avaliação.')}
        target="_blank"
        rel="noreferrer"
        aria-label="Falar no WhatsApp"
      >
        <Icon id="icon-whatsapp" />
      </a>

      <button
        type="button"
        className={`scroll-top-btn${showScrollTop ? ' is-visible' : ''}`}
        onClick={scrollToTop}
        aria-label="Voltar ao topo"
        aria-hidden={!showScrollTop}
        tabIndex={showScrollTop ? 0 : -1}
      >
        <Icon id="icon-arrow-up" />
      </button>
    </div>
  )
}
