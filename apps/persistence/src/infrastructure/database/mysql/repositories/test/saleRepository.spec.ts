import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SaleTypeOrmEntity } from '../../entities/salesDBEntity';
import { SaleTypeOrmRepository } from '../saleRepository';


describe('SaleTypeOrmRepository', () => {
  let repository: SaleTypeOrmRepository;
  let model: Repository<SaleTypeOrmEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SaleTypeOrmRepository,
        {
          provide: getRepositoryToken(SaleTypeOrmEntity),
          useValue: {
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    repository = module.get<SaleTypeOrmRepository>(SaleTypeOrmRepository);
    model = module.get<Repository<SaleTypeOrmEntity>>(
      getRepositoryToken(SaleTypeOrmEntity),
    );
  });

  describe('saveSales', () => {
    test('Should save sales and return the result', async () => {
      const saleData = {
        id: '23432432',
        branchId: 'rqwrqwrqw',
        invoiceNumber: '123456',
        type: 'sale',
         productName: [' product 1'],
          productPrice: 24,
           quantity: 35,
            date: '10/10/10'
      };

      const saleEntity = Object.assign(new SaleTypeOrmEntity(), saleData);

      jest.spyOn(model, 'save').mockResolvedValue(saleEntity);

      const result = repository.saveSales(saleData);
      expect(await result.toPromise()).toEqual(saleEntity);
    });
  });
});
