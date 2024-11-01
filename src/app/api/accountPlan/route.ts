import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const result = await prisma.accountPlan.findMany();
    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Erro ao buscar plano de contas' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();

    if (!data.description) {
      return NextResponse.json({ message: 'Descrição do plano é obrigatória' }, { status: 400 });
    }

    const newData = await prisma.accountPlan.create({
      data: {
        description: data.description,
      },
    });

    return NextResponse.json(newData, { status: 201 });
  } catch (error) {
    console.error('Erro ao criar plano:', error);
    return NextResponse.json({ message: 'Erro ao salvar os dados' }, { status: 500 });
  }
}