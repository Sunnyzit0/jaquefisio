# Fotos reais do site

Quando as fotos da Jaqueline chegarem, salve os arquivos aqui com estes nomes exatos e depois
troque os valores `null` no objeto `PHOTOS` em `src/App.jsx` pelo caminho correspondente
(ex: `'/images/foto-hero.jpg'`). Nenhuma outra mudança de código é necessária — os componentes
já sabem renderizar a imagem real no lugar do placeholder de câmera assim que o caminho for
preenchido.

| Arquivo esperado          | Onde aparece                                              |
| -------------------------- | ----------------------------------------------------------- |
| `foto-hero.jpg`             | Hero (topo do site), dentro do círculo/blob com "JL"        |
| `foto-minha-casa.jpg`       | Seção "Sobre mim", 1º card de foto (Atendimento na minha casa) — chave `PHOTOS.minhaCasa` |
| `foto-domiciliar.jpg`       | Seção "Sobre mim", 2º card de foto (Cuidado na sua casa)     |
| `foto-diferenciais.jpg`     | Seção "Diferenciais", foto de Jaqueline ao lado da lista     |

Não há consultório/endereço fixo — são exatamente 2 formas de atendimento: na casa
da Jaqueline ou na casa do paciente. Evite fotos que sugiram uma clínica, fachada ou
recepção; prefira ambientes domésticos acolhedores.

Recomendação: fotos verticais (retrato) em boa resolução, formato `.jpg` ou `.webp`, até ~500KB
cada para não pesar o carregamento da página.
