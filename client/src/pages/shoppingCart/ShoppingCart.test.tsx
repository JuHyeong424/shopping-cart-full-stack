import { describe, it, expect } from "vitest";
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { http, HttpResponse } from "msw";
import ShoppingCart from "./ShoppingCart";
import { server } from "../../test/mocks/server";
import { BASE_URL } from "../../test/mocks/handlers";

const renderShoppingCart = () =>
  render(
    <MemoryRouter>
      <ShoppingCart />
    </MemoryRouter>,
  );

/** 가격 요약 행(주문 금액 / 배송비 / 총 결제 금액)의 값 텍스트를 읽는다. */
const getSummaryValue = (label: string) => {
  const heading = screen.getByRole("heading", { name: label });
  return heading.parentElement?.querySelector("span")?.textContent ?? "";
};

describe("ShoppingCart", () => {
  it("장바구니 API 응답을 받아 상품 목록을 렌더링한다", async () => {
    renderShoppingCart();

    expect(await screen.findByText("테스트 상품 A")).toBeInTheDocument();
    expect(screen.getByText("테스트 상품 B")).toBeInTheDocument();
    expect(screen.getByText("현재 2종류의 상품이 담겨있습니다.")).toBeInTheDocument();
  });

  it("상품을 불러오는 동안 로딩 스피너를 보여준다", async () => {
    renderShoppingCart();

    expect(screen.getByRole("status", { name: "로딩 중" })).toBeInTheDocument();
    await screen.findByText("테스트 상품 A");
    expect(screen.queryByRole("status", { name: "로딩 중" })).not.toBeInTheDocument();
  });

  it("상품 조회에 실패하면 에러 메시지를 보여준다", async () => {
    server.use(
      http.get(`${BASE_URL}/carts`, () => new HttpResponse(null, { status: 500 })),
    );

    renderShoppingCart();

    expect(
      await screen.findByText("상품 불러오기를 실패하였습니다. 다시 시도해주세요."),
    ).toBeInTheDocument();
  });

  it("진입 시 모든 상품이 기본으로 선택되어 있다", async () => {
    renderShoppingCart();
    await screen.findByText("테스트 상품 A");

    const itemCheckboxes = screen.getAllByLabelText("해당 상품 선택");
    expect(itemCheckboxes).toHaveLength(2);
    itemCheckboxes.forEach((checkbox) => expect(checkbox).toBeChecked());
    expect(screen.getByLabelText("전체 상품 선택")).toBeChecked();
  });

  it("선택된 상품 기준으로 주문 금액·배송비·총 결제 금액을 계산한다", async () => {
    renderShoppingCart();
    await screen.findByText("테스트 상품 A");

    // A(10,000 x 1) + B(20,000 x 2) = 50,000 → 10만원 미만이라 배송비 3,000
    expect(getSummaryValue("주문 금액")).toBe("50,000원");
    expect(getSummaryValue("배송비")).toBe("3,000원");
    expect(getSummaryValue("총 결제 금액")).toBe("53,000원");
  });

  it("상품 선택을 해제하면 결제 금액이 동적으로 줄어든다", async () => {
    const user = userEvent.setup();
    renderShoppingCart();
    await screen.findByText("테스트 상품 A");

    // 두 번째 상품(B, 20,000 x 2) 선택 해제 → A(10,000)만 남음
    const [, checkboxB] = screen.getAllByLabelText("해당 상품 선택");
    await user.click(checkboxB);

    expect(checkboxB).not.toBeChecked();
    expect(getSummaryValue("주문 금액")).toBe("10,000원");
    expect(getSummaryValue("총 결제 금액")).toBe("13,000원");
  });

  it("주문 금액이 10만원 이상이면 배송비가 무료다", async () => {
    server.use(
      http.get(`${BASE_URL}/carts`, () =>
        HttpResponse.json([
          {
            product: { id: "1", image: "/a.png", name: "비싼 상품", price: 100000 },
            quantity: 1,
          },
        ]),
      ),
    );

    renderShoppingCart();
    await screen.findByText("비싼 상품");

    expect(getSummaryValue("주문 금액")).toBe("100,000원");
    expect(getSummaryValue("배송비")).toBe("0원");
  });

  it("+ 버튼을 누르면 해당 상품 수량이 증가한다", async () => {
    const user = userEvent.setup();
    renderShoppingCart();
    await screen.findByText("테스트 상품 A");

    const itemA = screen.getByText("테스트 상품 A").closest("div")
      ?.parentElement?.parentElement as HTMLElement;
    const plusButton = within(itemA).getByRole("button", { name: "+" });

    await user.click(plusButton);

    expect(within(itemA).getByText("2")).toBeInTheDocument();
  });

  it("삭제 버튼을 누르면 상품이 목록에서 제거된다", async () => {
    const user = userEvent.setup();
    renderShoppingCart();
    await screen.findByText("테스트 상품 A");

    const deleteButtons = screen.getAllByRole("button", { name: "삭제" });
    await user.click(deleteButtons[0]);

    await waitFor(() =>
      expect(screen.queryByText("테스트 상품 A")).not.toBeInTheDocument(),
    );
    expect(screen.getByText("테스트 상품 B")).toBeInTheDocument();
  });

  it("선택 상태를 localStorage에 저장한다", async () => {
    renderShoppingCart();
    await screen.findByText("테스트 상품 A");

    await waitFor(() => {
      const saved = localStorage.getItem("cart-checked-ids");
      expect(saved).not.toBeNull();
      expect(JSON.parse(saved as string)).toEqual(
        expect.arrayContaining(["1", "2"]),
      );
    });
  });
});
