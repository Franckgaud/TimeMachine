import React from "react";
import axios from "axios";
import { useStripe } from "@stripe/react-stripe-js";

const Product = ({ product }) => {
  const stripe = useStripe();
  const buyNow = async () => {
    const body = {
      name: product.game_title,
      price: product.game_price,
      img: product.image_URL,
      seller_id: product.seller_stripe_id,
    };
    return axios
      .post("/api/checkout", body)
      .then(res => res.data)
      .then(session => stripe.redirectToCheckout({ sessionId: session.id }));
  };

  return (
    <div className="product-wrapper">
      <div className="nes-container is-dark with-title">
        <p className="title">{product.game_title}</p>
        <img
          className="product-image"
          src={product.image_URL}
          alt={product.game_title}
        />
        <p>Price: {product.game_price}</p>
        <section className="icon-list product-icon-wrapper">
          <p> Condition:</p>
          <i className="nes-icon is-medium heart"></i>
          <i className="nes-icon is-medium is-half heart"></i>
          <i className="nes-icon is-medium is-transparent heart"></i>
          <i className="nes-icon is-medium is-transparent heart"></i>
        </section>
        <button
          type="button"
          className="nes-btn is-success is-dark"
          onClick={() => buyNow()}
        >
          Buy Now
        </button>{" "}
      </div>
    </div>
  );
};

export default Product;
