import Icon from './Icon'

export default function Stars({ n = 5, size = 18 }: { n?: number; size?: number }) {
  return (
    <span className="stars" aria-label={`${n} out of 5 stars`}>
      {Array.from({ length: n }).map((_, i) => <Icon key={i} name="star" size={size} />)}
    </span>
  )
}
