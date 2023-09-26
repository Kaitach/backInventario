/* eslint-disable prettier/prettier */
/**
 *  
 * It checks if the value is a string and returns true or false
 * @param {string} value - The value to be validated.
 * @returns A function that takes a string and returns a boolean.
 */
export const isString= (value:string): boolean => {

    const stringRegExp = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
    const matches = value.match(stringRegExp)
    return matches !== null? true : false

}
