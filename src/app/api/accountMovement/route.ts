import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { formatUtcToString, formatStringToUtc } from '@/lib/dateConvert';

export async function GET() {
    try {
      const result = await prisma.accountMovement.findMany();
      
      return NextResponse.json(result);
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: 'Erro ao buscar movimentos' }, { status: 500 });
    }
}

export async function POST(req: Request) {
try {
    const data = await req.json();
  
    if (!data.dateMovement) {
      return NextResponse.json({ message: 'Data do movimento é obrigatória' }, { status: 400 });
    }
    
    const updatedData = await prisma.accountMovement.create({
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

    return NextResponse.json(updatedData, { status: 201 });
} catch (error) {
    console.error('Erro ao criar movimento:', error);
    return NextResponse.json({ message: 'Erro ao salvar os dados' }, { status: 500 });
}
}