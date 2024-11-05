import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const { id } = params;

  try {
    const data = await prisma.accountMovementSplit.findMany({
      where: { accountMovementId: Number(id) },
      include: {
        entity: true,
        accountSubPlan: true,
      },
    });

    if (!data) {
      return NextResponse.json({ error: 'Divisões de movimento bancário não encontradas' }, { status: 404 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Erro ao carregar os dados das divisões de movimento bancário' }, { status: 500 });
  }
}