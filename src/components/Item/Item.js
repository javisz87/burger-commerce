import React from "react";
import "./Item.css";
import { Link } from "react-router-dom";

export const Item = ({ product }) => {
  return (
    <div>
      <h3>{product.nombre}</h3>
      <img src={product.imagen} className="productoImg" alt="Producto" />
      <p>${product.precio}</p>
      <Link className="detalle" to={`/detail/${product.id}`}>
        Ver Detalle
      </Link>
    </div>
  );
};
