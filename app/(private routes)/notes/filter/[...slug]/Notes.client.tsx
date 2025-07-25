'use client'

import css from '../../../../../app/page.module.css'
import NoteList from '../../../../../components/NoteList/NoteList'
import SearchBox from '../../../../../components/SearchBox/SearchBox'
import Pagination from '../../../../../components/Pagination/Pagination'
import { useEffect, useState } from 'react'
import {  useQuery } from '@tanstack/react-query'
import { fetchNotes, type HttpResponse } from '../../../../../lib/api/clientApi'
import { useDebounce } from 'use-debounce'
import Link from 'next/link'



type Props = {
  tag: string
}

const NotesClient = ({ tag }: Props) => {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [debouncedSearch] = useDebounce(search, 400)
  const perPage = 12



  const { data, isLoading, error } = useQuery<HttpResponse, Error>({
	queryKey: ['notes', page, debouncedSearch, tag] ,
  queryFn: () => fetchNotes({ search: debouncedSearch, page, perPage, tag }),
  refetchOnWindowFocus: false,
  placeholderData: (prev) => prev
  });

  useEffect(() => {
	setPage(1)
  }, [debouncedSearch])

  const notes = data?.notes || []
  
  if (isLoading) return <p>Loading notes...</p>
  if (error) return <p>Error loading notes!</p>


  return <div className={css.app}>
	<header className={css.toolbar}>
    <SearchBox search={search} onSearchChange={setSearch} />
		{data && data.totalPages > 1 && <Pagination page={page} totalPages={data.totalPages || 1} onPageChange={setPage}/>}
		<button className={css.button}>
      <Link href={'/notes/action/create'}>Create note +</Link>
    </button>
  </header>
  {!isLoading && notes.length > 0 && <NoteList notes={notes}/>}
</div>
};

export default NotesClient;