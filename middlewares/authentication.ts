import type { IncomingMessage, ServerResponse } from 'http';
import { verify, type JwtPayload } from 'jsonwebtoken';
import { isTokenRevoked } from '../models';
import config from '../config';

/**
 * ~ Extiende la interfaz IncomingMessage para incluir información del usuario autenticado
 */
export interface AuthenticatedRequest
    extends IncomingMessage {
    user?: JwtPayload | string;
}

/**
 * ~ Middleware para verificar la autenticación mediante token JWT
 * @param {AuthenticatedRequest} req - Objeto de solicitud HTTP extendido
 * @param {ServerResponse} res - Objeto de respuesta HTTP
 * @returns {Promise<boolean>} true si la autenticación es exitosa, false en caso contrario
 * @throws {Error} Si hay un error al verificar el token
 */
export const authenticatedToken = async (
    req: AuthenticatedRequest,
    res: ServerResponse,
): Promise<boolean> => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        res.statusCode = 401;
        res.end(JSON.stringify({ message: 'Forbidden' }));
        return false;
    }

    if (isTokenRevoked(token)) {
        res.statusCode = 403;
        res.end(JSON.stringify({ message: 'Forbidden' }));
        return false;
    }

    try {
        const decoded = verify(token, config.jwtSecret);

        req.user = decoded;

        return true;
    } catch (_err) {
        res.statusCode = 403;
        res.end(JSON.stringify({ message: 'Forbidden' }));
        return false;
    }
};
