import { Film, Info, ExternalLink } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="mt-8 lg:mt-12 border-t border-border bg-muted/30" role="contentinfo">
      <div className="container-desktop py-6 lg:py-8">
        {/* Desktop: Grid layout | Mobile: Stack */}
        <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-start">
          {/* Disclaimer */}
          <div className="surface-card p-4 lg:p-5">
            <div className="flex gap-3">
              <Info className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
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
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Giới thiệu
            </a>
            <a
              href="https://phim.nguonc.com/khieu-nai-ban-quyen"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
            >
              Khiếu nại bản quyền
              <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href="https://phim.nguonc.com/api-document"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
            >
              API
              <ExternalLink className="w-3 h-3" />
            </a>
          </nav>
        </div>

        {/* Footer Bottom */}
        <div className="mt-6 pt-4 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-primary flex items-center justify-center">
              <Film className="w-3.5 h-3.5 text-primary-foreground" />
            </div>
            <p className="text-body-sm">
              &copy; {new Date().getFullYear()} <span className="font-semibold text-foreground">HNAM Phim</span>
            </p>
          </div>

          {/* Mobile only links */}
          <nav aria-label="Footer navigation" className="flex lg:hidden items-center gap-4 text-body-sm">
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Giới thiệu
            </a>
            <a
              href="https://phim.nguonc.com/khieu-nai-ban-quyen"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Bản quyền
            </a>
            <a
              href="https://phim.nguonc.com/api-document"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              API
            </a>
          </nav>
        </div>
      </div>
    </footer>
  )
}

export default Footer
