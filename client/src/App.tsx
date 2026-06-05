import styled from "@emotion/styled";
import ShoppingCart from "./pages/shoppingCart/ShoppingCart";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CheckOrder from "./pages/checkOrder/CheckOrder";

export default function App() {
  return (
    <AppContainer>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ShoppingCart />} />
          <Route path="/checkorder" element={<CheckOrder />} />
        </Routes>
      </BrowserRouter>
    </AppContainer>
  );
}

const AppContainer = styled.div`
  width: 430px;
  max-width: 100%;
  min-height: 932px;
  max-height: 100svh;
  overflow-y: auto;
  background-color: white;
`;
