/**
 * ~ Configuración global de la aplicación
 * @property {string} jwtSecret - Clave secreta para firmar y verificar tokens JWT
 */
export const config = {
    jwtSecret:
        (process.env.JWT_SECRET as string) ||
        'My_Secret_Key',
};

export default config;
