import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto";

/** Hashes a volunteer password using scrypt with a unique 16-byte salt. */
export function hashPassword(password: string): string {
  const salt = randomBytes(16);
  return `${salt.toString("hex")}:${scryptSync(password, salt, 32).toString("hex")}`;
}

/** Verifies a plaintext password against a stored scrypt hash in constant time. */
export function verifyPassword(password: string, stored: string): boolean {
  try {
    const [salt, hash] = stored.split(":");
    const calc = scryptSync(password, Buffer.from(salt, "hex"), 32);
    return timingSafeEqual(calc, Buffer.from(hash, "hex"));
  } catch {
    return false;
  }
}

// Backwards-compatible aliases
export const hashPin = hashPassword;
export const verifyPin = verifyPassword;
