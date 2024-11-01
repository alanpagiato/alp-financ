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
  description: z.string().min(5, 'Descrição é obrigatória e não pode ter menos de 4 caracteres')
                         .max(50,'Descrição não pode ter mais de 50 caracteres'),
});

interface ContaFormProps {
  initialData?: {
    description: string;
  };
  onSubmit: (data: any) => void;
}

const FormAccountPlan = ({ initialData, onSubmit }: ContaFormProps) => {
  const [loading, setLoading] = useState(false);
  
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      description: '',
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
        <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
          
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descrição</FormLabel>
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

export default FormAccountPlan;
