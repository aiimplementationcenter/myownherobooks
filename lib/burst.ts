export function burst(host: HTMLElement | null, n = 60) {
  if (!host) return
  const colors = ['#F7B41C', '#E0414E', '#3FA0DC', '#16265A', '#FFD45E']
  for (let i = 0; i < n; i++) {
    const d = document.createElement('i')
    const sz = 6 + Math.random() * 9
    Object.assign(d.style, {
      position: 'absolute', left: '50%', top: '40%',
      width: sz + 'px', height: sz + 'px',
      background: colors[i % colors.length],
      borderRadius: Math.random() > 0.5 ? '50%' : '3px',
      pointerEvents: 'none', zIndex: '5',
    })
    host.appendChild(d)
    const ang = Math.random() * Math.PI * 2
    const vel = 120 + Math.random() * 260
    const dx = Math.cos(ang) * vel
    const dy = Math.sin(ang) * vel - 120
    d.animate(
      [
        { transform: 'translate(-50%,-50%) rotate(0)', opacity: '1' },
        { transform: `translate(calc(-50% + ${dx}px), calc(-50% + ${dy + 380}px)) rotate(${Math.random() * 720}deg)`, opacity: '0' },
      ],
      { duration: 1100 + Math.random() * 900, easing: 'cubic-bezier(.2,.7,.3,1)' }
    ).onfinish = () => d.remove()
  }
}
