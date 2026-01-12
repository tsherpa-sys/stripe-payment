import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
 {
  _id: ObjectId("..."),      // your user ID
  email: "user@email.com",
  name: "John",

  stripeCustomerId: "cus_123",

  subscriptionStatus: "paid", // or "active", "free"
  lastCheckoutSessionId: "cs_test_...",
  lastPaymentAt: ISODate("..."),

  createdAt,
  updatedAt
}
);

export const Customer = mongoose.model("User", userSchema);
