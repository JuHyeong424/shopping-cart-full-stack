import styled from "@emotion/styled";
import infoOutline from "../../assets/infoOutline.svg";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

interface ShoppingCartItem {
  product: {
    id: string;
    image: string;
    name: string;
    price: number;
  };
  quantity: number;
}

const UN_CHECKED =
  "data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3crect%20width='24'%20height='24'%20rx='8'%20fill='white'/%3e%3crect%20x='0.5'%20y='0.5'%20width='23'%20height='23'%20rx='7.5'%20stroke='black'%20stroke-opacity='0.1'/%3e%3cg%20clip-path='url(%23clip0_13996_1608)'%3e%3cpath%20d='M9%2016.17L4.83%2012L3.41%2013.41L9%2019L21%207L19.59%205.59L9%2016.17Z'%20fill='black'%20fill-opacity='0.1'/%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='clip0_13996_1608'%3e%3crect%20width='24'%20height='24'%20fill='white'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e";
const CHECKED =
  "data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3crect%20x='0.5'%20y='0.5'%20width='23'%20height='23'%20rx='7.5'%20fill='black'%20stroke='black'/%3e%3cg%20clip-path='url(%23clip0_15620_131)'%3e%3cpath%20d='M9%2016.17L4.83%2012L3.41%2013.41L9%2019L21%207L19.59%205.59L9%2016.17Z'%20fill='white'/%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='clip0_15620_131'%3e%3crect%20width='24'%20height='24'%20fill='white'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e";

const BASE_URL = import.meta.env.VITE_API_URL;
const STORAGE_KEY = "cart-checked-ids";
const DELIVERY_FEE = 3000;

export default function ShoppingCart() {
  const navigate = useNavigate();
  const isInitialized = useRef(false);
  const [shoppingCartItems, setShoppingCartItems] = useState<
    ShoppingCartItem[]
  >([]);
  const [checkedIdsSet, setCheckedIdsSet] = useState<Set<string>>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });
  const [loading, setLoading] = useState(false);

  console.log(checkedIdsSet);

  useEffect(() => {
    if (!isInitialized.current) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...checkedIdsSet]));
  }, [checkedIdsSet]);

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

  useEffect(() => {
    fetch(`${BASE_URL}/carts`)
      .then((res) => {
        if (!res.ok) throw new Error("상품을 불러오지 못했습니다.");
        return res.json();
      })
      .then((data: ShoppingCartItem[]) => {
        setShoppingCartItems(data);
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved === null) {
          // 최초 진입: 전체 선택
          setCheckedIdsSet(new Set(data.map((item) => item.product.id)));
        } else {
          // 이후 진입: 저장된 값 복원
          setCheckedIdsSet(new Set(JSON.parse(saved) as string[]));
        }

        isInitialized.current = true;
      })
      .catch(console.error);
  }, []);

  console.log(shoppingCartItems);

  const handleMinusQuantity = async (value: ShoppingCartItem) => {
    const updatedQuantity = value.quantity - 1;

    setShoppingCartItems((prev) => {
      return prev.map((item) => {
        return item.product.id === value.product.id
          ? { ...item, quantity: updatedQuantity }
          : item;
      });
    });

    try {
      const response = await fetch(`${BASE_URL}/carts/${value.product.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          quantity: value.quantity - 1,
        }),
      });

      if (!response.ok) {
        throw new Error("해당 상품의 수량을 변경하지 못했습니다.");
      }
    } catch (error) {
      console.error("에러 발생", error);
      setShoppingCartItems((prev) => {
        return prev.map((item) => {
          return item.product.id === value.product.id
            ? { ...item, quantity: value.quantity }
            : item;
        });
      });
    }
  };

  const handlePlusQuantity = async (value: ShoppingCartItem) => {
    const updatedQuantity = value.quantity + 1;
    setShoppingCartItems((prev) => {
      return prev.map((item) => {
        return item.product.id === value.product.id
          ? { ...item, quantity: updatedQuantity }
          : item;
      });
    });

    try {
      const response = await fetch(`${BASE_URL}/carts/${value.product.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          quantity: value.quantity + 1,
        }),
      });

      if (!response.ok) {
        throw new Error("해당 상품의 수량을 변경하지 못했습니다.");
      }
    } catch (error) {
      console.error("에러 발생", error);
      setShoppingCartItems((prev) => {
        return prev.map((item) => {
          return item.product.id === value.product.id
            ? { ...item, quantity: value.quantity }
            : item;
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

      setCheckedIdsSet((prev) => {
        const updatedCheckedId = new Set(prev);
        updatedCheckedId.delete(value.product.id);
        return updatedCheckedId;
      });
    } catch (error) {
      console.error("에러 발생", error);
      setShoppingCartItems(prevItems);
    }
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

  const orderAmount = shoppingCartItems
    .filter((item) => checkedIdsSet.has(item.product.id))
    .reduce((sum, item) => (sum + item.product.price) * item.quantity, 0);

  const checkDeliveryFee = orderAmount < 100000 ? DELIVERY_FEE : 0;

  const totalPayment = orderAmount + checkDeliveryFee;

  const totalProductsTypeCount = checkedIdsSet.size;
  const totalProductsQuantity = shoppingCartItems
    .filter((item) => checkedIdsSet.has(item.product.id))
    .reduce((sum, item) => sum + item.quantity, 0);

  const handleSubmit = () => {
    navigate("/checkorder", {
      state: {
        price: `${totalPayment}`,
        totalProductsTypeCount: `${totalProductsTypeCount}`,
        totalProductsQuantity: `${totalProductsQuantity}`,
      },
    });
  };

  return (
    <Container>
      <Header>
        <span>SHOP</span>
      </Header>

      <main>
        <PageHeader>
          <h2>장바구니</h2>
          <p>현재 {shoppingCartItems.length}종류의 상품이 담겨있습니다.</p>
        </PageHeader>

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
            <div key={value.product.id}>
              <Divider />

              <SelectedItem>
                <SelectDeleteItem>
                  <input
                    checked={checkedIdsSet.has(value.product.id)}
                    onChange={() => handleItemChoice(value)}
                    type="checkbox"
                    aria-label="해당 상품 선택"
                  />
                  <button onClick={() => handleDeleteItem(value)}>삭제</button>
                </SelectDeleteItem>

                <SelectedItemInfo>
                  <img src={value.product.image} alt="상품 이미지" />
                  <ItemNamePriceCount>
                    <div>
                      <h5>{value.product.name}</h5>
                      <span>{value.product.price.toLocaleString()}원</span>
                    </div>
                    <ItemCount>
                      <button onClick={() => handleMinusQuantity(value)}>
                        -
                      </button>
                      <span>{value.quantity}</span>
                      <button onClick={() => handlePlusQuantity(value)}>
                        +
                      </button>
                    </ItemCount>
                  </ItemNamePriceCount>
                </SelectedItemInfo>
              </SelectedItem>
            </div>
          ))}
        </SelectedAllItems>

        <OrderSummary>
          <ShippingNotice>
            <img src={infoOutline} alt="infoOutline" />
            <p>총 주문 금액이 100,000원 이상일 경우 무료 배송됩니다.</p>
          </ShippingNotice>
          <Divider />
          <PriceRow>
            <h4>주문 금액</h4>
            <span>{orderAmount.toLocaleString()}원</span>
          </PriceRow>
          <PriceRow>
            <h4>배송비</h4>
            <span>{checkDeliveryFee.toLocaleString()}원</span>
          </PriceRow>
          <Divider />
          <PriceRow>
            <h4>총 결제 금액</h4>
            <span>{totalPayment.toLocaleString()}원</span>
          </PriceRow>
        </OrderSummary>
      </main>

      <OrderCheckButton
        disabled={shoppingCartItems.length === 0 || checkedIdsSet.size === 0}
        onClick={handleSubmit}
      >
        주문 확인
      </OrderCheckButton>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 100px 24px;
`;

const Header = styled.header`
  background-color: rgba(0, 0, 0, 1);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 64px;
  padding-inline: 24px;
  justify-content: space-between;

  display: flex;
  align-items: center;
  font-family: "Noto Sans", sans-serif;
  font-weight: 800;
  font-size: 20px;
  line-height: 16px;
  color: rgba(255, 255, 255, 1);
`;

const PageHeader = styled.section`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 36px;

  h2 {
    margin: 0;
    font-family: "Noto Sans", sans-serif;
    font-weight: 700;
    font-size: 24px;
    line-height: 100%;
    color: rgba(0, 0, 0, 1);
  }

  p {
    margin: 0;
    font-family: "Noto Sans", sans-serif;
    font-weight: 500;
    font-size: 12px;
    line-height: 15px;
    color: rgba(10, 13, 19, 1);
  }
`;

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

const OrderSummary = styled.section``;

const ShippingNotice = styled.div`
  display: flex;
  flex-direction: row;
  gap: 4px;
  align-items: center;

  p {
    font-family: "Noto Sans", sans-serif;
    font-weight: 500;
    font-size: 12px;
    line-height: 15px;
    color: rgba(10, 13, 19, 1);
  }

  img {
  }
`;

const PriceRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  h4 {
    font-family: "Noto Sans", sans-serif;
    font-weight: 700;
    font-size: 16px;
    line-height: 16px;
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

const OrderCheckButton = styled.button`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 64px;
  padding: 24px 65px;
  background-color: rgba(0, 0, 0, 1);

  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Noto Sans", sans-serif;
  font-weight: 700;
  font-size: 16px;
  line-height: 16px;
  color: rgba(255, 255, 255, 1);
`;

const Divider = styled.div`
  width: full;
  border: 1px solid rgba(0, 0, 0, 0.1);
  margin-bottom: 12px;
`;
