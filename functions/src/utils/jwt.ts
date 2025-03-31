import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "tu_clave_secreta";
const EXPIRES_IN = "1h";

/**
 * Genera un token JWT para un usuario dado.
 *
 * @param {string} userId - El ID del usuario para incluir en el token.
 * @return {string} Token JWT generado.
 */
export function generateToken(userId: string): string {
  return jwt.sign({sub: userId}, JWT_SECRET, {expiresIn: EXPIRES_IN});
}

/**
 * Verifica un token JWT y devuelve su contenido decodificado.
 *
 * @param {string} token - El token JWT a verificar.
 * @return {string | object} El contenido decodificado si el token es válido.
 * @throws {Error} Si el token es inválido o ha expirado.
 */
export function verifyToken(token: string): string | object {
  return jwt.verify(token, JWT_SECRET);
}
