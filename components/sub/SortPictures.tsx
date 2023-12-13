'use client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { BsSortUp } from 'react-icons/bs'
import { BsSortDown } from 'react-icons/bs'

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
      <details className='dropdown dropdown-bottom dropdown-end'>
        <summary className='m-1 text-lg btn btn-outline'>Sort</summary>
        <ul className='p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52'>
          <li onClick={() => setSort('p-desc')}>
            <a>
              <BsSortUp className='w-4 h-4' />
              Date published (newest)
            </a>
          </li>
          <li onClick={() => setSort('p-asc')}>
            <a>
              <BsSortDown className='w-4 h-4' />
              Date published (oldest)
            </a>
          </li>
          <li onClick={() => setSort('a-desc')}>
            <a>
              <BsSortUp className='w-4 h-4' />
              Date added (newest)
            </a>
          </li>
          <li onClick={() => setSort('a-asc')}>
            <a>
              <BsSortDown className='w-4 h-4' />
              Date added (oldest)
            </a>
          </li>
        </ul>
      </details>
    </>
  )
}

export default SortPictures
