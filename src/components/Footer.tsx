// src/components/Footer.tsx

import type React from 'react'

const Footer: React.FC = () => {
  return (
    <footer className="app-footer">
      <div className="container">
        <div className="footer-content">
          {/* Dòng Disclaimer / Miễn trừ trách nhiệm */}
          <div className="footer-disclaimer">
            {/* Nếu bạn muốn văn bản này có hiệu ứng logo, có thể thêm class footer-logo vào đây */}
            <p className="footer-disclaimer-text">
              Đây là một dự án cá nhân được tạo ra với mục đích học tập và xây dựng portfolio. Trang
              web không có bất kỳ hoạt động kinh doanh hay thu lợi nhuận nào. Tất cả nội dung của
              trang web này được thu thập từ các trang web video chính thống trên Internet và không
              cung cấp phát trực tuyến chính hãng. Nếu quyền lợi của bạn bị vi phạm, vui lòng thông
              báo cho chúng tôi, chúng tôi sẽ xóa nội dung vi phạm kịp thời. Cảm ơn sự hợp tác của
              bạn!
            </p>
          </div>

          {/* Dòng dưới cùng: Copyright và Links */}
          <div className="footer-bottom">
            <p className="footer-copyright">Copyright © {new Date().getFullYear()} HNAM Phim.</p>

            {/* Các link điều hướng */}
            <div className="footer-links">
              <a className="footer-link">Giới thiệu</a>
              <a
                href="https://phim.nguonc.com/khieu-nai-ban-quyen"
                target="_blank"
                className="footer-link"
              >
                Khiếu nại bản quyền
              </a>
              <a
                href="https://phim.nguonc.com/api-document"
                target="_blank"
                className="footer-link"
              >
                API
              </a>
              <a
                href="https://phim.nguonc.com/yeu-cau-phim"
                target="_blank"
                className="footer-link"
              >
                Yêu Cầu Phim
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
