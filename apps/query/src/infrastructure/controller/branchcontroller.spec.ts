import { TestingModule, Test } from "@nestjs/testing";
import { Observable, of } from "rxjs";
import { BranchDelegate } from "../../application";
import { BranchController } from "./branch.controller";
import { branchServiceBD } from "../database";
import { MyRabbitSubscriber } from "../service";


describe('BranchController', () => {
    let branchController: BranchController;
    let branchDelegateMock: BranchDelegate;
    let branchServiceMock: branchServiceBD;
    let eventBusMock: MyRabbitSubscriber;

    beforeEach(async () => {
        branchDelegateMock = {} as BranchDelegate;
        branchServiceMock = {} as branchServiceBD;
        eventBusMock = {} as MyRabbitSubscriber;

        const app: TestingModule = await Test.createTestingModule({
            controllers: [BranchController],
            providers: [
                {
                    provide: BranchDelegate,
                    useValue: branchDelegateMock,
                },
                {
                    provide: branchServiceBD,
                    useValue: branchServiceMock,
                },
                {
                    provide: MyRabbitSubscriber,
                    useValue: eventBusMock,
                },
            ],
        })
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