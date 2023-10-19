import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BranchTypeOrmEntity } from '../../entities';
import { branchRepository } from '../branchDBRepository';

describe('branchRepository', () => {
    let repository: branchRepository;
    let model: Repository<BranchTypeOrmEntity>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                branchRepository,
                {
                    provide: getRepositoryToken(BranchTypeOrmEntity),
                    useValue: {
                        createQueryBuilder: jest.fn(() => ({
                          leftJoinAndSelect: jest.fn(),
                          where: jest.fn(),
                          getOne: jest.fn(),
                          getMany: jest.fn(),
                          select: jest.fn(),
                        })),
                        getOne: jest.fn(),
                        getMany: jest.fn(),
                        save: jest.fn(),
                        find: jest.fn(),
                        leftJoinAndSelect: jest.fn(),
                        findOne: jest.fn(),
                      }
                    
                },
            ],
        }).compile();

        repository = module.get<branchRepository>(branchRepository);
        model = module.get<Repository<BranchTypeOrmEntity>>(
            getRepositoryToken(BranchTypeOrmEntity),
        );
    });

    describe('findBranchById', () => {
        test('Should return a branch by ID', async () => {
            const branchId = 'aff74ba8-7fd9-493f-848c-8252e4786797';
            const expectedBranch = {
                branchId: 'aff74ba8-7fd9-493f-848c-8252e4786797' as any,
                name: 'Branch 3',
                location: 'Location 3',
                products: [],
                users: [],
                sales: [],
            };
            jest.spyOn(model, 'findOne').mockResolvedValue(expectedBranch);

            const result = repository.findBranchById(branchId);
            expect(await result.toPromise()).toEqual(expectedBranch);
        });

        test('Should return an error when something fails', async () => {
            const branchId = 'aff74ba8-7fd9-493f-848c-8252e4786797';
            const mockError = new Error('Something went wrong');

            jest.spyOn(model, 'findOne').mockRejectedValue(mockError);

            const result = repository.findBranchById(branchId);

            await expect(result.toPromise()).rejects.toThrowError(
                'Error al obtener la branch por ID: Something went wrong',
            );
        });
    });

    describe('getAllBranch', () => {
        test('Should return all branches', async () => {
            const expectedBranch = [{
                branchId: 'aff74ba8-7fd9-493f-848c-8252e4786797' as any,
                name: 'Branch 3',
                location: 'Location 3',
                products: [],
                users: [],
                sales: [],
            },
            {
                branchId: 'aff74ba8-7fd2-493f-848c-8252e4786797' as any,
                name: 'Branch 2',
                location: 'Location 2',
                products: [],
                users: [],
                sales: [],
            },
            ];

            jest.spyOn(model, 'find').mockResolvedValue(expectedBranch);

            const result = repository.getAllBranch();
            expect(await result.toPromise()).toEqual(expectedBranch);
        });

        test('Should return an error when something fails', async () => {
            const mockError = new Error('Something went wrong');

            jest.spyOn(model, 'find').mockRejectedValue(mockError);

            const result = repository.getAllBranch();

            await expect(result.toPromise()).rejects.toThrowError(
                'Error al obtener todas las sucursales: Something went wrong',
            );
        });
    });

    describe('RegisterBranch', () => {
        test('Should create a branch and return it', async () => {
            const branchData = {
                branchId: '3',
                name: 'Branch 3',
                location: 'Location 3',
            };

            const branchEntity = Object.assign(new BranchTypeOrmEntity(), branchData);

            jest.spyOn(model, 'save').mockResolvedValue(branchEntity);

            const result = repository.RegisterBranch(branchEntity);
            expect(await result.toPromise()).toEqual(branchEntity);
        });
    });
});
