import styled from "@emotion/styled";
import type { ShoppingCartItem } from "../types";
import { UN_CHECKED, CHECKED } from "../constants/constant";

interface Props {
  key: string;
  checkedIdsSet: Set<string>;
  onToggleItem: (item: ShoppingCartItem) => void;
  onDelete: (item: ShoppingCartItem) => void;
  onChangeQuantity: (item: ShoppingCartItem, nextQuantity: number) => void;
  value: ShoppingCartItem;
}

export default function CartItem({
  key,
  checkedIdsSet,
  onToggleItem,
  onDelete,
  onChangeQuantity,
  value,
}: Props) {
  return (
    <div key={key}>
      <Divider />

      <SelectedItem>
        <SelectDeleteItem>
          <input
            checked={checkedIdsSet.has(value.product.id)}
            onChange={() => onToggleItem(value)}
            type="checkbox"
            aria-label="해당 상품 선택"
          />
          <button onClick={() => onDelete(value)}>삭제</button>
        </SelectDeleteItem>

        <SelectedItemInfo>
          <img src={value.product.image} alt="상품 이미지" />
          <ItemNamePriceCount>
            <div>
              <h5>{value.product.name}</h5>
              <span>{value.product.price.toLocaleString()}원</span>
            </div>
            <ItemCount>
              <button
                onClick={() => onChangeQuantity(value, value.quantity - 1)}
                disabled={value.quantity <= 1}
              >
                -
              </button>
              <span>{value.quantity}</span>
              <button
                onClick={() => onChangeQuantity(value, value.quantity + 1)}
                disabled={value.quantity >= 99}
              >
                +
              </button>
            </ItemCount>
          </ItemNamePriceCount>
        </SelectedItemInfo>
      </SelectedItem>
    </div>
  );
}

const Divider = styled.div`
  width: full;
  border: 1px solid rgba(0, 0, 0, 0.1);
  margin-bottom: 12px;
`;

const SelectedItem = styled.div`
  margin-bottom: 20px;
`;

const SelectDeleteItem = styled.section`
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;

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

  button {
    padding: 4px 9px;
    background-color: rgba(255, 255, 255, 1);
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 4px;

    font-family: "Noto Sans", sans-serif;
    font-weight: 500;
    font-size: 12px;
    line-height: 15px;
    color: rgba(10, 13, 19, 1);
  }
`;

const SelectedItemInfo = styled.div`
  display: flex;
  flex-direction: row;
  gap: 24px;
  items-align: center;

  img {
    width: 112px;
    height: 112px;
    border-radius: 8px;
  }
`;

const ItemNamePriceCount = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 24px;

  h5 {
    margin: 4px 0;
    font-family: "Noto Sans", sans-serif;
    font-weight: 500;
    font-size: 12px;
    line-height: 15px;
    color: rgba(10, 13, 19, 1);
  }

  span {
    font-family: "Noto Sans", sans-serif;
    font-weight: 700;
    font-size: 24px;
    line-height: 100%;
    color: rgba(0, 0, 0, 1);
  }
`;

const ItemCount = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: full;
  gap: 12px;

  button {
    width: 24px;
    height: 24px;
    padding: 0;
    box-sizing: border-box;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    background-color: rgba(255, 255, 255, 1);

    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 1;
  }

  span {
    font-family: "Noto Sans", sans-serif;
    font-weight: 500;
    font-size: 12px;
    line-height: 15px;
    color: rgba(10, 13, 19, 1);
  }
`;
