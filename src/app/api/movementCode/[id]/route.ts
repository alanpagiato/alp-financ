import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const { id } = params;

  try {
    const data = await prisma.movementCode.findUnique({
      where: { id: Number(id) },
    });

    if (!data) {
      return NextResponse.json({ error: 'Código de lançamento não encontrado' }, { status: 404 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Erro ao carregar os dados do código de lançamento' }, { status: 500 });
  }
}

export async function PUT(req: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const { id } = params;

  try {
    const data = await req.json();

    if (!data.description) {
      return NextResponse.json({ message: 'Descrição do código de lançamento é obrigatória' }, { status: 400 });
    }

    if (!data.nature) {
      return NextResponse.json({ message: 'Natureza do código de lançamento é obrigatória' }, { status: 400 });
    }

    const updatedData = await prisma.movementCode.update({
      where: { id: Number(id) },
      data: {
        description: data.description,
        nature: data.nature,
      },
    });

    return NextResponse.json(updatedData);
  } catch (error) {
    console.error('Erro ao atualizar código de lançamento.', error);
    return NextResponse.json({ message: 'Erro ao atualizar os dados' }, { status: 500 });
  }
}

export async function DELETE(request: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const { id } = params;

  try {
    const deletedData = await prisma.movementCode.delete({
      where: {
        id: Number(id),
      },
    });

    if (!deletedData) {
      return NextResponse.json({ message: 'Código de lançamento não encontrado.' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Código de lançamento excluído com sucesso!' });
  } catch (error) {
    return NextResponse.json({ message: 'Erro ao excluir o código de lançamento.' }, { status: 500 });
  }
}
