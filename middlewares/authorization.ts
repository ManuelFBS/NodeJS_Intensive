import type { ServerResponse } from 'http';
import type { AuthenticatedRequest } from './authentication';
import type { User } from '../models';

/**
 * ~ Middleware de autorización basado en roles
 * @param {...string} roles - Lista de roles permitidos
 * @returns {Function} Middleware que verifica si el usuario tiene los roles necesarios
 * @example
 * + Uso: authorizeRoles('admin', 'moderator')
 */
export const authorizeRoles = (...roles: string[]) => {
    /**
     * @param {AuthenticatedRequest} req - Objeto de solicitud HTTP autenticado
     * @param {ServerResponse} res - Objeto de respuesta HTTP
     * @returns {Promise<boolean>} true si el usuario tiene el rol permitido, false en caso contrario
     */
    return async (
        req: AuthenticatedRequest,
        res: ServerResponse,
    ): Promise<boolean> => {
        const userRole = (req.user as User).role;

        if (!userRole || !roles.includes(userRole)) {
            res.statusCode = 403;
            res.end(
                JSON.stringify({ message: 'Forbidden' }),
            );

            return false;
        }

        return true;
    };
};
