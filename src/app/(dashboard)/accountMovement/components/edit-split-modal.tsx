import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const editSplitSchema = z.object({
    entityId: z.number().min(1, "Entidade é obrigatória"),
    accountSubPlanId: z.number().min(1, "Sub Plano é obrigatório"),
    valueSplit: z.number().min(0.01, "O valor deve ser maior que zero"),
  });

interface EditSplitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedData: any) => void;
  initialData: {
    entityId: number;
    accountSubPlanId: number;
    valueSplit: number;
  };
}

export function EditSplitModal({ isOpen, onClose, onSave, initialData }: EditSplitModalProps) {
  const form = useForm({
    resolver: zodResolver(editSplitSchema),
    defaultValues: initialData,
  });

  const handleSubmit = (data: any) => {
    onSave(data); // Retorna os dados atualizados para o componente pai
    onClose(); // Fecha o modal
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Divisão</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            {/* Campo Entidade */}
            <FormField
              control={form.control}
              name="entityId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Entidade</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Nome da Entidade" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Campo Sub Plano de Contas */}
            <FormField
              control={form.control}
              name="accountSubPlanId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sub Plano de Contas</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Descrição do Sub Plano" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Campo Valor */}
            <FormField
              control={form.control}
              name="valueSplit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Valor</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      placeholder="Valor"
                      min="0.01"
                      step="0.01"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="submit">Salvar</Button>
              <Button variant="outline" onClick={onClose}>
                Cancelar
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}