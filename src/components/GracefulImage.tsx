// src/components/GracefulImage.tsx

import { cn } from '@/lib/utils'
import { memo, useState, useCallback } from 'react'

interface GracefulImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  /** srcSet for responsive images */
  srcSet?: string
  /** sizes attribute for responsive images */
  sizes?: string
  /** fetchpriority hint – 'high' for LCP images, 'low' for below-fold */
  fetchPriority?: 'high' | 'low' | 'auto'
}

const GracefulImage = memo(({
  srcSet,
  sizes,
  className,
  onLoad,
  onError,
  loading = 'lazy',
  decoding = 'async',
  fetchPriority,
  width,
  height,
  style,
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

  // Derive aspect-ratio from width/height so the browser reserves the correct
  // amount of space BEFORE the image loads — prevents Cumulative Layout Shift.
  const wrapperStyle: React.CSSProperties = {
    ...(width && height
      ? { aspectRatio: `${Number(width)} / ${Number(height)}` }
      : {}),
    ...style,
  }

  if (hasError) {
    return (
      <div
        className={cn('bg-muted flex items-center justify-center overflow-hidden', className)}
        style={wrapperStyle}
      >
        <span className="text-muted-foreground text-xs">Image unavailable</span>
      </div>
    )
  }

  return (
    /* wrapper div receives className (sizing / shape / shadow) so the box is
       sized correctly even before the img loads */
    <div
      className={cn('relative', className)}
      style={wrapperStyle}
    >
      {/* Loading skeleton – absolutely positioned so it never adds height */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-muted animate-pulse" />
      )}

      <img
        {...props}
        srcSet={srcSet}
        sizes={sizes}
        width={width}
        height={height}
        onLoad={handleLoad}
        onError={handleError}
        loading={loading}
        decoding={decoding}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        fetchPriority={fetchPriority as any}
        className={cn(
          'w-full h-full object-cover object-center transition-opacity duration-200',
          isLoaded ? 'opacity-100' : 'opacity-0',
        )}
      />
    </div>
  )
})

GracefulImage.displayName = 'GracefulImage'

export default GracefulImage
