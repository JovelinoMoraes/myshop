import React from "react";
import * as S from "./styles";
import { Product } from "../../data/product";

interface CartProps {
  showCart: boolean;
  cart: Product[];
}

export const Cart: React.FC<CartProps> = ({ showCart, cart }) => {
  const total = cart.reduce((totalCart, product) => {
    return totalCart + product.price;
  }, 0);

  return (
    <S.Container showCart={showCart}>
      <S.Title>Carrinho</S.Title>
      <S.CartProductsList>
        {cart.map((product) => (
          <S.CartProductItem key={product.id}>
            <strong>{product.title}</strong> - ${product.price}
          </S.CartProductItem>
        ))}
      </S.CartProductsList>
      <S.CartTotal data-testid="total">Total: ${total}</S.CartTotal>
    </S.Container>
  );
};
