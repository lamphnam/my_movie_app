// src/components/CategoryHeader.tsx
import { getCategoryBySlug, getCountryBySlug } from '../data/filters'

interface CategoryHeaderProps {
  type: 'category' | 'country' | 'year' | 'search' | 'default'
  value?: string
  searchKeyword?: string
}

const CategoryHeader = ({ type, value, searchKeyword }: CategoryHeaderProps) => {
  const getHeaderContent = () => {
    switch (type) {
      case 'category':
        if (value) {
          const category = getCategoryBySlug(value)
          return {
            title: `Phim ${category?.name || value}`,
            subtitle:
              category?.description || `Tất cả phim thuộc thể loại ${category?.name || value}`,
            icon: '🎬',
          }
        }
        break

      case 'country':
        if (value) {
          const country = getCountryBySlug(value)
          return {
            title: `Phim ${country?.name || value}`,
            subtitle: country?.description || `Tất cả phim đến từ ${country?.name || value}`,
            icon: '🌍',
          }
        }
        break

      case 'year':
        if (value) {
          return {
            title: `Phim năm ${value}`,
            subtitle: `Tất cả phim được phát hành trong năm ${value}`,
            icon: '📅',
          }
        }
        break

      case 'search':
        if (searchKeyword) {
          return {
            title: `Kết quả tìm kiếm: "${searchKeyword}"`,
            subtitle: `Tìm thấy các bộ phim liên quan đến "${searchKeyword}"`,
            icon: '🔍',
          }
        }
        break

      default:
        return {
          title: 'Phim Mới Cập Nhật',
          subtitle: 'Khám phá những bộ phim mới nhất được cập nhật hàng ngày',
          icon: '🆕',
        }
    }

    return {
      title: 'HNAM PHIM',
      subtitle: 'Xem phim online chất lượng cao miễn phí',
      icon: '🎭',
    }
  }

  const { title, subtitle, icon } = getHeaderContent()

  return (
    <div className="category-header">
      <div className="category-header-content">
        <div className="category-icon">{icon}</div>
        <div className="category-info">
          <h1 className="category-title">{title}</h1>
          <p className="category-subtitle">{subtitle}</p>
        </div>
      </div>
      <div className="category-divider"></div>
    </div>
  )
}

export default CategoryHeader
