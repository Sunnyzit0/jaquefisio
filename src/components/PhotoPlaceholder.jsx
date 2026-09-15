import Icon from './Icon.jsx'

export default function PhotoPlaceholder({ label = 'Foto em breve', shape = 'blob', tint = 'a', className = '', src, alt, style }) {
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
