'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Logout() {
  const router = useRouter();

  useEffect(() => {
    const logout = async () => {
      try {
        const response = await fetch('/api/auth/logout', {
          method: 'POST',
        });

        if (response.ok) {
          router.replace('/login');
        } else {
          console.error('Erro ao fazer logout:', response.statusText);
        }
      } catch (error) {
        console.error('Erro na requisição de logout:', error);
      }
    };

    logout();
  }, [router]);

  return null;
}
