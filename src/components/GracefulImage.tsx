// src/components/GracefulImage.tsx

import { cn } from '@/lib/utils'
import { memo, useState, useCallback } from 'react'

interface GracefulImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  /** srcSet for responsive images */
  srcSet?: string
  /** sizes attribute for responsive images */
  sizes?: string
}

const GracefulImage = memo(({
  srcSet,
  sizes,
  className,
  onLoad,
  onError,
  loading = 'lazy',
  decoding = 'async',
  ...props
}: GracefulImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)

  const handleLoad = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    setIsLoaded(true)
    onLoad?.(e)
  }, [onLoad])

  const handleError = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    setHasError(true)
    onError?.(e)
  }, [onError])

  if (hasError) {
    return (
      <div className={cn('bg-muted flex items-center justify-center', className)}>
        <span className="text-muted-foreground text-xs">Image unavailable</span>
      </div>
    )
  }

  return (
    <img
      {...props}
      srcSet={srcSet}
      sizes={sizes}
      onLoad={handleLoad}
      onError={handleError}
      loading={loading}
      decoding={decoding}
      className={cn(
        'transition-opacity duration-200',
        isLoaded ? 'opacity-100' : 'opacity-0',
        className,
      )}
    />
  )
})

GracefulImage.displayName = 'GracefulImage'

export default GracefulImage
