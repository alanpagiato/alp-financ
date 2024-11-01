import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const { id } = params;

  try {
    const data = await prisma.accountSubPlan.findUnique({
      where: { id: Number(id) },
    });

    if (!data) {
      return NextResponse.json({ error: 'Sub Plano de Contas não encontrado' }, { status: 404 });
    }
    
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Erro ao carregar os sub plano de contas' }, { status: 500 });
  }
}

export async function PUT(req: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const { id } = params;

  try {
    const data = await req.json();

    if (!data.description) {
      return NextResponse.json({ message: 'Descrição é obrigatória' }, { status: 400 });
    }

    if (!data.accountPlanId) {
      return NextResponse.json({ message: 'Plano deve ser escolhido' }, { status: 400 });
    }

    data.accountPlanId = Number(data.accountPlanId);

    const updatedData = await prisma.accountSubPlan.update({
      where: { id: Number(id) },
      data: {
        description: data.description,
        accountPlanId: data.accountPlanId,
      },
    });

    return NextResponse.json(updatedData);
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    return NextResponse.json({ message: 'Erro ao atualizar os dados' }, { status: 500 });
  }
}

export async function DELETE(request: Request, props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const { id } = params;
  
    try {
      const deletedData = await prisma.accountSubPlan.delete({
        where: {
          id: Number(id),
        },
      });
  
      if (!deletedData) {
        return NextResponse.json({ message: 'Sub Plano de contas não encontrado.' }, { status: 404 });
      }
  
      return NextResponse.json({ message: 'Sub Plano de contas excluído com sucesso!' });
    } catch (error) {
      return NextResponse.json({ message: 'Erro ao excluir o sub plano de contas' }, { status: 500 });
    }
  }