'use client';

import { useEffect, useState } from "react";

import { AccountSubPlan, columns } from "./components/columns"
import { DataTable } from "./components/data-table"
import { AlertOk } from "@/components/alert";
import { ConfirmAlert } from "@/components/alertConfirm";
import { LoadingModal } from "@/components/loadingModal";

interface AccountPlan {
    id: number;
    description: string;
}

export default function AccountSubPlanPage({ params }: { params: { id: string } }) {
  const [accountPlan, setAccountPlan] = useState<AccountPlan | null>(null);  
  const [accountSubPlan, setAccountSubPlan] = useState<AccountSubPlan[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  const [confirmVisible, setConfirmVisible] = useState(false);
  const [confirmId, setConfirmId] = useState<number | null>(null);
  
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);

        const responsePlan = await fetch(`/api/accountPlan/${params.id}`);
        if (!responsePlan.ok) throw new Error("Erro ao buscar o Plano de Contas");
        const dataPlan = await responsePlan.json();
        setAccountPlan(dataPlan);

        const responseSubPlan = await fetch(`/api/accountPlan/${params.id}/accountSubPlan`);
        if (!responseSubPlan.ok) throw new Error("Erro ao buscar Sub Plano de Contas");
        const dataSubPlan = await responseSubPlan.json();
        setAccountSubPlan(dataSubPlan);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
        setError("Erro ao buscar dados.");
      } finally {
        setLoading(false);
      }
    }

    if (params.id) {
      fetchData();
    }
  }, [params.id]);

  const handleDeleteRequest = (id: number) => {
    setConfirmId(id);
    setConfirmVisible(true);
  };

  const confirmDelete = async () => {
    if (confirmId === null) return;
    setConfirmVisible(false);

    try {
      const response = await fetch(`/api/accountSubPlan/${confirmId}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        throw new Error('Erro ao excluir sub plano de contas');
      }
  
      setAlertTitle("Sucesso!");
      setAlertMessage("Sub plano de contas excluído com sucesso.");
      setAlertVisible(true);
  
      setAccountSubPlan((prevData) => prevData.filter(accountSubPlan => accountSubPlan.id !== confirmId));
      setTimeout(() => setAlertVisible(false), 1200);
    } catch (error) {
      console.error('Erro ao excluir o sub plano de contas:', error);
      alert('Erro ao excluir o sub plano de contas');
    }
  };

  const cancelDelete = () => {
    setConfirmVisible(false);
    setConfirmId(null);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <LoadingModal isVisible={loading} />
      <div className="h-full w-full flex flex-col space-y-1 p-5 overflow-y-auto">
          <h2 className="text-2xl font-bold tracking-tight">Sub Planos de : {accountPlan?.description || "Não disponível"}</h2>
          <DataTable
            columns={columns({ deleteAccountSubPlan: handleDeleteRequest, planId: params.id })} 
            data={accountSubPlan}
            planId={params.id} 
          />
          
          <AlertOk 
            title={alertTitle} 
            message={alertMessage} 
            isVisible={alertVisible}
            onClose={() => setAlertVisible(false)} 
          />
          
          {confirmVisible && (
            <ConfirmAlert 
              title="Confirmação de Exclusão"
              message="Você tem certeza que deseja excluir este sub plano?"
              isOpen={confirmVisible}
              onConfirm={confirmDelete}
              onCancel={cancelDelete} 
            />
          )}
      </div>
    </>
  )
}
