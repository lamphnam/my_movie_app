import { getCategoryBySlug, getCountryBySlug, getGenreBySlug } from '@/data/filters'
import { Badge } from './ui/badge'

interface CategoryHeaderProps {
  type: 'category' | 'genre' | 'country' | 'year' | 'search' | 'default'
  value?: string
  searchKeyword?: string
}

const CategoryHeader = ({ type, value, searchKeyword }: CategoryHeaderProps) => {
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
    <div className="rounded-lg bg-card p-6 text-center md:text-left">
      <Badge variant="secondary" className="mb-4">
        {tag}
      </Badge>
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gradient mb-2">{title}</h1>
      <p className="text-lg text-muted-foreground">{subtitle}</p>
    </div>
  )
}

export default CategoryHeader
