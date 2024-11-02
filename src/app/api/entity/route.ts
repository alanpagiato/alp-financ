import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const result = await prisma.entity.findMany();
    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Erro ao buscar entidades' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();

    if (!data.name) {
      return NextResponse.json({ message: 'Nome da entidade é obrigatório' }, { status: 400 });
    }

    const newData = await prisma.entity.create({
      data: {
        name: data.name,
      },
    });

    return NextResponse.json(newData, { status: 201 });
  } catch (error) {
    console.error('Erro ao criar entidade:', error);
    return NextResponse.json({ message: 'Erro ao salvar os dados' }, { status: 500 });
  }
}