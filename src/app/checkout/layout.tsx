import Header from "@/components/Header";

// Layout for /checkout routes

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