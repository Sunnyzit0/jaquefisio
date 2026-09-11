import './App.css'

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
  consultorio: null,
  domiciliar: null,
  hospitalar: null,
  diferenciais: null,
}

// TODO: informações práticas do consultório — preencher quando disponíveis.
const ENDERECO = '[endereço completo]'
const HORARIO = '[horário]'
const CONVENIOS = '[convênios/particular]'

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

const heroStats = [
  [`${services.length}+`, 'áreas de atuação'],
  ['3', 'formas de atendimento'],
  ['2', 'pós-graduações especializadas'],
]

const trustBadges = [
  CREFITO_NUMERO ? `CREFITO nº ${CREFITO_NUMERO}` : 'Fisioterapeuta registrada',
  'Atendimento humanizado',
  'Pós-graduada em Ortopedia e Neuro Neo/Ped',
  'Consultório, hospitalar e domiciliar',
]

// TODO: depoimentos fictícios para preencher o layout — substituir por depoimentos reais
// de pacientes (com autorização deles) antes de publicar.
const testimonials = [
  ['Maria S.', 'Fisioterapia Geriátrica', 'Me senti acolhida desde a primeira consulta. O cuidado com calma e atenção fez toda a diferença na minha recuperação.'],
  ['Carlos R.', 'Fisioterapia Esportiva', 'Profissionalismo e dedicação em cada sessão. Voltei a treinar sem dores graças ao acompanhamento cuidadoso.'],
  ['Beatriz A.', 'Fisioterapia Pélvica / Gestante', 'Um atendimento humano, atencioso e muito acolhedor durante toda a gestação. Recomendo de coração.'],
]

const differentials = [
  'Atendimento humanizado e acolhedor, do primeiro contato ao retorno',
  'Atende todas as idades: idosos, bebês, crianças, gestantes, atletas e adultos',
  'Agendamento fácil e rápido pelo WhatsApp',
  'Atendimento em consultório, hospitalar e domiciliar',
  'Profissional com pós-graduação em Ortopedia e Neuro Neo/Ped',
]

function Icon({ id, className }) {
  return (
    <svg className={`icon${className ? ` ${className}` : ''}`} aria-hidden="true">
      <use href={`/icons.svg#${id}`} />
    </svg>
  )
}

function PhotoPlaceholder({ label = 'Foto em breve', shape = 'blob', tint = 'a', className = '', src, alt }) {
  const shapeClass = `photo-placeholder photo-placeholder--${shape} photo-placeholder--tint-${tint}${className ? ` ${className}` : ''}`
  if (src) {
    return <img className={`${shapeClass} photo-placeholder--img`} src={src} alt={alt || label} />
  }
  return (
    <div className={shapeClass}>
      <span className="photo-placeholder-icon"><Icon id="icon-camera" /></span>
      {label && <span className="photo-placeholder-label">{label}</span>}
    </div>
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
            <ul className="hero-stats">
              {heroStats.map(([number, label]) => <li key={label} className="stat-card"><span className="stat-number">{number}</span><span className="stat-label">{label}</span></li>)}
            </ul>
          </div>
          <div className="hero-art" aria-label="Foto de Jaqueline Lima em breve">
            <span className="blob blob-hero-1" aria-hidden="true"></span>
            <span className="blob blob-hero-2" aria-hidden="true"></span>
            <div className="art-ring art-ring-one"></div>
            <div className="art-ring art-ring-two"></div>
            <div className="art-photo-card">
              {PHOTOS.hero ? (
                <img className="art-photo-img" src={PHOTOS.hero} alt="Jaqueline Lima" />
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
        </section>

        <section className="trust-strip" aria-label="Selos de confiança">
          <div className="trust-strip-inner">
            <ul className="trust-badges">
              {trustBadges.map((label) => <li key={label}><Icon id="icon-check" />{label}</li>)}
            </ul>
          </div>
        </section>

        <section className="content-section about-section" id="sobre">
          <div className="section-label"><span>01</span><span>Sobre mim</span></div>
          <h2>Tem espaço para <em>você</em> aqui. <span aria-hidden="true">🤍</span></h2>
          <div className="about-content">
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
            <div className="about-photos">
              <PhotoPlaceholder label="Atendimento em consultório" shape="arch" tint="a" src={PHOTOS.consultorio} />
              <PhotoPlaceholder label="Cuidado domiciliar" shape="arch" tint="b" src={PHOTOS.domiciliar} />
              <PhotoPlaceholder label="Acompanhamento hospitalar" shape="arch" tint="c" src={PHOTOS.hospitalar} />
            </div>
          </div>
          <div className="about-pillars">
            <div className="pillar">
              <h3>Missão</h3>
              <p>Cuidar com atenção e respeito, devolvendo autonomia e qualidade de vida em cada fase da vida — dos primeiros meses à terceira idade.</p>
            </div>
            <div className="pillar">
              <h3>Como trabalho</h3>
              <p>Avaliação individual, escuta atenta e um plano de tratamento pensado para o seu corpo e o seu tempo, no consultório, no hospital ou na sua casa.</p>
            </div>
          </div>
        </section>

        <section className="services-section" id="servicos">
          <div className="content-section">
            <div className="section-heading"><div className="section-label"><span>02</span><span>Como posso ajudar</span></div><h2>Um cuidado que acompanha<br /><em>o seu ritmo.</em></h2><p>Atendimentos pensados para o que seu corpo precisa hoje.</p></div>
            <div className="service-grid">{services.map(([number, title, description, icon]) => <a className="service-card" key={number} href={waMessage(`Olá, gostaria de agendar uma avaliação de ${title}.`)} target="_blank" rel="noreferrer" aria-label={`Agendar avaliação de ${title} pelo WhatsApp`}><span className="service-icon-badge"><Icon id={icon} /></span><span className="service-number">{number}</span><h3>{title}</h3><p>{description}</p><span className="service-cta">Saiba mais <span aria-hidden="true" className="arrow">↗</span></span></a>)}</div>
          </div>
        </section>

        <section className="content-section differentials-section" id="diferenciais">
          <div className="differentials-grid">
            <div className="differentials-photo">
              <span className="blob blob-differentials" aria-hidden="true"></span>
              <PhotoPlaceholder label="Foto de Jaqueline Lima" shape="blob" tint="b" src={PHOTOS.diferenciais} />
            </div>
            <div className="differentials-text">
              <div className="section-label"><span>03</span><span>Por que escolher</span></div>
              <h2>Diferenciais que fazem<br /><em>a diferença.</em></h2>
              <ul className="differentials-list">
                {differentials.map((item) => <li key={item}><Icon id="icon-check" />{item}</li>)}
              </ul>
              <a className="primary-button" href={whatsappLink} target="_blank" rel="noreferrer">Agendar avaliação <span aria-hidden="true">↗</span></a>
            </div>
          </div>
        </section>

        <section className="content-section testimonials-section" id="depoimentos">
          <div className="section-label"><span>04</span><span>O que dizem</span></div>
          <h2>O que dizem<br /><em>sobre mim.</em></h2>
          <div className="testimonials-grid">
            {testimonials.map(([name, role, text]) => (
              <div className="testimonial-card" key={name}>
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
          <div className="contact-card">
            <div className="contact-main">
              <div className="section-label"><span>05</span><span>Vamos conversar</span></div>
              <h2>Seu próximo passo<br />pode começar <em>agora.</em></h2>
              <p>Me conte como posso cuidar de você ou de quem você ama. O agendamento é feito de forma simples e gentil pelo WhatsApp.</p>
              <a className="primary-button light-button" href={whatsappLink} target="_blank" rel="noreferrer"><Icon id="icon-chat" /> Falar pelo WhatsApp <span aria-hidden="true">↗</span></a>
            </div>
            <div className="contact-details">
              <div><span className="detail-label">WhatsApp</span><a href="tel:+5561996787399">(61) 99678-7399</a></div>
              <div><span className="detail-label">Onde estou</span><span>Padre Bernardo - GO</span></div>
              <div><span className="detail-label">Endereço</span><span>{ENDERECO}</span></div>
              <div><span className="detail-label">Horário</span><span>{HORARIO}</span></div>
              <div><span className="detail-label">Atendimento</span><span>Consultório, hospitalar e domiciliar</span></div>
              <div><span className="detail-label">Convênios</span><span>{CONVENIOS}</span></div>
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
        <div className="site-footer-credit">{'<prototype by Arthur>'}</div>
      </footer>
    </div>
  )
}

export default App
