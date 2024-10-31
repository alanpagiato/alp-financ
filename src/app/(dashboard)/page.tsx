'use client';

import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button"

interface User {
  username: string;
  groupName: string;
  isAdmin: boolean;
}

export default function Home() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('/api/auth/me', {
          method: 'GET',
        });

        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        } else {
          console.error('Erro ao buscar dados do usuário:', response.statusText);
        }
      } catch (error) {
        console.error('Erro na requisição de dados do usuário:', error);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {user ? (
        <>
          <h1 className="text-2xl font-semibold">Olá, </h1>
          <p className="text-lg text-gray-600">Usuario: {user.username} - Grupo: {user.groupName}
          {user.isAdmin ? (
            ' - É Admin'
          ):(
            ' - Não é Admin'
          )}
          </p>

        </>
      ) : (
        <p>Carregando...</p>
      )}
      <Button>Click me</Button>
    </div>
  );
}
