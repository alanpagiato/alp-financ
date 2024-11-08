import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
    try {
      const data = await req.json();
      const { accountMovementId, entityId, accountSubPlanId, valueSplit } = data;
      
      const exists = await prisma.accountMovementSplit.findUnique({
        where: {
          movementId_entityId_subPlanId: {accountMovementId, entityId, accountSubPlanId },
        },
      });

      if (exists) {
        return NextResponse.json({ message: 'DUPLICIDADE: Já existe um registro com essa entidade e sub plano.' }, { status: 400 });
      }

      const newData = await prisma.accountMovementSplit.create({
        data: {
          accountMovementId,
          entityId,
          accountSubPlanId,
          valueSplit,
        },
      });
  
      return NextResponse.json(newData, { status: 201 });
    } catch (error) {
        console.error('Erro ao criar divisão do movimento bancário:', error);
        return NextResponse.json({ message: 'Erro ao salvar os dados' }, { status: 500 });
    }
}