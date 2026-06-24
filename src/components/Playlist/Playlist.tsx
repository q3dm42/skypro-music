import type { Track as TrackType } from '@/types/track';
import Track from '../Track/Track';
import styles from './Playlist.module.css';

type PlaylistProps = {
  tracks: TrackType[];
};

export default function Playlist({ tracks }: PlaylistProps) {
  return (
    <div className={styles.contentPlaylist}>
      {tracks.map((track) => (
        <Track key={track._id} track={track} playlist={tracks} />
      ))}
    </div>
  );
}
