import React from "react";
import "./ItemDetail.css";
import ItemCounter from "../ItemCount/ItemCount";
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import NotificationContext from "../../notification/Notification";
import { CartContext } from "../../context/CartContext";

const ItemDetail = ({
  id,
  nombre,
  tipo,
  imagen,
  ingredientes,
  stock,
  precio,
}) => {
  const { setNotification } = useContext(NotificationContext);
  const [quantity, setQuantity] = useState(0);
  const { addItem, getProductQuantity } = useContext(CartContext);
  const quantityAdded = getProductQuantity(id);

  const handleOnAdd = (quantity) => {
    if (quantity === 0) {
      console.log("No se pueden agregar 0 productos");
    } else {
      if (quantity <= stock) {
        setQuantity(quantity);
        addItem({ id, nombre, precio, quantity });
        setNotification(
          "success",
          `Productos añadidos al carrito: ${quantity} `
        );
      } else {
        console.log(`Stock insuficiente existen ${stock} productos.`);
        setNotification(
          "alert",
          `Stock insuficiente existen ${stock} productos`
        );
      }
    }
  };

  return (
    <article className="CardItem">
      <header>
        <h2 className="Nombre">{nombre}</h2>
      </header>
      <picture>
        <img src={imagen} alt={nombre} className="ItemImg" />
      </picture>
      <section>
        <p className="Info Tipo">
          <span>Tipo:</span> {tipo}
        </p>
        <p className="Info Ingredientes">
          <span>Ingredientes:</span> {ingredientes}
        </p>
      </section>
      <p className=" Info Precio">
        <span>Precio:</span> {precio}
      </p>
      <footer className="ItemFooter">
        {quantity > 0 ? (
          <Link className="BotonCarrito" to="/cart">
            Ir al carrito
          </Link>
        ) : (
          <ItemCounter
            stock={stock}
            onAdd={handleOnAdd}
            initial={quantityAdded}
          />
        )}
      </footer>
    </article>
  );
};

export default ItemDetail;
