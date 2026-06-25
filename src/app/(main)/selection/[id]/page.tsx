import { getSelectionTracks } from '@/api/selections';
import Centerblock from '@/components/Centerblock/Centerblock';
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage';
import type { Selection, Track } from '@/types/track';

type SelectionPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function SelectionPage({ params }: SelectionPageProps) {
  const { id } = await params;
  const selectionId = Number(id);
  let selection: Selection;
  let tracks: Track[];

  if (!Number.isInteger(selectionId)) {
    return <ErrorMessage message="Некорректный номер подборки" />;
  }

  try {
    const selectionData = await getSelectionTracks(selectionId);
    selection = selectionData.selection;
    tracks = selectionData.tracks;
  } catch (error) {
    return (
      <ErrorMessage
        message={
          error instanceof Error
            ? error.message
            : 'Не удалось загрузить подборку'
        }
      />
    );
  }

  return <Centerblock title={selection.name ?? 'Подборка'} tracks={tracks} />;
}
