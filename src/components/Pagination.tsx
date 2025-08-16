// src/components/Pagination.tsx
interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  return (
    <div className="pagination-controls">
      <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
        Trang Trước
      </button>
      <span>
        Trang {currentPage} / {totalPages}
      </span>
      <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
        Trang Sau
      </button>
    </div>
  )
}

export default Pagination
