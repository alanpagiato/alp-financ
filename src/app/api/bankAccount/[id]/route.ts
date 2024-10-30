import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const { id } = params;

  try {
    const conta = await prisma.bankAccount.findUnique({
      where: { id: Number(id) }, // O ID deve ser convertido para um número se ele for um número
    });

    if (!conta) {
      return NextResponse.json({ error: 'Conta não encontrada' }, { status: 404 });
    }

    return NextResponse.json(conta);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Erro ao carregar os dados da conta' }, { status: 500 });
  }
}

export async function PUT(req: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const { id } = params;

  try {
    const data = await req.json();

    if (!data.name) {
      return NextResponse.json({ message: 'Nome é obrigatório' }, { status: 400 });
    }

    data.numberBank = Number(data.numberBank);

    const updatedAccount = await prisma.bankAccount.update({
      where: { id: Number(id) },
      data: {
        name: data.name,
      agency: data.agency,
      agencyDigit: data.agencyDigit,
      numberBank: data.numberBank,
      numberAccount: data.numberAccount,
      numberAccountDigit: data.numberAccountDigit,
      addressType: data.addressType,
      address: data.address,
      addressNumber: data.addressNumber,
      addressComplement: data.addressComplement,
      neighborhood: data.neighborhood,
      city: data.city,
      uf: data.uf,
      cep: data.cep,
      phones: data.phones,
      contactPerson: data.contactPerson,
      },
    });

    return NextResponse.json(updatedAccount);
  } catch (error) {
    console.error('Erro ao atualizar conta bancária:', error);
    return NextResponse.json({ message: 'Erro ao atualizar os dados' }, { status: 500 });
  }
}

export async function DELETE(request: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const { id } = params;

  try {
    const deletedAccount = await prisma.bankAccount.delete({
      where: {
        id: Number(id),
      },
    });

    if (!deletedAccount) {
      return NextResponse.json({ message: 'Conta bancária não encontrada.' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Conta bancária excluída com sucesso!' });
  } catch (error) {
    return NextResponse.json({ message: 'Erro ao excluir a conta bancária.' }, { status: 500 });
  }
}
