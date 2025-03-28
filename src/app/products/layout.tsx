import { SidebarProvider } from "@/context/SidebarContext";
import Header from "@/components/Header";
import CartSidebarWrapper from "@/components/CartSidebarWrapper";

export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <SidebarProvider>
            <Header />
            <CartSidebarWrapper />
            {children}
        </SidebarProvider>
    );
  }