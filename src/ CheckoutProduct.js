import React, { forwardRef } from "react";
import "./CheckoutProduct.css";
import { useStateValue } from "./StateProvider";

const CheckoutProduct = forwardRef((props, ref) => {
  const [state, dispatch] = useStateValue();
  //console.log("state in checkout product: ", state);

  const removeFromBasket = () => {
    // dispatch the item into the data layer
    dispatch({
      type: "REMOVE_FROM_BASKET",
      val: true,
      item: {
        id: props.id,
        title: props.title,
        image: props.image,
        price: props.price,
        rating: props.rating,
        totalItems: state.basket.length + 1,
      },
    }); 
  };

  return (
    <div className="checkoutProduct" ref={ref}>
      <img className="checkoutProduct__image" src={props.image} alt="" />

      <div className="checkoutProduct__info">
        <p className="checkoutProduct__title">{props.title}</p>
        <p className="checkoutProduct__price">
          <small>$</small>
          <strong>{props.price}</strong>
        </p>
        <div className="checkoutProduct__rating">
          {Array(props.rating)
            .fill()
            .map((_, i) => (
              <p key={props.id + i}>
                <span role="img" aria-label="star">
                  ⭐️
                </span>
              </p>
            ))}
        </div>
        {props.hideBtn || props.hideBtns || props.hideButtons ? (
          <button onClick={removeFromBasket}>Remove from basket</button>
        ) : null}
      </div>
    </div>
  );
});

export default CheckoutProduct;
