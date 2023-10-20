import { SaleServiceBD } from './../database/mysql/services/saleBd.service';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';

import {  RegisterSaleDTO, RegisterquantityDTO } from '../utils';
import { UUID } from 'crypto';
import { BranchDelegate, productDelegate, userDelegate } from '../../';
import { branchServiceBD, productServiceBD, userDBService } from '../database';

@Injectable()
export class MyRabbitSubscriber {
  private readonly useCaseBranch: BranchDelegate;
  private readonly useCaseuser: userDelegate;
  private readonly useCaseProduct: productDelegate;


  constructor(
    private readonly branchService: branchServiceBD,
    private readonly userService: userDBService,
    private readonly productService: productServiceBD,
    private readonly saleServiceBD: SaleServiceBD
  ) {
    this.useCaseBranch = new BranchDelegate(this.branchService); 
    this.useCaseuser = new userDelegate(this.userService,this.branchService ); 
    this.useCaseProduct = new productDelegate(this.productService,this.branchService); 


  }

  @RabbitSubscribe({
    exchange: 'branch',
    routingKey: 'BranchRegister',
        queue: 'BranchRegister'

  })
  newBranch(message: any) {
    try {
      const parsedMessage = JSON.parse(message);
      console.log('Mensaje recibido:', parsedMessage);
      this.useCaseBranch.registerBranch();
       this.useCaseBranch.execute(parsedMessage);
    } catch (error) {}
  }

  @RabbitSubscribe({
    exchange: 'user',
    routingKey: 'new.User',
    queue: 'new.User'

  })
  newUSer(message: any) {

    try {
      const parsedMessage = JSON.parse(message);
      console.log('Mensaje aca :', parsedMessage);

      this.useCaseuser.registerUser();
      this.useCaseuser.execute(parsedMessage);
    } catch (error) {}
  }





  @RabbitSubscribe({
    exchange: 'productInventory',
    routingKey: 'newProductReSeller',
    queue: 'newProductReSeller'

  })
  newProdutReseller(message: any) {
    try {
      const parsedMessage = JSON.parse(message) as RegisterSaleDTO;
      console.log('Mensaje recibido:', parsedMessage);
  
      
            this.useCaseProduct.registerResellerSale()
               
                 this.useCaseProduct.execute( {
                  productId: parsedMessage.productId as UUID,
                  quantity: parsedMessage.quantity,
                  name: parsedMessage.name,
                  description: parsedMessage.description,
                  price: parsedMessage.price,
                  category: parsedMessage.category,
                });
              }
    catch (error) {
      console.error('Error:', error);
    }
  }
  



  @RabbitSubscribe({
    exchange: 'productInventory',
    routingKey: 'productRegister',
    queue: 'productRegister'

  })
  newProdut(message: any) {
    try {
      const parsedMessage = JSON.parse(message);
      this.useCaseProduct.registerProduct()
      this.useCaseProduct.execute(parsedMessage)
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
      console.log('Mensaje nuevo inventorio:', parsedMessage);

             this.useCaseProduct.registerquantity()
             
                 this.useCaseProduct.execute( {
                  productId: parsedMessage.productId as UUID,
                  quantity: parsedMessage.quantity,
                  branchId: parsedMessage.branchId,
                  name: parsedMessage.name,
                  price: parsedMessage.price,
                });
             
  }catch (error) {
    console.error('Error:', error);
  }
  }


  @RabbitSubscribe({
    exchange: 'productInventory',
    routingKey: 'new.product.customerSale',
    queue: 'new.product.customerSale'

  })
  newProdutCustomerSale(message: any) {
    try {
      const parsedMessage = JSON.parse(message) as RegisterSaleDTO;
      console.log('Mensaje recibido:', parsedMessage);
  
   
        
            this.useCaseProduct.registerCustomerSale(),
            this.useCaseProduct.execute({
                  productId: parsedMessage.productId as UUID,
                  quantity: parsedMessage.quantity,
                })
        
   
      
    } catch (error) {
      console.error('Error:', error);
    }
  }
  


@RabbitSubscribe({
  exchange: 'branch',
  routingKey: 'saleEvent',
  queue: 'saleEvent'

})newSaleEvent(message: any) {
  
    const parsedMessage = JSON.parse(message) ;
    console.log('Mensaje recibido:', parsedMessage);

    this.saleServiceBD.saveSales(parsedMessage)
  }

  @RabbitSubscribe({
    exchange: 'productInventory',
    routingKey: 'productreturn',
    queue: 'productreturn'
  
  })returnSaleEvent(message: any) {
    
      const parsedMessage = JSON.parse(message) ;
      console.log('Mensaje recibido:', parsedMessage);
  
      this.saleServiceBD.saveSales(parsedMessage)
    }
}
