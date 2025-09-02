import { useState, memo, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { filterData } from '@/data/filters'
import { Button } from './ui/button'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { ToggleGroup, ToggleGroupItem } from './ui/toggle-group'
import { Filter, X, RotateCcw } from 'lucide-react'

const buildQueryString = (params: Record<string, string>): string => {
  const query = new URLSearchParams()
  for (const key in params) {
    if (params[key]) {
      query.set(key, params[key])
    }
  }
  return query.toString()
}

const MovieFilters = memo(() => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const [isOpen, setIsOpen] = useState(false)

  const [genre, setGenre] = useState(searchParams.get('genre') || '')
  const [country, setCountry] = useState(searchParams.get('country') || '')
  const [year, setYear] = useState(searchParams.get('year') || '')

  useEffect(() => {
    setGenre(searchParams.get('genre') || '')
    setCountry(searchParams.get('country') || '')
    setYear(searchParams.get('year') || '')
  }, [searchParams])

  // Logic mới: Khi chọn 1 filter, reset các filter khác
  const handleGenreChange = (value: string) => {
    setGenre(value)
    if (value) {
      setCountry('')
      setYear('')
    }
  }
  const handleCountryChange = (value: string) => {
    setCountry(value)
    if (value) {
      setGenre('')
      setYear('')
    }
  }
  const handleYearChange = (value: string) => {
    setYear(value)
    if (value) {
      setGenre('')
      setCountry('')
    }
  }

  const handleApply = () => {
    const filters = { genre, country, year }
    navigate(`/filter?${buildQueryString(filters)}`)
    setIsOpen(false)
  }

  const handleReset = () => {
    setGenre('')
    setCountry('')
    setYear('')
    navigate('/filter')
    setIsOpen(false)
  }

  const activeFilterCount = [genre, country, year].filter(Boolean).length

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="relative">
          <Filter className="mr-2 h-4 w-4" />
          Bộ lọc
          {activeFilterCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
              {activeFilterCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 md:w-96" align="end">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Lọc phim </h3>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Thể loại</label>
            <ToggleGroup
              type="single"
              value={genre}
              onValueChange={handleGenreChange}
              className="flex-wrap justify-start"
            >
              {filterData.genres.slice(0, 10).map((g) => (
                <ToggleGroupItem key={g.slug} value={g.slug}>
                  {g.name}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Quốc gia</label>
            <ToggleGroup
              type="single"
              value={country}
              onValueChange={handleCountryChange}
              className="flex-wrap justify-start"
            >
              {filterData.countries.slice(0, 10).map((c) => (
                <ToggleGroupItem key={c.slug} value={c.slug}>
                  {c.name}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Năm</label>
            <ToggleGroup
              type="single"
              value={year}
              onValueChange={handleYearChange}
              className="flex-wrap justify-start"
            >
              {filterData.years.slice(0, 10).map((y) => (
                <ToggleGroupItem key={y.slug} value={y.slug}>
                  {y.name}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button variant="ghost" onClick={handleReset}>
              <RotateCcw className="mr-2 h-4 w-4" />
              Xóa lọc
            </Button>
            <Button onClick={handleApply}>Áp dụng</Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
})

export default MovieFilters
