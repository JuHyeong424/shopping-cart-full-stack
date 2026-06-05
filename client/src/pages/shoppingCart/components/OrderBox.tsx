import styled from "@emotion/styled";
import infoOutline from "../../../assets/infoOutline.svg";

interface OrderBoxProps {
  orderAmount: number;
  checkDeliveryFee: number;
  totalPayment: number;
}

export default function OrderBox({
  orderAmount,
  checkDeliveryFee,
  totalPayment,
}: OrderBoxProps) {
  return (
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
  );
}

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

const Divider = styled.div`
  width: full;
  border: 1px solid rgba(0, 0, 0, 0.1);
  margin-bottom: 12px;
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
