import Header from "@/components/Header";

// Layout for /login routes
// As page.tsx is client side, moved here to have header ssr

export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <>
            <Header />
            {children}
        </>
    );
  }