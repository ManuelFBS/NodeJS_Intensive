import {
    minLength,
    number,
    object,
    pipe,
    set,
    string,
    type InferInput,
} from 'valibot';

/**
 * ~ Schema de validación para un personaje
 * + Define la estructura y validaciones requeridas para los datos de un personaje
 */
export const CharacterSchema = object({
    name: pipe(string(), minLength(6)),
    lastName: pipe(string(), minLength(6)),
});

/**
 * ~ Tipo que representa un personaje
 * + Extiende el schema con un ID numérico
 */
export type Character = InferInput<
    typeof CharacterSchema
> & { id: number };

/**
 * ~ Almacenamiento en memoria de los personajes usando un Map
 * */
const characters: Map<number, Character> = new Map();

/**
 * ~ Obtiene todos los personajes almacenados
 * @returns {Character[]} Array con todos los personajes
 */
export const getAllCharacters = (): Character[] => {
    return Array.from(characters.values());
};

/**
 * ~ Busca un personaje por su ID
 * @param {number} id - ID del personaje a buscar
 * @returns {Character | undefined} El personaje encontrado o undefined si no existe
 */
export const getCharacterById = (
    id: number,
): Character | undefined => {
    return characters.get(id);
};

/**
 * ~ Agrega un nuevo personaje
 * @param {Character} character - Datos del personaje a agregar
 * @returns {Character} El personaje creado con su nuevo ID
 */
export const addCharacter = (
    character: Character,
): Character => {
    const newCharacter = {
        ...character,
        id: new Date().getTime(),
    };

    characters.set(newCharacter.id, newCharacter);

    return newCharacter;
};

/**
 * ~ Actualiza los datos de un personaje existente
 * @param {number} id - ID del personaje a actualizar
 * @param {Character} updatedCharacter - Nuevos datos del personaje
 * @returns {Character | null} El personaje actualizado o null si no se encuentra
 */
export const updateCharacter = (
    id: number,
    updatedCharacter: Character,
): Character | null => {
    if (!characters.has(id)) {
        console.error(
            'Character with id: ',
            id,
            ' not found...!',
        );
        return null;
    }

    characters.set(id, updatedCharacter);

    return updatedCharacter;
};

/**
 * ~ Elimina un personaje por su ID
 * @param {number} id - ID del personaje a eliminar
 * @returns {boolean} true si se eliminó correctamente, false si no se encontró
 */
export const deleteCharacter = (id: number): boolean => {
    if (!characters.has(id)) {
        console.log(
            'Character with id: ',
            id,
            ' not found...!',
        );
        return false;
    }

    characters.delete(id);

    return true;
};
