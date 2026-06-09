import { http, HttpResponse } from "msw";

export const BASE_URL = "http://localhost:3000";

export interface MockCartItem {
  product: {
    id: string;
    image: string;
    name: string;
    price: number;
  };
  quantity: number;
}

export const mockCarts: MockCartItem[] = [
  {
    product: { id: "1", image: "/a.png", name: "테스트 상품 A", price: 10000 },
    quantity: 1,
  },
  {
    product: { id: "2", image: "/b.png", name: "테스트 상품 B", price: 20000 },
    quantity: 2,
  },
];

export const handlers = [
  http.get(`${BASE_URL}/carts`, () => HttpResponse.json(mockCarts)),
  http.patch(`${BASE_URL}/carts/:id`, () => new HttpResponse(null, { status: 200 })),
  http.delete(`${BASE_URL}/carts/:id`, () => new HttpResponse(null, { status: 200 })),
];
