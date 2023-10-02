import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller()
export class RabbitController {
  @EventPattern('create branch')
  eventPublsihedBranch(@Payload() payload: string): void {
    console.log(JSON.parse(payload));
  }  @EventPattern('create user')
  eventPublsihedProduct(@Payload() payload: string): void {
    console.log(JSON.parse(payload));
  }  @EventPattern('create product')
  eventPublsihedUser(@Payload() payload: string): void {
    console.log(JSON.parse(payload));
  }  @EventPattern('new product inventory')
  eventPublsihedAddInventory(@Payload() payload: string): void {
    console.log(JSON.parse(payload));
  }  @EventPattern('new product sale')
  eventPublsihedsale(@Payload() payload: string): void {
    console.log(JSON.parse(payload));
  }  @EventPattern('new product re seller')
  eventPublsihed(@Payload() payload: string): void {
    console.log(JSON.parse(payload));
  }
}