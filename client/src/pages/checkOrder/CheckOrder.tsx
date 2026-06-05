import styled from "@emotion/styled";
import { useLocation } from "react-router-dom";

export default function CheckOrder() {
  const location = useLocation();
  const { price, totalProductsTypeCount, totalProductsQuantity } =
    location.state || {};

  return (
    <Container>
      <Header>
        <span>SHOP</span>
      </Header>
      <h1>주문 확인</h1>
      <p>
        총 {totalProductsTypeCount}종류의 상품 {totalProductsQuantity}개를
        주문합니다.
      </p>
      <p>최종 결제 금액을 확인해 주세요.</p>
      <p>총 결제 금액</p>
      <p>{price.toLocaleString()}원</p>
      <OrderCheckButton>결제하기</OrderCheckButton>
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
