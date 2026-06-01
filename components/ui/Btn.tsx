import React from 'react'
import Icon from './Icon'

type Variant = 'gold' | 'red' | 'navy' | 'ghost'
type Size = 'sm' | 'lg'

interface BtnProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  block?: boolean
  icon?: Parameters<typeof Icon>[0]['name']
  iconRight?: Parameters<typeof Icon>[0]['name']
  children: React.ReactNode
}

export default function Btn({ variant = 'gold', size, block, icon, iconRight, children, className, ...p }: BtnProps) {
  const cls = [
    'btn',
    `btn-${variant}`,
    size ? `btn-${size}` : '',
    block ? 'btn-block' : '',
    className ?? '',
  ].filter(Boolean).join(' ')
  const iSize = size === 'lg' ? 22 : 19
  return (
    <button className={cls} {...p}>
      {icon && <Icon name={icon} size={iSize} />}
      {children}
      {iconRight && <Icon name={iconRight} size={iSize} />}
    </button>
  )
}
