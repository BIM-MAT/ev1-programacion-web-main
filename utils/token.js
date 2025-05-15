// utils/token.js
import crypto from "node:crypto";

export function generateToken() {
  return crypto.randomBytes(48).toString("hex");
}
