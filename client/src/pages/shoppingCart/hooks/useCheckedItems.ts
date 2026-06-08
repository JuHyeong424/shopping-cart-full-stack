import { useState, useEffect, useRef } from "react";
import { STORAGE_KEY } from "../constants/constant";
import type { ShoppingCartItem } from "../types";

export function useCheckedItems(shoppingCartItems: ShoppingCartItem[]) {
  const isInitializedRef = useRef(false);

  const [checkedIdsSet, setCheckedIdsSet] = useState<Set<string>>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });

  useEffect(() => {
    const initialize = () => {
      if (isInitializedRef.current) return;
      if (shoppingCartItems.length === 0) return;

      if (localStorage.getItem(STORAGE_KEY) === null) {
        setCheckedIdsSet(
          new Set(shoppingCartItems.map((item) => item.product.id)),
        );
      }
      isInitializedRef.current = true;
    };
    initialize();
  }, [shoppingCartItems, isInitializedRef]);

  useEffect(() => {
    if (!isInitializedRef.current) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...checkedIdsSet]));
  }, [checkedIdsSet, isInitializedRef]);

  const updateSet = (set: Set<string>, id: string) => {
    const updatedSet = new Set(set);

    if (updatedSet.has(id)) {
      updatedSet.delete(id);
    } else {
      updatedSet.add(id);
    }

    return updatedSet;
  };

  const handleItemChoice = (value: ShoppingCartItem) => {
    setCheckedIdsSet((prev) => updateSet(prev, value.product.id));
  };

  const handleAllCheckedById = (checked: boolean) => {
    if (checked) {
      const allChecked = new Set(
        shoppingCartItems.map((item) => item.product.id),
      );
      setCheckedIdsSet(allChecked);
    } else {
      setCheckedIdsSet(new Set());
    }
  };

  const removeChecked = (id: string) => {
    setCheckedIdsSet((prev) => {
      const updatedCheckedId = new Set(prev);
      updatedCheckedId.delete(id);
      return updatedCheckedId;
    });
  };

  return {
    checkedIdsSet,
    setCheckedIdsSet,
    handleItemChoice,
    handleAllCheckedById,
    removeChecked,
  };
}
