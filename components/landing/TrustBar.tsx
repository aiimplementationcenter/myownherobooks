import Icon from '@/components/ui/Icon'

export default function TrustBar() {
  const items = [
    { i: 'truck' as const, t: <span><b>Ships in 7–14 days</b> — worldwide</span> },
    { i: 'shield' as const, t: <span><b>Love-it guarantee</b> or your money back</span> },
    { i: 'book' as const, t: <span><b>Premium hardcover</b>, 30 keepsake pages</span> },
    { i: 'heart' as const, t: <span><b>Reading-level matched</b> for ages 3–10</span> },
  ]
  return (
    <div className="trustbar">
      <div className="wrap">
        {items.map((x, i) => (
          <div className="ti" key={i}><Icon name={x.i} size={22} />{x.t}</div>
        ))}
      </div>
    </div>
  )
}
