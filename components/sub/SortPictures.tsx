'use client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { BsSortUp } from 'react-icons/bs'
import { BsSortDown } from 'react-icons/bs'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import Link from 'next/link'
import { Button } from '../ui/button'

type Props = {}

const SortPictures = (props: Props) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const actualSort = searchParams.get('sort')
  const [sort, setSort] = useState<string>()

  // To initialize sort when mounting component
  useEffect(() => {
    function initializeSort() {
      if (actualSort) {
        setSort(actualSort.toLowerCase())
      }
    }

    initializeSort()
  }, [actualSort])

  // To push new sort in URL when user selects it
  useEffect(() => {
    function createQueryString() {
      const params = new URLSearchParams(searchParams)
      if (sort) {
        params.set('sort', sort)
      }
      return params.toString()
    }

    router.push(`/s/liked?${createQueryString()}`)
  }, [sort, pathname, router, searchParams])

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button asChild variant='outline'>
            <span>Sort</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='mr-1 font-normal bg-white rounded-lg shadow-xl w-52'>
          <DropdownMenuItem
            className='p-1 pl-3'
            onClick={() => setSort('p-desc')}
          >
            Date published (newest)
          </DropdownMenuItem>
          <DropdownMenuItem
            className='p-1 pl-3'
            onClick={() => setSort('p-asc')}
          >
            Date published (oldest)
          </DropdownMenuItem>
          <DropdownMenuItem
            className='p-1 pl-3'
            onClick={() => setSort('a-desc')}
          >
            Date added (newest)
          </DropdownMenuItem>
          <DropdownMenuItem
            className='p-1 pl-3'
            onClick={() => setSort('a-asc')}
          >
            Date added (oldest)
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}

export default SortPictures
