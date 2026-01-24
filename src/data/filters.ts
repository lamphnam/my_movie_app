// src/data/filters.ts
// Dữ liệu này được tổng hợp dựa trên các trang phim phổ biến
// Quan trọng: 'slug' phải khớp với slug trong URL của API

export interface FilterCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

export interface FilterData {
  categories: FilterCategory[];
  genres: FilterCategory[];
  countries: FilterCategory[];
  years: FilterCategory[];
}

export const filterData: FilterData = {
  categories: [
    {
      id: "1",
      name: "Phim mới cập nhật",
      slug: "phim-moi-cap-nhat",
      description: "Phim mới nhất được cập nhật",
    },
    {
      id: "2",
      name: "Phim đang chiếu",
      slug: "phim-dang-chieu",
      description: "Phim đang chiếu rạp",
    },
    {
      id: "3",
      name: "Phim bộ",
      slug: "phim-bo",
      description: "Phim nhiều tập",
    },
    { id: "4", name: "Phim lẻ", slug: "phim-le", description: "Phim một tập" },
    {
      id: "5",
      name: "TV Shows",
      slug: "tv-shows",
      description: "Chương trình truyền hình",
    },
    {
      id: "6",
      name: "Hoạt hình",
      slug: "hoat-hinh",
      description: "Phim hoạt hình",
    },
  ],
  genres: [
    { id: "1", name: "Hành Động", slug: "hanh-dong" },
    { id: "2", name: "Phiêu Lưu", slug: "phieu-luu" },
    { id: "3", name: "Hoạt Hình", slug: "hoat-hinh" },
    { id: "4", name: "Hài", slug: "phim-hai" },
    { id: "5", name: "Hình Sự", slug: "hinh-su" },
    { id: "6", name: "Tài Liệu", slug: "tai-lieu" },
    { id: "7", name: "Chính Kịch", slug: "chinh-kich" },
    { id: "8", name: "Gia Đình", slug: "gia-dinh" },
    { id: "9", name: "Giả Tưởng", slug: "gia-tuong" },
    { id: "10", name: "Lịch Sử", slug: "lich-su" },
    { id: "11", name: "Kinh Dị", slug: "kinh-di" },
    { id: "12", name: "Nhạc", slug: "phim-nhac" },
    { id: "13", name: "Bí Ẩn", slug: "bi-an" },
    { id: "14", name: "Lãng Mạn", slug: "lang-man" },
    { id: "15", name: "Khoa Học Viễn Tưởng", slug: "khoa-hoc-vien-tuong" },
    { id: "16", name: "Gây Cấn", slug: "gay-can" },
    { id: "17", name: "Chiến Tranh", slug: "chien-tranh" },
    { id: "18", name: "Tâm Lý", slug: "tam-ly" },
    { id: "19", name: "Tình Cảm", slug: "tinh-cam" },
    { id: "20", name: "Cổ Trang", slug: "co-trang" },
    { id: "21", name: "Miền Tây", slug: "mien-tay" },
    { id: "22", name: "Phim 18+", slug: "phim-18" },
  ],
  countries: [
    { id: "1", name: "Âu Mỹ", slug: "au-my" },
    { id: "2", name: "Anh", slug: "anh" },
    { id: "3", name: "Trung Quốc", slug: "trung-quoc" },
    { id: "4", name: "Indonesia", slug: "indonesia" },
    { id: "5", name: "Việt Nam", slug: "viet-nam" },
    { id: "6", name: "Pháp", slug: "phap" },
    { id: "7", name: "Hồng Kông", slug: "hong-kong" },
    { id: "8", name: "Hàn Quốc", slug: "han-quoc" },
    { id: "9", name: "Nhật Bản", slug: "nhat-ban" },
    { id: "10", name: "Thái Lan", slug: "thai-lan" },
    { id: "11", name: "Đài Loan", slug: "dai-loan" },
    { id: "12", name: "Nga", slug: "nga" },
    { id: "13", name: "Hà Lan", slug: "ha-lan" },
    { id: "14", name: "Philippines", slug: "philippines" },
    { id: "15", name: "Ấn Độ", slug: "an-do" },
    { id: "16", name: "Quốc gia khác", slug: "quoc-gia-khac" },
  ],
  years: [
    { id: "1", name: "2026", slug: "2026" },
    { id: "2", name: "2025", slug: "2025" },
    { id: "3", name: "2024", slug: "2024" },
    { id: "4", name: "2023", slug: "2023" },
    { id: "5", name: "2022", slug: "2022" },
    { id: "6", name: "2021", slug: "2021" },
    { id: "7", name: "2020", slug: "2020" },
    { id: "8", name: "2019", slug: "2019" },
    { id: "9", name: "2018", slug: "2018" },
    { id: "10", name: "2017", slug: "2017" },
    { id: "11", name: "2016", slug: "2016" },
    { id: "12", name: "2015", slug: "2015" },
    { id: "13", name: "2014", slug: "2014" },
    { id: "14", name: "2013", slug: "2013" },
    { id: "15", name: "2012", slug: "2012" },
    { id: "16", name: "2011", slug: "2011" },
    { id: "17", name: "2010", slug: "2010" },
    { id: "18", name: "2009", slug: "2009" },
    { id: "19", name: "2008", slug: "2008" },
    { id: "20", name: "2007", slug: "2007" },
    { id: "21", name: "2006", slug: "2006" },
    { id: "22", name: "2005", slug: "2005" },
    { id: "23", name: "2004", slug: "2004" },
  ],
};

// Helper functions để tìm kiếm
export const getCategoryBySlug = (slug: string): FilterCategory | undefined => {
  return filterData.categories.find((cat) => cat.slug === slug);
};

export const getGenreBySlug = (slug: string): FilterCategory | undefined => {
  return filterData.genres.find((genre) => genre.slug === slug);
};

export const getCountryBySlug = (slug: string): FilterCategory | undefined => {
  return filterData.countries.find((country) => country.slug === slug);
};

// Popular categories for quick access
export const popularCategories = [
  "phim-moi-cap-nhat",
  "phim-dang-chieu",
  "phim-bo",
  "phim-le",
  "tv-shows",
  "hoat-hinh",
];

export const popularGenres = [
  "hanh-dong",
  "hai-huoc",
  "tinh-cam",
  "kinh-di",
  "vien-tuong",
  "hoat-hinh",
];

export const popularCountries = [
  "han-quoc",
  "nhat-ban",
  "trung-quoc",
  "au-my",
  "viet-nam",
  "thai-lan",
];
