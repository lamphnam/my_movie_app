const MovieCardSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="aspect-[2/3] w-full rounded-lg bg-secondary"></div>
      <div className="mt-3 space-y-2">
        <div className="h-4 rounded bg-secondary"></div>
        <div className="h-4 w-3/4 rounded bg-secondary"></div>
      </div>
    </div>
  )
}

export default MovieCardSkeleton
