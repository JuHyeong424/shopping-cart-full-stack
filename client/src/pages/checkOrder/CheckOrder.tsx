import styled from "@emotion/styled";
import { useLocation, useNavigate } from "react-router-dom";
import Arrow from "../../assets/arrow.svg";

export default function CheckOrder() {
  const location = useLocation();
  const navigate = useNavigate();
  const { price, totalProductsTypeCount, totalProductsQuantity } =
    location.state || {};

  return (
    <Container>
      <Header>
        <img onClick={() => navigate(-1)} src={Arrow} alt="뒤로가기" />
      </Header>

      <Main>
        <h2>주문 확인</h2>

        <OrderQuantity>
          <p>
            총 {totalProductsTypeCount}종류의 상품 {totalProductsQuantity}개를
            주문합니다.
          </p>
          <p>최종 결제 금액을 확인해 주세요.</p>
        </OrderQuantity>

        <OrderPrice>
          <h4>총 결제 금액</h4>
          <p>{Number(price).toLocaleString()}원</p>
        </OrderPrice>
      </Main>
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

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 100px - 100px);

  h2 {
    font-family: "Noto Sans", sans-serif;
    font-weight: 700;
    font-size: 24px;
    line-height: 100%;
    color: rgba(0, 0, 0, 1);
  }
`;

const OrderQuantity = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  font-family: "Noto Sans", sans-serif;
  font-weight: 500;
  font-size: 12px;
  line-height: 150%;
  color: rgba(10, 13, 19, 1);

  p {
    margin: 0;
  }
`;

const OrderPrice = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h4 {
    font-family: "Noto Sans", sans-serif;
    font-weight: 700;
    font-size: 16px;
    line-height: 16px;
    color: rgba(10, 13, 19, 1);
  }

  p {
    font-family: "Noto Sans", sans-serif;
    font-weight: 700;
    font-size: 24px;
    line-height: 100%;
    color: rgba(0, 0, 0, 1);
    margin: 0;
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
