import { Model } from "mongoose";
import { userRepository } from "../../database";
import { BranchHandler } from "../handler";

describe('BranchHandler', () => {
  let branchHandler: BranchHandler;
  let UserRepository: userRepository; 
  let userModel: Model<any>;
 
  beforeEach(() => {
    userModel = {} as Model<any>; 
    userModel.aggregate = jest.fn();
    

   

    branchHandler = new BranchHandler(UserRepository);
  });

  it('debe estar definido', () => {
    expect(branchHandler).toBeDefined();
  });

  describe('newBranch', () => {
    it('debe procesar un mensaje correctamente', () => {
      const parsedMessage = { /* datos del mensaje */ };
      const message = JSON.stringify(parsedMessage);

      const useCaseExecuteSpy = jest.spyOn(branchHandler.useCase, 'execute');
      branchHandler.newBranch(message);

      expect(useCaseExecuteSpy).toHaveBeenCalledWith(parsedMessage);
    });

   
  });
});
