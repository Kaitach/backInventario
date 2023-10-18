import { InternalServerErrorException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';
import { BranchTypeOrmEntity } from '../../entities';
import { branchServiceBD } from '../branchBD.service';
import { branchRepository } from '../../repositories';
import { getRepositoryToken } from '@nestjs/typeorm';


describe('branchServiceBD', () => {
  let service: branchServiceBD;
  let BranchRepository: branchRepository; // Reemplaza con el servicio de dominio de tu aplicación

  const mockBranchData: BranchTypeOrmEntity = {
      branchId: 'aff74ba8-7fd9-493f-848c-8252e4786797',
      name: '',
      location: '',
      products: [],
      users: [],
      sales: []
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        branchServiceBD,
        branchRepository,
        {
            provide: getRepositoryToken(BranchTypeOrmEntity),   
       useValue: {
            getAllBranch: jest.fn(),
            findBranchById: jest.fn(),
            RegisterBranch: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<branchServiceBD>(branchServiceBD);
    BranchRepository = module.get<branchRepository>(branchServiceBD); 
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllBranch', () => {
    it('should return an array of branches', (done) => {
      const mockBranches: BranchTypeOrmEntity[] = [mockBranchData];
  
      const service = new branchServiceBD(BranchRepository);
  
      jest.spyOn(service, 'getAllBranch').mockReturnValue(of(mockBranches));
  
      const result = service.getAllBranch();
  
      result.subscribe((branches) => {
        expect(branches).toEqual(mockBranches);
        done();
      });
    });
  });

  describe('findBranchById', () => {
    it('should return a branch by ID', () => {
      jest.spyOn(BranchRepository, 'findBranchById').mockReturnValue(of(mockBranchData));

      const result = service.findBranchById('1'); // Reemplaza '1' con un ID válido
      expect(result).toEqual(of(mockBranchData));
    });

    it('should return undefined if branch is not found', () => {
      jest.spyOn(BranchRepository, 'findBranchById').mockReturnValue(of(undefined));

      const result = service.findBranchById('1'); // Reemplaza '1' con un ID válido
      expect(result).toEqual(of(undefined));
    });
  });

  describe('RegisterBranch', () => {
    it('should register a branch and return the registered branch', () => {
      jest.spyOn(BranchRepository, 'RegisterBranch').mockReturnValue(of(mockBranchData));

      const result = service.RegisterBranch(mockBranchData);
      expect(result).toEqual(of(mockBranchData));
    });

    it('should return an error when something fails', () => {
      const mock = new InternalServerErrorException('Something went wrong');
      jest.spyOn(BranchRepository, 'RegisterBranch').mockReturnValue(of(mockBranchData));

      const result = service.RegisterBranch(mockBranchData);
      expect(result).toEqual(of(mock));
    });
  });
});
