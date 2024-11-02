import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const result = await prisma.movementCode.findMany();
    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Erro ao buscar códigos de lançamento' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();

    if (!data.description) {
      return NextResponse.json({ message: 'Descrição do código de lançamento é obrigatória' }, { status: 400 });
    }

    if (!data.nature) {
      return NextResponse.json({ message: 'Natureza do código de lançamento é obrigatória' }, { status: 400 });
    }

    const newData = await prisma.movementCode.create({
      data: {
        description: data.description,
        nature: data.nature,
      },
    });

    return NextResponse.json(newData, { status: 201 });
  } catch (error) {
    console.error('Erro ao criar código de lançamento:', error);
    return NextResponse.json({ message: 'Erro ao salvar os dados' }, { status: 500 });
  }
}