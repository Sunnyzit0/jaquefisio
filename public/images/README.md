# Fotos reais do site

Quando as fotos da Jaqueline chegarem, salve os arquivos aqui com estes nomes exatos e depois
troque os valores `null` no objeto `PHOTOS` em `src/App.jsx` pelo caminho correspondente
(ex: `'/images/foto-hero.jpg'`). Nenhuma outra mudança de código é necessária — os componentes
já sabem renderizar a imagem real no lugar do placeholder de câmera assim que o caminho for
preenchido.

| Arquivo esperado          | Onde aparece                                              |
| -------------------------- | ----------------------------------------------------------- |
| `foto-hero.jpg`             | Hero (topo do site), dentro do círculo/blob com "JL"        |
| `foto-consultorio.jpg`      | Seção "Sobre mim", 1º card de foto (Atendimento em consultório) |
| `foto-domiciliar.jpg`       | Seção "Sobre mim", 2º card de foto (Cuidado domiciliar)      |
| `foto-hospitalar.jpg`       | Seção "Sobre mim", 3º card de foto (Acompanhamento hospitalar) |
| `foto-diferenciais.jpg`     | Seção "Diferenciais", foto de Jaqueline ao lado da lista     |

Recomendação: fotos verticais (retrato) em boa resolução, formato `.jpg` ou `.webp`, até ~500KB
cada para não pesar o carregamento da página.
