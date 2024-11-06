import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const result = await prisma.accountSubPlan.findMany();
    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Erro ao buscar sub plano de contas' }, { status: 500 });
  }
}

export async function POST(req: Request) {
    try {
      const data = await req.json();
      
      if (!data.description) {
        return NextResponse.json({ message: 'Descrição do sub plano é obrigatória' }, { status: 400 });
      }

      if (!data.accountPlanId) {
        return NextResponse.json({ message: 'Plano deve ser escolhido' }, { status: 400 });
      }

      data.accountPlanId = Number(data.accountPlanId);
  
      const newData = await prisma.accountSubPlan.create({
        data: {
          description: data.description,
          accountPlanId: data.accountPlanId,
        },
      });
  
      return NextResponse.json(newData, { status: 201 });
    } catch (error) {
      console.error('Erro ao criar sub plano:', error);
      return NextResponse.json({ message: 'Erro ao salvar os dados' }, { status: 500 });
    }
  }