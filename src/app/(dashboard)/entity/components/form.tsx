'use client';

import { useState, useEffect } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

// Validação Zod
const formSchema = z.object({
  name: z.string().min(3, 'Nome é obrigatório e não pode ter menos de 3 caracteres').max(20,'Nome não pode ter mais de 20 caracteres'),
  isAdmin: z.boolean(),
});

interface ContaFormProps {
  initialData?: {
    name: string;
    isAdmin: boolean;
  };
  onSubmit: (data: any) => void;
}

const FormUserGroup = ({ initialData, onSubmit }: ContaFormProps) => {
  const [loading, setLoading] = useState(false);
  
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: '',
      isAdmin: false,
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
        onSubmit={form.handleSubmit(handleFormSubmit)} autoComplete='off' 
        className="w-full mx-auto p-6 bg-white rounded-lg shadow-md space-y-6"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          
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

          <FormField
            control={form.control}
            name="isAdmin"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-3 mt-6">
                
                <FormControl>
                  <Checkbox
                    checked={field.value} // Controla o estado booleano com o valor do campo
                    onCheckedChange={(checked) => field.onChange(checked)}
                  />
                </FormControl>
                <FormLabel>É Administrador</FormLabel>
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

export default FormUserGroup;
