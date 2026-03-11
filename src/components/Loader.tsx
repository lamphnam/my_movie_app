// src/components/Loader.tsx
import { Loader2 } from 'lucide-react'

const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="h-8 w-8 animate-spin text-primary motion-reduce:animate-none" />
        <p className="text-sm text-muted-foreground">Đang tải...</p>
      </div>
    </div>
  )
}

export default Loader
