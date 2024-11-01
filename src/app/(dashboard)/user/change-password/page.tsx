'use client';

import { useState, useEffect } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

// Importando os componentes personalizados com os caminhos definidos
import { AlertOk } from "@/components/alert";
import { LoadingModal } from "@/components/loadingModal";

// Validação Zod para alteração de senha
const formSchema = z.object({
  senhaAnterior: z.string().min(6, 'A senha anterior é obrigatória e deve ter pelo menos 6 caracteres'),
  novaSenha: z.string().min(6, 'A nova senha deve ter pelo menos 6 caracteres'),
});

interface ChangePasswordFormProps {
  onSubmit: (data: any) => void;
}

const ChangePasswordForm = ({ onSubmit }: ChangePasswordFormProps) => {
  const [username, setUsername] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      senhaAnterior: '',
      novaSenha: '',
    },
  });

  // Busca o username do usuário logado sem exibir no formulário
  useEffect(() => {
    async function fetchUsername() {
      setIsLoading(true);
      try {
        const response = await fetch('/api/me');
        const data = await response.json();
        if (response.ok) {
          setUsername(data.username);
        } else {
          setAlertTitle('Erro');
          setAlertMessage('Erro ao buscar informações do usuário');
          setAlertVisible(true);
        }
      } catch {
        setAlertTitle('Erro');
        setAlertMessage('Erro inesperado ao buscar informações do usuário');
        setAlertVisible(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchUsername();
  }, []);

  const handleFormSubmit = async (data: { senhaAnterior: string; novaSenha: string }) => {
    setIsLoading(true);
    setAlertVisible(false);

    try {
      await onSubmit({ ...data, username });
      setAlertTitle('Sucesso');
      setAlertMessage('Senha alterada com sucesso');
      setAlertVisible(true);
    } catch (e) {
      setAlertTitle('Erro');
      setAlertMessage('Erro ao alterar a senha');
      setAlertVisible(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
          <h2 className="mb-6 text-2xl font-semibold text-center">Alterar Senha</h2>

          {/* Exibição do AlertOk para mensagens de sucesso ou erro */}
          <AlertOk 
            title={alertTitle} 
            message={alertMessage} 
            isVisible={alertVisible} 
            onClose={() => setAlertVisible(false)} 
          />

          {/* LoadingModal aparece enquanto a requisição está em andamento */}
          <LoadingModal isVisible={isLoading} />

          <form 
            onSubmit={form.handleSubmit(handleFormSubmit)} 
            autoComplete="off" 
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="senhaAnterior"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha Anterior</FormLabel>
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
              name="novaSenha"
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
          </form>
        </div>
      </div>
    </Form>
  );
};

export default ChangePasswordForm;
