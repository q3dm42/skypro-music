import { getSelectionTracks } from '@/api/selections';
import AppShell from '@/components/AppShell/AppShell';
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
    return (
      <AppShell>
        <ErrorMessage message="Некорректный номер подборки" />
      </AppShell>
    );
  }

  try {
    const selectionData = await getSelectionTracks(selectionId);
    selection = selectionData.selection;
    tracks = selectionData.tracks;
  } catch (error) {
    return (
      <AppShell>
        <ErrorMessage
          message={
            error instanceof Error
              ? error.message
              : 'Не удалось загрузить подборку'
          }
        />
      </AppShell>
    );
  }

  return (
    <AppShell>
      <Centerblock title={selection.name ?? 'Подборка'} tracks={tracks} />
    </AppShell>
  );
}
