/**
 * ~ Conjunto que almacena los tokens revocados
 */
const revokedTokens: Set<string> = new Set();

/**
 * ~ Agrega un token a la lista de tokens revocados
 * @param {string} token - Token JWT a revocar
 */
export const addRevokeToken = (token: string): void => {
    revokedTokens.add(token);
};

/**
 * ~ Verifica si un token está revocado
 * @param {string} token - Token JWT a verificar
 * @returns {boolean} true si el token está revocado, false en caso contrario
 */
export const isTokenRevoked = (token: string): boolean => {
    return revokedTokens.has(token);
};
