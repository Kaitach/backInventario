/* eslint-disable prettier/prettier */
/**
 * The function takes a number as an argument and returns true if the number is a valid phone number,
 * otherwise it returns false.
 * @param {number} value - number - the value to be validated
 * @returns A function that takes a number and returns a boolean.
 */
export const isPhone= (value:number): boolean => {

    const PhoneRegExp = /^\+?\d{1,3}[\s.-]?\(?\d{1,4}\)?[-\s\.]?\d{1,4}[-\s\.]?\d{1,4}[-\s\.]?\d{1,4}$/
    const phoneString = value.toString()
    const matches = phoneString.match(PhoneRegExp)
    return matches !== null? true : false
    
}
