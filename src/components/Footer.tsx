import { Film, Info, ExternalLink, Github } from 'lucide-react'
import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

const Footer = () => {
  const [aboutOpen, setAboutOpen] = useState(false)

  return (
    <footer className="mt-8 lg:mt-12 border-t border-border bg-muted/30" role="contentinfo">
      <div className="container-desktop py-6 lg:py-8">
        {/* Desktop: Grid layout | Mobile: Stack */}
        <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-start">
          {/* Disclaimer */}
          <div className="surface-card p-4 lg:p-5">
            <div className="flex gap-3">
              <Info className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" aria-hidden="true" />
              <p className="text-body-sm leading-relaxed">
                Đây là một dự án cá nhân được tạo ra với mục đích học tập và xây dựng portfolio. Trang
                web không có bất kỳ hoạt động kinh doanh hay thu lợi nhuận nào. Tất cả nội dung được
                thu thập từ các trang web video chính thống trên Internet. Nếu quyền lợi của bạn bị
                vi phạm, vui lòng thông báo để chúng tôi xử lý kịp thời.
              </p>
            </div>
          </div>

          {/* Quick Links - Desktop only */}
          <nav aria-label="Footer navigation" className="hidden lg:flex flex-col gap-2 text-body-sm">
            <button
              onClick={() => setAboutOpen(true)}
              className="text-muted-foreground hover:text-foreground transition-colors text-left"
            >
              Giới thiệu
            </button>
            <a
              href="https://phim.nguonc.com/khieu-nai-ban-quyen"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
              aria-label="Khiếu nại bản quyền (mở trong tab mới)"
            >
              Khiếu nại bản quyền
              <ExternalLink className="w-3 h-3" aria-hidden="true" />
            </a>
            <a
              href="https://phim.nguonc.com/api-document"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
              aria-label="Tài liệu API (mở trong tab mới)"
            >
              API
              <ExternalLink className="w-3 h-3" aria-hidden="true" />
            </a>
          </nav>
        </div>

        {/* Footer Bottom */}
        <div className="mt-6 pt-4 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-primary flex items-center justify-center">
              <Film className="w-3.5 h-3.5 text-primary-foreground" aria-hidden="true" />
            </div>
            <p className="text-body-sm">
              &copy; {new Date().getFullYear()} <span className="font-semibold text-foreground">HNAM Phim</span>
            </p>
          </div>

          {/* Mobile only links */}
          <nav aria-label="Footer navigation" className="flex lg:hidden items-center gap-4 text-body-sm">
            <button
              onClick={() => setAboutOpen(true)}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Giới thiệu
            </button>
            <a
              href="https://phim.nguonc.com/khieu-nai-ban-quyen"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Khiếu nại bản quyền (mở trong tab mới)"
            >
              Bản quyền
            </a>
            <a
              href="https://phim.nguonc.com/api-document"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Tài liệu API (mở trong tab mới)"
            >
              API
            </a>
          </nav>
        </div>
      </div>

      {/* About Dialog */}
      <Dialog open={aboutOpen} onOpenChange={setAboutOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <Film className="w-4 h-4 text-primary-foreground" aria-hidden="true" />
              </div>
              HNAM Phim
            </DialogTitle>
            <DialogDescription>
              HNAM Phim là dự án cá nhân được xây dựng với mục đích học tập và phát triển kỹ năng lập trình web. Ứng dụng sử dụng dữ liệu từ API công khai của nguonc.com.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <p className="text-body-sm text-muted-foreground mb-2">Công nghệ sử dụng</p>
              <div className="flex flex-wrap gap-1.5">
                <Badge variant="secondary">React</Badge>
                <Badge variant="secondary">TypeScript</Badge>
                <Badge variant="secondary">Vite</Badge>
                <Badge variant="secondary">Tailwind CSS</Badge>
                <Badge variant="secondary">Vercel</Badge>
              </div>
            </div>
            <Button variant="outline" className="w-full gap-2" asChild>
              <a
                href="https://github.com/lamphnam/my_movie_app"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Xem mã nguồn trên GitHub (mở trong tab mới)"
              >
                <Github className="w-4 h-4" aria-hidden="true" />
                Xem trên GitHub
              </a>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </footer>
  )
}

export default Footer
