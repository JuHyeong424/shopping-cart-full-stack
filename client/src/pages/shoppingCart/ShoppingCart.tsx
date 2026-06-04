import styled from "@emotion/styled";
import Example from "../../assets/example.jpg";
// import unchecked from "../../assets/unchecked.svg";
// import Checked from "../../assets/checked.svg";
import infoOutline from "../../assets/infoOutline.svg";

export default function ShoppingCart() {
  return (
    <Container>
      <Header>
        <span>SHOP</span>
      </Header>

      <main>
        <PageHeader>
          <h2>장바구니</h2>
          <p>현재 2종류의 상품이 담겨있습니다.</p>
        </PageHeader>

        <SelectedAllItems>
          <SelectAllLabel>
            <input type="checkbox" aria-label="전체 상품 선택" />
            <span>전체선택</span>
          </SelectAllLabel>

          <Divider />

          <SelectedItem>
            <SelectDeleteItem>
              <input type="checkbox" aria-label="해당 상품 선택" />
              <button>삭제</button>
            </SelectDeleteItem>

            <SelectedItemInfo>
              <img src={Example} alt="example" />
              <ItemNamePriceCount>
                <div>
                  <h5>상품이름A</h5>
                  <span>35,000원</span>
                </div>
                <ItemCount>
                  <button>-</button>
                  <span>3</span>
                  <button>+</button>
                </ItemCount>
              </ItemNamePriceCount>
            </SelectedItemInfo>
          </SelectedItem>

          <Divider />

          <SelectedItem>
            <SelectDeleteItem>
              <input type="checkbox" aria-label="해당 상품 선택" />
              <button>삭제</button>
            </SelectDeleteItem>

            <SelectedItemInfo>
              <img src={Example} alt="example" />
              <ItemNamePriceCount>
                <div>
                  <h5>상품이름A</h5>
                  <span>35,000원</span>
                </div>
                <ItemCount>
                  <button>-</button>
                  <span>3</span>
                  <button>+</button>
                </ItemCount>
              </ItemNamePriceCount>
            </SelectedItemInfo>
          </SelectedItem>
        </SelectedAllItems>

        <OrderSummary>
          <ShippingNotice>
            <img src={infoOutline} alt="infoOutline" />
            <p>총 주문 금액이 100,000원 이상일 경우 무료 배송됩니다.</p>
          </ShippingNotice>
          <Divider />
          <PriceRow>
            <h4>주문 금액</h4>
            <span>70,000원</span>
          </PriceRow>
          <PriceRow>
            <h4>배송비</h4>
            <span>3,000원</span>
          </PriceRow>
          <Divider />
          <PriceRow>
            <h4>총 결제 금액</h4>
            <span>73,000원</span>
          </PriceRow>
        </OrderSummary>
      </main>

      <OrderCheckButton>주문 확인</OrderCheckButton>
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

    background-image: url("data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3crect%20width='24'%20height='24'%20rx='8'%20fill='white'/%3e%3crect%20x='0.5'%20y='0.5'%20width='23'%20height='23'%20rx='7.5'%20stroke='black'%20stroke-opacity='0.1'/%3e%3cg%20clip-path='url(%23clip0_13996_1608)'%3e%3cpath%20d='M9%2016.17L4.83%2012L3.41%2013.41L9%2019L21%207L19.59%205.59L9%2016.17Z'%20fill='black'%20fill-opacity='0.1'/%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='clip0_13996_1608'%3e%3crect%20width='24'%20height='24'%20fill='white'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e");
    background-size: contain;
    background-position: center;
    background-size: 24px 24px;
    background-repeat: no-repeat;
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

    background-image: url("data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3crect%20x='0.5'%20y='0.5'%20width='23'%20height='23'%20rx='7.5'%20fill='black'%20stroke='black'/%3e%3cg%20clip-path='url(%23clip0_15620_131)'%3e%3cpath%20d='M9%2016.17L4.83%2012L3.41%2013.41L9%2019L21%207L19.59%205.59L9%2016.17Z'%20fill='white'/%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='clip0_15620_131'%3e%3crect%20width='24'%20height='24'%20fill='white'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e");
    background-size: contain;
    background-position: center;
    background-size: 24px 24px;
    background-repeat: no-repeat;
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
    margin: 0;
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
