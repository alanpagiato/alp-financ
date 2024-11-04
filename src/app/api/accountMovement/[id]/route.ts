import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { formatUtcToString, formatStringToUtc } from '@/lib/dateConvert';

export async function GET(req: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const { id } = params;

  try {
    const data = await prisma.accountMovement.findUnique({
      where: { id: Number(id) },
    });

    if (!data) {
      return NextResponse.json({ error: 'Movimento bancário não encontrado' }, { status: 404 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Erro ao carregar os dados do movimento bancário' }, { status: 500 });
  }
}

export async function PUT(req: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const { id } = params;

  try {
    const data = await req.json();

    if (!data.dateMovement) {
        return NextResponse.json({ message: 'Data do movimento é obrigatória' }, { status: 400 });
    }
    
    const updatedData = await prisma.accountMovement.update({
      where: { id: Number(id) },
      data: {
        dateMovement: data.dateMovement,
        documentNumber: data.documentNumber,
        valueMovement: data.valueMovement,
        finished: data.finished,
        observations: data.observations,
        bankAccountId: data.bankAccountId,
        movementCodeId: data.movementCodeId,
        entityId: data.entityId,
      },
    });

    return NextResponse.json(updatedData);
  } catch (error) {
    console.error('Erro ao atualizar movimento bancário.', error);
    return NextResponse.json({ message: 'Erro ao atualizar os dados' }, { status: 500 });
  }
}

export async function DELETE(request: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const { id } = params;

  try {
    const deletedData = await prisma.accountMovement.delete({
      where: {
        id: Number(id),
      },
    });

    if (!deletedData) {
      return NextResponse.json({ message: 'Movimento bancário não encontrado.' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Movimento bancário excluído com sucesso!' });
  } catch (error) {
    return NextResponse.json({ message: 'Erro ao excluir o movimento bancário' }, { status: 500 });
  }
}
