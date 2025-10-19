// src/components/DetailPageSkeleton.tsx

const DetailPageSkeleton = () => {
  return (
    <div className="container animate-pulse space-y-12 lg:space-y-16">
      <div className="grid grid-cols-1 lg:grid-cols-5 lg:gap-x-12">
        {/* === SKELETON CỘT TRÁI (Desktop) === */}
        <aside className="hidden lg:col-span-2 lg:block xl:col-span-1">
          <div className="lg:sticky lg:top-24 space-y-4">
            <div className="aspect-[2/3] w-full rounded-lg bg-secondary"></div>
            <div className="grid grid-cols-2 gap-2">
              <div className="h-11 rounded-md bg-secondary"></div>
              <div className="h-11 rounded-md bg-secondary"></div>
            </div>
            <div className="space-y-3 rounded-lg border border-border bg-card p-4">
              <div className="h-5 w-1/3 rounded bg-secondary"></div>
              <div className="h-4 w-full rounded bg-secondary"></div>
              <div className="h-4 w-full rounded bg-secondary"></div>
              <div className="h-4 w-full rounded bg-secondary"></div>
              <div className="h-4 w-full rounded bg-secondary"></div>
            </div>
          </div>
        </aside>

        {/* === SKELETON CỘT PHẢI / NỘI DUNG CHÍNH (All screens) === */}
        <main className="lg:col-span-3 xl:col-span-4">
          {/* Khu vực hero cho mobile & desktop */}
          <div className="flex flex-col gap-6 sm:flex-row lg:block">
            {/* Poster cho mobile */}
            <div className="w-1/2 self-start rounded-lg shadow-xl sm:w-1/3 lg:hidden aspect-[2/3] bg-secondary"></div>
            <div className="flex-1 space-y-4">
              {/* Tên phim */}
              <div className="h-10 w-3/4 rounded-lg bg-secondary sm:h-12 lg:h-14"></div>
              {/* Tên gốc */}
              <div className="h-6 w-1/2 rounded-lg bg-secondary"></div>
              {/* Badges thể loại */}
              <div className="flex flex-wrap gap-2">
                <div className="h-6 w-20 rounded-full bg-secondary"></div>
                <div className="h-6 w-24 rounded-full bg-secondary"></div>
                <div className="h-6 w-16 rounded-full bg-secondary"></div>
              </div>
            </div>
          </div>

          {/* Skeleton cho Nội dung phim */}
          <div className="mt-8 lg:mt-10">
            <div className="h-7 w-48 rounded-lg bg-secondary"></div>
            <div className="mt-4 space-y-2">
              <div className="h-4 w-full rounded bg-secondary"></div>
              <div className="h-4 w-full rounded bg-secondary"></div>
              <div className="h-4 w-5/6 rounded bg-secondary"></div>
            </div>
          </div>

          {/* Skeleton cho Trình phát video */}
          <div className="mt-8 lg:mt-10">
            <div className="h-7 w-40 rounded-lg bg-secondary"></div>
            <div className="mt-4 aspect-video w-full rounded-lg bg-secondary"></div>
          </div>

          {/* Skeleton cho Danh sách tập */}
          <div className="mt-8 lg:mt-10">
            <div className="h-7 w-52 rounded-lg bg-secondary"></div>
            <div className="mt-4 flex flex-wrap gap-2">
              <div className="h-9 w-12 rounded-md bg-secondary"></div>
              <div className="h-9 w-12 rounded-md bg-secondary"></div>
              <div className="h-9 w-12 rounded-md bg-secondary"></div>
              <div className="h-9 w-12 rounded-md bg-secondary"></div>
              <div className="h-9 w-12 rounded-md bg-secondary"></div>
              <div className="h-9 w-12 rounded-md bg-secondary"></div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default DetailPageSkeleton
