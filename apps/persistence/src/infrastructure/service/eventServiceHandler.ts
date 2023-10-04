import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
import { BranchController, UserController } from '../controller';
import { ProductController } from '../controller/product.controller';
import {  RegisterSaleDTO, RegisterquantityDTO } from '../utils';
import { Observable, switchMap } from 'rxjs';
import { UUID } from 'crypto';

@Injectable()
export class MyRabbitSubscriber {
  constructor(
    private readonly branchController: BranchController,
    private readonly usercontroller: UserController,
    private readonly productcontroller: ProductController,
  ) {}

  @RabbitSubscribe({
    exchange: 'branch',
    routingKey: 'BranchRegister',
  })
  newBranch(message: any) {
    try {
      const parsedMessage = JSON.parse(message);
      console.log('Mensaje recibido:', parsedMessage);

      this.branchController.registerBranch(parsedMessage);
    } catch (error) {}
  }

  @RabbitSubscribe({
    exchange: 'user',
    routingKey: 'new.User',
  })
  newUSer(message: any) {

    try {
      const parsedMessage = JSON.parse(message);
      console.log('Mensaje aca :', parsedMessage);

      this.usercontroller.registerUser(parsedMessage);
    } catch (error) {}
  }





  @RabbitSubscribe({
    exchange: 'productInventory',
    routingKey: 'newProductReSeller',
    queue: 'directRabbit',
  })
  newProdutReseller(message: any) {
    try {
      const parsedMessage = JSON.parse(message) as RegisterSaleDTO;
      console.log('Mensaje recibido:', parsedMessage);
  
      this.productcontroller.findById(parsedMessage.productId)
        .pipe(
          switchMap(() => {
            return this.productcontroller.registerResellerSale({
              productId: parsedMessage.productId as UUID,
              quantity: parsedMessage.quantity,
            } as RegisterSaleDTO );
          })
        )
        .subscribe(
          (result) => {
            console.log('Resultado:', result);
          },
          (error) => {
            console.error('Error:', error);
          }
        );
    } catch (error) {
      console.error('Error:', error);
    }



  }



  @RabbitSubscribe({
    exchange: 'productInventory',
    routingKey: 'productRegister',
  })
  newProdut(message: any) {
    try {
      const parsedMessage = JSON.parse(message);

      this.productcontroller.registerProduct(parsedMessage);
    } catch (error) {}
  }






  @RabbitSubscribe({
    exchange: 'productInventory',
    routingKey: 'new.productInventory',
  })
  newProductInventory(message: any) {
    try {
      const parsedMessage = JSON.parse(message) as RegisterquantityDTO;
      console.log('Mensaje recibido:', parsedMessage);
  
      this.productcontroller.findById(parsedMessage.productId)
        .pipe(
          switchMap(() => {
            return this.productcontroller.registerquantity({
              productId: parsedMessage.productId as UUID,
              quantity: parsedMessage.quantity,
            } as RegisterquantityDTO );
          })
        )
        .subscribe(
          (result) => {
            console.log('Resultado:', result);
          },
          (error) => {
            console.error('Error:', error);
          }
        );
    } catch (error) {
      console.error('Error:', error);
    }
  }




  @RabbitSubscribe({
    exchange: 'productInventory',
    routingKey: 'new.product.customerSale',
  })
  newProdutCustomerSale(message: any) {
    try {
      const parsedMessage = JSON.parse(message) as RegisterSaleDTO;
      console.log('Mensaje recibido:', parsedMessage);
  
      this.productcontroller.findById(parsedMessage.productId)
        .pipe(
          switchMap(() => {
            return this.productcontroller.registerCustomerSale({
              productId: parsedMessage.productId as UUID,
              quantity: parsedMessage.quantity,
            } as RegisterSaleDTO );
          })
        )
        .subscribe(
          (result) => {
            console.log('Resultado:', result);
          },
          (error) => {
            console.error('Error:', error);
          }
        );
    } catch (error) {
      console.error('Error:', error);
    }
}
}