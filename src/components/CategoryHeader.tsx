import { getCategoryBySlug, getCountryBySlug, getGenreBySlug } from '@/data/filters'
import { Star } from 'lucide-react'
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
    <div className="relative overflow-hidden rounded-lg md:rounded-2xl bg-card border border-border p-4 sm:p-6 md:p-8 text-center md:text-left shadow-md">
      {/* Subtle background accent - desktop only */}
      <div className="hidden md:block absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5"></div>

      {/* Content */}
      <div className="relative z-10">
        <Badge variant="secondary" className="mb-2 sm:mb-3 px-2.5 sm:px-3 py-1 font-semibold text-xs inline-flex items-center gap-1.5">
          <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
          {tag}
        </Badge>
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black tracking-tight mb-2 sm:mb-3 leading-tight">
          {title}
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-3xl leading-relaxed">{subtitle}</p>
      </div>
    </div>
  )
})

CategoryHeader.displayName = 'CategoryHeader'

export default CategoryHeader
