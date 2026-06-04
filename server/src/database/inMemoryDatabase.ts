import { CartRepository } from "./CartRepository.ts";
import { ProductRepository } from "./ProductRepository.ts";
import Product from "../domain/Product.ts";
import ShoppingCart from "../domain/ShoppingCart.ts";

export const productRepository = new ProductRepository();
export const cartRepository = new CartRepository();

const initialProducts = [
  {
    id: "1",
    name: "나이키 에어맥스",
    price: 139000,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80",
  },
  {
    id: "2",
    name: "나이키 에어 조던 1",
    price: 199000,
    image:
      "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=400&q=80",
  },
];

function seed() {
  initialProducts.forEach(({ id, name, price, image }) => {
    productRepository.save(id, new Product(id, { name, price, image }));
  });

  cartRepository.save(new ShoppingCart("1", 2));
}

seed();
