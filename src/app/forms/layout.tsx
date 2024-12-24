export default function LoginLayout({ children }: Readonly<{
    children: React.ReactNode;
  }>) {
    return <main style={{height:"100vh",backgroundColor:"orange"}}>{children}</main>; 
  }