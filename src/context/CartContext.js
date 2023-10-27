import { useState, createContext, useContext } from "react";
import NotificationContext from "../notification/Notification";
export const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const { setNotification } = useContext(NotificationContext);
  const addItem = (productToAdd) => {
    if (!isInCart(productToAdd.id)) {
      setCart([...cart, productToAdd]);
    } else {
      const cartUpdated = cart.map((prod) => {
        if (prod.id === productToAdd.id) {
          const productUpdated = {
            ...prod,
            quantity: productToAdd.quantity,
          };
          return productUpdated;
        } else {
          return prod;
        }
      });

      setCart(cartUpdated);
    }
  };

  const getCartQuantity = () => {
    let accu = 0;
    cart.forEach((prod) => {
      accu += prod.quantity;
    });

    return accu;
  };

  const isInCart = (id) => {
    return cart.some((prod) => prod.id === id);
  };

  const removeItem = (id) => {
    const cartWithoutItem = cart.filter((prod) => prod.id !== id);
    setCart(cartWithoutItem);
    setNotification("alert", `Producto eliminado con éxito`);
  };

  const clearCart = (mensaje) => {
    setCart([]);
    setNotification("success", mensaje);
  };

  const getProductQuantity = (id) => {
    const product = cart.find((prod) => prod.id === id);

    return product?.quantity;
  };

  const getCartPrice = () => {
    let total = 0;
    cart.forEach((prod) => {
      total += prod.quantity * prod.precio;
    });

    return total;
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addItem,
        isInCart,
        removeItem,
        clearCart,
        getCartPrice,
        getCartQuantity,
        getProductQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
