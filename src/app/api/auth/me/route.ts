import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function GET(req: NextRequest) {
  const token = req.cookies.get('token')?.value;

  if (!token) {
    return NextResponse.json({ message: 'Não autenticado' }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    return NextResponse.json(decoded);
  } catch (error) {
    return NextResponse.json({ message: 'Token inválido ou expirado' }, { status: 401 });
  }
}