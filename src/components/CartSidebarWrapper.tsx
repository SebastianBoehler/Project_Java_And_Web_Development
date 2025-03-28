import { getCartItems } from "@/hooks/ssr_hooks";
import CartSidebar from "./CartSidebar";

export default async function CartSidebarWrapper() {
  // Fetch cart items using SSR hook
  const cartItems = await getCartItems();
  
  return <CartSidebar cartItems={cartItems} />;
}
