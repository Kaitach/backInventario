/* eslint-disable prettier/prettier */
/**
 * It takes a string and returns true if it's a valid UUID, false if it's not
 * @param {string} value - The value to be validated.
 */
export const IsUuid= (value:string): boolean => {

    const  uuidRegExp = /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
    const matches = value.match(uuidRegExp)
    return matches !== null? true : false
}
