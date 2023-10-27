import React from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import ItemListContainer from "./components/ItemListContainer/ItemListContainer";
import ItemDetailContainer from "./components/ItemDetailContainer/ItemDetailContainer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartContextProvider } from "./context/CartContext";
import { CartList } from "./components/CartList/CartList";
import { Checkout } from "./components/Checkout/Checkout";
import { NotificationProvider } from "./notification/Notification";

function App() {
  return (
    <div className="App">
      <NotificationProvider>
        <CartContextProvider>
          <BrowserRouter>
            <header className="App-header">
              <Navbar />
            </header>

            <main>
              <Routes>
                <Route
                  path="/"
                  element={
                    <ItemListContainer greeting="Bienvenidos a BurgerHouse" />
                  }
                />
                <Route
                  path="/category/:categoryId"
                  element={
                    <ItemListContainer greeting="Filtramos tus productos: " />
                  }
                />
                <Route
                  path="/detail/:productId"
                  element={<ItemDetailContainer />}
                />
                <Route path="/cart" element={<CartList />} />
                <Route path="/checkout" element={<Checkout />} />
              </Routes>
            </main>
          </BrowserRouter>
        </CartContextProvider>
      </NotificationProvider>
    </div>
  );
}

export default App;
