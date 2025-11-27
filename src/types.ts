export interface Product {
  id: string;
  name: string;
  flavor: 'Salted Egg' | 'Tomato' | 'Cheese';
  price: number;
  description: string;
  longDescription: string;
  imageColor: string;
  accentColor: string;
  badge: string;
  images: string[];
}

export interface CartItem extends Product {
  quantity: number;
}

export type CartContextType = {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, delta: number) => void;
  cartTotal: number;
  cartCount: number;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
};