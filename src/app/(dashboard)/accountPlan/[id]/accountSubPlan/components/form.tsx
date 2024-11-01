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
  description: z.string().min(3, 'Descrição é obrigatória e não pode ter menos de 3 caracteres')
                         .max(50,'Descrição não pode ter mais de 50 caracteres'),
  accountPlanId: z.number().min(1, 'Plano é obrigatório')
});

interface ContaFormProps {
  initialData?: {
    description: string;
    accountPlanId: number;
  };
  onSubmit: (data: any) => void;
  planId: number;
}

const FormAccountSubPlan = ({ initialData, onSubmit, planId }: ContaFormProps) => {
  const [loading, setLoading] = useState(false);
  const [plans, setPlans] = useState<{ id: number; description: string }[]>([]);
  
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      description: '',
      accountPlanId: planId, 
    },
  });

  useEffect(() => {
    async function fetchPlans() {
      const response = await fetch('/api/accountPlan');
      const data = await response.json();
      setPlans(data);
    }

    fetchPlans();

    if (initialData) {
      form.reset(initialData);
    }
  }, [initialData, form]);

  const handleFormSubmit = async (data: any) => {
    setLoading(true);
    try {
      console.log('data', data)
      const submittedData = {
        ...data,
        accountPlanId: Number(data.accountPlanId),
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
          
          <FormField
            control={form.control}
            name="accountPlanId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Plano</FormLabel>
                <FormControl>
                  <select 
                    {...field} 
                    className="w-full p-2 border rounded-md" 
                    defaultValue=""
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  >
                    <option value="" >Selecione um plano</option>
                    {plans.map((plan) => (
                      <option key={plan.id} value={plan.id}>
                        {plan.description}
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

export default FormAccountSubPlan;
