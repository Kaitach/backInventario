/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */

export interface  CommandBus{
execute(exchange: string, routeingKey:string, data: any, branchId:string): any
}