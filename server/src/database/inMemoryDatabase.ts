import { CartRepository } from "./CartRepository.ts";
import { ProductRepository } from "./ProductRepository.ts";
import Product from "../domain/Product.ts";
import ShoppingCart from "../domain/ShoppingCart.ts";

export const productRepository = new ProductRepository();
export const cartRepository = new CartRepository();

const initialProducts = [
  {
    name: "나이키 에어맥스",
    price: 50000,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80",
  },
  {
    name: "나이키 에어 조던 1",
    price: 199000,
    image:
      "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=400&q=80",
  },
];

function seed() {
  initialProducts.forEach(({ name, price, image }) => {
    const id = crypto.randomUUID();
    productRepository.save(id, new Product(id, { name, price, image }));
    cartRepository.save(new ShoppingCart(id, 1));
  });
}

seed();
