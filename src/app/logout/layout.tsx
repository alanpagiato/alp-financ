import "../globals.css";

export const metadata = {
  title: 'ALP Software - Sistema Financeiro V1.0',
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <body>
          <main>
             {children}
          </main>
       </body>
    </html>
  );
}
