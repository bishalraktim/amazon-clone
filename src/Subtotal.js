import React from "react";
import "./Subtotal.css";
import CurrencyFormat from "react-currency-format";
import { useHistory } from "react-router-dom";

function Subtotal(props) {
  const history = useHistory();
  const renderText = (value) => (
    <>
      <p>
        Subtotal ({props.totalItems} items): <strong>{value}</strong>
      </p>
      <small className="subtotal__gift">
        <input type="checkbox" />
        This order contains a gift
      </small>
    </>
  ); 

  const paymentPage = () => {
    history.push("/payment");
  };

  return (
    <div className="subtotal">
      <CurrencyFormat
        decimalScale={2}
        value={props.totalAmount}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
        renderText={renderText}
      />
      <button onClick={paymentPage}>Proceed to Checkout</button>
    </div>
  );
}

export default Subtotal;
