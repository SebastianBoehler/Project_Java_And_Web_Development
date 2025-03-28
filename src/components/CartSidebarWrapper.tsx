import { headers } from 'next/headers';
import { getCartItems } from "@/hooks/ssr_hooks";
import CartSidebar from "./CartSidebar";

export default async function CartSidebarWrapper() {
  // Fetch cart items using SSR hook
  const headersList = await headers();
  const cookieHeader = headersList.get('cookie');
  const cookies = cookieHeader?.split(';')
  const sessionId = cookies?.find(cookie => cookie.includes('session-id='))?.split('=')[1] || '';
  
  const cartItems = await getCartItems(sessionId);
  
  return <CartSidebar cartItems={cartItems} sessionId={sessionId} />;
}
