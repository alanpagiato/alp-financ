import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcrypt';

export async function GET() {
  try {
    const data = await prisma.user.findMany();
    
    const usersWithoutPassword = data.map(({ password, ...user }) => user);

    return NextResponse.json(usersWithoutPassword);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Erro ao buscar usuários' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();

    if (!data.username) {
      return NextResponse.json({ message: 'Username é obrigatório' }, { status: 400 });
    }

    data.userGroupId= Number(data.userGroupId);
    
    const hashedPassword = await bcrypt.hash(data.username, 10);
    
    const newData = await prisma.user.create({
      data: {
        username: data.username,
        password: hashedPassword,
        userGroupId: data.userGroupId,
      },
    });
    
    const { password, ...userWithoutPassword } = newData;
    return NextResponse.json(userWithoutPassword, { status: 201 });
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    return NextResponse.json({ message: 'Erro ao salvar os dados' }, { status: 500 });
  }
}