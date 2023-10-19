import { Test, TestingModule } from '@nestjs/testing';
import { MyRabbitSubscriber } from '../'; // Asegúrate de que el import sea correcto
import { BranchDelegate, productDelegate, userDelegate } from '../../../'; 
import { branchServiceBD, productServiceBD, userDBService } from '../database';
import { SaleServiceBD } from '../database/mysql/services/saleBd.service';
import { of } from 'rxjs';

describe('MyRabbitSubscriber', () => {
  let myRabbitSubscriber: MyRabbitSubscriber;
  let branchDelegate: BranchDelegate;
  let ProductDelegate: productDelegate;
  let UserDelegate: userDelegate;
  let branchService: branchServiceBD;
  let productService: productServiceBD;
  let UserDBService: userDBService;
  let saleServiceBD: SaleServiceBD;
  
  beforeEach(async () => {
    branchDelegate = {
      registerBranch: jest.fn(),
      execute: jest.fn(),
    } as any;
    ProductDelegate = {
      registerResellerSale: jest.fn(),
      registerProduct: jest.fn(),
      registerquantity: jest.fn(),
      registerCustomerSale: jest.fn(),
      execute: jest.fn(),
      getProductByID: jest.fn(),
    } as any;
    UserDelegate = {
      registerUser: jest.fn(),
      execute: jest.fn(),
    } as any;
    branchService = {} as branchServiceBD;
    productService = {} as productServiceBD;
    UserDBService = {} as userDBService;
    saleServiceBD = {} as SaleServiceBD;

    const app: TestingModule = await Test.createTestingModule({
      providers: [
        MyRabbitSubscriber,
        {
          provide: BranchDelegate,
          useValue: branchDelegate,
        },
        {
          provide: productDelegate,
          useValue: ProductDelegate,
        },
        {
          provide: userDelegate,
          useValue: UserDelegate,
        },
        {
          provide: branchServiceBD,
          useValue: branchService,
        },
        {
          provide: productServiceBD,
          useValue: productService,
        },
        {
          provide: userDBService,
          useValue: UserDBService,
        },
        {
          provide: SaleServiceBD,
          useValue: saleServiceBD,
        },
      ],
    }).compile();

    myRabbitSubscriber = app.get<MyRabbitSubscriber>(MyRabbitSubscriber);
  });

  it('should be defined', () => {
    expect(myRabbitSubscriber).toBeDefined();
  });

  describe('newBranch', () => {
    it('should handle new branch message', () => {
      // Arrange
      const message = JSON.stringify({ /* your sample message data */ });
      branchDelegate.registerBranch = jest.fn(() => of(undefined));
      branchDelegate.execute = jest.fn(() => of(undefined));

      // Act
      myRabbitSubscriber.newBranch(message);

      // Assert
      expect(branchDelegate.registerBranch).toHaveBeenCalledWith(/* expected data */);
      expect(branchDelegate.execute).toHaveBeenCalledWith(/* expected data */);
    });
  });

  // Add similar tests for other message handling methods (newUser, newProductReseller, etc.)
});
