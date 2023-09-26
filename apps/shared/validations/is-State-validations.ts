/* eslint-disable prettier/prettier */
/**
 * It checks if the value is one of the three options in the regexp
 * @param {string} value - the value of the cell
 * @returns A function that takes a string and returns a boolean.
 */
export const isState= (value:string): boolean => {

    enum state{
        Finalizado = 1,
        "En emision" = 2,
        cancelado = 3,
        'En espera' = 4
      }
    const StateRegExp = new RegExp(`^(${Object.values(state).join('|')})$`);
    const matches = value.match(StateRegExp)
    return matches !== null? true : false
    
}
