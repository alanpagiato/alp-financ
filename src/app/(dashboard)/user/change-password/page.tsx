'use client';

import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { LoadingModal } from "@/components/loadingModal";
import { AlertOk } from '@/components/alert';

// Validação Zod para alteração de senha
const formSchema = z.object({
  prevPassword: z.string().min(1, 'A senha anterior é obrigatória'),
  newPassword: z.string().min(6, 'A nova senha deve ter pelo menos 6 caracteres').max(20, 'A nova senha deve ter no máximo 20 caracteres'),
});

const ChangePasswordForm = () => {
  const [username, setUsername] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);  // Inicialize como null para controlar a exibição de erro
  const [alertTitle, setAlertTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertVisible, setAlertVisible] = useState(false);

  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prevPassword: '',
      newPassword: '',
    },
  });

  useEffect(() => {
    async function fetchUsername() {
      setIsLoading(true);

      try {
        const response = await fetch('/api/auth/me');
        const data = await response.json();
        if (response.ok) {
          setUsername(data.username);
        } else {
          setError('Erro ao buscar informações do usuário');
        }
      } catch {
        setError('Erro inesperado ao buscar informações do usuário');
      } finally {
        setIsLoading(false);
      }
    }

    fetchUsername();
  }, []);

  const handleFormSubmit = async (data: any) => {
    setIsLoading(true);
    setError(null);
    
    const payload = {
      ...data,
      username,
    };

    try {
      const response = await fetch('/api/auth/change-password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      
      if (!response.ok) {
        const resData = await response.json();
        setError(resData.message || 'Erro ao alterar a senha');
      } else {
        setAlertTitle('Sucesso');
        setAlertMessage('Senha alterada com sucesso');
        setAlertVisible(true);
        setTimeout(() => {
          router.push('/logout');
        }, 1000);
      }
    } catch (err) {
      setError('Erro ao alterar a senha');
      console.log(err)
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Alterar Senha - ( {username} )</h1>
      <LoadingModal isVisible={isLoading} />
      <AlertOk 
            title={alertTitle} 
            message={alertMessage} 
            isVisible={alertVisible}
            onClose={() => setAlertVisible(false)} 
        />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleFormSubmit)}
          autoComplete='off'
          className="w-full mx-auto p-6 bg-white rounded-lg shadow-md space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="prevPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha Atual</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      {...field}
                      placeholder="Digite sua senha atual"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nova Senha</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      {...field}
                      placeholder="Digite sua nova senha"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? 'Alterando...' : 'Alterar Senha'}
            </Button>

            {error && (
              <div className="text-red-600 font-medium p-2 flex items-center">
                <span>{error}</span>
              </div>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ChangePasswordForm;
