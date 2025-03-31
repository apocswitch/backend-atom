import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "tu_clave_secreta";
const EXPIRES_IN = "1h";

export function generateToken(userId: string): string {
  return jwt.sign({sub: userId}, JWT_SECRET, {expiresIn: EXPIRES_IN});
}

export function verifyToken(token: string): string | object {
  return jwt.verify(token, JWT_SECRET);
}
