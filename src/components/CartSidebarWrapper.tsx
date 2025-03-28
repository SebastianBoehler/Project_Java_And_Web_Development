import { getCartItems } from "@/hooks/ssr_hooks";
import CartSidebar from "./CartSidebar";
import { cookies } from 'next/headers'

export default async function CartSidebarWrapper() {
  // Fetch cart items using SSR hook
  const cookieStore = await cookies();
  const sessionId = cookieStore.get('session-id')?.value || '';
  
  const cartItems = await getCartItems(sessionId);
  
  return <CartSidebar cartItems={cartItems} sessionId={sessionId} />;
}
