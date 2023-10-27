import { useContext, useState } from "react";
import { CartContext } from "../../context/CartContext";
import {
  addDoc,
  collection,
  Timestamp,
  getDocs,
  query,
  where,
  documentId,
  writeBatch,
} from "firebase/firestore";
import { db } from "../../Services/firebase/index";
import "./Checkout.css";

export const Checkout = () => {
  const { cart, clearCart, getCartPrice } = useContext(CartContext);
  const [Name, setName] = useState();
  const [Surname, setSurname] = useState();
  const [Email, setEmail] = useState();
  const [Phone, setPhone] = useState();

  const createOrder = async () => {
    try {
      const objOrder = {
        buyer: {
          Name,
          Surname,
          Email,
          Phone,
        },
        items: cart,
        total: getCartPrice(),

        date: Timestamp.fromDate(new Date()),
      };
      console.log(objOrder);

      const ids = cart.map((prod) => prod.id);
      console.log(ids);

      const productsRef = collection(db, "productos");
      console.log(productsRef);
      const productsAddedFromFirestore = await getDocs(
        query(productsRef, where(documentId(), "in", ids))
      );

      const { docs } = productsAddedFromFirestore;

      const noStock = [];

      const batch = writeBatch(db);

      docs.forEach((doc) => {
        const dataDoc = doc.data();
        const stockDb = dataDoc.stock;

        const productAdded = cart.find((prod) => prod.id === doc.id);
        const prodQuaantity = productAdded?.quantity;

        if (stockDb >= prodQuaantity) {
          batch.update(doc.ref, { stock: stockDb - prodQuaantity });
        } else {
          noStock.push({ id: doc.id, ...dataDoc });
        }
      });

      if (noStock.length === 0) {
        const orderRef = collection(db, "ordenes");
        await addDoc(orderRef, objOrder);
        batch.commit();
        clearCart("Tu solicitud se ha ingresado con éxito");
      } else {
        console.log("Existen productos sin existencias");
      }
    } catch (error) {
      console.log(error);
    }
    document.getElementById("formulario").reset();
  };

  return (
    <div className="Checkout">
      <h2>Checkout</h2>
      <h4>Ingresa tus datos para confirmar el pedido</h4>
      <form id="formulario">
        <input
          type="text"
          id="Nombre"
          onChange={(e) => setName(e.target.value)}
          placeholder="Nombre"
        />
        <input
          type="text"
          id="Apellido"
          onChange={(e) => setSurname(e.target.value)}
          placeholder="Apellido"
        />
        <input
          type="email"
          id="Email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-Mail"
        />
        <input
          type="tel"
          id="Teléfono"
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Teléfono"
        />
      </form>
      <button type="reset" className="BotonCarrito" onClick={createOrder}>
        Generar Orden
      </button>
    </div>
  );
};
