import Header from "@/components/Header";
import { SidebarProvider } from "@/context/SidebarContext";
import CartSidebarWrapper from "@/components/CartSidebarWrapper";

export default function Home() {
  return (
    <SidebarProvider>
      <Header />
      <CartSidebarWrapper />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Welcome to Sebastian&apos;s Shop</h1>
      </div>
    </SidebarProvider>
  );
}
