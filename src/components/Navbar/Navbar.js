import React from "react";
import "./Navbar.css";
import logo from "../Images/logo.png";
import CartWidget from "../CartWidget/CartWidget";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { getCategories } from "../../Services/firebase/firestore";
import { useAsync } from "../../hooks/useAsync";
import { fetcher } from "../../utils/fetcher";

const Navbar = () => {
  const { getCartQuantity } = useContext(CartContext);
  const quantity = getCartQuantity();
  const { isLoading, data, error } = useAsync(fetcher(getCategories), []);

  return (
    <nav>
      <div className="burgerHouse">
        <Link to={`/`}>
          <img src={logo} className="logo" alt="Logo" />
        </Link>
        BurgerHouse
      </div>

      <Link
        className="CartWidgetContainer"
        style={{ display: quantity !== 0 ? "" : "none" }}
        to={`/cart`}
      >
        <CartWidget />
      </Link>
      <div>
        <p className="Filtros">Filtros: </p>
        <Link className="NavbarLink" to={`/`}>
          Todos los productos
        </Link>
        {!isLoading && !error
          ? data.map((category) => (
              <Link
                key={category}
                className="NavbarLink"
                to={`/category/${category}`}
              >
                {category}
              </Link>
            ))
          : null}
      </div>
    </nav>
  );
};

export default Navbar;
