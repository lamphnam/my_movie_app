// src/data/filters.ts

// Dữ liệu này được tổng hợp dựa trên ví dụ bạn cung cấp và các trang phim phổ biến
// Quan trọng: 'slug' phải khớp với slug trong URL của API

export const filterData = {
  categories: [
    { name: 'Hành Động', slug: 'hanh-dong' },
    { name: 'Tình Cảm', slug: 'tinh-cam' },
    { name: 'Hài Hước', slug: 'hai-huoc' },
    { name: 'Cổ Trang', slug: 'co-trang' },
    { name: 'Tâm Lý', slug: 'tam-ly' },
    { name: 'Hình Sự', slug: 'hinh-su' },
    { name: 'Chiến Tranh', slug: 'chien-tranh' },
    { name: 'Thể Thao', slug: 'the-thao' },
    { name: 'Võ Thuật', slug: 'vo-thuat' },
    { name: 'Viễn Tưởng', slug: 'vien-tuong' },
    { name: 'Khoa Học', slug: 'khoa-hoc' },
    { name: 'Phiêu Lưu', slug: 'phieu-luu' },
    { name: 'Kinh Dị', slug: 'kinh-di' },
    { name: 'Bí ẩn', slug: 'bi-an' },
    { name: 'Âm Nhạc', slug: 'am-nhac' },
    { name: 'Hoạt Hình', slug: 'hoat-hinh' },
    { name: 'Thần Thoại', slug: 'than-thoai' },
    { name: 'Gia Đình', slug: 'gia-dinh' },
    { name: 'Học Đường', slug: 'hoc-duong' },
    { name: 'Kinh Điển', slug: 'kinh-dien' },
  ],
  countries: [
    { name: 'Trung Quốc', slug: 'trung-quoc' },
    { name: 'Hàn Quốc', slug: 'han-quoc' },
    { name: 'Nhật Bản', slug: 'nhat-ban' },
    { name: 'Thái Lan', slug: 'thai-lan' },
    { name: 'Âu Mỹ', slug: 'au-my' },
    { name: 'Đài Loan', slug: 'dai-loan' },
    { name: 'Hồng Kông', slug: 'hong-kong' },
    { name: 'Ấn Độ', slug: 'an-do' },
    { name: 'Việt Nam', slug: 'viet-nam' },
  ],
  years: ['2025', '2024', '2023', '2022', '2021', '2020', '2019', '2018', '2017', '2016', '2015'],
}
