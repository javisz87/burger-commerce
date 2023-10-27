import React from "react";
import "./ItemListContainer.css";
import { ItemList } from "../ItemList/ItemList";
import { useParams } from "react-router-dom";
import { getProducts } from "../../Services/firebase/firestore";
import { fetcher } from "../../utils/fetcher";
import { useAsync } from "../../hooks/useAsync";

const ItemListContainer = (props) => {
  const { categoryId } = useParams();

  const { isLoading, data, error } = useAsync(
    fetcher(getProducts, categoryId),
    [categoryId]
  );

  if (data?.length === 0) {
    return categoryId ? (
      <h1>
        Disculpe, todavía no hay productos en nuestra categoria {categoryId}
      </h1>
    ) : (
      <h1>No hay productos disponibles</h1>
    );
  }

  if (isLoading) {
    return <h1>Espera mientras cargamos tus productos...</h1>;
  }

  if (error) {
    return <h1>Hubo un error, lo solucionaremos a la brevedad</h1>;
  }

  return (
    <>
      <h1>{props.greeting}</h1>
      <ItemList products={data} />
    </>
  );
};

export default ItemListContainer;
