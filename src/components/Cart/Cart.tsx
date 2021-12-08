import { CartItemType } from "../../App";
import CartItem from "./CartItem";
import { Wrapper } from "./Cart.styles";

type Props = {
  cartItems: CartItemType[];
  addToCart: (clickedItem: CartItemType) => void;
  removeFromCart: (id: number) => void;
};

const Cart = ({ cartItems, addToCart, removeFromCart }: Props) => {
  const calculateTotal = (items: CartItemType[]) =>
    items.reduce((acc, item) => acc + item.amount * item.price, 0);

  return (
    <Wrapper>
      <h2>Seu carrinho</h2>
      {cartItems.length === 0 ? <p>Nenhum item no carrinho.</p> : null}
      {cartItems.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
        />
      ))}
      <h2>Total: {calculateTotal(cartItems).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</h2>
    </Wrapper>
  );
};

export default Cart;
