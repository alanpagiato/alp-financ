import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const { id } = params;

  try {
    const data = await prisma.user.findUnique({
      where: { id: id },
    });

    if (!data) {
      return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 404 });
    }
    
    const { password, ...userWithoutPassword } = data;
    return NextResponse.json(userWithoutPassword);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Erro ao carregar os dados do usuário' }, { status: 500 });
  }
}

export async function PUT(req: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const { id } = params;

  try {
    const data = await req.json();

    if (!data.username) {
      return NextResponse.json({ message: 'Username é obrigatório' }, { status: 400 });
    }

    data.userGroupId = Number(data.userGroupId);

    const updatedData = await prisma.user.update({
      where: { id: id },
      data: {
        username: data.username,
        userGroupId: data.userGroupId,
      },
    });

    const { password, ...userWithoutPassword } = updatedData;
    return NextResponse.json(userWithoutPassword);
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    return NextResponse.json({ message: 'Erro ao atualizar os dados' }, { status: 500 });
  }
}

export async function DELETE(request: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const { id } = params;

  try {
    const deletedData = await prisma.user.delete({
      where: {
        id: id,
      },
    });

    if (!deletedData) {
      return NextResponse.json({ message: 'Usuário não encontrado.' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Usuário excluído com sucesso!' });
  } catch (error) {
    return NextResponse.json({ message: 'Erro ao excluir o usuário.' }, { status: 500 });
  }
}
