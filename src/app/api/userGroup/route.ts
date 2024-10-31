import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const result = await prisma.userGroup.findMany();
    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Erro ao buscar grupos de usuários' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();

    if (!data.name) {
      return NextResponse.json({ message: 'Nome do grupo é obrigatório' }, { status: 400 });
    }

    const newData = await prisma.userGroup.create({
      data: {
        name: data.name,
        isAdmin: data.isAdmin,
      },
    });

    return NextResponse.json(newData, { status: 201 });
  } catch (error) {
    console.error('Erro ao criar grupo de usuário:', error);
    return NextResponse.json({ message: 'Erro ao salvar os dados' }, { status: 500 });
  }
}