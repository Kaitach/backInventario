/* eslint-disable prettier/prettier */
/**
 * It checks if the value is one of the three options in the regexp
 * @param {string} value - the value of the cell
 * @returns A function that takes a string and returns a boolean.
 */
export const isUserRol= (value:number): boolean => {


    enum rol {
        Admin = 1,
        Seller = 2,
        SuperAdmin = 3,
      }

   const isuserRolRegExp = new RegExp(`^(${Object.values(rol).join('|')})$`);
   const userRol = value.toString()
    const matches = userRol.match(isuserRolRegExp)
    return matches !== null? true : false
    
}
