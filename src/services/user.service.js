import * as userRepo from "../repositories/user.repository.js";

export async function registerUser(data) {
  const existing = await userRepo.findUserByEmail(data.email);

  if (existing) {
    throw new Error("User already exists");
  }

  return userRepo.createUser(data);
}
