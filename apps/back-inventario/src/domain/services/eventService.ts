/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */

import { SaleEntity } from "../entities/sale.entity"

export interface  CommandBus{
registerAddInventory(exchange: string, routeingKey:string, data: any, branchId:string): any
registerSellerSale(exchange: string, routeingKey:string, data: any, branchId:string): any
registerCustomerSale(exchange: string, routeingKey:string, data: any, branchId:string): any
registerProduct(exchange: string, routeingKey:string, data: any, branchId:string): any
registerBranch(exchange: string, routeingKey:string, data: any, branchId:string): any
registerUser(exchange: string, routeingKey:string, data: any, branchId:string): any
registerSale(exchange: string, routeingKey:string, data: any, branchId:string): any
returnAddInventory(exchange: string, routeingKey:string, data: any, branchId:string, saleId:SaleEntity): any

}