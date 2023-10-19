import { TestingModule, Test } from "@nestjs/testing";
import { Observable, of } from "rxjs";
import { BranchDelegate } from "../../../application";
import { MessagingService } from "../../../infrastructure/events";
import { infrastuctureBranchService } from "../../../infrastructure/service";
import { AuthGuard, RegisterBranchDto, SuperAdminGuard } from "../../../infrastructure/utils";
import { BranchController } from "../branch.controller";

describe('BranchController', () => {
    let branchController: BranchController;
    let branchDelegateMock: BranchDelegate;
    let branchServiceMock: infrastuctureBranchService;
    let eventBusMock: MessagingService;
  
    beforeEach(async () => {
        branchDelegateMock = {} as BranchDelegate;
        branchServiceMock = {} as infrastuctureBranchService;
        eventBusMock = {} as MessagingService;
    
        const app: TestingModule = await Test.createTestingModule({
          controllers: [BranchController],
          providers: [
            {
              provide: BranchDelegate,
              useValue: branchDelegateMock,
            },
            {
              provide: infrastuctureBranchService,
              useValue: branchServiceMock,
            },
            {
              provide: MessagingService,
              useValue: eventBusMock,
            },
          ],
        })
        .overrideGuard(AuthGuard) 
        .useValue({ canActivate: () => true }) 
        .overrideGuard(SuperAdminGuard)
        .useValue({ canActivate: () => true }) 
        .compile();
    
        branchController = app.get<BranchController>(BranchController);
      });
    
  
    it('should be defined', () => {
      expect(branchController).toBeDefined();
    });
  
    describe('registerBranch', () => {
      it('should register a branch and return void', async () => {
      
        
        const result: Observable<void> = of(void 0);
  
        branchDelegateMock.registerBranch = jest.fn(() => result);
  
       
    });
  });
})