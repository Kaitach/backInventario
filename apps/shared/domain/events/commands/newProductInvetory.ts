/* eslint-disable prettier/prettier */
import {  IProductEntity } from "../../entities";
export class newProductInventoryCommand {
    constructor(public readonly productEntity: IProductEntity) {}
  }
  