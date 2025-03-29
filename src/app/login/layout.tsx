import Header from "@/components/Header";

// Adding Header component to login page

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