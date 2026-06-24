import Image from 'next/image';
import Link from 'next/link';
import LogoutButton from '../LogoutButton/LogoutButton';
import styles from './Sidebar.module.css';

const playlists = [
  { src: '/img/playlist01.png', alt: 'Плейлист дня', href: '/selection/2' },
  {
    src: '/img/playlist02.png',
    alt: 'Сто танцевальных хитов',
    href: '/selection/3',
  },
  { src: '/img/playlist03.png', alt: 'Инди заряд', href: '/selection/4' },
];

export default function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <LogoutButton />

      <div className={styles.block}>
        <div className={styles.list}>
          {playlists.map((playlist, index) => (
            <div className={styles.item} key={playlist.src}>
              <Link className={styles.link} href={playlist.href}>
                <Image
                  className={styles.img}
                  src={playlist.src}
                  alt={playlist.alt}
                  width={250}
                  height={150}
                  priority={index === 0}
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
