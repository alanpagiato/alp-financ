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
  name: z.string().min(3, 'Nome é obrigatório e não pode ter menos de 3 caracteres').max(200,'Nome não pode ter mais de 200 caracteres'),
});

interface ContaFormProps {
  initialData?: {
    name: string;
  };
  onSubmit: (data: any) => void;
}

const FormEntity = ({ initialData, onSubmit }: ContaFormProps) => {
  const [loading, setLoading] = useState(false);
  
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: '',
    },
  });

  useEffect(() => {
    if (initialData) {
      form.reset(initialData);
    }
  }, [initialData, form]);

  const handleFormSubmit = async (data: any) => {
    setLoading(true);
    try {
      const submittedData = {
        ...data,
      };
      onSubmit(submittedData);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form 
        onSubmit={form.handleSubmit(handleFormSubmit)} autoComplete="off" 
        className="w-full mx-auto p-6 bg-white rounded-lg shadow-md space-y-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-1 gap-1">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input {...field} />
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

export default FormEntity;
