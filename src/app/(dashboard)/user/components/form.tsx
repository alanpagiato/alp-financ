'use client';

import { useState, useEffect } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

// Validação Zod
const formSchema = z.object({
  username: z.string().min(3, 'Nome é obrigatório e não pode ter menos de 3 caracteres').max(20,'Nome não pode ter mais de 20 caracteres'),
  userGroupId: z.number().min(1, 'Grupo é obrigatório'),
});

interface ContaFormProps {
  initialData?: {
    username: string;
    userGroupId: number;
  };
  onSubmit: (data: any) => void;
}

const FormUser = ({ initialData, onSubmit }: ContaFormProps) => {
  const [loading, setLoading] = useState(false);
  const [groups, setGroups] = useState<{ id: number; name: string }[]>([]);
  
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      username: '',
      userGroupId: 0,
    },
  });

  useEffect(() => {

    async function fetchGroups() {
      const response = await fetch('/api/userGroup');
      const data = await response.json();
      setGroups(data);
    }
  
    fetchGroups();

    if (initialData) {
      form.reset(initialData);
    }

  }, [initialData, form]);

  const handleFormSubmit = async (data: any) => {
    setLoading(true);
    try {
      const submittedData = {
        ...data,
        userGroupId: Number(data.userGroupId),
      };
      onSubmit(submittedData);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form 
        onSubmit={form.handleSubmit(handleFormSubmit)} 
        autoComplete='off' 
        className="w-full mx-auto p-6 bg-white rounded-lg shadow-md space-y-6"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="userGroupId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Grupo</FormLabel>
                <FormControl>
                  <select 
                    {...field} 
                    className="w-full p-2 border rounded-md" 
                    defaultValue=""
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  >
                    <option value="" >Selecione um grupo</option>
                    {groups.map((group) => (
                      <option key={group.id} value={group.id}>
                        {group.name}
                      </option>
                    ))}
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
        </div>  

        <Button type="submit" disabled={loading}>
          {loading ? 'Salvando...' : 'Salvar'}
        </Button>
      </form>
    </Form>

  );
};

export default FormUser;
