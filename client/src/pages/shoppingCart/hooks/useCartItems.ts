import { useState, useEffect } from "react";
import { BASE_URL } from "../constants/constant";
import type { ShoppingCartItem } from "../types";

export function useCartItems() {
  const [shoppingCartItems, setShoppingCartItems] = useState<
    ShoppingCartItem[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${BASE_URL}/carts`);
        if (!response.ok) throw new Error("상품을 불러오지 못했습니다.");
        const data: ShoppingCartItem[] = await response.json();
        setShoppingCartItems(data);
      } catch (error) {
        console.error(error);
        setError("상품 불러오기를 실패하였습니다. 다시 시도해주세요.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const changeQuantity = async (
    item: ShoppingCartItem,
    nextQuantity: number
  ) => {
    const prevQuantity = item.quantity;

    setShoppingCartItems((prev) => {
      return prev.map((cartItem) => {
        return cartItem.product.id === item.product.id
          ? { ...cartItem, quantity: nextQuantity }
          : cartItem;
      });
    });

    try {
      const response = await fetch(`${BASE_URL}/carts/${item.product.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          quantity: nextQuantity,
        }),
      });

      if (!response.ok) {
        throw new Error("해당 상품의 수량을 변경하지 못했습니다.");
      }
    } catch (error) {
      console.error("에러 발생", error);
      setError(
        nextQuantity < prevQuantity
          ? "상품 수량은 1 이상 가능합니다. 다시 시도해주세요."
          : "상품 수량은 99 이하 가능합니다. 다시 시도해주세요."
      );
      setShoppingCartItems((prev) => {
        return prev.map((cartItem) => {
          return cartItem.product.id === item.product.id
            ? { ...cartItem, quantity: prevQuantity }
            : cartItem;
        });
      });
    }
  };

  const handleDeleteItem = async (value: ShoppingCartItem) => {
    const prevItems = shoppingCartItems;

    setShoppingCartItems((prev) => {
      return prev.filter((item) => item.product.id !== value.product.id);
    });

    try {
      const response = await fetch(`${BASE_URL}/carts/${value.product.id}`, {
        method: "DELETE",
      });

      if (!response.ok)
        throw new Error("장바구니 상품 삭제 중 오류가 발생했습니다.");

      return true;
    } catch (error) {
      console.error("에러 발생", error);
      setError("상품 삭제에 실패하였습니다. 다시 시도해주세요.");
      setShoppingCartItems(prevItems);
    }
  };

  return {
    shoppingCartItems,
    setShoppingCartItems,
    isLoading,
    setIsLoading,
    error,
    setError,
    changeQuantity,
    handleDeleteItem,
  };
}
