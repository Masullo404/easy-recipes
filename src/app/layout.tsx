'use client';
import { usePathname } from 'next/navigation';
import MainNav from "@/components/layout/nav/nav";
import MainFooter from "@/components/layout/footer";
import 'bootstrap/dist/css/bootstrap.css';
import { SessionProvider } from 'next-auth/react';


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const noLayoutPaths = ['/forms/login', '/forms/register'];

  const shouldHideLayout = noLayoutPaths.includes(pathname);

  return (
    <SessionProvider >
    <html lang="en">
      <body>
        {!shouldHideLayout && <MainNav />}
        <main>{children}</main>
        {!shouldHideLayout && <MainFooter />}
      </body>
    </html>
    </SessionProvider>
  );
}
