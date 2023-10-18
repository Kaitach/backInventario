import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { RegisterProductDTO, RegisterquantityDTO } from '../../../../';
import { ProductTypeOrmEntity } from '../../entities';
import { ProductRepository } from '../productRepository';


describe('ProductRepository', () => {
  let repository: ProductRepository;
  let model: Repository<ProductTypeOrmEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductRepository,
        {
          provide: getRepositoryToken(ProductTypeOrmEntity),
          useValue: {
            save: jest.fn(),
            createQueryBuilder: jest.fn(() => ({
              select: jest.fn(),
              where: jest.fn(),
              getOne: jest.fn(),
              getMany: jest.fn(),
            })),
          },
        },
      ],
    }).compile();

    repository = module.get<ProductRepository>(ProductRepository);
    model = module.get<Repository<ProductTypeOrmEntity>>(
      getRepositoryToken(ProductTypeOrmEntity),
    );
  });

  describe('findByID', () => {
    test('Should find a product by ID and return it', async () => {
      const productId = '12345';
      const productData = {
        productId,
        name: 'Sample Product',
        description: 'A sample product description',
        price: 10.99,
        quantity: 100,
        category: 'Sample Category',
        branchId: '98765',
      };

      const productEntity = Object.assign(new ProductTypeOrmEntity(), productData);
      const mockSelectQueryBuilder = {
        select: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        getOne: jest.fn().mockResolvedValue(productEntity), // Si productEntity es un ejemplo válido
      };
      jest.spyOn(model, 'createQueryBuilder').mockReturnValue(mockSelectQueryBuilder);


      const result = repository.findByID(productId);
      expect(await result.toPromise()).toEqual(productEntity);
    });

    test('Should return undefined when the product is not found', async () => {
      const productId = '12345';

      jest.spyOn(model, 'createQueryBuilder').mockReturnValue({
        select: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        getOne: jest.fn().mockResolvedValue(undefined),
      });

      const result = repository.findByID(productId);
      expect(await result.toPromise()).toBeUndefined();
    });

    test('Should handle errors gracefully', async () => {
      const productId = '12345';
      const mockError = new QueryFailedError('Test error');

      jest.spyOn(model, 'createQueryBuilder').mockReturnValue({
        select: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        getOne: jest.fn().mockRejectedValue(mockError),
      });

      const result = repository.findByID(productId);
      await expect(result.toPromise()).rejects.toThrowError(
        `Error al obtener el producto por ID: ${mockError.message}`
      );
    });

    test('Should handle foreign key constraint error', async () => {
      const productId = '12345';
      const mockError = new QueryFailedError('Test error', ['ER_NO_REFERENCED_ROW_2']);

      jest.spyOn(model, 'createQueryBuilder').mockReturnValue({
        select: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        getOne: jest.fn().mockRejectedValue(mockError),
      });

      const result = repository.findByID(productId);
      expect(await result.toPromise()).toBeUndefined();
    });
  });

  describe('registerProduct', () => {
    test('Should register a product and return the result', async () => {
      const productData: RegisterProductDTO = {
        name: 'Sample Product',
        description: 'A sample product description',
        price: 10.99,
        quantity: 100,
        category: 'Sample Category',
        branchId: '98765',
        productId: 'aff74ba8-7fd9-493f-848c-8252e4786797'
      };

      const productEntity = Object.assign(new ProductTypeOrmEntity(), productData);

      jest.spyOn(model, 'save').mockResolvedValue(productEntity);

      const result = repository.registerProduct(productData);
      expect(await result.toPromise()).toEqual(productEntity);
    });

    test('Should handle errors gracefully', async () => {
      const productData: RegisterProductDTO = {
          name: 'Sample Product',
          description: 'A sample product description',
          price: 10.99,
          quantity: 100,
          category: 'Sample Category',
          branchId: '98765',
          productId: 'aff74ba8-7fd9-493f-848c-8252e4786797'
        };

      const mockError = new QueryFailedError('Test error');

      jest.spyOn(model, 'save').mockRejectedValue(mockError);

      const result = repository.registerProduct(productData);
      await expect(result.toPromise()).rejects.toThrowError(
        `Error al crear el producto: ${mockError.message}`
      );
    });

    test('Should handle foreign key constraint error', async () => {
      const productData: RegisterProductDTO = {
        name: 'Sample Product',
        description: 'A sample product description',
        price: 10.99,
        quantity: 100,
        category: 'Sample Category',
        branchId: '98765',
        productId: 'aff74ba8-7fd9-493f-848c-8252e4786797'

      };

      const mockError = new QueryFailedError('Test error', 'ER_NO_REFERENCED_ROW_2');

      jest.spyOn(model, 'save').mockRejectedValue(mockError);

      const result = repository.registerProduct(productData);
      expect(await result.toPromise()).toBeUndefined();
    });
  });

  describe('registerquantity', () => {
    test('Should register quantity and return the result', async () => {
      const quantityData: RegisterquantityDTO = {
          productId: 'aff74ba8-7fd9-493f-848c-8252e4786797',
          quantity: 50,
          productStock: 0,
          name: '',
          description: '',
          price: 0,
          category: '',
          branchId: ''
      };

      const productData = {
        productId: 'aff74ba8-7fd9-493f-848c-8252e4786797',
        name: 'Sample Product',
        description: 'A sample product description',
        price: 10.99,
        quantity: 100,
        category: 'Sample Category',
        branchId: '98765',
        
      };

      const productEntity = Object.assign(new ProductTypeOrmEntity(), productData);

      jest.spyOn(repository, 'findByID').mockResolvedValue(productEntity as never);
      jest.spyOn(model, 'save').mockResolvedValue(productEntity);

      const result = repository.registerquantity(quantityData);
      expect(await result.toPromise()).toEqual(productEntity);
    });

    test('Should return undefined when the product is not found', async () => {
      const quantityData: RegisterquantityDTO = {
          productId: 'aff74ba8-7fd9-493f-848c-8252e4786797',

          quantity: 50,
          productStock: 0,
          name: '',
          description: '',
          price: 0,
          category: '',
          branchId: ''
      };

      jest.spyOn(repository, 'findByID').mockResolvedValue(undefined as never);

      const result = repository.registerquantity(quantityData);
      expect(await result.toPromise()).toBeUndefined();
    });

    test('Should handle errors gracefully when finding the product', async () => {
      const quantityData: RegisterquantityDTO = {
          productId: 'aff74ba8-7fd9-493f-848c-8252e4786797',
          quantity: 50,
          productStock: 0,
          name: '',
          description: '',
          price: 0,
          category: '',
          branchId: ''
      };

      const mockError = new QueryFailedError('Test error');

      jest.spyOn(repository, 'findByID').mockRejectedValue(mockError);

      const result = repository.registerquantity(quantityData);
      await expect(result.toPromise()).rejects.toThrowError(
        `Error al buscar el producto: ${mockError.message}`
      );
    });

    test('Should handle errors gracefully when saving quantity', async () => {
      const quantityData: RegisterquantityDTO = {
        productId: '12345',
        quantity: 50,
      };

      const productData = {
        productId: quantityData.productId,
        name: 'Sample Product',
        description: 'A sample product description',
        price: 10.99,
        quantity: 100,
        category: 'Sample Category',
        branchId: '98765',
      };

      const productEntity = Object.assign(new ProductTypeOrmEntity(), productData);
      const mockError = new QueryFailedError('Test error');

      jest.spyOn(repository, 'findByID').mockResolvedValue(productEntity);
      jest.spyOn(model, 'save').mockRejectedValue(mockError);

      const result = repository.registerquantity(quantityData);
      await expect(result.toPromise()).rejects.toThrowError(
        `Error al obtener el producto por ID: ${mockError.message}`
      );
    });

    test('Should handle foreign key constraint error when saving quantity', async () => {
      const quantityData: RegisterquantityDTO = {
        productId: '12345',
        quantity: 50,
      };

      const productData = {
        productId: quantityData.productId,
        name: 'Sample Product',
        description: 'A sample product description',
        price: 10.99,
        quantity: 100,
        category: 'Sample Category',
        branchId: '98765',
      };

      const productEntity = Object.assign(new ProductTypeOrmEntity(), productData);
      const mockError = new QueryFailedError('Test error', ['ER_NO_REFERENCED_ROW_2']);

      jest.spyOn(repository, 'findByID').mockResolvedValue(productEntity);
      jest.spyOn(model, 'save').mockRejectedValue(mockError);

      const result = repository.registerquantity(quantityData);
      expect(await result.toPromise()).toBeUndefined();
    });
  });

  // Add more test cases for other methods as needed
});
