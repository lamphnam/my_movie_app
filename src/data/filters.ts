// src/data/filters.ts
// Dữ liệu này được tổng hợp dựa trên các trang phim phổ biến
// Quan trọng: 'slug' phải khớp với slug trong URL của API

export interface FilterCategory {
  id: string
  name: string
  slug: string
  description?: string
}

export interface FilterData {
  categories: FilterCategory[]
  genres: FilterCategory[]
  countries: FilterCategory[]
  years: string[]
}

export const filterData: FilterData = {
  categories: [
    {
      id: '1',
      name: 'Phim mới cập nhật',
      slug: 'phim-moi-cap-nhat',
      description: 'Phim mới nhất được cập nhật',
    },
    {
      id: '2',
      name: 'Phim đang chiếu',
      slug: 'phim-dang-chieu',
      description: 'Phim đang chiếu rạp',
    },
    { id: '3', name: 'Phim bộ', slug: 'phim-bo', description: 'Phim nhiều tập' },
    { id: '4', name: 'Phim lẻ', slug: 'phim-le', description: 'Phim một tập' },
    { id: '5', name: 'TV Shows', slug: 'tv-shows', description: 'Chương trình truyền hình' },
    { id: '6', name: 'Hoạt hình', slug: 'hoat-hinh', description: 'Phim hoạt hình' },
  ],
  genres: [
    { id: '1', name: 'Hành Động', slug: 'hanh-dong', description: 'Phim hành động kịch tính' },
    { id: '2', name: 'Viễn Tưởng', slug: 'vien-tuong', description: 'Phim khoa học viễn tưởng' },
    { id: '3', name: 'Kinh Dị', slug: 'kinh-di', description: 'Phim kinh dị, ma quái' },
    { id: '4', name: 'Hài Hước', slug: 'hai-huoc', description: 'Phim hài, comedy' },
    { id: '5', name: 'Tình Cảm', slug: 'tinh-cam', description: 'Phim tình cảm lãng mạn' },
    { id: '6', name: 'Tâm Lý', slug: 'tam-ly', description: 'Phim tâm lý, drama' },
    { id: '7', name: 'Thể Thao', slug: 'the-thao', description: 'Phim về thể thao' },
    { id: '8', name: 'Võ Thuật', slug: 'vo-thuat', description: 'Phim võ thuật, kung fu' },
    { id: '9', name: 'Chiến Tranh', slug: 'chien-tranh', description: 'Phim chiến tranh' },
    { id: '10', name: 'Hoạt Hình', slug: 'hoat-hinh', description: 'Phim hoạt hình, anime' },
    { id: '11', name: 'Cổ Trang', slug: 'co-trang', description: 'Phim cổ trang' },
    { id: '12', name: 'Âm Nhạc', slug: 'am-nhac', description: 'Phim âm nhạc, musical' },
    { id: '13', name: 'Phiêu Lưu', slug: 'phieu-luu', description: 'Phim phiêu lưu mạo hiểm' },
    { id: '14', name: 'Gia Đình', slug: 'gia-dinh', description: 'Phim gia đình, thiếu nhi' },
    { id: '15', name: 'Học Đường', slug: 'hoc-duong', description: 'Phim học đường' },
    { id: '16', name: 'Thần Thoại', slug: 'than-thoai', description: 'Phim thần thoại' },
    { id: '17', name: 'Bí Ẩn', slug: 'bi-an', description: 'Phim bí ẩn, mystery' },
    { id: '18', name: 'Tài Liệu', slug: 'tai-lieu', description: 'Phim tài liệu' },
    { id: '19', name: 'Thần Tượng', slug: 'than-tuong', description: 'Phim thần tượng' },
    { id: '20', name: 'Chính Kịch', slug: 'chinh-kich', description: 'Phim chính kịch' },
  ],
  countries: [
    { id: '1', name: 'Việt Nam', slug: 'viet-nam', description: 'Phim Việt Nam' },
    { id: '2', name: 'Trung Quốc', slug: 'trung-quoc', description: 'Phim Trung Quốc' },
    { id: '3', name: 'Hàn Quốc', slug: 'han-quoc', description: 'Phim Hàn Quốc' },
    { id: '4', name: 'Nhật Bản', slug: 'nhat-ban', description: 'Phim Nhật Bản' },
    { id: '5', name: 'Thái Lan', slug: 'thai-lan', description: 'Phim Thái Lan' },
    { id: '6', name: 'Âu Mỹ', slug: 'au-my', description: 'Phim Âu Mỹ' },
    { id: '7', name: 'Đài Loan', slug: 'dai-loan', description: 'Phim Đài Loan' },
    { id: '8', name: 'Hồng Kông', slug: 'hong-kong', description: 'Phim Hồng Kông' },
    { id: '9', name: 'Ấn Độ', slug: 'an-do', description: 'Phim Ấn Độ' },
    { id: '10', name: 'Anh', slug: 'anh', description: 'Phim Anh' },
    { id: '11', name: 'Pháp', slug: 'phap', description: 'Phim Pháp' },
    { id: '12', name: 'Canada', slug: 'canada', description: 'Phim Canada' },
    { id: '13', name: 'Quốc Gia Khác', slug: 'quoc-gia-khac', description: 'Phim các nước khác' },
    { id: '14', name: 'Đức', slug: 'duc', description: 'Phim Đức' },
    { id: '15', name: 'Tây Ban Nha', slug: 'tay-ban-nha', description: 'Phim Tây Ban Nha' },
    { id: '16', name: 'Thổ Nhĩ Kỳ', slug: 'tho-nhi-ky', description: 'Phim Thổ Nhĩ Kỳ' },
    { id: '17', name: 'Hà Lan', slug: 'ha-lan', description: 'Phim Hà Lan' },
    { id: '18', name: 'Indonesia', slug: 'indonesia', description: 'Phim Indonesia' },
    { id: '19', name: 'Nga', slug: 'nga', description: 'Phim Nga' },
    { id: '20', name: 'Mexico', slug: 'mexico', description: 'Phim Mexico' },
    { id: '21', name: 'Ba Lan', slug: 'ba-lan', description: 'Phim Ba Lan' },
    { id: '22', name: 'Úc', slug: 'uc', description: 'Phim Úc' },
    { id: '23', name: 'Thụy Điển', slug: 'thuy-dien', description: 'Phim Thụy Điển' },
    { id: '24', name: 'Malaysia', slug: 'malaysia', description: 'Phim Malaysia' },
    { id: '25', name: 'Brazil', slug: 'brazil', description: 'Phim Brazil' },
    { id: '26', name: 'Philippines', slug: 'philippines', description: 'Phim Philippines' },
    { id: '27', name: 'Châu Phi', slug: 'chau-phi', description: 'Phim Châu Phi' },
  ],
  years: [
    '2024',
    '2023',
    '2022',
    '2021',
    '2020',
    '2019',
    '2018',
    '2017',
    '2016',
    '2015',
    '2014',
    '2013',
    '2012',
    '2011',
    '2010',
    '2009',
    '2008',
    '2007',
    '2006',
    '2005',
    '2004',
    '2003',
    '2002',
    '2001',
    '2000',
  ],
}

// Helper functions để tìm kiếm
export const getCategoryBySlug = (slug: string): FilterCategory | undefined => {
  return filterData.categories.find((cat) => cat.slug === slug)
}

export const getGenreBySlug = (slug: string): FilterCategory | undefined => {
  return filterData.genres.find((genre) => genre.slug === slug)
}

export const getCountryBySlug = (slug: string): FilterCategory | undefined => {
  return filterData.countries.find((country) => country.slug === slug)
}

// Popular categories for quick access
export const popularCategories = [
  'phim-moi-cap-nhat',
  'phim-dang-chieu',
  'phim-bo',
  'phim-le',
  'tv-shows',
  'hoat-hinh',
]

export const popularGenres = [
  'hanh-dong',
  'hai-huoc',
  'tinh-cam',
  'kinh-di',
  'vien-tuong',
  'hoat-hinh',
]

export const popularCountries = [
  'han-quoc',
  'nhat-ban',
  'trung-quoc',
  'au-my',
  'viet-nam',
  'thai-lan',
]
