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

    const responseData = {
        ...data,
        date: data.date ? formatUtcToString(data.date) : null,
      };

    return NextResponse.json(responseData);
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

    if (!data.date) {
        return NextResponse.json({ message: 'Data do movimento é obrigatória' }, { status: 400 });
    }
    const dateUtc = formatStringToUtc(data.date);

    const updatedData = await prisma.accountMovement.update({
      where: { id: Number(id) },
      data: {
        date: dateUtc,
        documentNumber: data.documentNumber,
        value: data.value,
        finished: data.finished,
        observations: data.observations,
        bankAccountId: data.bankAccountId,
        movementCodeId: data.movementCodeId,
        entityCode: data.entityCode,
        accountId: data.accountId,
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
