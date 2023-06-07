// Client component for the moment in order to use the useEffect
'use client';

import { useAuth } from '@/context/AuthSupabaseContexte';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import styles from './page.module.css';

export default function Home() {
  const router = useRouter();

  const { authState } = useAuth();

  /* Pour le moment, la page LogIn sera la page d'accueil */
  useEffect(() => {
    if (authState === 'SIGNED_OUT') {
      router.push('/LogIn');
    } else if (authState === 'SIGNED_IN') {
      router.push('/Homepage');
    }
  }, [authState]);

  return <main className={styles.main}></main>;
}
