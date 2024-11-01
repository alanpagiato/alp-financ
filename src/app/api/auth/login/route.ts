import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../../../../lib/prisma';

interface LoginResponse {
  message: string;
  token?: string;
  user?: {
    id: string;
    username: string;
    groupId: number;
    groupName?: string;
    isAdmin?: boolean
  };
}

// Exporta uma função POST como named export
export async function POST(req: Request) {
  const { username, password } = await req.json();

  if (!username || !password) {
    return NextResponse.json({ message: 'E-mail e senha são obrigatórios' }, { status: 400 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { username },
      include: { group: true }
    });

    if (!user) {
      return NextResponse.json({ message: 'Usuário não encontrado' }, { status: 404 });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return NextResponse.json({ message: 'Senha incorreta' }, { status: 401 });
    }
    
    const token = jwt.sign(
      { 
        id: user.id, 
        username: user.username,
        groupId: user.group?.id,
        groupName: user.group?.name,
        isAdmin: user.group?.isAdmin,
      },
      process.env.JWT_SECRET as string,
      { expiresIn: '12h' }
    );
    
    const response =  NextResponse.json({
      message: 'Login realizado com sucesso',
    });

    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 12, // 12 horas em segundos
    });

    return response;

  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Erro no servidor' }, { status: 500 });
  }
}
