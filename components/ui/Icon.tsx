import React from 'react'

type IconName =
  | 'camera' | 'wand' | 'pen' | 'book' | 'star' | 'check' | 'truck'
  | 'shield' | 'heart' | 'gift' | 'plus' | 'arrow' | 'upload' | 'sparkle'
  | 'refresh' | 'chevron' | 'close' | 'user' | 'palette'

interface IconProps extends Omit<React.SVGProps<SVGSVGElement>, 'stroke'> {
  name: IconName
  size?: number
  stroke?: number
}

export default function Icon({ name, size = 24, stroke = 2.4, ...p }: IconProps) {
  const common: React.SVGProps<SVGSVGElement> = {
    width: size, height: size, viewBox: '0 0 24 24', fill: 'none',
    stroke: 'currentColor', strokeWidth: stroke,
    strokeLinecap: 'round', strokeLinejoin: 'round', ...p,
  }
  const paths: Record<IconName, React.ReactNode> = {
    camera: <><path d="M3 8.5A2.5 2.5 0 0 1 5.5 6h1l1-2h7l1 2h1A2.5 2.5 0 0 1 22 8.5V18a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><circle cx="12.5" cy="13" r="3.5"/></>,
    wand: <><path d="M15 4V2M15 10V8M11.5 5.5h-2M20.5 5.5h-2M4 20l9-9M16 8l2-2"/><path d="M18 6l2 2"/></>,
    pen: <><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/></>,
    book: <><path d="M12 6.5C10.5 5 7.5 4.3 4 4.5v13c3.5-.2 6.5.5 8 2 1.5-1.5 4.5-2.2 8-2v-13c-3.5-.2-6.5.5-8 2z"/><path d="M12 6.5V21"/></>,
    star: <path d="M12 3l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9 6.8 19.6l1-5.8L3.5 9.7l5.9-.9z" fill="currentColor" stroke="none"/>,
    check: <path d="M5 12.5l4.5 4.5L19 7"/>,
    truck: <><path d="M3 6h11v9H3zM14 9h4l3 3v3h-7"/><circle cx="7" cy="18" r="1.8"/><circle cx="17" cy="18" r="1.8"/></>,
    shield: <><path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z"/><path d="M9 12l2 2 4-4"/></>,
    heart: <path d="M12 20s-7-4.5-9.2-9C1.4 8 2.8 5 6 5c2 0 3 1.2 4 2.5C11 6.2 12 5 14 5c3.2 0 4.6 3 3.2 6-2.2 4.5-9.2 9-9.2 9z" fill="currentColor" stroke="none"/>,
    gift: <><rect x="3" y="9" width="18" height="12" rx="1.5"/><path d="M3 13h18M12 9v12M12 9S10.5 4 8 4 5 7 7 8.5 12 9 12 9zM12 9s1.5-5 4-5 3 3 1 4.5S12 9 12 9z"/></>,
    plus: <path d="M12 5v14M5 12h14"/>,
    arrow: <path d="M5 12h14M13 6l6 6-6 6"/>,
    upload: <><path d="M12 16V4M7 9l5-5 5 5"/><path d="M4 16v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3"/></>,
    sparkle: <path d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8z" fill="currentColor" stroke="none"/>,
    refresh: <><path d="M3 12a9 9 0 0 1 15-6.7L21 8M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-15 6.7L3 16M3 21v-5h5"/></>,
    chevron: <path d="M9 6l6 6-6 6"/>,
    close: <path d="M6 6l12 12M18 6L6 18"/>,
    user: <><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 3.5-6 8-6s8 2 8 6"/></>,
    palette: <><path d="M12 3a9 9 0 1 0 0 18c1 0 1.6-.8 1.6-1.6 0-.5-.3-.9-.5-1.3-.3-.4-.5-.8-.5-1.3 0-.9.7-1.6 1.6-1.6H16a5 5 0 0 0 5-5c0-4.4-4-7.2-9-7.2z"/><circle cx="7.5" cy="11" r="1"/><circle cx="12" cy="7.5" r="1"/><circle cx="16.5" cy="11" r="1"/></>,
  }
  return <svg {...common}>{paths[name]}</svg>
}
