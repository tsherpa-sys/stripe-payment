const STRIPE_API_KEY = process.env.STRIPE_API_KEY;

const Stripe = require("stripe");

console.log(STRIPE_API_KEY)

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16" // optional but recommended
});

module.exports = stripe;