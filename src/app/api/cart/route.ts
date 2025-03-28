import { addProductToCart, emptyCart } from '@/hooks/ssr_hooks';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(request: NextRequest) {
  try {
    const { sessionId, productId, quantity } = await request.json();
    
    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID is required' },
        { status: 400 }
      );
    }
    
    if (!productId || isNaN(Number(productId))) {
      return NextResponse.json(
        { error: 'Valid product ID is required' },
        { status: 400 }
      );
    }
    
    const quantityToAdd = quantity && !isNaN(Number(quantity)) ? Number(quantity) : 1;
    
    await addProductToCart(sessionId, Number(productId), quantityToAdd);
    
    return NextResponse.json(
      { success: true, message: 'Product added to cart successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error adding product to cart:', error);
    return NextResponse.json(
      { error: 'Failed to add product to cart' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { sessionId } = await request.json();
    
    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID is required' },
        { status: 400 }
      );
    }

    await emptyCart(sessionId);
    
    return NextResponse.json(
      { success: true, message: 'Cart cleared successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error clearing cart:', error);
    return NextResponse.json(
      { error: 'Failed to clear cart' },
      { status: 500 }
    );
  }
}
  

