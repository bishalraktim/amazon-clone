import React from "react";
import "./Product.css";
import { useStateValue } from "./StateProvider";

function Product(props) {
  const ratings = Array(props.rating)
    .fill()
    .map((_, i) => (
      <p key={i + props.id}>
        <span role="img" aria-label="star"> 
          ⭐️
        </span>
      </p>
    ));  

  //const [state] = useStateValue();
  const [{ basket }, dispatch] = useStateValue();

  const addToBasket = () => {
    // dispatch the item into the data layer
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id: props.id,
        title: props.title,
        image: props.image,
        price: props.price,
        rating: props.rating,
        totalItems: basket.length + 1,
      },
    });
  };

  return (
    <div className="product">
      <div className="product__info">
        <p>{props.title}</p>
        <p className="product__price">
          <small>$</small>
          <strong>{props.price}</strong>
        </p>

        <div className="product__rating">{ratings}</div>
      </div>
      <img src={props.image} alt="" />
      <button onClick={addToBasket}>Add to basket</button>
    </div>
  );
}

export default Product;  
