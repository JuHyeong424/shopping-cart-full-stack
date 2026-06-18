import { useState, useEffect } from "react";
import { BASE_URL } from "../constants/constant";
import type { CalculationItem, OrderCalculation } from "../types";

/**
 * 선택한 쿠폰/지역을 서버로 보내 최종 금액을 계산받는다.
 * 금액 계산은 전적으로 서버가 담당하며, 쿠폰/지역이 바뀔 때마다 다시 요청한다.
 */
export function useOrderCalculation(
  items: CalculationItem[],
  couponIds: number[],
  isRemoteArea: boolean,
) {
  const [calculation, setCalculation] = useState<OrderCalculation | null>(null);
  const [error, setError] = useState("");

  const itemsKey = JSON.stringify(items);
  const couponKey = couponIds.join(",");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/coupons/calculation`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ items, couponIds, isRemoteArea }),
        });
        if (!response.ok) throw new Error("결제 금액 계산에 실패했습니다.");
        const data: OrderCalculation = await response.json();
        setCalculation(data);
        setError("");
      } catch (error) {
        console.error(error);
        setError("결제 금액을 계산하지 못했습니다. 다시 시도해주세요.");
      }
    };
    fetchData();
  }, [itemsKey, couponKey, isRemoteArea]);

  return { calculation, error };
}
