import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PUT(req: Request, props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const { id } = params;
  
    try {
      const data = await req.json();
      const { accountMovementId, entityId, accountSubPlanId, valueSplit } = data;
      
      const exists = await prisma.accountMovementSplit.findFirst({
        where: {
          accountMovementId,
          entityId,
          accountSubPlanId,
          id: { not: Number(id) },
        },
      });

      if (exists) {
        return NextResponse.json({ message: 'DUPLICIDADE: Já existe um registro com essa entidade e sub plano.' }, { status: 400 });
      }

      const updatedData = await prisma.accountMovementSplit.update({
        where: { id: Number(id) },
        data: {
          accountMovementId: accountMovementId,
          entityId: entityId,
          accountSubPlanId: accountSubPlanId,
          valueSplit: valueSplit
        },
      });

      return NextResponse.json(updatedData);
    } catch (error) {
      console.error('Erro ao atualizar divisão de movimento bancário:', error);
      return NextResponse.json({ message: 'Erro ao atualizar os dados' }, { status: 500 });
    }
  }

  export async function DELETE(request: Request, props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const { id } = params;
  
    try {
      const deletedData = await prisma.accountMovementSplit.delete({
        where: {
          id: Number(id),
        },
      });
  
      if (!deletedData) {
        return NextResponse.json({ message: 'Divisão de movimento bancário não encontrada.' }, { status: 404 });
      }
  
      return NextResponse.json({ message: 'Sub Plano de contas excluído com sucesso!' });
    } catch (error) {
      return NextResponse.json({ message: 'Erro ao excluir o sub plano de contas' }, { status: 500 });
    }
  }