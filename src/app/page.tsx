import { getTracks } from '@/api/tracks';
import AppShell from '@/components/AppShell/AppShell';
import Centerblock from '@/components/Centerblock/Centerblock';
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage';
import type { Track } from '@/types/track';

export default async function Home() {
  let tracks: Track[];

  try {
    tracks = await getTracks();
  } catch (error) {
    return (
      <AppShell>
        <ErrorMessage
          message={
            error instanceof Error
              ? error.message
              : 'Не удалось загрузить треки'
          }
        />
      </AppShell>
    );
  }

  return (
    <AppShell>
      <Centerblock title="Треки" tracks={tracks} />
    </AppShell>
  );
}
