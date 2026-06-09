import { DELIVERY_FEE } from "../constants/constant";
import { type ShoppingCartItem } from "../types";

const getOrderAmount = (selected: ShoppingCartItem[]) =>
  selected.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

const getDeliveryFee = (
  orderAmount: number,
  items: ShoppingCartItem[],
  checkedIds: Set<string>,
) =>
  orderAmount < 100000 && items.length !== 0 && checkedIds.size !== 0
    ? DELIVERY_FEE
    : 0;

const getTotalPayment = (orderAmount: number, checkDeliveryFee: number) =>
  orderAmount + checkDeliveryFee;

const getTotalProductsTypeCount = (checkedIds: Set<string>) => checkedIds.size;

const getTotalProductsQuantity = (selected: ShoppingCartItem[]) =>
  selected.reduce((sum, item) => sum + item.quantity, 0);

export function calculateOrderSummary(
  items: ShoppingCartItem[],
  checkedIds: Set<string>,
) {
  const selected = items.filter((item) => checkedIds.has(item.product.id));
  const orderAmount = getOrderAmount(selected);
  const deliveryFee = getDeliveryFee(orderAmount, items, checkedIds);
  const totalProductsQuantity = getTotalProductsQuantity(selected);

  return {
    orderAmount,
    deliveryFee,
    totalPayment: getTotalPayment(orderAmount, deliveryFee),
    totalProductsTypeCount: getTotalProductsTypeCount(checkedIds),
    totalProductsQuantity,
  };
}
