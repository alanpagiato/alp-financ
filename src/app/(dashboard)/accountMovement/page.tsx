'use client';

import { useEffect, useState } from "react";

import { AccountMovement, columns } from "./components/columns"
import { DataTable } from "./components/data-table"
import { AlertOk } from "@/components/alert";
import { ConfirmAlert } from "@/components/alertConfirm";
import { LoadingModal } from "@/components/loadingModal";

export default function Page() {
  const [data, setData] = useState<AccountMovement[]>([]);
  const [bankAccountMap, setBankAccountMap] = useState<Record<number, string>>({});
  const [movementCodeMap, setMovementCodeMap] = useState<Record<number, { description: string; nature: string }>>({});
  const [loading, setLoading] = useState<boolean>(true);
  
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState<'ok' | 'error'>('ok');

  const [confirmVisible, setConfirmVisible] = useState(false);
  const [confirmId, setConfirmId] = useState<number | null>(null);
  
  useEffect(() => {
    Promise.all([fetchData(), fetchBankAccounts(), fetchMovementCodes()])
      .then(([movementAccounts, bankAccounts, movementCodes]) => {
        setData(movementAccounts);

        const bankAccountMapping: Record<number, string> = {};
        bankAccounts.forEach(bankAccount => {
          bankAccountMapping[bankAccount.id] = bankAccount.name;
        });
        setBankAccountMap(bankAccountMapping);
        
        const movementCodeMapping: Record<number, { description: string; nature: string }> = {};
        movementCodes.forEach(movementCode => {
          movementCodeMapping[movementCode.id] = {
            description: movementCode.description,
            nature: movementCode.nature,
          };
        });
        setMovementCodeMap(movementCodeMapping);

        setLoading(false);
      })
      .catch((err) => {
        handleShowErrorAlert(err.message);
        setLoading(false);
      });
  }, []);

  async function fetchData(): Promise<AccountMovement[]> {
    const response = await fetch('/api/accountMovement');
    if (!response.ok) {
      handleShowErrorAlert('Falha ao buscar os dados');
      throw new Error('Falha ao buscar os dados');
    }
    return response.json();
  }

  async function fetchBankAccounts(): Promise<{ id: number; name: string }[]> {
    const response = await fetch('/api/bankAccount');
    if (!response.ok) {
      handleShowErrorAlert('Falha ao buscar os grupos');
      throw new Error('Falha ao buscar os grupos');
    }
    return response.json();
  }

  async function fetchMovementCodes(): Promise<{ id: number; description: string; nature: string }[]> {
    const response = await fetch('/api/movementCode');
    if (!response.ok) {
      handleShowErrorAlert('Falha ao buscar os códigos de lançamento');
      throw new Error('Falha ao buscar os códigos de lançamento');
    }
    return response.json();
  }

  const handleDeleteRequest = (id: number) => {
    setConfirmId(id);
    setConfirmVisible(true);
  };

  const confirmDelete = async () => {
    if (confirmId === null) return;
    setConfirmVisible(false);

    try {
      const response = await fetch(`/api/accountMovement/${confirmId}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        handleShowErrorAlert('Erro ao excluir movimento bancário');
        throw new Error('Erro ao excluir movimento bancário');
      }
  
      handleShowSuccessAlert("Movimento bancário excluído com sucesso.");
  
      setData((prevData) => prevData.filter(accountMovement => accountMovement.id !== confirmId));
    } catch (error) {
      console.error('Erro ao excluir o movimento bancário:', error);
      handleShowErrorAlert('Erro ao excluir o movimento bancário');
    }
  };

  const cancelDelete = () => {
    setConfirmVisible(false);
    setConfirmId(null);
  };

  const handleShowSuccessAlert = (message: string) => {
    setAlertTitle("Sucesso!");
    setAlertMessage(message);
    setAlertType("ok");
    setAlertVisible(true);
  };

  const handleShowErrorAlert = (message: string) => {
    setAlertTitle("Erro");
    setAlertMessage(message);
    setAlertType("error");
    setAlertVisible(true);
  };

  return (
    <>
      <LoadingModal isVisible={loading} />
      <div className="h-full w-full flex flex-col space-y-1 p-5 overflow-y-auto">
          <h2 className="text-2xl font-bold mb-4 tracking-tight">Movimentos Bancários</h2>
          <DataTable
            columns={columns({ deleteAccountMovement: handleDeleteRequest, bankAccountMap, movementCodeMap })} 
            data={data} 
          />
          
          <AlertOk 
            title={alertTitle} 
            message={alertMessage} 
            isVisible={alertVisible}
            type={alertType}
            onClose={() => setAlertVisible(false)} 
          />
          
          {confirmVisible && (
            <ConfirmAlert 
              title="Confirmação de Exclusão"
              message="Você tem certeza que deseja excluir este movimento?"
              isOpen={confirmVisible}
              onConfirm={confirmDelete}
              onCancel={cancelDelete} 
            />
          )}
      </div>
    </>
  )
}
