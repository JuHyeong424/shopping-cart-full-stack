import styled from "@emotion/styled";
import { UN_CHECKED, CHECKED } from "../constants/constant";
import type { ShoppingCartItem } from "../types";
import CartItem from "./CartItem";

interface Props {
  shoppingCartItems: ShoppingCartItem[];
  checkedIdsSet: Set<string>;
  handleAllCheckedById: (checked: boolean) => void;
  handleItemChoice: (value: ShoppingCartItem) => void;
  onDelete: (value: ShoppingCartItem) => void;
  handleMinusQuantity: (value: ShoppingCartItem) => void;
  handlePlusQuantity: (value: ShoppingCartItem) => void;
}

export default function CartItemsList({
  shoppingCartItems,
  checkedIdsSet,
  handleAllCheckedById,
  handleItemChoice,
  onDelete,
  handleMinusQuantity,
  handlePlusQuantity,
}: Props) {
  return (
    <SelectedAllItems>
      <SelectAllLabel>
        <input
          checked={
            checkedIdsSet.size === shoppingCartItems.length &&
            shoppingCartItems.length !== 0
          }
          onChange={(e) => handleAllCheckedById(e.target.checked)}
          type="checkbox"
          aria-label="전체 상품 선택"
        />
        <span>전체선택</span>
      </SelectAllLabel>

      {shoppingCartItems.map((value) => (
        <CartItem
          key={value.product.id}
          checkedIdsSet={checkedIdsSet}
          handleItemChoice={handleItemChoice}
          onDelete={onDelete}
          handleMinusQuantity={handleMinusQuantity}
          handlePlusQuantity={handlePlusQuantity}
          value={value}
        />
      ))}
    </SelectedAllItems>
  );
}

const SelectedAllItems = styled.div`
  margin-bottom: 52px;
`;

const SelectAllLabel = styled.label`
  display: flex;
  flex-direction: row;
  gap: 8px;
  align-items: center;
  margin-bottom: 20px;

  input {
    appearance: none;
    -webkit-appearance: none;
    width: 24px;
    height: 24px;

    background-image: url("${UN_CHECKED}");
    background-size: contain;
    background-position: center;
    background-size: 24px 24px;
    background-repeat: no-repeat;

    &:checked {
      background-image: url("${CHECKED}");
    }
  }

  span {
    margin: 0;
    font-family: "Noto Sans", sans-serif;
    font-weight: 500;
    font-size: 12px;
    line-height: 15px;
    color: rgba(10, 13, 19, 1);
  }
`;
