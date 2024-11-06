import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
    try {
        const data = await req.json();
        console.log('dados back', data)
        const updatedData = await prisma.accountMovementSplit.create({
          data: {
            accountMovementId: data.accountMovementId,
            entityId: data.entityId,
            accountSubPlanId: data.accountSubPlanId,
            valueSplit: data.valueSplit,
          },
        });
    
        return NextResponse.json(updatedData, { status: 201 });
    } catch (error) {
        console.error('Erro ao criar divisão do movimento bancário:', error);
        return NextResponse.json({ message: 'Erro ao salvar os dados' }, { status: 500 });
    }
    }