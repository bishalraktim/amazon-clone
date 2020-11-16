import React from "react";
import "./Order.css";
import moment from "moment";
import CheckoutProduct from "./ CheckoutProduct";
import CurrencyFormat from "react-currency-format";
import { useStateValue } from "./StateProvider";

function Order(props) {
  const [state] = useStateValue();
  //console.log("props in order", props.order);
  const checkoutProductComponent = props.order?.map((item, i) => (
    <CheckoutProduct
      id={item.id}
      title={item.title}
      price={item.price}
      rating={item.rating}
      image={item.image}
      key={item.id + i}
      hideButton={false}
    /> 
  ));

  let filteredProducts;
  if (state.search?.length >= 3) {
    filteredProducts = props.order
      .filter((prod) => prod.title.toLowerCase().includes(state.search))
      .map((item, i) => (
        <CheckoutProduct
          id={item.id}
          title={item.title}
          price={item.price}
          rating={item.rating}
          image={item.image}
          key={i + item.id}
          hideBtn={false}
        />
      ));
  }

  const renderText = (value) => (
    <>
      <h3 className="order__total">Order Total: {value}</h3>
    </>
  );

  return (
    <div className="order">
      <h2>Order</h2>
      <p>{moment.unix(props.create).format("DD MMMM YYYY hh:mm A")}</p>
      <p className="order__id">
        <small>{props.id}</small>
      </p>

      {state.search?.length >= 3 ? filteredProducts : checkoutProductComponent}

      <CurrencyFormat
        decimalScale={2}
        value={props.amount / 100}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
        renderText={renderText}
      />
    </div>
  );
}

export default Order;
