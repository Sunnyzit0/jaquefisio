import './App.css'

const whatsappNumber = '5561996787399'
const waMessage = (text) => `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`
const whatsappLink = waMessage('Olá, Dra. Jaqueline! Gostaria de agendar uma avaliação.')

const services = [
  ['01', 'Quiropraxia', 'Realinhamento da coluna para devolver mais leveza e liberdade ao movimento.', 'icon-spine'],
  ['02', 'Fisioterapia Ortopédica', 'Cuidado próximo para dores, lesões e recuperação do dia a dia.', 'icon-cross'],
  ['03', 'Fisioterapia Neurológica', 'Acompanhamento atento para recuperar funções e fortalecer a autonomia.', 'icon-spark-head'],
  ['04', 'Fisioterapia Geriátrica', 'Atendimento hospitalar e domiciliar para idosos viverem com mais segurança.', 'icon-cane'],
  ['05', 'Fisioterapia Esportiva', 'Prevenção e reabilitação para você voltar ao que ama fazer.', 'icon-pulse'],
  ['06', 'Fisioterapia Pélvica / Gestante', 'Acolhimento e cuidado para as transformações de cada fase da gestação.', 'icon-two-hearts'],
  ['07', 'Fisioterapia Infantil', 'Fisioterapia neonatal e pediátrica com delicadeza para os pequenos.', 'icon-baby-bottle'],
  ['08', 'Atendimento Domiciliar', 'O cuidado vai até você, com conforto, escuta e atenção individualizada.', 'icon-home-heart'],
]

const audience = [
  ['Idosos', 'icon-cane'],
  ['Bebês e crianças', 'icon-baby-bottle'],
  ['Gestantes', 'icon-two-hearts'],
  ['Atletas', 'icon-pulse'],
  ['Adultos', 'icon-heart'],
]

function Icon({ id, className }) {
  return (
    <svg className={`icon${className ? ` ${className}` : ''}`} aria-hidden="true">
      <use href={`/icons.svg#${id}`} />
    </svg>
  )
}

function App() {
  return (
    <div className="site-shell">
      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="Jaqueline Lima, início">
          <span className="brand-mark">JL</span><span className="brand-name">Jaqueline Lima</span>
        </a>
        <nav aria-label="Navegação principal"><a href="#sobre">Sobre</a><a href="#servicos">Serviços</a><a href="#contato">Contato</a></nav>
        <a className="header-cta" href={whatsappLink} target="_blank" rel="noreferrer">Agendar avaliação <span aria-hidden="true">↗</span></a>
      </header>

      <main>
        <section className="hero-section" id="inicio">
          <div className="hero-copy">
            <p className="eyebrow"><span className="eyebrow-icon"><Icon id="icon-heart" /></span> Fisioterapia e Quiropraxia · Padre Bernardo - GO</p>
            <h1>Cuidar do corpo é<br /><em>cuidar da vida.</em></h1>
            <p className="hero-intro">Um cuidado próximo, afetivo e feito para pessoas de todas as fases: idosos, bebês, crianças, gestantes, atletas e adultos.</p>
            <div className="hero-actions"><a className="primary-button" href={whatsappLink} target="_blank" rel="noreferrer">Agendar avaliação <span aria-hidden="true">↗</span></a><a className="text-link" href="#servicos">Conheça os atendimentos <span aria-hidden="true">↓</span></a></div>
          </div>
          <div className="hero-art" aria-label="Foto de Jaqueline Lima em breve">
            <span className="blob blob-hero-1" aria-hidden="true"></span>
            <span className="blob blob-hero-2" aria-hidden="true"></span>
            <div className="art-ring art-ring-one"></div>
            <div className="art-ring art-ring-two"></div>
            <div className="art-photo-card">
              <span className="art-photo-icon"><Icon id="icon-camera" /></span>
              <span className="art-initials">JL</span>
              <span className="art-caption">presença<br />que transforma</span>
            </div>
            <span className="art-note art-note-top">movimento<br />com propósito</span>
            <span className="art-note art-note-bottom">escuta<br />e cuidado</span>
          </div>
        </section>

        <section className="audience-strip" aria-label="Pessoas atendidas">
          <div className="audience-strip-inner">
            <span className="audience-lead">Para cada história, um cuidado</span>
            <ul className="audience-chips">
              {audience.map(([label, icon]) => <li key={label}><Icon id={icon} />{label}</li>)}
            </ul>
          </div>
        </section>

        <section className="content-section about-section" id="sobre">
          <div className="section-label"><span>01</span><span>Sobre mim</span></div>
          <h2>Tem espaço para <em>você</em> aqui. <span aria-hidden="true">🤍</span></h2>
          <div className="about-content">
            <div className="about-photo">
              <span className="blob blob-about" aria-hidden="true"></span>
              <div className="about-photo-card">
                <span className="about-photo-icon"><Icon id="icon-camera" /></span>
                <span className="about-photo-label">Foto de<br />Jaqueline Lima</span>
              </div>
              <span className="about-photo-badge"><Icon id="icon-heart" /></span>
            </div>
            <div className="about-text">
              <p className="lead">Eu sou Jaqueline Lima, fisioterapeuta e quiropraxista. Acredito que cuidar é estar perto, ouvir com atenção e respeitar o tempo de cada pessoa.</p>
              <p>Minha formação inclui Pós-graduação em Fisioterapia Ortopédica e Pós-graduação em Fisioterapia Neurológica Neo/Ped, com foco neonatal e pediátrico. Essa mistura de conhecimento e carinho guia cada atendimento.</p>
              <p>Seja para recuperar um movimento, aliviar uma dor ou acompanhar uma nova fase, meu propósito é fazer você se sentir acolhido e confiante no próprio corpo.</p>
              <div className="credentials">
                <span><Icon id="icon-cross" />Fisioterapeuta</span>
                <span><Icon id="icon-spine" />Quiropraxista</span>
                <span><Icon id="icon-baby-bottle" />Neo/Ped</span>
              </div>
            </div>
          </div>
        </section>

        <section className="services-section" id="servicos">
          <div className="content-section">
            <div className="section-heading"><div className="section-label"><span>02</span><span>Como posso ajudar</span></div><h2>Um cuidado que acompanha<br /><em>o seu ritmo.</em></h2><p>Atendimentos pensados para o que seu corpo precisa hoje.</p></div>
            <div className="service-grid">{services.map(([number, title, description, icon]) => <a className="service-card" key={number} href={waMessage(`Olá, gostaria de agendar uma avaliação de ${title}.`)} target="_blank" rel="noreferrer" aria-label={`Agendar avaliação de ${title} pelo WhatsApp`}><span className="service-icon-badge"><Icon id={icon} /></span><span className="service-number">{number}</span><h3>{title}</h3><p>{description}</p><span className="card-arrow" aria-hidden="true">↗</span></a>)}</div>
          </div>
        </section>

        <section className="content-section contact-section" id="contato">
          <span className="blob blob-contact" aria-hidden="true"></span>
          <div className="contact-card">
            <div className="contact-main">
              <div className="section-label"><span>03</span><span>Vamos conversar</span></div>
              <h2>Seu próximo passo<br />pode começar <em>agora.</em></h2>
              <p>Me conte como posso cuidar de você ou de quem você ama. O agendamento é feito de forma simples e gentil pelo WhatsApp.</p>
              <a className="primary-button light-button" href={whatsappLink} target="_blank" rel="noreferrer"><Icon id="icon-chat" /> Falar pelo WhatsApp <span aria-hidden="true">↗</span></a>
            </div>
            <div className="contact-details">
              <div><span className="detail-label">WhatsApp</span><a href="tel:+5561996787399">(61) 99678-7399</a></div>
              <div><span className="detail-label">Onde estou</span><span>Padre Bernardo - GO</span></div>
              <div><span className="detail-label">Atendimento</span><span>Consultório, hospitalar e domiciliar</span></div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="site-footer-inner">
          <span><Icon id="icon-heart" />Jaqueline Lima</span>
          <span>Fisioterapia e Quiropraxia · Padre Bernardo - GO</span>
          <a href="#inicio">Voltar ao início ↑</a>
        </div>
      </footer>
    </div>
  )
}

export default App
