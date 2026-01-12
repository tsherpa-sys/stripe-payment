import { Customer } from "../models/customer.model.js";

export function createCustomer(data) {
  return Customer.create(data);
}

export function findCustomerByEmail(email) {
  return Customer.findOne({ email });
}