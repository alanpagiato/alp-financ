import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const { id } = params;

  try {
    const data = await prisma.accountSubPlan.findMany({
      where: { accountPlanId: Number(id) },
    });

    if (!data) {
      return NextResponse.json({ error: 'Sub Planos de Conta não encontrados' }, { status: 404 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Erro ao carregar os dados dos sub plano de contas' }, { status: 500 });
  }
}