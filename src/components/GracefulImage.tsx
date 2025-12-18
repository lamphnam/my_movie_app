// src/components/GracefulImage.tsx

import { cn } from '@/lib/utils'
import { memo, useEffect, useRef, useState } from 'react'

type GracefulImageProps = React.ImgHTMLAttributes<HTMLImageElement>

const GracefulImage = memo((props: GracefulImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (!props.src) return

    const img = new Image()
    img.src = props.src
    img.onload = () => setIsLoaded(true)
    img.onerror = () => setHasError(true)

    return () => {
      img.onload = null
      img.onerror = null
    }
  }, [props.src])

  if (hasError) {
    return (
      <div className={cn('bg-muted flex items-center justify-center', props.className)}>
        <span className="text-muted-foreground text-xs">Image unavailable</span>
      </div>
    )
  }

  return (
    <img
      ref={imgRef}
      {...props}
      loading={props.loading || 'lazy'}
      decoding="async"
      className={cn(
        'transition-opacity duration-300 ease-in-out',
        isLoaded ? 'opacity-100' : 'opacity-0',
        props.className,
      )}
    />
  )
})

GracefulImage.displayName = 'GracefulImage'

export default GracefulImage
