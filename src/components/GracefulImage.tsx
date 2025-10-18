// src/components/GracefulImage.tsx

import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'

interface GracefulImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {}

const GracefulImage = (props: GracefulImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const img = new Image()
    img.src = props.src || ''
    img.onload = () => {
      setIsLoaded(true)
    }
  }, [props.src])

  return (
    <img
      {...props}
      className={cn(
        'transition-opacity duration-500 ease-in-out',
        isLoaded ? 'opacity-100' : 'opacity-0',
        props.className,
      )}
    />
  )
}

export default GracefulImage
