import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ message: 'Logout realizado com sucesso' });
  response.cookies.set('token', '', { maxAge: -1, path: '/' }); // Remove o cookie
  return response;
}