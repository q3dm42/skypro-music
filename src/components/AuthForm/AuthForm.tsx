'use client';

import { useState, type FormEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getUserToken, loginUser, signupUser } from '@/api/auth';
import { saveAuthData } from '@/utils/authStorage';
import styles from './AuthForm.module.css';

type AuthMode = 'signin' | 'signup';

type AuthFormProps = {
  mode: AuthMode;
};

export default function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const isSignup = mode === 'signup';

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    if (isSignup && password !== repeatPassword) {
      setError('Пароли не совпадают');
      return;
    }

    setIsLoading(true);

    try {
      if (isSignup) {
        await signupUser({ email, password, username });
        router.push('/signin');
      } else {
        const [user, tokens] = await Promise.all([
          loginUser({ email, password }),
          getUserToken({ email, password }),
        ]);

        saveAuthData(user, tokens);
        router.push('/');
      }
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : 'Не удалось выполнить запрос',
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.containerEnter}>
        <div className={styles.modal__block}>
          <form className={styles.modal__form} onSubmit={handleSubmit}>
            <Link href="/" className={styles.modal__logo}>
              <Image
                className={styles.modal__logoImage}
                src="/img/logo_modal.png"
                alt="Skypro Music"
                width={140}
                height={21}
                priority
              />
            </Link>

            {isSignup && (
              <input
                className={`${styles.modal__input} ${styles.login}`}
                type="text"
                name="username"
                placeholder="Имя"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                required
              />
            )}

            <input
              className={`${styles.modal__input} ${styles.login}`}
              type="email"
              name="email"
              placeholder="Почта"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
            <input
              className={styles.modal__input}
              type="password"
              name="password"
              placeholder="Пароль"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
            {isSignup && (
              <input
                className={styles.modal__input}
                type="password"
                name="repeatPassword"
                placeholder="Повторите пароль"
                value={repeatPassword}
                onChange={(event) => setRepeatPassword(event.target.value)}
                required
              />
            )}

            <div className={styles.errorContainer}>{error}</div>

            <button
              className={
                isSignup ? styles.modal__btnSignupEnt : styles.modal__btnEnter
              }
              type="submit"
              disabled={isLoading}
            >
              {isLoading
                ? 'Подождите...'
                : isSignup
                  ? 'Зарегистрироваться'
                  : 'Войти'}
            </button>

            {!isSignup && (
              <Link href="/signup" className={styles.modal__btnSignup}>
                Зарегистрироваться
              </Link>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
