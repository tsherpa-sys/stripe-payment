const stripe = require("../services/stripe.service");

exports.handleWebhook = (req, res) => {
 
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
    const session = event.data.object;
    console.log("Payment confirmed:", session.id);
    // 👉 DB update goes here later
  }

  res.json({ received: true });
};

exports.createCheckoutSession = async (req, res) => {
  try {
    const { amount, description } = req.body;

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "USD",
            product_data: { name: description },
            unit_amount: amount
          },
          quantity: 1
        }
      ],
      success_url: "https://tlchero.com/",
      cancel_url: "https://tlchero.com/"
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};