import React from "react";
import "./CartWidget.css";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";

const CartWidget = () => {
  const { getCartQuantity } = useContext(CartContext);
  const quantity = getCartQuantity();
  return (
    <>
      {quantity}
      <img src="/cart.png" className="cart" alt="Cart" />
    </>
  );
};

export default CartWidget;
