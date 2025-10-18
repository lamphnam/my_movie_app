const DetailPageSkeleton = () => {
  return (
    <div className="container animate-pulse">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:grid-cols-4">
        <div className="md:col-span-1 lg:col-span-1">
          <div className="aspect-[2/3] w-full rounded-lg bg-secondary"></div>
          <div className="mt-4 h-12 w-full rounded-lg bg-primary/50"></div>
          <div className="mt-4 space-y-2">
            <div className="h-4 w-1/3 rounded bg-secondary"></div>
            <div className="h-4 w-1/2 rounded bg-secondary"></div>
            <div className="h-4 w-1/4 rounded bg-secondary"></div>
          </div>
        </div>

        <div className="md:col-span-2 lg:col-span-3">
          <div className="h-10 w-3/4 rounded bg-secondary"></div>
          <div className="mt-2 h-6 w-1/2 rounded bg-secondary"></div>
          <div className="mt-6 space-y-2">
            <div className="h-4 w-full rounded bg-secondary"></div>
            <div className="h-4 w-full rounded bg-secondary"></div>
            <div className="h-4 w-5/6 rounded bg-secondary"></div>
          </div>
          <div className="mt-8 aspect-video w-full rounded-lg bg-secondary"></div>
        </div>
      </div>
    </div>
  )
}

export default DetailPageSkeleton
