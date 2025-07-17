// import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
// import { QueryClient } from '@tanstack/react-query'
// import { fetchNoteById } from '../../../../../lib/api/clientApi'
import NotePreview from './NotePreview.client'

export default async function NoteModalPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  // const queryClient = new QueryClient()
  // await queryClient.prefetchQuery({
  //   queryKey: ['note', id],            
  //   queryFn: () => fetchNoteById(id),
  // })


  return (
    // <HydrationBoundary state={dehydrate(queryClient)}>
      <NotePreview noteId={id} />
    // </HydrationBoundary>
  )
}