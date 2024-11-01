import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcrypt';

export async function PUT(req: Request) {
    try {
        const { username, senhaAnterior, novaSenha } = await req.json();

        if (!username || !senhaAnterior || !novaSenha) {
            return NextResponse.json({ message: 'Todos os campos são obrigatórios' }, { status: 400 });
        }

        const user = await prisma.user.findUnique({
            where: { username }
        });

        if (!user) {
            return NextResponse.json({ message: 'Usuário não encontrado' }, { status: 404 });
        }

        const isPasswordValid = await bcrypt.compare(senhaAnterior, user.password);
        if (!isPasswordValid) {
            return NextResponse.json({ message: 'Senha anterior incorreta' }, { status: 401 });
        }

        const hashedNewPassword = await bcrypt.hash(novaSenha, 10);

        await prisma.user.update({
            where: { username },
            data: { password: hashedNewPassword },
        });

        return NextResponse.json({ message: 'Senha alterada com sucesso' }, { status: 200 });

    } catch (error) {
        console.error('Erro ao alterar a senha:', error);
        return NextResponse.json({ message: 'Erro ao alterar a senha' }, { status: 500 });
        
    }
}