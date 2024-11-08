import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Define o tipo dos dados que serão inseridos
type AccountMovementSplitInput = {
    accountMovementId: number;
    entityId: number;
    accountSubPlanId: number;
    valueSplit: number;
};

export async function POST(req: Request) {
    try {
        const data = await req.json();

        if (!Array.isArray(data)) {
            return NextResponse.json({ message: 'Os dados enviados precisam ser um array.' }, { status: 400 });
        }

        const registrosFiltrados: AccountMovementSplitInput[] = data.map((registro: any) => {
            const { accountMovementId, entityId, accountSubPlanId, valueSplit } = registro;
            return { accountMovementId, entityId, accountSubPlanId, valueSplit };
        });

        const resultado = await prisma.accountMovementSplit.createMany({
            data: registrosFiltrados,
        });

        return NextResponse.json({ message: `${resultado.count} registros inseridos com sucesso!` }, { status: 201 });
    } catch (error) {
        console.error('Erro ao criar divisões de movimentos bancários:', error);
        return NextResponse.json({ message: 'Erro ao salvar os dados' }, { status: 500 });
    }
}
