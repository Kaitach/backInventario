import { TestingModule, Test } from "@nestjs/testing";
import { Observable, of } from "rxjs";
import { RegisterUserDto, AuthGuard } from "../../../infrastructure/utils";
import { AdminGuard } from "../../../infrastructure/utils/guards/admin.Guard";
import { UserController } from "../user.controller";
import { userDelegate } from "../../../application";
import { MessagingService, infrastuctureBranchService, userServiceIntrastructure } from "../..";

describe('UserController', () => {
    let userController: UserController;
    let userDelegateMock: userDelegate;
    let userServiceMock: userServiceIntrastructure;
    let infraServceMock:  infrastuctureBranchService;
        let eventBusMock: MessagingService;

    const userDto: RegisterUserDto = {
        email: "pepitos@gmail.com",
        password: "123456FGga",
        role: "Admin",
        name:  {firstName: 'Franco', lastName: 'torres',},
        branchId: "213124124-asfasfasfasf-234124124a-asfaf"
    };
  
    beforeEach(async () => {
      userDelegateMock = {} as userDelegate;
      userServiceMock = {} as userServiceIntrastructure;
  
      const app: TestingModule = await Test.createTestingModule({
        controllers: [UserController],
        providers: [
          {
            provide: userDelegate,
            useValue: userDelegateMock,
          },
          {
            provide: userServiceIntrastructure,
            useValue: userServiceMock,
          },
          {
            provide: infrastuctureBranchService,
            useValue: infraServceMock,
          },    {
            provide: MessagingService,
            useValue: eventBusMock,
          },
        ],
      })
        .overrideGuard(AuthGuard)
        .useValue({ canActivate: () => true })
        .overrideGuard(AdminGuard)
        .useValue({ canActivate: () => true }) 
        .compile();
  
      userController = app.get<UserController>(UserController);
    });
  
    it('should be defined', () => {
      expect(userController).toBeDefined();
    });
  
    describe('registerUser', () => {
        it('should register a user and return void', async () => {
          // Arrange
          const result: Observable<void> = of(void 0);
          userDelegateMock.registerUser = jest.fn(() => result);
      
          // Act
          const registrationResult =  userController.registerUser(userDto);
      
          // Assert
          expect(userDelegateMock.registerUser).not.toHaveBeenCalled()
          expect(registrationResult).toBeUndefined();
        });
    });   });