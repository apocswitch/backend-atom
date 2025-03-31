import jwt from "jsonwebtoken";
import * as functions from "firebase-functions";

const JWT_SECRET = functions.config().jwt?.secret || "tu_clave_secreta";
const ACCESS_EXPIRES_IN = "1h";
const REFRESH_EXPIRES_IN = "7d";

/**
 * Genera un token de acceso (JWT) con expiración corta.
 *
 * @param {string} userId - ID del usuario para incluir en el token.
 * @return {string} Token de acceso generado.
 */
export function generateAccessToken(userId: string): string {
  return jwt.sign({sub: userId}, JWT_SECRET, {
    expiresIn: ACCESS_EXPIRES_IN,
  });
}

/**
 * Verifica un refresh token.
 *
 * @param {string} token - Token de refresh a verificar.
 * @return {string | object} Payload decodificado si es válido.
 * @throws {Error} Si el token es inválido o expiró.
 */
export function verifyRefreshToken(token: string): string | object {
  return jwt.verify(token, JWT_SECRET);
}

/**
 * Genera un token de refresh con expiración prolongada.
 *
 * @param {string} userId - ID del usuario para incluir en el token.
 * @return {string} Token de refresh generado.
 */
export function generateRefreshToken(userId: string): string {
  return jwt.sign({sub: userId}, JWT_SECRET, {
    expiresIn: REFRESH_EXPIRES_IN,
  });
}

/**
 * Verifica un token de acceso o refresh y devuelve el contenido.
 *
 * @param {string} token - Token JWT a verificar.
 * @return {string | object} Información decodificada del token.
 */
export function verifyToken(token: string): string | object {
  return jwt.verify(token, JWT_SECRET);
}

/**
 * Decodifica un token sin verificar la firma.
 *
 * @param {string} token - Token JWT a decodificar.
 * @return {null | { sub: string }} - Payload decodificado o null.
 */
export function decodeToken(
  token: string
): null | { sub: string } {
  try {
    const decoded = jwt.decode(token) as { sub: string };
    return decoded;
  } catch {
    return null;
  }
}
