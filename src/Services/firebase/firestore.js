import createAdaptedProductFromFirestore from "../../adapters/productAdapter";
import {
  getDocs,
  collection,
  query,
  where,
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from ".";

export const getProducts = (categoryId) => {
  const collectionRef = !categoryId
    ? collection(db, "productos")
    : query(collection(db, "productos"), where("tipo", "==", categoryId));

  return getDocs(collectionRef)
    .then((response) => {
      const products = response.docs.map((doc) => {
        return createAdaptedProductFromFirestore(doc);
      });

      return products;
    })
    .catch((error) => {
      return error;
    });
};

export const getProduct = (productId) => {
  return getDoc(doc(db, "productos", productId))
    .then((response) => {
      const product = createAdaptedProductFromFirestore(response);
      return product;
    })
    .catch((error) => {
      return error;
    });
};

export const getCategories = async (categoryId) => {
  const products = await getProducts();
  if (!categoryId) {
    const productCategories = products.map((prod) => prod.tipo);
    const filteredCategories = productCategories.filter((item, index) => {
      return productCategories.indexOf(item) === index;
    });
    return filteredCategories;
  }
};
