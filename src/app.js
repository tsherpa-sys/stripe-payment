const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./docs/swagger.json");

const paymentRoutes = require("./routes/payment.routes.js");

const app = express();

// ❗ webhook route must come BEFORE json middleware
// app.use("/webhook", paymentRoutes.webhook);
app.use("/webhook", paymentRoutes.webhook);

// Normal JSON parsing
app.use(express.json());

// API routes
app.use("/api", paymentRoutes.api);

// Swagger
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Health check
app.get("/api", (req, res) => {
  res.json({ message: "Payment service is running 🚀" });
});

module.exports = app;
