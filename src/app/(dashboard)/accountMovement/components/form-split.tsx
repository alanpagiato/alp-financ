'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { NumericFormat } from 'react-number-format';

interface SplitData {
    id: number;
    accountMovementId?: number;
    entity?: {
      name: string;
    };
    accountSubPlan?: {
      description: string;
    };
    valueSplit: number;
}

const formSchema = z.object({
  accountMovementid: z.number().optional(),
  entityId: z.number().min(1,"Selecione uma entidade"),
  accountSubPlanId: z.number().positive("Selecione um sub-plano de conta"),
  valueSplit: z.number().positive("Valor não pode ser vazio"),
});

type FormSplitData = z.infer<typeof formSchema>;

interface FormSplitProps {
  onSuccess: (newSplitData: SplitData) => void;
  accountMovementId?: number;
  initialData?: {
    accountMovementid: number;
    entityId: number;
    accountSubPlanId: number;
    valueSplit: number;
  };
}

export function FormSplit({ onSuccess, accountMovementId, initialData }: FormSplitProps) {

  const [entities, setEntities] = useState<{ id: number; name: string }[]>([]);
  const [accountSubPlans, setAccountSubPlans] = useState<{ id: number; description: string }[]>([]);
  const [localValue, setLocalValue] = useState('R$ 0,00');
  
  const form = useForm<FormSplitData>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      entityId: 0,
      accountSubPlanId: 0,
      valueSplit: 0,
    },
  });

  const { watch, setValue } = form;
  const watchedValue = watch("valueSplit");

  useEffect(() => {
    setLocalValue(
      new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(watchedValue || 0)
    );
  }, [watchedValue]);

  useEffect(() => {
    async function fetchData() {
        try {
          const [entityRes, accountSubPlanRes] = await Promise.all([
            fetch('/api/entity'),
            fetch('/api/accountSubPlan'),
          ]);
    
          const entities = await entityRes.json();
          const accountSubPlans = await accountSubPlanRes.json();
    
          setEntities(entities);
          setAccountSubPlans(accountSubPlans);

        } catch (error) {
          console.error('Erro ao buscar dados:', error);
        }
      }
    
      fetchData();

      if (initialData) {
        form.reset({
          ...initialData,
        });
      }
  }, [initialData, form]);

  const onSubmit = async (data: FormSplitData) => {
    try {
      
      if (accountMovementId) {
        const payload = { ...data, accountMovementId };
        const response = await fetch('/api/accountMovementSplit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });
        if (response.ok) {
            const createdData = await response.json();
            const entityName = entities.find((entity) => entity.id === data.entityId)?.name || '';
            const accountSubPlanDescription = accountSubPlans.find((plan) => plan.id === data.accountSubPlanId)?.description || '';

            const newSplitData = {
                ...createdData,
                entity: { name: entityName },
                accountSubPlan: { description: accountSubPlanDescription },
            };
            onSuccess(newSplitData); 
        } else {
            console.error("Erro ao salvar os dados");
        }
      }
    } catch (error) {
      console.error("Erro ao salvar os dados:", error);
    }
  };

  return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} autoComplete='off' className="space-y-4">

            <FormField
                control={form.control}
                name="entityId"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Entidade</FormLabel>
                    <FormControl>
                    <select 
                        {...field} 
                        className="w-full p-2 border rounded-md" 
                        defaultValue=""
                        onChange={(e) => field.onChange(Number(e.target.value))}
                    >
                        <option value="" >Selecione uma entidade</option>
                        {entities.map((entity) => (
                        <option key={entity.id} value={entity.id}>
                            {entity.name}
                        </option>
                        ))}
                    </select>
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="accountSubPlanId"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Sub Plano de Contas</FormLabel>
                    <FormControl>
                    <select 
                        {...field} 
                        className="w-full p-2 border rounded-md" 
                        defaultValue=""
                        onChange={(e) => field.onChange(Number(e.target.value))}
                    >
                        <option value="" >Selecione um sub plano</option>
                        {accountSubPlans.map((accountSubPlan) => (
                        <option key={accountSubPlan.id} value={accountSubPlan.id}>
                            {accountSubPlan.description}
                        </option>
                        ))}
                    </select>
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
            
            <FormField
                control={form.control}
                name="valueSplit"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Valor</FormLabel>
                    <FormControl>
                    <NumericFormat
                        value={localValue}
                        thousandSeparator="."
                        decimalSeparator=","
                        prefix="R$ "
                        decimalScale={2}
                        fixedDecimalScale
                        allowNegative={false}
                        onValueChange={({ floatValue }) => {
                        // Atualiza o valor numérico no estado do formulário
                        setValue("valueSplit", floatValue || 0);
                        }}
                        customInput={Input} // Usa o Input do ShadCN UI para manter o estilo
                        className="w-full p-2 border rounded-md"
                    />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />

            {/* Botão de Submit */}
            <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                Salvar
            </Button>
        </form>
    </Form>
  );
}