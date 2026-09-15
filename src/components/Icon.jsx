export default function Icon({ id, className }) {
  return (
    <svg className={`icon${className ? ` ${className}` : ''}`} aria-hidden="true">
      <use href={`/icons.svg#${id}`} />
    </svg>
  )
}
