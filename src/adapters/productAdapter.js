const createAdaptedProductFromFirestone = (doc) => {
  const data = doc.data();

  const productAdapted = {
    id: doc.id,
    nombre: data.nombre,
    imagen: data.imagen,
    precio: data.precio,
    tipo: data.tipo,
    ingredientes: data.ingredientes,
    stock: data.stock,
  };

  return productAdapted;
};

export default createAdaptedProductFromFirestone;
