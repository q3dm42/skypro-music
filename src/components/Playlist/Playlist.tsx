import { tracks } from '@/data';
import Track from '../Track/Track';
import styles from './Playlist.module.css';

export default function Playlist() {
  return (
    <div className={styles.contentPlaylist}>
      {tracks.map((track) => (
        <Track key={track.id} track={track} />
      ))}
    </div>
  );
}
