import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import "./CartList.css";

export const CartList = () => {
  const { getCartPrice, cart, removeItem, getCartQuantity, clearCart } =
    useContext(CartContext);

  const quantity = getCartQuantity();
  const total = getCartPrice();

  const handleRemoveItem = (e) => {
    removeItem(e.target.id);
  };

  return (
    <div className="productos">
      <h2>Carrito</h2>
      <table className="Carrito">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Subtotal</th>
            <th id="thboton"></th>
          </tr>
        </thead>
        <tbody id="tbody">
          {cart.map((producto) => (
            <tr key={producto.id}>
              <td>{producto.nombre}</td>
              <td>${producto.precio}</td>
              <td>{producto.quantity}</td>
              <td>${producto.quantity * producto.precio}</td>
              <td>
                <button
                  className="Eliminar"
                  onClick={handleRemoveItem}
                  id={producto.id}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h4>Total:{total}</h4>

      {quantity !== 0 ? (
        <Link to="/checkout" className="BotonCarrito">
          Ir al Checkout
        </Link>
      ) : (
        <h4>Agrega productos al carrito</h4>
      )}
      <button
        style={{ display: cart.length !== 0 ? "" : "none" }}
        onClick={() => clearCart("Vaciamos tu Carrito")}
        className="BotonCarrito"
      >
        Limpiar carrito
      </button>
    </div>
  );
};
