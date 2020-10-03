import React, { useState, useEffect } from "react";
import "./Orders.css";
import { db } from "./firebase";
import { useStateValue } from "./StateProvider";
import Order from "./Order";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [state] = useStateValue();

  useEffect(() => {
    if (state?.user) {
      db.collection("users")
        .doc(state.user?.uid)
        .collection("orders")
        .orderBy("created", "desc")
        .onSnapshot((snapshot) => {
          //console.log("snapshot", snapshot);
          setOrders(
            snapshot.docs.map((doc) => {
              //console.log("doc >>>>>>>", doc);
              return {
                id: doc.id,
                data: doc.data(),
              };
            })
          );
        });
    } else {
      setOrders([]);
    }
  }, [state.user]);

  const showOrders = orders.map((item) => ({
    data: item.data,
    ids: item.id,
  }));
  // console.log("showOrders", showOrders);

  const orderComponent = showOrders?.map((item, i) => (
    <Order
      key={i + item.data.created}
      order={item.data.basket}
      create={item.data.created}
      amount={item.data.amount}
      id={item.ids}
    />
  ));

  return (
    <div className="orders">
      <h1>Your Orders</h1>

      <div className="orders__order">{orderComponent}</div>
    </div>
  );
}

export default Orders;
