import { useEffect, useRef, useState } from 'react'
import './App.css'

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Reveals `.reveal` elements with a fade + translateY as they enter the viewport.
// Plain IntersectionObserver instead of a library (e.g. Framer Motion) to keep the bundle light.
function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-visible'))
      return
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
    )
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}

// Inline style for a staggered reveal delay, e.g. the Nth card in a grid.
const staggerStyle = (index, step = 0.08) => ({ '--reveal-delay': `${index * step}s` })

// A vertical thread that fills in as the page is read, tipped with a spark marker —
// the "line that draws itself" as you scroll, connecting the sections top to bottom.
function useScrollProgress() {
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    if (prefersReducedMotion()) return
    let ticking = false
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0)
      ticking = false
    }
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])
  return progress
}

// Subtle parallax on the hero illustration: it lags behind the page scroll,
// giving the hero a sense of depth instead of moving 1:1 with the text.
function useHeroParallax(ref) {
  useEffect(() => {
    if (!ref.current || prefersReducedMotion() || !window.matchMedia('(min-width: 900px)').matches) return
    let ticking = false
    const update = () => {
      if (ref.current) ref.current.style.transform = `translateY(${window.scrollY * 0.1}px)`
      ticking = false
    }
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(update)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [ref])
}

// A soft trailing dot that follows the pointer and blooms open over anything
// clickable — a small, deliberate detail for mouse/trackpad visitors only.
function useCustomCursor(ref) {
  useEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion() || !window.matchMedia('(pointer: fine)').matches) return
    let raf = null
    const move = (e) => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        el.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
        raf = null
      })
    }
    const onOver = (e) => { if (e.target.closest && e.target.closest('a, button')) el.classList.add('is-active') }
    const onOut = (e) => { if (e.target.closest && e.target.closest('a, button')) el.classList.remove('is-active') }
    document.addEventListener('mousemove', move, { passive: true })
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout', onOut)
    el.classList.add('is-enabled')
    return () => {
      document.removeEventListener('mousemove', move)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
    }
  }, [ref])
}

const whatsappNumber = '5561996787399'
const waMessage = (text) => `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`
const whatsappLink = waMessage('Olá, Dra. Jaqueline! Gostaria de agendar uma avaliação.')

// TODO: preencher com o número real do CREFITO da Jaqueline (ex: 'CREFITO-1 000000-F').
// Enquanto estiver vazio, o badge mostra um texto genérico em vez de um placeholder visível.
const CREFITO_NUMERO = ''

// TODO: fotos reais — quando chegarem, salve os arquivos em /public/images/ com os nomes
// indicados em public/images/README.md e troque os valores null pelo caminho (ex: '/images/foto-hero.jpg').
// Nenhuma outra mudança é necessária: os componentes já sabem exibir a imagem no lugar do placeholder.
const PHOTOS = {
  hero: null,
  minhaCasa: null,
  domiciliar: null,
  diferenciais: null,
}

// Não há consultório/endereço fixo: são exatamente 2 formas de atendimento —
// na casa da Jaqueline ou na casa do paciente — por isso não existe uma
// constante de endereço aqui, e nada no site deve mencionar uma 3ª opção.
// Sem convênio: atendimento é só particular, por isso não há campo de convênios.
// TODO: horário de atendimento — preencher quando disponível.
const HORARIO = '[horário]'

// O 5º campo quebra o grid uniforme: 'lg'/'md' dão mais presença aos serviços
// que mais definem a Jaqueline (quiropraxia, geriátrica, domiciliar); o resto
// fica 'sm' (padrão). Vira uma mancha assimétrica em telas largas e volta a
// um grid simples de 1-2 colunas no mobile (ver media queries).
const services = [
  ['01', 'Quiropraxia', 'Realinhamento da coluna para devolver mais leveza e liberdade ao movimento.', 'icon-spine', 'lg'],
  ['02', 'Fisioterapia Ortopédica', 'Cuidado próximo para dores, lesões e recuperação do dia a dia.', 'icon-cross'],
  ['03', 'Fisioterapia Neurológica', 'Acompanhamento atento para recuperar funções e fortalecer a autonomia.', 'icon-spark-head', 'md'],
  ['04', 'Fisioterapia Geriátrica', 'Atendimento domiciliar para idosos viverem com mais segurança e autonomia em casa.', 'icon-cane', 'md'],
  ['05', 'Fisioterapia Esportiva', 'Prevenção e reabilitação para você voltar ao que ama fazer.', 'icon-pulse'],
  ['06', 'Fisioterapia Pélvica / Gestante', 'Acolhimento e cuidado para as transformações de cada fase da gestação.', 'icon-two-hearts'],
  ['07', 'Fisioterapia Infantil', 'Fisioterapia neonatal e pediátrica com delicadeza para os pequenos.', 'icon-baby-bottle'],
  ['08', 'Atendimento Domiciliar', 'O formato padrão de todo atendimento: na sua casa ou na minha — sem consultório fixo, com o mesmo cuidado de sempre.', 'icon-home', 'lg'],
]

const heroStats = [
  [`${services.length}+`, 'áreas de atuação'],
  ['2', 'formas de atendimento'],
  ['2', 'pós-graduações especializadas'],
]

const trustBadges = [
  CREFITO_NUMERO ? `CREFITO nº ${CREFITO_NUMERO}` : 'Fisioterapeuta registrada',
  'Atendimento humanizado',
  'Pós-graduada em Ortopedia e Neuro Neo/Ped',
  'Atendimento na sua casa ou na minha',
]

// TODO: depoimentos fictícios para preencher o layout — substituir por depoimentos reais
// de pacientes (com autorização deles) antes de publicar.
const testimonials = [
  ['Maria S.', 'Fisioterapia Geriátrica', 'Me senti acolhida desde a primeira consulta. O cuidado com calma e atenção fez toda a diferença na minha recuperação.'],
  ['Carlos R.', 'Fisioterapia Esportiva', 'Profissionalismo e dedicação em cada sessão. Voltei a treinar sem dores graças ao acompanhamento cuidadoso.'],
  ['Beatriz A.', 'Fisioterapia Pélvica / Gestante', 'Um atendimento humano, atencioso e muito acolhedor durante toda a gestação. Recomendo de coração.'],
]

// O atendimento domiciliar não é "mais um item" da lista — é o modelo padrão,
// por isso ganha um destaque próprio (homeCareHighlight) acima do checklist.
const homeCareHighlight = {
  title: 'Atendimento 100% domiciliar',
  text: 'Sem consultório fixo: o cuidado acontece no conforto da sua casa ou na minha — como for melhor pra você.',
}

const differentials = [
  'Atendimento humanizado e acolhedor, do primeiro contato ao retorno',
  'Atende todas as idades: idosos, bebês, crianças, gestantes, atletas e adultos',
  'Agendamento fácil e rápido pelo WhatsApp',
  'Profissional com pós-graduação em Ortopedia e Neuro Neo/Ped',
]

function Icon({ id, className }) {
  return (
    <svg className={`icon${className ? ` ${className}` : ''}`} aria-hidden="true">
      <use href={`/icons.svg#${id}`} />
    </svg>
  )
}

function PhotoPlaceholder({ label = 'Foto em breve', shape = 'blob', tint = 'a', className = '', src, alt, style }) {
  const shapeClass = `photo-placeholder photo-placeholder--${shape} photo-placeholder--tint-${tint}${className ? ` ${className}` : ''}`
  if (src) {
    return <img className={`${shapeClass} photo-placeholder--img`} src={src} alt={alt || label} loading="lazy" decoding="async" style={style} />
  }
  return (
    <div className={shapeClass} style={style}>
      <span className="photo-placeholder-icon"><Icon id="icon-camera" /></span>
      {label && <span className="photo-placeholder-label">{label}</span>}
    </div>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = () => setMenuOpen(false)
  const heroArtRef = useRef(null)
  const cursorRef = useRef(null)
  useScrollReveal()
  const progress = useScrollProgress()
  useHeroParallax(heroArtRef)
  useCustomCursor(cursorRef)

  return (
    <div className="site-shell">
      <div className="cursor-dot" ref={cursorRef} aria-hidden="true"></div>
      <div className="scroll-progress" aria-hidden="true">
        <div className="scroll-progress-track">
          <div className="scroll-progress-fill" style={{ transform: `scaleY(${progress})` }}></div>
          <div className="scroll-progress-marker" style={{ top: `${progress * 100}%` }}><Icon id="icon-spark" /></div>
        </div>
      </div>
      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="Jaqueline Lima, início">
          <span className="brand-mark">JL</span><span className="brand-name">Jaqueline Lima</span>
        </a>
        <nav id="site-nav" className={menuOpen ? 'is-open' : ''} aria-label="Navegação principal">
          <a href="#sobre" onClick={closeMenu}>Sobre</a>
          <a href="#servicos" onClick={closeMenu}>Serviços</a>
          <a href="#contato" onClick={closeMenu}>Contato</a>
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
        <section className="hero-section" id="inicio">
          <div className="hero-copy">
            <p className="eyebrow reveal"><span className="eyebrow-icon"><Icon id="icon-heart" /></span> Fisioterapia e Quiropraxia · Padre Bernardo - GO</p>
            <h1 className="reveal" style={staggerStyle(1)}>Cuidar do corpo é<br /><em>cuidar da vida.</em></h1>
            <p className="hero-intro reveal" style={staggerStyle(2)}>Um cuidado próximo, afetivo e feito para pessoas de todas as fases: idosos, bebês, crianças, gestantes, atletas e adultos.</p>
            <div className="hero-actions reveal" style={staggerStyle(3)}><a className="primary-button" href={whatsappLink} target="_blank" rel="noreferrer">Agendar avaliação <Icon id="icon-arrow-up-right" /></a><a className="btn-secondary text-link" href="#servicos">Conheça os atendimentos <Icon id="icon-arrow-down" /></a></div>
            <ul className="hero-stats reveal" style={staggerStyle(4)}>
              {heroStats.map(([number, label]) => <li key={label} className="stat-card"><span className="stat-number">{number}</span><span className="stat-label">{label}</span></li>)}
            </ul>
          </div>
          <div className="hero-art reveal" style={staggerStyle(2)} aria-label="Foto de Jaqueline Lima em breve">
            <div className="hero-art-parallax" ref={heroArtRef}>
              <span className="blob blob-hero-1" aria-hidden="true"></span>
              <span className="blob blob-hero-2" aria-hidden="true"></span>
              <div className="art-ring art-ring-one"></div>
              <div className="art-ring art-ring-two"></div>
              <div className="art-photo-card">
                {PHOTOS.hero ? (
                  <img className="art-photo-img" src={PHOTOS.hero} alt="Jaqueline Lima" loading="eager" decoding="async" fetchPriority="high" />
                ) : (
                  <>
                    <span className="art-photo-icon"><Icon id="icon-camera" /></span>
                    <span className="art-initials">JL</span>
                    <span className="art-caption">presença<br />que transforma</span>
                  </>
                )}
              </div>
              <span className="art-note art-note-top">movimento<br />com propósito</span>
              <span className="art-note art-note-bottom">escuta<br />e cuidado</span>
            </div>
          </div>
        </section>

        <section className="trust-strip" aria-label="Selos de confiança">
          <div className="trust-strip-inner">
            <ul className="trust-badges">
              {trustBadges.map((label, i) => <li key={label} className="reveal" style={staggerStyle(i)}><Icon id="icon-check" />{label}</li>)}
            </ul>
          </div>
        </section>

        <section className="content-section about-section" id="sobre">
          <div className="section-label reveal"><span>01</span><span>Sobre mim</span></div>
          <h2 className="reveal" style={staggerStyle(1)}>Tem espaço para <em>você</em> aqui. <Icon id="icon-heart" className="heading-accent" /></h2>
          <div className="about-content">
            <div className="about-text reveal">
              <p className="lead">Eu sou Jaqueline Lima, fisioterapeuta e quiropraxista. Acredito que cuidar é estar perto, ouvir com atenção e respeitar o tempo de cada pessoa.</p>
              <p>Minha formação inclui Pós-graduação em Fisioterapia Ortopédica e Pós-graduação em Fisioterapia Neurológica Neo/Ped, com foco neonatal e pediátrico. Essa mistura de conhecimento e carinho guia cada atendimento.</p>
              <p>Seja para recuperar um movimento, aliviar uma dor ou acompanhar uma nova fase, meu propósito é fazer você se sentir acolhido e confiante no próprio corpo.</p>
              <div className="credentials">
                <span><Icon id="icon-cross" />Fisioterapeuta</span>
                <span><Icon id="icon-spine" />Quiropraxista</span>
                <span><Icon id="icon-baby-bottle" />Neo/Ped</span>
              </div>
            </div>
            <div className="about-photos about-photos--duo">
              <PhotoPlaceholder label="Atendimento na minha casa" shape="arch" tint="a" src={PHOTOS.minhaCasa} className="reveal" style={staggerStyle(0)} />
              <PhotoPlaceholder label="Cuidado na sua casa" shape="arch" tint="b" src={PHOTOS.domiciliar} className="reveal" style={staggerStyle(1)} />
            </div>
          </div>
          <div className="about-pillars">
            <div className="pillar reveal">
              <h3>Missão</h3>
              <p>Cuidar com atenção e respeito, devolvendo autonomia e qualidade de vida em cada fase da vida — dos primeiros meses à terceira idade.</p>
            </div>
            <div className="pillar reveal" style={staggerStyle(1)}>
              <h3>Como trabalho</h3>
              <p>Avaliação individual, escuta atenta e um plano de tratamento pensado para o seu corpo e o seu tempo — na sua casa ou na minha, sem consultório fixo.</p>
            </div>
          </div>
        </section>

        <section className="services-section" id="servicos">
          <div className="content-section">
            <div className="section-heading reveal"><div className="section-label"><span>02</span><span>Como posso ajudar</span></div><h2>Um cuidado que acompanha<br /><em>o seu ritmo.</em></h2><p>Atendimentos pensados para o que seu corpo precisa hoje.</p></div>
            <div className="service-grid">{services.map(([number, title, description, icon, size], i) => <a className={`service-card reveal${size ? ` service-card--${size}` : ''}`} style={staggerStyle(i, 0.06)} key={number} href={waMessage(`Olá, gostaria de agendar uma avaliação de ${title}.`)} target="_blank" rel="noreferrer" aria-label={`Agendar avaliação de ${title} pelo WhatsApp`}><span className="service-icon-badge"><Icon id={icon} /></span><span className="service-number">{number}</span><h3>{title}</h3><p>{description}</p><span className="service-cta btn-secondary">Saiba mais <Icon id="icon-arrow-up-right" /></span></a>)}</div>
          </div>
        </section>

        <section className="content-section pricing-section" id="valores">
          <div className="section-label reveal"><span>03</span><span>Investimento</span></div>
          <h2 className="reveal" style={staggerStyle(1)}>Cuidado sob medida,<br /><em>valor sob consulta.</em></h2>
          <p className="pricing-intro reveal" style={staggerStyle(2)}>Os valores variam de acordo com a avaliação e o plano de cada pessoa, por isso ainda não estão fechados aqui. Me chama no WhatsApp que a gente conversa sobre o seu caso.</p>
          <div className="pricing-table">
            <div className="pricing-row pricing-row--head" aria-hidden="true">
              <span>Serviço</span><span>O que inclui</span><span>Valor</span>
            </div>
            {services.map(([number, title, description, icon], i) => (
              <div className="pricing-row reveal" style={staggerStyle(i, 0.05)} key={number}>
                <div className="pricing-service"><span className="pricing-icon"><Icon id={icon} /></span><span>{title}</span></div>
                <p className="pricing-desc">{description}</p>
                <div className="pricing-price">
                  <span className="pricing-placeholder">{'{valor}'}</span>
                  <a className="pricing-value" href={waMessage(`Olá, gostaria de saber o valor de ${title}.`)} target="_blank" rel="noreferrer" aria-label={`Solicitar valor de ${title} pelo WhatsApp`}>
                    <Icon id="icon-chat" />Consulte
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="content-section differentials-section" id="diferenciais">
          <div className="differentials-grid">
            <div className="differentials-photo reveal">
              <span className="blob blob-differentials" aria-hidden="true"></span>
              <PhotoPlaceholder label="Foto de Jaqueline Lima" shape="blob" tint="b" src={PHOTOS.diferenciais} />
            </div>
            <div className="differentials-text">
              <div className="section-label reveal"><span>04</span><span>Por que escolher</span></div>
              <h2 className="reveal" style={staggerStyle(1)}>Diferenciais que fazem<br /><em>a diferença.</em></h2>
              <div className="home-care-highlight reveal" style={staggerStyle(2)}>
                <span className="home-care-icon"><Icon id="icon-home" /></span>
                <div className="home-care-copy">
                  <strong>{homeCareHighlight.title}</strong>
                  <p>{homeCareHighlight.text}</p>
                </div>
              </div>
              <ul className="differentials-list">
                {differentials.map((item, i) => <li key={item} className="reveal" style={staggerStyle(i + 3)}><Icon id="icon-check" />{item}</li>)}
              </ul>
              <a className="primary-button reveal" style={staggerStyle(differentials.length + 3)} href={whatsappLink} target="_blank" rel="noreferrer">Agendar avaliação <Icon id="icon-arrow-up-right" /></a>
            </div>
          </div>
        </section>

        <section className="content-section testimonials-section" id="depoimentos">
          <div className="section-label reveal"><span>05</span><span>O que dizem</span></div>
          <h2 className="reveal" style={staggerStyle(1)}>O que dizem<br /><em>sobre mim.</em></h2>
          <div className="testimonials-grid">
            {testimonials.map(([name, role, text], i) => (
              <div className="testimonial-card reveal" style={staggerStyle(i)} key={name}>
                <span className="testimonial-quote-mark" aria-hidden="true">"</span>
                <p className="testimonial-text">{text}</p>
                <span className="testimonial-name">{name}</span>
                <span className="testimonial-role">{role}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="content-section contact-section" id="contato">
          <span className="blob blob-contact" aria-hidden="true"></span>
          <div className="contact-card reveal">
            <div className="contact-main">
              <div className="section-label"><span>06</span><span>Vamos conversar</span></div>
              <h2>Seu próximo passo<br />pode começar <em>agora.</em></h2>
              <p>Me conte como posso cuidar de você ou de quem você ama. O agendamento é feito de forma simples e gentil pelo WhatsApp.</p>
              <a className="primary-button light-button" href={whatsappLink} target="_blank" rel="noreferrer"><Icon id="icon-chat" /> Falar pelo WhatsApp <Icon id="icon-arrow-up-right" /></a>
            </div>
            <div className="contact-details">
              <div><span className="detail-label">WhatsApp</span><a href="tel:+5561996787399">(61) 99678-7399</a></div>
              <div><span className="detail-label">Área de atendimento</span><span>Padre Bernardo - GO</span></div>
              <div><span className="detail-label">Horário</span><span>{HORARIO}</span></div>
              <div><span className="detail-label">Atendimento</span><span>Domiciliar: na sua casa ou na minha</span></div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="site-footer-inner">
          <span><Icon id="icon-heart" />Jaqueline Lima</span>
          <span>Fisioterapia e Quiropraxia · Padre Bernardo - GO</span>
          <a href="#inicio">Voltar ao início <Icon id="icon-arrow-up" /></a>
        </div>
        <div className="site-footer-credit">{'<prototype by Arthur>'}</div>
      </footer>
    </div>
  )
}

export default App
