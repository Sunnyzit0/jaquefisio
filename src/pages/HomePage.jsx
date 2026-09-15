import { useRef } from 'react'
import { Link } from 'react-router-dom'
import Icon from '../components/Icon.jsx'
import PhotoPlaceholder from '../components/PhotoPlaceholder.jsx'
import {
  PHOTOS, HORARIO, services, heroStats, trustBadges, testimonials,
  homeCareHighlight, differentials, whatsappLink, waMessage,
} from '../lib/data.js'
import { staggerStyle, useDocumentMeta, useHeroParallax, useScrollReveal } from '../lib/hooks.js'

const DEFAULT_TITLE = 'Jaqueline Lima | Fisioterapia e Quiropraxia em Padre Bernardo - GO'
const DEFAULT_DESCRIPTION = 'Jaqueline Lima, fisioterapeuta e quiropraxista em Padre Bernardo - GO. Atendimento 100% domiciliar em Ortopedia, Neurologia, Geriatria e Pediatria — na sua casa ou na minha.'

export default function HomePage() {
  const heroArtRef = useRef(null)
  useScrollReveal()
  useHeroParallax(heroArtRef)
  useDocumentMeta(DEFAULT_TITLE, DEFAULT_DESCRIPTION)

  return (
    <>
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
          <div className="service-grid">{services.map(({ number, slug, title, description, icon, size }, i) => (
            <Link className={`service-card reveal${size ? ` service-card--${size}` : ''}`} style={staggerStyle(i, 0.06)} key={number} to={`/servicos/${slug}`} aria-label={`Ver detalhes de ${title}`}>
              <span className="service-icon-badge"><Icon id={icon} /></span>
              <span className="service-number">{number}</span>
              <h3>{title}</h3>
              <p>{description}</p>
              <span className="service-cta btn-secondary">Saiba mais <Icon id="icon-arrow-up-right" /></span>
            </Link>
          ))}</div>
        </div>
      </section>

      <section className="content-section pricing-section" id="valores">
        <div className="section-label reveal"><span>03</span><span>Serviços em detalhe</span></div>
        <h2 className="reveal" style={staggerStyle(1)}>Conheça cada<br /><em>atendimento de perto.</em></h2>
        <p className="pricing-intro reveal" style={staggerStyle(2)}>Cada atendimento é pensado para o seu momento. Me chama no WhatsApp e conversamos sobre o que faz mais sentido para você.</p>
        <div className="pricing-table">
          <div className="pricing-row pricing-row--head" aria-hidden="true">
            <span>Serviço</span><span>O que inclui</span><span>Agendar</span>
          </div>
          {services.map(({ number, title, description, icon }, i) => (
            <div className="pricing-row reveal" style={staggerStyle(i, 0.05)} key={number}>
              <div className="pricing-service"><span className="pricing-icon"><Icon id={icon} /></span><span>{title}</span></div>
              <p className="pricing-desc">{description}</p>
              <a className="pricing-cta" href={waMessage(`Olá, gostaria de agendar uma avaliação de ${title}.`)} target="_blank" rel="noreferrer" aria-label={`Agendar avaliação de ${title} pelo WhatsApp`}>
                <Icon id="icon-chat" />Agendar avaliação
              </a>
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
    </>
  )
}
