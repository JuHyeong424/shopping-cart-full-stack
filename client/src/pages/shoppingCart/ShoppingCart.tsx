import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import infoOutline from "../../assets/infoOutline.svg";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { UN_CHECKED, CHECKED, DELIVERY_FEE } from "./constants/constant";
import { useCartItems } from "./hooks/useCartItems";
import { useCheckedItems } from "./hooks/useCheckedItems";

interface ShoppingCartItem {
  product: {
    id: string;
    image: string;
    name: string;
    price: number;
  };
  quantity: number;
}

export default function ShoppingCart() {
  const isInitializedRef = useRef(false);
  const navigate = useNavigate();
  const {
    shoppingCartItems,
    isLoading,
    error,
    setError,
    handleMinusQuantity,
    handlePlusQuantity,
    handleDeleteItem,
  } = useCartItems();

  const {
    checkedIdsSet,
    handleItemChoice,
    handleAllCheckedById,
    removeChecked,
  } = useCheckedItems(isInitializedRef, shoppingCartItems);

  const onDelete = async (item: ShoppingCartItem) => {
    const ok = await handleDeleteItem(item);
    if (ok) removeChecked(item.product.id);
  };

  const orderAmount = shoppingCartItems
    .filter((item) => checkedIdsSet.has(item.product.id))
    .reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const checkDeliveryFee =
    orderAmount < 100000 &&
    shoppingCartItems.length !== 0 &&
    checkedIdsSet.size !== 0
      ? DELIVERY_FEE
      : 0;

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

      {isLoading && (
        <SpinnerWrapper>
          <Spinner role="status" aria-label="로딩 중" />
        </SpinnerWrapper>
      )}

      {!isLoading && shoppingCartItems.length === 0 && (
        <main>
          <PageHeader>
            <h2>장바구니</h2>
          </PageHeader>
          <NoItemsInCart>
            <p>장바구니에 담은 상품이 없습니다.</p>
          </NoItemsInCart>
        </main>
      )}

      {shoppingCartItems.length !== 0 && (
        <main>
          {isLoading && (
            <SpinnerWrapper>
              <Spinner role="status" aria-label="로딩 중" />
            </SpinnerWrapper>
          )}
          {!isLoading && (
            <>
              <PageHeader>
                <h2>장바구니</h2>
                <p>
                  현재 {shoppingCartItems.length}종류의 상품이 담겨있습니다.
                </p>
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
                        <button onClick={() => onDelete(value)}>삭제</button>
                      </SelectDeleteItem>

                      <SelectedItemInfo>
                        <img src={value.product.image} alt="상품 이미지" />
                        <ItemNamePriceCount>
                          <div>
                            <h5>{value.product.name}</h5>
                            <span>
                              {value.product.price.toLocaleString()}원
                            </span>
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
            </>
          )}

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
      )}

      <OrderCheckButton
        disabled={shoppingCartItems.length === 0 || checkedIdsSet.size === 0}
        onClick={handleSubmit}
      >
        주문 확인
      </OrderCheckButton>

      {error && (
        <ErrorOverlay onClick={() => setError("")}>
          <ErrorBox onClick={(e) => e.stopPropagation()}>
            <p>{error}</p>
            <button onClick={() => setError("")}>닫기</button>
          </ErrorBox>
        </ErrorOverlay>
      )}
    </Container>
  );
}

const NoItemsInCart = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: calc(100svh - 250px);
`;

const ErrorOverlay = styled.div`
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const ErrorBox = styled.div`
  width: 80%;
  max-width: 320px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 12px;
  padding: 24px 20px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  p {
    margin: 0;
    font-family: "Noto Sans", sans-serif;
    font-weight: 500;
    font-size: 14px;
    line-height: 1.5;
    text-align: center;
    color: rgba(10, 13, 19, 1);
  }

  button {
    width: 100%;
    height: 44px;
    border: none;
    border-radius: 8px;
    background-color: rgba(0, 0, 0, 1);
    color: rgba(255, 255, 255, 1);
    cursor: pointer;

    font-family: "Noto Sans", sans-serif;
    font-weight: 700;
    font-size: 14px;
    line-height: 16px;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 100px 24px;
`;

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 80px 0;
`;

const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-top-color: rgba(0, 0, 0, 1);
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
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
