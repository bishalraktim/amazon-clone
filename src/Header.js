import React from "react";
import "./Header.css";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { Link } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import { auth } from "./firebase";
import MenuIcon from "@material-ui/icons/Menu";
import { Dropdown } from "react-bootstrap";
//import "bootstrap/dist/css/bootstrap.min.css";

function Header() {
  // const [state, dispatch] = useStateValue();
  const [state, dispatch] = useStateValue();
  //console.log("check email of the user", state.user?.email);

  const handleAuthentication = () => {
    if (state.user) {
      auth.signOut();
    }
  };

  const searchText = (e) => {
    dispatch({
      type: "SEARCH_TEXT",
      textValue: e.target.value,
    });
  };

  return (
    <div className="header">
      <div className="header__menuIcon">
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            <MenuIcon />
          </Dropdown.Toggle>

          <Dropdown.Menu className="header__menuLists">
            <p>{state.user ? "Hello " + state.user?.email : "Hello Guest"}</p>
            <Dropdown.Item
              as={Link}
              to="/login"
              className="header__dropdownItem"
            >
              Sign In
            </Dropdown.Item>
            <Dropdown.Item
              as={Link}
              to="/orders"
              className="header__dropdownItem"
            >
              Returns and Orders
            </Dropdown.Item>
            <Dropdown.Item
              as={Link}
              to="/checkout"
              className="header__dropdownItem"
            >
              Checkout
            </Dropdown.Item>
            <p>Selected Items: {state.basket?.length}</p>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <Link to="/">
        <img
          className="header__logo"
          src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
          alt=""
        />
      </Link>

      <div className="header__search">
        <input
          className="header__searchInput"
          type="text"
          onChange={searchText}
        />
        <SearchIcon className="header__searchIcon" />
      </div>

      <div className="header__nav">
        <Link
          to={!state.user ? "/login" : "/"}
          style={{ textDecoration: "none" }}
        >
          <div className="header__option" onClick={handleAuthentication}>
            <span className="header__optionLineOne">
              {state.user ? "Hello " + state.user?.email : "Hello Guest"}
            </span>
            <span className="header__optionLineTwo">
              {state.user ? "Sign Out" : "Sign In"}
            </span>
          </div>
        </Link>

        <Link to="/orders" style={{ textDecoration: "none" }}>
          <div className="header__option">
            <span className="header__optionLineOne">Returns</span>
            <span className="header__optionLineTwo">& orders</span>
          </div>
        </Link>

        <div className="header__option">
          <span className="header__optionLineOne">Your</span>
          <span className="header__optionLineTwo">Prime</span>
        </div>

        <Link to="/checkout" className="link">
          <div className="header__optionBasket">
            <ShoppingBasketIcon />
            <span className="header__optionLineTwo header__basketCount">
              {state.basket?.length}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
