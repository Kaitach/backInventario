/* eslint-disable prettier/prettier */
import {  IProductEntity } from "../../entities";
export class newProductCommand {
    constructor(public readonly productEntity: IProductEntity) {}
  }
  