const Footer = () => {
  return (
    <footer className="mt-16 border-t border-border/40 bg-background/95">
      <div className="container py-8">
        <div className="mb-8 text-sm text-muted-foreground">
          <p>
            Đây là một dự án cá nhân được tạo ra với mục đích học tập và xây dựng portfolio. Trang
            web không có bất kỳ hoạt động kinh doanh hay thu lợi nhuận nào. Tất cả nội dung của
            trang web này được thu thập từ các trang web video chính thống trên Internet và không
            cung cấp phát trực tuyến chính hãng. Nếu quyền lợi của bạn bị vi phạm, vui lòng thông
            báo cho chúng tôi, chúng tôi sẽ xóa nội dung vi phạm kịp thời. Cảm ơn sự hợp tác của
            bạn!
          </p>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} HNAM Phim. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <a href="#" className="transition-colors hover:text-foreground">
              Giới thiệu
            </a>
            <a
              href="https://phim.nguonc.com/khieu-nai-ban-quyen"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-foreground"
            >
              Khiếu nại bản quyền
            </a>
            <a
              href="https://phim.nguonc.com/api-document"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-foreground"
            >
              API
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
