require("dotenv").config();

const functions = require("firebase-functions");

const express = require("express");
const cors = require("cors");
const { request } = require("http");
const { response } = require("express");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// API

// - APP config
const app = express();

// - Middleware
app.use(cors({ origin: true }));
app.use(express.json());

// - API routes
app.get("/", (request, response) => response.status(200).send("hello world"));

app.post("/payments/create", async (request, response) => {
  const total = request.query.total;

  //console.log("Payment req received with total amt", total);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total, // subunits of the currency
    currency: "aud",
  });

  // OK - Created
  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

// - Listen command
exports.api = functions.https.onRequest(app);

// Example endpoint
// Base URL in Front End (Axios)
