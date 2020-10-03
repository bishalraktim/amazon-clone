import React from "react";
import "./Checkout.css";
import Subtotal from "./Subtotal";
import { useStateValue } from "./StateProvider";
import { getBaskeTotal } from "./reducer";
import CheckoutProduct from "./ CheckoutProduct";

function Checkout() {
  const [state] = useStateValue();

  const component = state.basket.map((item, i) => (
    <CheckoutProduct
      id={item.id}
      title={item.title}
      price={item.price}
      rating={item.rating}
      image={item.image}
      key={item.id + i}
      hideBtn={true}
    />
  ));

  let filteredProducts;
  if (state.search?.length >= 3) {
    filteredProducts = state.basket
      .filter((prod) => prod.title.toLowerCase().includes(state.search))
      .map((item, i) => (
        <CheckoutProduct
          id={item.id}
          title={item.title}
          price={item.price}
          rating={item.rating}
          image={item.image}
          key={i + item.id}
          hideBtn={true}
        />
      ));
  }

  // const amount = state.basket
  //   .map((item, index) => item.price)
  //   .reduce((acc, curVal) => {
  //     let total;
  //     total = acc + curVal;
  //     return total;
  //   }, 0);

  return (
    <div className="checkout">
      <div className="checkout__left">
        <img
          className="checkout__ad"
          src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
          alt=""
        />

        <div>
          <h3>{state.user ? "Hello, " + state.user.email : "Hello Guest"}</h3>
          <h2 className="checkout__title">Your Shopping Basket</h2>
          {state.search?.length >= 3 ? filteredProducts : component}
        </div>
      </div>

      <div className="checkout__right">
        <Subtotal
          totalItems={state.basket.length}
          totalAmount={getBaskeTotal(state.basket)}
        />
      </div>
    </div>
  );
}

export default Checkout;
