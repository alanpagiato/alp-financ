import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const result = await prisma.bankAccount.findMany();
    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Erro ao buscar contas bancárias' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();

    if (!data.name) {
      return NextResponse.json({ message: 'Nome é obrigatório' }, { status: 400 });
    }

    data.numberBank = Number(data.numberBank);
    
    const novaConta = await prisma.bankAccount.create({
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

    return NextResponse.json(novaConta, { status: 201 });
  } catch (error) {
    console.error('Erro ao criar conta bancária:', error);
    return NextResponse.json({ message: 'Erro ao salvar os dados' }, { status: 500 });
  }
}