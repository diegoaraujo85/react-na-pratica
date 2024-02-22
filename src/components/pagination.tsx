import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react'

import { useSearchParams } from 'react-router-dom'
import { Button } from './ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger } from './ui/select'

interface PaginationProps {
  pages: number
  items: number
  page: number
}

export function Pagination({ items, page, pages }: PaginationProps) {
  const [searchParams, setSearchParams] = useSearchParams()
  const per_page = searchParams.get('per_page') ? Number(searchParams.get('per_page')) : 10;

  function firstPage() {
    setSearchParams(params => {
      params.set('page', '1')

      return params
    })
  }

  function previousPage() {
    if (page - 1 <= 0) {
      return
    }

    setSearchParams(params => {
      params.set('page', String(page - 1))

      return params
    })
  }

  function nextPage() {
    if (page + 1 > pages) {
      return
    }

    setSearchParams(params => {
      params.set('page', String(page + 1))

      return params
    })
  }

  function lastPage() {
    setSearchParams(params => {
      params.set('page', String(pages))

      return params
    })
  }

  function goToPage(page: number) {
    if (page < 1 || page > pages) {
      return
    }

    setSearchParams(params => {
      params.set('page', String(page))

      return params
    })
  }

  function setRowsPerPage(rows: string) {
    setSearchParams(params => {
      params.set('per_page', (rows))

      return params
    })
  }

  return (
    <div className="flex text-sm items-center justify-between text-zinc-500">
      <span>Showing 10 of {items} items</span>
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2">
          <span>Rows per page</span>

          <Select defaultValue={String(per_page)} onValueChange={(value)=>setRowsPerPage((value))} >
            <SelectTrigger aria-label="Page" />
            <SelectContent >
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <span className='flex flex-row gap-2 items-center'>Page 
          <input 
            className='max-h-96 w-16 p-1.5 text-zinc-100 tabular-nums rounded-md border border-zinc-800 bg-zinc-800/50 text-center' 
            value={page} 
            onChange={(e) => goToPage(Number(e.target.value))} 
          />
           of {pages}
        </span>

        {/* <span>Page {page} of {pages}</span> */}

        <div className="space-x-1.5">
          <Button onClick={firstPage} size="icon" disabled={page - 1 <= 0}>
            <ChevronsLeft className="size-4" />
            <span className="sr-only">First page</span>
          </Button>
          <Button onClick={previousPage} size="icon" disabled={page - 1 <= 0}>
            <ChevronLeft className="size-4" />
            <span className="sr-only">Previous page</span>
          </Button>
          <Button onClick={nextPage} size="icon" disabled={page + 1 > pages}>
            <ChevronRight className="size-4" />
            <span className="sr-only">Next page</span>
          </Button>
          <Button onClick={lastPage} size="icon" disabled={page + 1 > pages}>
            <ChevronsRight className="size-4" />
            <span className="sr-only">Last page</span>
          </Button>
        </div>
      </div>
    </div>
  )
}