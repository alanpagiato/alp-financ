'use client';

import { useState, useEffect } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";

// Validação Zod
const formSchema = z.object({
  name: z.string().min(3, 'Nome é obrigatório e não pode ter menos de 3 caracteres').max(100,'Nome não pode ter mais de 100 caracteres'),
  numberBank: z.number().optional(),
  agency: z.string().max(20,'Nome da agência não pode ter mais de 20 caracteres').optional(),
  agencyDigit: z.string().max(1,'Dígito da agência não pode ter mais de 1 caractere').optional(),
  numberAccount: z.string().max(20,'Número da conta não pode ter mais de 20 caracteres').optional(),
  numberAccountDigit: z.string().max(1,'Dígito da conta não pode ter mais de 1 caractere').optional(),
  addressType: z.string().optional(),
  address: z.string().max(200,'Endereço não pode ter mais de 200 caracteres').optional(),
  addressNumber: z.string().max(20,'Número endereço não pode ter mais de 20 caracteres').optional(),
  addressComplement: z.string().max(50,'Endereço não pode ter mais de 50 caracteres').optional(),
  neighborhood: z.string().max(100,'Bairro não pode ter mais de 100 caracteres').optional(),
  city: z.string().max(100,'Cidade não pode ter mais de 100 caracteres').optional(),
  uf: z.string().optional(),
  cep: z.string().optional(),
  phones: z.string().max(200,'Telefones não pode ter mais de 200 caracteres').optional(),
  contactPerson: z.string().max(100,'Pessoa de contato não pode ter mais de 100 caracteres').optional(),
});

interface ContaFormProps {
  initialData?: {
    name: string;
    numberBank?: number;
    agency?: string;
    agencyDigit?: string;
    numberAccount?: string;
    numberAccountDigit?: string;
    addressType?: string;
    address?: string;
    addressNumber?: string;
    addressComplement?: string;
    neighborhood?: string;
    city?: string;
    uf?: string;
    cep?: string;
    phones?: string;
    contactPerson?: string;
  };
  onSubmit: (data: any) => void;
}

const FormBankAccount = ({ initialData, onSubmit }: ContaFormProps) => {
  const [loading, setLoading] = useState(false);
  
  // Usando React Hook Form com Zod Resolver
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: '',
      numberBank: 0,
      agency: '',
      agencyDigit: '',
      numberAccount: '',
      numberAccountDigit: '',
      addressType: '',
      address: '',
      addressNumber: '',
      addressComplement: '',
      neighborhood: '',
      city: '',
      uf: '',
      cep: '',
      phones: '',
      contactPerson: '',
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
        numberBank: Number(data.numberBank),
                            
      };
      onSubmit(submittedData);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} autoComplete='off' className="w-full mx-auto p-6 bg-white rounded-lg shadow-md space-y-6">
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
            name="numberBank"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Número</FormLabel>
                <FormControl>
                  <Input 
                    {...field} 
                    type='number'
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="agency"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Agência</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="agencyDigit"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dígito</FormLabel>
                <FormControl>
                  <Input {...field}/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="numberAccount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Número Conta</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="numberAccountDigit"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dígito</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="addressType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo Logradouro</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} defaultValue={field.value || ""}>
                    <SelectTrigger>
                      <span>{field.value || "Selecione o tipo de logradouro"}</span>
                    </SelectTrigger>
                    <SelectContent>
                      {["Rua", "Avenida", "Rodovia", "Estrada", "Travessa", "Alameda", "Praça", "Colonia", "Passagem", "Chacara", "Sitio", "Fazenda", "Passeio"].map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Logradouro</FormLabel>
                <FormControl>
                  <Input {...field}/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="addressNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Número</FormLabel>
                <FormControl>
                  <Input {...field}/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="addressComplement"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Complemento</FormLabel>
                <FormControl>
                  <Input {...field}/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="neighborhood"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bairro</FormLabel>
                <FormControl>
                  <Input {...field}/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cidade</FormLabel>
                <FormControl>
                  <Input {...field}/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="uf"
            render={({ field }) => (
              <FormItem>
                <FormLabel>UF</FormLabel>
                <FormControl>
                  <Input {...field}/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="cep"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CEP</FormLabel>
                <FormControl>
                  <Input {...field}/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phones"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telefone(s)</FormLabel>
                <FormControl>
                  <Input {...field}/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="contactPerson"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pessoa Contato</FormLabel>
                <FormControl>
                  <Input {...field}/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>  

        {/** Botão de submit */}
        <Button type="submit" disabled={loading}>
          {loading ? 'Salvando...' : 'Salvar'}
        </Button>
      </form>
    </Form>

  );
};

export default FormBankAccount;
