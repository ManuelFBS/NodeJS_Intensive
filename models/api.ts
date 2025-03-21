/**
 * Enumeración de métodos HTTP soportados
 * @enum {string}
 */
export enum httpMethod {
    /** Solicitud GET para obtener recursos */
    'GET' = 'GET',
    /** Solicitud POST para crear nuevos recursos */
    'POST' = 'POST',
    /** Solicitud PUT para actualizar recursos existentes */
    'PUT' = 'PUT',
    /** Solicitud DELETE para eliminar recursos */
    'DELETE' = 'DELETE',
    /** Solicitud PATCH para actualizaciones parciales */
    'PATCH' = 'PATCH',
    /** Solicitud OPTIONS para obtener metadatos */
    'OPTIONS' = 'OPTIONS',
    /** Solicitud HEAD para obtener headers sin cuerpo */
    'HEAD' = 'HEAD',
    /** Solicitud TRACE para diagnóstico */
    'TRACE' = 'TRACE',
    /** Solicitud CONNECT para establecer túnel */
    'CONNECT' = 'CONNECT',
}
