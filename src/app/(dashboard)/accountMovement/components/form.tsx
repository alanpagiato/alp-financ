'use client';

import { useState, useEffect } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon } from "@radix-ui/react-icons";
import { format, sub } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { NumericFormat } from 'react-number-format';

const formSchema = z.object({
  dateMovement: z
    .date({
      required_error: "Data é obrigatória",
      invalid_type_error: "Data inválida",
    })
    .refine((date) => date !== null, { message: "Data é obrigatória" }),
  documentNumber: z.string().optional(),
  valueMovement: z
    .string()
    .refine((val) => val !== "R$ 0,00" && val !== "R$ 0", {
      message: "O valor deve ser maior que zero",
    }),
  finished: z.boolean(),
  observations: z.string().optional(),
  bankAccountId: z.number().min(1, "Conta bancária não pode ser vazio"),
  movementCodeId: z.number().min(1, "Código de lançamento não pode ser vazio"),
  entityId: z.number().min(1, "Entidade não pode ser vazio"),
  accountId: z.number().optional(),
});

interface ContaFormProps {
  initialData?: {
    dateMovement: Date | null;
    documentNumber: string;
    valueMovement: string;
    finished: boolean;
    observations: string;
    bankAccountId: number;
    movementCodeId: number;
    entityId: number;
    accountId: number;
  };
  onSubmit: (data: any) => void;
}

const FormAccountMovement = ({ initialData, onSubmit }: ContaFormProps) => {
  const [loading, setLoading] = useState(false);
  const [bankAccounts, setBankAccounts] = useState<{ id: number; name: string }[]>([]);
  const [movementCodes, setMovementCodes] = useState<{ id: number; description: string }[]>([]);
  const [entitys, setEntitys] = useState<{ id: number; name: string }[]>([]);
  const [openPop, setOpenPop] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      dateMovement: null,
      documentNumber: '',
      valueMovement: "R$ 0,00",
      finished: false,
      observations: '',
      bankAccountId: 0,
      movementCodeId: 0,
      entityId: 0,
      accountId: 0,
    },
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const [bankAccountRes, movementCodeRes, entityRes] = await Promise.all([
          fetch('/api/bankAccount'),
          fetch('/api/movementCode'),
          fetch('/api/entity'),
        ]);
  
        const bankAccounts = await bankAccountRes.json();
        const movementCodes = await movementCodeRes.json();
        const entities = await entityRes.json();
  
        setBankAccounts(bankAccounts);
        setMovementCodes(movementCodes);
        setEntitys(entities);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    }
  
    fetchData();
  
    if (initialData) {
      form.reset({
        ...initialData,
        dateMovement: initialData.dateMovement ? new Date(initialData.dateMovement) : null,
        accountId: 0,
      });
    }
  }, [initialData, form]);

  

  const handleFormSubmit = async (data: any) => {
    setLoading(true);
    try {
      const submittedData = {
        ...data,
        valueMovement: parseFloat(data.valueMovement.replace(/[R$\s.]/g, "").replace(",", ".")),
        bankAccountId: Number(data.bankAccountId),
        movementCodeId: Number(data.movementCodeId),
        entityId: Number(data.entityId),
        accountId: Number(data.accountId),
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
              name="bankAccountId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Conta</FormLabel>
                  <FormControl>
                    <select 
                      {...field} 
                      className="w-full p-2 border rounded-md" 
                      defaultValue=""
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    >
                      <option value="" >Selecione uma conta</option>
                      {bankAccounts.map((bankAccount) => (
                        <option key={bankAccount.id} value={bankAccount.id}>
                          {bankAccount.name}
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
              name="dateMovement"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data</FormLabel>
                  <Popover open={openPop} onOpenChange={setOpenPop}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                          onClick={() => setOpenPop(!open)}
                        >
                          {field.value ? format(field.value, 'dd/MM/yyyy', { locale: ptBR }) : 'Selecionar data'}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>  
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value || undefined}
                          onSelect={(dateMovement) => {
                            field.onChange(dateMovement);
                            setOpenPop(false);
                          }}
                          initialFocus
                          locale={ptBR}
                        />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="movementCodeId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Código de Lançamento</FormLabel>
                  <FormControl>
                    <select 
                      {...field} 
                      className="w-full p-2 border rounded-md" 
                      defaultValue=""
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    >
                      <option value="" >Selecione um código de lançamento</option>
                      {movementCodes.map((movementCode) => (
                        <option key={movementCode.id} value={movementCode.id}>
                          {movementCode.description}
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
              name="documentNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Documento
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
            control={form.control}
            name="valueMovement"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Valor</FormLabel>
                <FormControl>
                  <NumericFormat
                    {...field}
                    thousandSeparator="."
                    decimalSeparator=","
                    prefix="R$ "
                    decimalScale={2}
                    fixedDecimalScale
                    allowNegative={false}
                    onValueChange={({ formattedValue }) => {
                      // Atualiza `value` no formato string com `R$`
                      field.onChange(formattedValue);
                    }}
                    customInput={Input} // Usa o Input do ShadCN UI para manter o estilo
                    className="w-full p-2 border rounded-md"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
                    {entitys.map((entity) => (
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
            name="observations"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Observações</FormLabel>
                <FormControl>
                  <textarea
                    {...field}
                    rows={1} // Inicialmente uma linha
                    className="w-full p-2 border rounded-md resize-y" // Permite o redimensionamento vertical
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="finished"
            render={({ field }) => (
              <FormItem className="flex items-center mt-6">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={(checked) => field.onChange(checked)}
                  />
                </FormControl>
                <FormLabel className="ml-2">Finalizado</FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="accountId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Conta</FormLabel>
                <FormControl>
                  <Input
                    {...field}  
                    type="number"
                    className="w-full p-2 border rounded-md"
                    disabled // Tornar o campo não editável
                  />
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

export default FormAccountMovement;
