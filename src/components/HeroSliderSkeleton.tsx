const HeroSliderSkeleton = () => {
  return (
    <div className="relative w-full overflow-hidden rounded-lg animate-pulse">
      {/* Lớp nền chính cho ảnh slider */}
      <div className="aspect-video w-full bg-secondary md:aspect-[2.4/1]"></div>

      {/* Lớp mô phỏng nội dung */}
      <div className="absolute inset-0 z-10 flex items-end pb-8 sm:items-center sm:pb-0">
        <div className="container flex flex-col items-center gap-4 sm:flex-row sm:gap-8 sm:text-left">
          {/* Poster phim bên trái */}
          <div className="hidden h-52 w-40 rounded-lg bg-secondary/80 sm:block md:h-64 md:w-52"></div>

          {/* Cụm thông tin bên phải */}
          <div className="w-full max-w-md space-y-4">
            {/* Tiêu đề */}
            <div className="h-10 w-3/4 rounded-lg bg-secondary/80 sm:h-12"></div>
            {/* Mô tả */}
            <div className="space-y-2">
              <div className="h-4 w-full rounded bg-secondary/80"></div>
              <div className="h-4 w-full rounded bg-secondary/80"></div>
              <div className="h-4 w-5/6 rounded bg-secondary/80"></div>
            </div>
            {/* Các nút bấm */}
            <div className="flex justify-center gap-2 sm:justify-start sm:gap-4">
              <div className="h-11 w-32 rounded-md bg-secondary/80"></div>
              <div className="h-11 w-32 rounded-md bg-secondary/80"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroSliderSkeleton
