import React, { useState, useEffect } from "react";
import "./Payment.css";
import { useStateValue } from "./StateProvider";
import CheckoutProduct from "./ CheckoutProduct";
import { Link, useHistory } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { getBaskeTotal } from "./reducer";
import CurrencyFormat from "react-currency-format";
import Axios from "./axios";
import { db } from "./firebase";
import Address from "./Address"; 

function Payment() {
  const [state, dispatch] = useStateValue();
  const history = useHistory();

  const stripe = useStripe();
  const elements = useElements();

  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");
  const [clientSecret, setClientSecret] = useState(true);

  useEffect(() => {
    // generate the special stripw secret which allows us to charge a customer
    const getClientSecret = async () => {
      const response = await Axios({
        method: "post",
        // Stripe expects the total in a currencies subunits
        url: `/payments/create?total=${getBaskeTotal(state.basket) * 100}`,
      });
      setClientSecret(response.data.clientSecret);
    };

    getClientSecret();
  }, [state.basket]);

  //console.log("The client secret >>>", clientSecret);

  const renderText = (value) => (
    <>
      <h3 className="renderText">Order Total: {value}</h3>
    </>
  );

  const handleSubmit = async (e) => {
    // do all the fancy stripe stuff...
    e.preventDefault();
    setProcessing(true);

    await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        // paymentIntent = payment confirmation
        //console.log("payment intent", paymentIntent);

        db.collection("users")
          .doc(state.user?.uid)
          .collection("orders")
          .doc(paymentIntent.id)
          .set({
            basket: state.basket,
            amount: paymentIntent.amount,
            created: paymentIntent.created,
          });

        setSucceeded(true);
        setError(null);
        setProcessing(false);

        dispatch({
          type: "EMPTY_BASKET",
        });

        history.replace("/orders");
      });
  };

  const handleChange = (e) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(e.empty);
    setError(e.error ? e.error.message : "");
  };

  const component = state.basket.map((item, i) => (
    <CheckoutProduct
      id={item.id}
      title={item.title}
      price={item.price}
      rating={item.rating}
      image={item.image}
      key={item.id + i}
      hideBtns={true}
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

  return (
    <div className="payment">
      <div className="payment__container">
        <h1>
          Checkout (<Link to="/checkout">{state.basket?.length} items</Link>)
        </h1>

        {/* payment section - delivery address */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment__address">
            {/*<p>{state.user?.email}</p>*/}
            <Address />
          </div>
        </div>

        {/* payment section - review items */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Review items and delivery</h3>
          </div>
          <div className="payment__items">
            {state.search?.length >= 3 ? filteredProducts : component}
          </div>
        </div>

        {/* payment section - payment method */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Payment Method</h3>
          </div>

          <div className="payment__details">
            {/* strip magic will go */}
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />
              <div className="payment__priceContainer">
                <CurrencyFormat
                  decimalScale={2}
                  value={getBaskeTotal(state.basket)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                  renderText={renderText}
                />
                <button disabled={processing || disabled || succeeded}>
                  <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                </button>
              </div>

              {/* Error handling */}
              {error ? <div>{error}</div> : null}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
