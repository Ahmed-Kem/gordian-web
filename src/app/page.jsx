// Client component for the moment in order to use the useEffect
'use client';

import { useAuth } from '@/context/AuthSupabaseContexte';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import styles from './page.module.css';

export default function Home() {
  const router = useRouter();

  const { session } = useAuth();

  /* Pour le moment, la page LogIn sera la page d'accueil */
  useEffect(() => {
    if (!session) {
      router.push('/LogIn');
    } else {
      router.push('/Homepage');
    }
  }, []);

  return <main className={styles.main}></main>;
}
