import styled from "@emotion/styled";
import ShoppingCart from "./pages/shoppingCart/ShoppingCart";

export default function App() {
  return (
    <AppContainer>
      <ShoppingCart />
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
