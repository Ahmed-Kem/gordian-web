'use client';

import { useAuth } from '@/context/AuthSupabaseContexte';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Homepage() {
  const router = useRouter();

  const { signOut, user, session } = useAuth();

  useEffect(() => {
    if (!session) {
      router.push('/');
    }
  }, [session]);

  return (
    <div>
      {session ? (
        <div>
          {' '}
          <h1>Welcome home {user.user_metadata.name}</h1>
          <button
            onClick={() => {
              signOut();
            }}
          >
            Se déconnecter
          </button>
        </div>
      ) : (
        <h1>Ciao !</h1>
      )}
    </div>
  );
}
