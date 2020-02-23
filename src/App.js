import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import StripeCheckout from "react-stripe-checkout";

function App() {
  const [product, setProduct] = useState({
    name: "React",
    price: 10,
    productBy: "fackbook"
  });

  const makePayment = token => {
    console.log({ token });
    const body = {
      token,
      product
    };
    const headers = { "Content-Type": "application/json" };

    return fetch(`http://localhost:3009/payment`, {
      method: "POST",
      headers,
      body: JSON.stringify(body)
    })
      .then(response => {
        console.log({ response });
        const { status } = response;
        console.log({ status });
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <StripeCheckout
          stripeKey="YOUR-STRIPE-PUBLISH-KEY"
          token={token => makePayment(token)}
          name="Buy React"
          amount={product.price * 100}
        >
          <button type="button" class="btn btn-primary">
            Pay with Card
          </button>
        </StripeCheckout>
      </header>
    </div>
  );
}

export default App;
