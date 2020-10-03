import React from "react";
import "./Home.css";
import Product from "./Product";
import { useStateValue } from "./StateProvider";

function Home() {
  const [state] = useStateValue();
  const homeImage =
    "https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg";
  const data = [
    {
      id: "012",
      title:
        "The Lean Startup: How Constant Innovation Creates Radically Successful Businesses Paperback",
      price: 11.96,
      rating: 5,
      image:
        "https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._SX325_BO1,204,203,200_.jpg",
    },
    {
      id: "345",
      title:
        "Kenwood kMix Stand Mixer for Baking, Stylish Kitchen Mixer with K-beater, Dough Hook and Whisk, 5 Litre Glass Bowl",
      price: 239,
      rating: 4,
      image:
        "https://images-na.ssl-images-amazon.com/images/I/81O%2BGNdkzKL._AC_SX450_.jpg",
    },
    {
      id: "678",
      title: "Samsung LC49RG90SSUXEN 49' Curved LED Gaming Monitor",
      price: 199.99,
      rating: 3,
      image:
        "https://images-na.ssl-images-amazon.com/images/I/71Swqqe7XAL._AC_SX466_.jpg",
    },
    {
      id: "910",
      title:
        "Amazon Echo (3rd generation) | Smart speaker with Alexa, Charcoal Fabric",
      price: 98.99,
      rating: 5,
      image:
        "https://media.very.co.uk/i/very/P6LTG_SQ1_0000000071_CHARCOAL_SLf?$300x400_retinamobilex2$",
    },
    {
      id: "112",
      title:
        "New Apple iPad Pro (12.9-inch, Wi-Fi, 128GB) - Silver (4th Generation)",
      price: 598.99,
      rating: 4,
      image:
        "https://images-na.ssl-images-amazon.com/images/I/816ctt5WV5L._AC_SX385_.jpg",
    },
    {
      id: "114",
      title:
        "Samsung LC49RG90SSUXEN 49' Curved LED Gaming Monitor - Super Ultra Wide Dual WQHD 5120 x 1440",
      price: 1094.98,
      rating: 4,
      image:
        "https://images-na.ssl-images-amazon.com/images/I/6125mFrzr6L._AC_SX355_.jpg",
    },
  ];

  let filteredProducts;
  if (state.search?.length >= 3) {
    filteredProducts = data
      .filter((prod) => prod.title.toLowerCase().includes(state.search))
      .map((item, i) => (
        <Product
          id={item.id}
          title={item.title}
          price={item.price}
          rating={item.rating}
          image={item.image}
          key={i + item.id}
        />
      ));
  }

  return (
    <div className="home">
      <div className="home__container">
        <img className="home__image" src={homeImage} alt="" />
      </div>
      {state.search?.length >= 3 ? (
        <div className="home__row">{filteredProducts}</div>
      ) : (
        <>
          <div className="home__row">
            <Product
              id={data[0].id}
              title={data[0].title}
              price={data[0].price}
              rating={data[0].rating}
              image={data[0].image}
            />
            <Product
              id={data[1].id}
              title={data[1].title}
              price={data[1].price}
              rating={data[1].rating}
              image={data[1].image}
            />
          </div>

          <div className="home__row">
            <Product
              id={data[2].id}
              title={data[2].title}
              price={data[2].price}
              rating={data[2].rating}
              image={data[2].image}
            />
            <Product
              id={data[3].id}
              title={data[3].title}
              price={data[3].price}
              rating={data[3].rating}
              image={data[3].image}
            />
            <Product
              id={data[4].id}
              title={data[4].title}
              price={data[4].price}
              rating={data[4].rating}
              image={data[4].image}
            />
          </div>

          <div className="home__row">
            <Product
              id={data[5].id}
              title={data[5].title}
              price={data[5].price}
              rating={data[5].rating}
              image={data[5].image}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default Home;
