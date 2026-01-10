
require("dotenv").config(); // 👈 FIRST LINE

const express = require("express");
const stripe = require("./services/strpe");

const app = express();
const PORT = process.env.PORT || 3000;


app.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  (req, res) => {


    console.log(Buffer.isBuffer(req.body)); // must be true)
    const sig = req.headers["stripe-signature"];

    let event;
    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.error("Webhook signature failed:", err.message);
      return res.status(400).send("Webhook Error");
    }

    console.log("Stripe event:", event.type);

    if (event.type === "checkout.session.completed") {
      //payment succeded
      // update the DB or something
      const session = event.data.object;
      console.log("Payment confirmed:", session.id);
    }

    res.json({ received: true });
  }
);

// Middleware to parse JSON
app.use(express.json());

// swagger
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./docs/swagger.json");

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Health check
app.get("/api", (req, res) => {
  res.json({ message: "Payment service is running 🚀" });
});

// basic checkout route 
app.post("/api/checkout", async (req, res) => {
  try {
    const {amount, description} = req.body;
    console.log(amount,description)
    const session = await stripe.checkout.sessions.create({
      
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "USD",
            product_data: {
              name: description
            },
            unit_amount: amount// $25.00 (in cents)
          },
          quantity: 1
        }
      ],
      success_url: "http://localhost:3000/api/payment-result",
      cancel_url: "https://example.com/cancel"
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});


// Start server
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
    