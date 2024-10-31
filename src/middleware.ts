import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtDecode } from 'jwt-decode';

export function middleware(request: NextRequest) {
  console.log("Middleware executado na URL:", request.url);
  const token = request.cookies.get('token')?.value;
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    // Verifica se o token é válido ?
    jwtDecode(token);
    return NextResponse.next(); // Permite o acesso se o token é válido
  } catch (error) {
    // Token inválido ou expirado
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

// Configuração do middleware para proteger as rotas específicas
export const config = {
  matcher: 
  [
    '/((?!login|api/auth/login|_next/static|_next/image|favicon.ico).*)',
    
  ],
};
