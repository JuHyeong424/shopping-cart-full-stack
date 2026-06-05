export interface ShoppingCartItem {
  product: {
    id: string;
    image: string;
    name: string;
    price: number;
  };
  quantity: number;
}
