// src/components/PageWrapper.tsx

import { MotionDiv } from './Motion' // Import từ file Motion.tsx

interface PageWrapperProps {
  children: React.ReactNode
  className?: string
}

const PageWrapper = ({ children, className }: PageWrapperProps) => {
  return (
    <MotionDiv
      initial={{ opacity: 0, y: 15 }} // Trạng thái ban đầu: trong suốt và hơi dịch xuống
      animate={{ opacity: 1, y: 0 }} // Trạng thái khi xuất hiện: rõ ràng và ở vị trí cũ
      exit={{ opacity: 0, y: 15 }} // Trạng thái khi thoát: trong suốt và hơi dịch xuống
      transition={{ duration: 0.5, ease: 'easeInOut' }} // Thời gian và kiểu animation
      className={className}
    >
      {children}
    </MotionDiv>
  )
}

export default PageWrapper
