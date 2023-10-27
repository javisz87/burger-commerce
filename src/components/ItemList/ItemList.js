import React from "react";
import "./ItemList.css";
import { Item } from "../Item/Item";

export const ItemList = ({ products }) => {
  return (
    <div className="productos">
      {products.map((product) =>
        product.stock !== 0 ? <Item key={product.id} product={product} /> : null
      )}
    </div>
  );
};
