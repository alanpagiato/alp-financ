import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { formatUtcToString, formatStringToUtc } from '@/lib/dateConvert';

export async function GET() {
    try {
      const result = await prisma.accountMovement.findMany();
      
      const formattedResult = result.map((item) => ({
        ...item,
        date: item.date ? formatUtcToString(item.date) : null,
      }));

      return NextResponse.json(result);
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: 'Erro ao buscar movimentos' }, { status: 500 });
    }
}

export async function POST(req: Request) {
try {
    const data = await req.json();

    if (!data.date) {
    return NextResponse.json({ message: 'Data do movimento é obrigatória' }, { status: 400 });
    }
    const dateUtc = formatStringToUtc(data.date);
    
    const newData = await prisma.accountMovement.create({
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

    return NextResponse.json(newData, { status: 201 });
} catch (error) {
    console.error('Erro ao criar movimento:', error);
    return NextResponse.json({ message: 'Erro ao salvar os dados' }, { status: 500 });
}
}