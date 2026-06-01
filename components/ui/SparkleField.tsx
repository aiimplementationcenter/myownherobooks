import Icon from './Icon'

interface SparkItem {
  l?: string; t?: string; r?: string; b?: string
  s?: number; d?: number; delay?: number
  c?: string; k?: 'sparkle' | 'star'
}

export default function SparkleField({ items }: { items: SparkItem[] }) {
  return (
    <>
      {items.map((s, i) => (
        <span key={i} className={`spark ${s.c ?? ''}`} style={{
          left: s.l, top: s.t, right: s.r, bottom: s.b,
          animation: `twinkle ${s.d ?? 3}s ease-in-out ${s.delay ?? 0}s infinite`,
        }}>
          <Icon name={s.k ?? 'sparkle'} size={s.s ?? 22} />
        </span>
      ))}
    </>
  )
}
