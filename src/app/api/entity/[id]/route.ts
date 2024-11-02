import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const { id } = params;

  try {
    const data = await prisma.entity.findUnique({
      where: { id: Number(id) },
    });

    if (!data) {
      return NextResponse.json({ error: 'Entidade não encontrada' }, { status: 404 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Erro ao carregar os dados da entidade' }, { status: 500 });
  }
}

export async function PUT(req: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const { id } = params;

  try {
    const data = await req.json();

    if (!data.name) {
      return NextResponse.json({ message: 'Nome da entidade é obrigatório' }, { status: 400 });
    }

    const updatedData = await prisma.entity.update({
      where: { id: Number(id) },
      data: {
        name: data.name,
      },
    });

    return NextResponse.json(updatedData);
  } catch (error) {
    console.error('Erro ao atualizar entidade.', error);
    return NextResponse.json({ message: 'Erro ao atualizar os dados' }, { status: 500 });
  }
}

export async function DELETE(request: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const { id } = params;

  try {
    const deletedData = await prisma.entity.delete({
      where: {
        id: Number(id),
      },
    });

    if (!deletedData) {
      return NextResponse.json({ message: 'Entidade não encontrada.' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Entidade excluída com sucesso!' });
  } catch (error) {
    return NextResponse.json({ message: 'Erro ao excluir a entidade.' }, { status: 500 });
  }
}
