const express = require("express");
const controller = require("../controllers/payment.controller");
const stripeWebhook = require("../middlewares/stripeWebhook");

const router = express.Router();


//router.post("/", stripeWebhook, controller.handleWebhook);

// webhook (raw body)
router.post("/", stripeWebhook, controller.handleWebhook);

// normal API
router.post("/checkout", controller.createCheckoutSession);

module.exports = {
  webhook: router,
  api: router
};