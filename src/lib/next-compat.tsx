import React from 'react'
import { Link as RouterLink } from 'react-router-dom'

// Compatibilidad con next/link
export function Link({ href, children, ...props }: any) {
  return (
    <RouterLink to={href} {...props}>
      {children}
    </RouterLink>
  )
}

// Compatibilidad con next/image
export function Image({
  src,
  alt,
  width,
  height,
  className,
  ...props
}: any) {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      crossOrigin="anonymous"
      {...props}
    />
  )
}
