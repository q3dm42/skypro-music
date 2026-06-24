import Image from 'next/image';
import Link from 'next/link';
import styles from './Sidebar.module.css';

const playlists = [
  { src: '/img/playlist01.png', alt: 'Плейлист дня' },
  { src: '/img/playlist02.png', alt: 'Сто танцевальных хитов' },
  { src: '/img/playlist03.png', alt: 'Инди заряд' },
];

export default function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.personal}>
        <p className={styles.personalName}>Sergey.Ivanov</p>
        <div className={styles.icon}></div>
      </div>

      <div className={styles.block}>
        <div className={styles.list}>
          {playlists.map((playlist) => (
            <div className={styles.item} key={playlist.src}>
              <Link className={styles.link} href="/">
                <Image
                  className={styles.img}
                  src={playlist.src}
                  alt={playlist.alt}
                  width={250}
                  height={150}
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
