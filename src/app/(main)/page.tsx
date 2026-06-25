import { getTracks } from '@/api/tracks';
import Centerblock from '@/components/Centerblock/Centerblock';
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage';
import type { Track } from '@/types/track';

export default async function Home() {
  let tracks: Track[];

  try {
    tracks = await getTracks();
  } catch (error) {
    return (
      <ErrorMessage
        message={
          error instanceof Error ? error.message : 'Не удалось загрузить треки'
        }
      />
    );
  }

  return <Centerblock title="Треки" tracks={tracks} />;
}
