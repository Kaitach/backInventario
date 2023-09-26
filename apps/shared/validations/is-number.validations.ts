/* eslint-disable prettier/prettier */

export const isNumber= (value:number): boolean => {

    const numberRegExp = /^\d+$/;
    const number = value.toString()
    const matches = number.match(numberRegExp)
    return matches !== null? true : false
    
}
