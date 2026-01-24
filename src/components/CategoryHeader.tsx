import { getCategoryBySlug, getCountryBySlug, getGenreBySlug } from '@/data/filters'
import { memo } from 'react'
import { Badge } from './ui/badge'

interface CategoryHeaderProps {
  type: 'category' | 'genre' | 'country' | 'year' | 'search' | 'default'
  value?: string
  searchKeyword?: string
}

const CategoryHeader = memo(({ type, value, searchKeyword }: CategoryHeaderProps) => {
  const getHeaderContent = () => {
    switch (type) {
      case 'category':
      case 'genre': // Gộp genre vào đây vì logic tương tự
        if (value) {
          const category = getCategoryBySlug(value) || getGenreBySlug(value)
          return {
            title: `Phim ${category?.name || value}`,
            subtitle:
              category?.description || `Tất cả phim thuộc thể loại ${category?.name || value}`,
            tag: 'Thể loại',
          }
        }
        break

      case 'country':
        if (value) {
          const country = getCountryBySlug(value)
          return {
            title: `Phim ${country?.name || value}`,
            subtitle: country?.description || `Tất cả phim đến từ ${country?.name || value}`,
            tag: 'Quốc gia',
          }
        }
        break

      case 'year':
        if (value) {
          return {
            title: `Phim năm ${value}`,
            subtitle: `Tất cả phim được phát hành trong năm ${value}`,
            tag: 'Năm phát hành',
          }
        }
        break

      case 'search':
        if (searchKeyword) {
          return {
            title: `Kết quả cho: "${searchKeyword}"`,
            subtitle: `Tìm thấy các bộ phim liên quan đến từ khóa của bạn.`,
            tag: 'Tìm kiếm',
          }
        }
        break

      default:
        return {
          title: 'Phim Mới Cập Nhật',
          subtitle: 'Khám phá những bộ phim và series mới nhất được cập nhật hàng ngày.',
          tag: 'Mới nhất',
        }
    }

    // Fallback
    return {
      title: 'Khám phá Phim Hay',
      subtitle: 'Xem phim online chất lượng cao miễn phí.',
      tag: 'Trang chủ',
    }
  }

  const { title, subtitle, tag } = getHeaderContent()

  return (
    <div className="relative overflow-hidden rounded-2xl glass-card p-6 sm:p-8 md:p-10 text-center md:text-left border border-white/10 shadow-xl">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 opacity-50"></div>

      {/* Content */}
      <div className="relative z-10">
        <Badge variant="secondary" className="mb-3 sm:mb-4 glass-card px-3 sm:px-4 py-1.5 font-bold text-xs sm:text-sm border border-white/10">
          <i className="fa-solid fa-star mr-1.5 sm:mr-2 text-yellow-400 text-xs"></i>
          {tag}
        </Badge>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-3 sm:mb-4 leading-tight">
          <span className="text-gradient-gold">{title}</span>
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-muted-foreground/90 font-medium max-w-3xl leading-relaxed">{subtitle}</p>
      </div>
    </div>
  )
})

CategoryHeader.displayName = 'CategoryHeader'

export default CategoryHeader
