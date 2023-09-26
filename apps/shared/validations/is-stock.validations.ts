/* eslint-disable prettier/prettier */
/**
 * It checks if the value is one of the three options in the regexp
 * @param {string} value - the value of the cell
 * @returns A function that takes a string and returns a boolean.
 */
export const isStock= (value:number): boolean => {

    const numberRegExp = /^\d+$/
    const number = value.toString()
    const matches = number.match(numberRegExp)
    return matches !== null? true : false
    
}
