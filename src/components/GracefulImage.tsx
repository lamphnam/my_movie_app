// src/components/GracefulImage.tsx

import { cn } from '@/lib/utils'
import { memo, useRef, useState } from 'react'

type GracefulImageProps = React.ImgHTMLAttributes<HTMLImageElement>

const GracefulImage = memo((props: GracefulImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)

  const handleLoad = async () => {
    // Try to decode before showing to reduce jank
    try {
      await imgRef.current?.decode()
    } catch {
      // Decode failed or not supported, continue anyway
    }
    setIsLoaded(true)
  }

  const handleError = () => {
    setHasError(true)
  }

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
      onLoad={handleLoad}
      onError={handleError}
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
