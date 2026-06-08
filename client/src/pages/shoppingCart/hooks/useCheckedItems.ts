import { useState, useEffect, useMemo } from "react";
import { STORAGE_KEY } from "../constants/constant";
import type { ShoppingCartItem } from "../types";

export function useCheckedItems(shoppingCartItems: ShoppingCartItem[]) {
  const [customCheckedIds, setCustomCheckedIds] = useState<Set<string> | null>(
    () => {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? new Set(JSON.parse(saved)) : null;
    },
  );

  const validCheckedIdsSet = useMemo(() => {
    const currentItemIds = new Set(
      shoppingCartItems.map((item) => item.product.id),
    );

    if (customCheckedIds === null) {
      return currentItemIds;
    }

    return new Set(
      [...customCheckedIds].filter((id) => currentItemIds.has(id)),
    );
  }, [customCheckedIds, shoppingCartItems]);

  useEffect(() => {
    if (shoppingCartItems.length === 0 && customCheckedIds === null) return;

    localStorage.setItem(STORAGE_KEY, JSON.stringify([...validCheckedIdsSet]));
  }, [validCheckedIdsSet, shoppingCartItems.length, customCheckedIds]);

  const handleItemChoice = (value: ShoppingCartItem) => {
    const updatedSet = new Set(validCheckedIdsSet);
    if (updatedSet.has(value.product.id)) {
      updatedSet.delete(value.product.id);
    } else {
      updatedSet.add(value.product.id);
    }
    setCustomCheckedIds(updatedSet);
  };

  const handleAllCheckedById = (checked: boolean) => {
    if (checked) {
      setCustomCheckedIds(
        new Set(shoppingCartItems.map((item) => item.product.id)),
      );
    } else {
      setCustomCheckedIds(new Set());
    }
  };

  const removeChecked = (id: string) => {
    const updatedSet = new Set(validCheckedIdsSet);
    updatedSet.delete(id);
    setCustomCheckedIds(updatedSet);
  };

  return {
    checkedIdsSet: validCheckedIdsSet,
    handleItemChoice,
    handleAllCheckedById,
    removeChecked,
  };
}
