import jwt from "jsonwebtoken";
import {defineSecret} from "firebase-functions/params";

// ✅ Declarar el secreto correctamente
export const jwtSecret = defineSecret("JWT_SECRET");

const ACCESS_EXPIRES_IN = "1h";
const REFRESH_EXPIRES_IN = "7d";

/**
  * Genera un token de acceso (JWT) con expiración corta.
  *
  * @param {string} userId - ID del usuario para incluir en el token.
  * @return {string} Token de acceso generado.
  */
export function generateAccessToken(userId: string): string {
  return jwt.sign({sub: userId}, jwtSecret.value(), {
    expiresIn: ACCESS_EXPIRES_IN,
  });
}

/**
 * Verifica un refresh token.
 * @param {string} token
 * @return {string | object} Token de acceso generado.
 */
export function verifyRefreshToken(token: string): string | object {
  return jwt.verify(token, jwtSecret.value());
}

/**
 * Genera un token de refresh con expiración prolongada.
 * @param {string} userId - ID del usuario para incluir en el token.
 * @return {string} refreshToken generado.
 */
export function generateRefreshToken(userId: string): string {
  return jwt.sign({sub: userId}, jwtSecret.value(), {
    expiresIn: REFRESH_EXPIRES_IN,
  });
}

/**
 * Verifica un token de acceso o refresh y devuelve el contenido.
 * @param {string} token
 * @return {string | object} verifyToken result.
 */
export function verifyToken(token: string): string | object {
  return jwt.verify(token, jwtSecret.value());
}

/**
 * Decodifica un token sin verificar la firma.
 * @param {string} token
 * @return {string | object} decodeToken result.
 */
export function decodeToken(token: string): null | { sub: string } {
  try {
    const decoded = jwt.decode(token) as { sub: string };
    return decoded;
  } catch {
    return null;
  }
}
