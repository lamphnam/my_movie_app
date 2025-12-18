import {
  Pagination as UIPagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { memo, useCallback, useMemo } from 'react'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

const Pagination = memo(({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  const handlePrevious = useCallback(() => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1)
    }
  }, [currentPage, onPageChange])

  const handleNext = useCallback(() => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1)
    }
  }, [currentPage, totalPages, onPageChange])

  // Logic để tạo ra các nút trang thông minh hơn
  const getPageNumbers = useMemo(() => {
    const pages = []
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      pages.push(1)
      if (currentPage > 4) {
        pages.push('...')
      }
      const startPage = Math.max(2, currentPage - 2)
      const endPage = Math.min(totalPages - 1, currentPage + 2)

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i)
      }

      if (currentPage < totalPages - 3) {
        pages.push('...')
      }
      pages.push(totalPages)
    }
    return pages
  }, [currentPage, totalPages])

  return (
    <UIPagination>
      <div className="glass-panel inline-flex items-center rounded-full px-4 py-2 shadow-lg">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault()
                handlePrevious()
              }}
              className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''} size={undefined} />
          </PaginationItem>

          {getPageNumbers.map((page, index) => (
            <PaginationItem key={index}>
              {typeof page === 'string' ? (
                <PaginationEllipsis />
              ) : (
                <PaginationLink
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    onPageChange(page)
                  }}
                  isActive={currentPage === page} size={undefined}              >
                  {page}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault()
                handleNext()
              }}
              className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''} size={undefined} />
          </PaginationItem>
        </PaginationContent>
      </div>
    </UIPagination >
  )
})

Pagination.displayName = 'Pagination'

export default Pagination
