import React from "react";
import "./ItemDetailContainer.css";
import ItemDetail from "../ItemDetail/ItemDetail";
import { useParams } from "react-router-dom";
import { getProduct } from "../../Services/firebase/firestore";
import { fetcher } from "../../utils/fetcher";
import { useAsync } from "../../hooks/useAsync";

const ItemDetailContainer = () => {
  const { productId } = useParams();

  const { data, error } = useAsync(fetcher(getProduct, productId), [productId]);

  if (error) {
    return <h1>Hubo un error, lo solucionaremos a la brevedad</h1>;
  }

  return (
    <div className="ItemDetailContainer">
      <ItemDetail {...data} />
    </div>
  );
};

export default ItemDetailContainer;
