'use client';

import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { clearAuthData, getStoredUser } from '@/utils/authStorage';
import styles from './LogoutButton.module.css';

export default function LogoutButton() {
  const router = useRouter();
  const pathname = usePathname();
  const [username, setUsername] = useState(
    () => getStoredUser()?.username ?? 'Гость',
  );

  const handleLogout = () => {
    clearAuthData();
    setUsername('Гость');

    if (pathname === '/favorites') {
      router.push('/');
    } else {
      router.refresh();
    }
  };

  return (
    <div className={styles.personal}>
      <p className={styles.personalName}>{username}</p>
      <button
        className={styles.icon}
        type="button"
        onClick={handleLogout}
        aria-label="Выйти из аккаунта"
      >
        <svg className={styles.logoutIcon}>
          <use href="/img/icon/sprite.svg#logout"></use>
        </svg>
      </button>
    </div>
  );
}
