
import css from '../../../../page.module.css';
import NotesClient from './Notes.client';
import type { Metadata } from 'next';


type Props = {
  params: Promise<{slug?: string[]}>
}

export async function generateMetadata({ params }: Props ): Promise<Metadata> {
  const slugArray = (await params).slug || [];
  const filter = slugArray.join(' / ') || 'All notes';

  return {
    title: `${filter} notes`,
    description: `Notes filtered by ${filter}.`,
    openGraph: {
      title: `${filter} notes`,
      description: `Notes filtered by ${filter}.`,
      url: `http://localhost:3000/filter/${filter}`,
      images: [{
      url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
      width: 1200,
      height: 630,
      alt: `${filter} notes`
    }]
    }
  };
}

export default async function NotesPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {

  const { slug } = await params;
  const tag = slug?.[0] === 'All' ? '' : slug?.[0] ?? '';


  return (
    <div className={css.app}>
      <NotesClient tag={tag}
      />
    </div>
  );
}
