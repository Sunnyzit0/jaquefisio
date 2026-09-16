export const whatsappNumber = '5561996787399'
export const waMessage = (text) => `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`
export const whatsappLink = waMessage('Olá, Dra. Jaqueline! Gostaria de agendar uma avaliação.')

// TODO: preencher com o número real do CREFITO da Jaqueline (ex: 'CREFITO-1 000000-F').
// Enquanto estiver vazio, o badge mostra um texto genérico em vez de um placeholder visível.
export const CREFITO_NUMERO = ''

// TODO: fotos reais — quando chegarem, salve os arquivos em /public/images/ com os nomes
// indicados em public/images/README.md e troque os valores null pelo caminho (ex: '/images/foto-hero.jpg').
// Nenhuma outra mudança é necessária: os componentes já sabem exibir a imagem no lugar do placeholder.
export const PHOTOS = {
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
export const HORARIO = '[horário]'

// O campo `size` quebra o grid uniforme: 'lg'/'md' dão mais presença aos serviços
// que mais definem a Jaqueline (quiropraxia, geriátrica, domiciliar); o resto
// fica 'sm' (padrão, sem valor). Vira uma mancha assimétrica em telas largas e volta
// a um grid simples de 1-2 colunas no mobile (ver media queries). `slug` é a rota
// individual do serviço (/servicos/:slug).
export const services = [
  { number: '01', slug: 'quiropraxia', title: 'Quiropraxia', description: 'Realinhamento da coluna para devolver mais leveza e liberdade ao movimento.', icon: 'icon-spine', size: 'lg' },
  { number: '02', slug: 'fisioterapia-ortopedica', title: 'Fisioterapia Ortopédica', description: 'Cuidado próximo para dores, lesões e recuperação do dia a dia.', icon: 'icon-cross' },
  { number: '03', slug: 'fisioterapia-neurologica', title: 'Fisioterapia Neurológica', description: 'Acompanhamento atento para recuperar funções e fortalecer a autonomia.', icon: 'icon-spark-head', size: 'md' },
  { number: '04', slug: 'fisioterapia-geriatrica', title: 'Fisioterapia Geriátrica', description: 'Atendimento domiciliar para idosos viverem com mais segurança e autonomia em casa.', icon: 'icon-cane', size: 'md' },
  { number: '05', slug: 'fisioterapia-esportiva', title: 'Fisioterapia Esportiva', description: 'Prevenção e reabilitação para você voltar ao que ama fazer.', icon: 'icon-pulse' },
  { number: '06', slug: 'fisioterapia-pelvica-gestante', title: 'Fisioterapia Pélvica / Gestante', description: 'Acolhimento e cuidado para as transformações de cada fase da gestação.', icon: 'icon-two-hearts' },
  { number: '07', slug: 'fisioterapia-infantil', title: 'Fisioterapia Infantil', description: 'Fisioterapia neonatal e pediátrica com delicadeza para os pequenos.', icon: 'icon-baby-bottle' },
  { number: '08', slug: 'atendimento-domiciliar', title: 'Atendimento Domiciliar', description: 'O formato padrão de todo atendimento: na sua casa ou na minha — sem consultório fixo, com o mesmo cuidado de sempre.', icon: 'icon-home', size: 'lg' },
]

export const heroStats = [
  [`${services.length}+`, 'áreas de atuação'],
  ['2', 'formas de atendimento'],
  ['2', 'pós-graduações especializadas'],
]

export const trustBadges = [
  CREFITO_NUMERO ? `CREFITO nº ${CREFITO_NUMERO}` : 'Fisioterapeuta registrada',
  'Atendimento humanizado',
  'Pós-graduada em Ortopedia e Neuro Neo/Ped',
  'Atendimento na sua casa ou na minha',
]

// Comentários reais recebidos no Instagram da Jaqueline. Sem nomes reais por
// privacidade (a menos que a paciente autorize depois) — daí o nome genérico
// "Paciente atendido(a)" em todos. O 3º é um placeholder para a Dra. Jaqueline
// enviar outro comentário real depois.
export const testimonials = [
  { text: 'Mãozinhas abençoadas que eu amo', name: 'Paciente atendido(a)' },
  { text: 'A melhor fisio da vida', name: 'Paciente atendido(a)' },
  { text: '[Depoimento a preencher pela Dra. Jaqueline]', name: 'Paciente atendido(a)' },
]

// O atendimento domiciliar não é "mais um item" da lista — é o modelo padrão,
// por isso ganha um destaque próprio (homeCareHighlight) acima do checklist.
export const homeCareHighlight = {
  title: 'Atendimento 100% domiciliar',
  text: 'Sem consultório fixo: o cuidado acontece no conforto da sua casa ou na minha — como for melhor pra você.',
}

export const differentials = [
  'Atendimento humanizado e acolhedor, do primeiro contato ao retorno',
  'Atende todas as idades: idosos, bebês, crianças, gestantes, atletas e adultos',
  'Agendamento fácil e rápido pelo WhatsApp',
  'Profissional com pós-graduação em Ortopedia e Neuro Neo/Ped',
]
