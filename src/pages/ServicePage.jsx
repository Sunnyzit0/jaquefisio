import { Navigate, useParams } from 'react-router-dom'
import Icon from '../components/Icon.jsx'
import PhotoPlaceholder from '../components/PhotoPlaceholder.jsx'
import { services, waMessage } from '../lib/data.js'
import { staggerStyle, useDocumentMeta, useScrollReveal } from '../lib/hooks.js'

const GALLERY_TINTS = ['a', 'b', 'c']

export default function ServicePage() {
  const { slug } = useParams()
  const service = services.find((s) => s.slug === slug)
  useScrollReveal()

  const title = service ? `${service.title} em Padre Bernardo - GO | Jaqueline Lima` : undefined
  const description = service
    ? `${service.title} com atendimento domiciliar em Padre Bernardo - GO. ${service.description} Agende pelo WhatsApp com Jaqueline Lima, fisioterapeuta e quiropraxista.`
    : undefined
  useDocumentMeta(title, description)

  if (!service) return <Navigate to="/" replace />

  const { title: serviceTitle, description: serviceDescription, icon, number } = service
  const scheduleMessage = waMessage(`Olá, gostaria de agendar uma avaliação de ${serviceTitle}.`)

  return (
    <section className="content-section service-detail">
      <a className="btn-secondary service-detail-back" href="/#servicos"><Icon id="icon-arrow-left" />Voltar aos serviços</a>

      <div className="section-label reveal"><span>{number}</span><span>Serviço</span></div>
      <h1 className="reveal" style={staggerStyle(1)}><Icon id={icon} className="service-detail-icon" />{serviceTitle}</h1>
      <p className="service-detail-summary reveal" style={staggerStyle(2)}>{serviceDescription}</p>

      <div className="service-detail-media reveal" style={staggerStyle(2)}>
        <PhotoPlaceholder label={`Foto de ${serviceTitle}`} shape="arch" tint="a" />
      </div>

      <div className="service-detail-body reveal" style={staggerStyle(3)}>
        <p><strong>O que é:</strong> [Descrição de {serviceTitle} — a preencher com informações da Dra. Jaqueline sobre o que é este atendimento.]</p>
        <p><strong>Para que serve:</strong> [A preencher com informações da Dra. Jaqueline sobre os objetivos e benefícios deste atendimento.]</p>
        <p><strong>Condições e problemas tratados:</strong> [A preencher com informações da Dra. Jaqueline sobre quais condições e problemas este atendimento trata.]</p>
      </div>

      <div className="service-detail-gallery">
        {GALLERY_TINTS.map((tint, i) => (
          <PhotoPlaceholder key={tint} label={`Foto do atendimento de ${serviceTitle}`} shape={i === 1 ? 'arch' : 'blob'} tint={tint} className="reveal" style={staggerStyle(i + 4)} />
        ))}
      </div>

      <div className="service-detail-cta reveal" style={staggerStyle(7)}>
        <a className="primary-button" href={scheduleMessage} target="_blank" rel="noreferrer">
          Agendar avaliação de {serviceTitle} <Icon id="icon-arrow-up-right" />
        </a>
        <a className="btn-secondary" href="/#servicos"><Icon id="icon-arrow-left" />Voltar aos serviços</a>
      </div>
    </section>
  )
}
