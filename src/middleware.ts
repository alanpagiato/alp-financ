import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

export function middleware(request: NextRequest) {
  console.log("Middleware executado na URL:", request.url)

  const token = request.cookies.get('token')?.value;

  if (!token) return NextResponse.redirect(new URL('/login', request.url));
  
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  
  return jwtVerify(token, secret)
    .then(({ payload }) => {
      const requestedPath = new URL(request.url).pathname;
      // Define rotas restritas para administradores
      const adminOnlyRoutes = ['/user', '/userGroup', '/api/user', '/api/userGroup'];
      const isAdminRoute = adminOnlyRoutes.some((route) => 
        requestedPath.startsWith(route) && requestedPath !== '/user/change-password'
      );

      if (isAdminRoute && !payload.isAdmin) {
        return NextResponse.redirect(new URL('/not-authorized', request.url));
      }

      return NextResponse.next();
    })
    .catch(() => NextResponse.redirect(new URL('/login', request.url))); // Redireciona em caso de erro no token
}

// Configuração do middleware para proteger as rotas específicas
export const config = {
  matcher: [
    '/((?!login|api/auth/login|api/auth/me|_next/static|_next/image|favicon.ico).*)',
  ],
};
