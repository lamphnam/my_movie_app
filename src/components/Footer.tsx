const Footer = () => {
  return (
    <footer className="mt-12 sm:mt-16 lg:mt-20 border-t border-white/10 bg-background/95 backdrop-blur-sm" role="contentinfo">
      <div className="container py-8 sm:py-10 lg:py-12 px-3 sm:px-4">
        {/* Disclaimer Section */}
        <div className="mb-8 sm:mb-10 glass-card rounded-2xl p-4 sm:p-6 border border-white/10">
          <div className="flex items-start gap-2 sm:gap-3">
            <i className="fa-solid fa-info-circle text-primary text-lg sm:text-xl mt-0.5 sm:mt-1 flex-shrink-0" aria-hidden="true"></i>
            <p className="text-xs sm:text-sm text-muted-foreground/90 leading-relaxed">
              Đây là một dự án cá nhân được tạo ra với mục đích học tập và xây dựng portfolio. Trang
              web không có bất kỳ hoạt động kinh doanh hay thu lợi nhuận nào. Tất cả nội dung của
              trang web này được thu thập từ các trang web video chính thống trên Internet và không
              cung cấp phát trực tuyến chính hãng. Nếu quyền lợi của bạn bị vi phạm, vui lòng thông
              báo cho chúng tôi, chúng tôi sẽ xóa nội dung vi phạm kịp thời. Cảm ơn sự hợp tác của
              bạn!
            </p>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="flex flex-col items-center justify-between gap-4 sm:gap-6 md:flex-row">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg flex-shrink-0">
              <i className="fa-solid fa-film text-white text-xs sm:text-sm" aria-hidden="true"></i>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground font-medium text-center sm:text-left">
              &copy; {new Date().getFullYear()} <span className="text-gradient font-bold">HNAM Phim</span>. All rights reserved.
            </p>
          </div>

          <nav aria-label="Footer navigation" className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm flex-wrap justify-center">
            <a href="#" className="text-muted-foreground transition-all hover:text-primary focus:text-primary font-medium hover-glow" aria-label="Giới thiệu">
              Giới thiệu
            </a>
            <a
              href="https://phim.nguonc.com/khieu-nai-ban-quyen"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-all hover:text-primary focus:text-primary font-medium hover-glow"
              aria-label="Khiếu nại bản quyền"
            >
              Khiếu nại bản quyền
            </a>
            <a
              href="https://phim.nguonc.com/api-document"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-all hover:text-primary focus:text-primary font-medium hover-glow"
              aria-label="Tài liệu API"
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
