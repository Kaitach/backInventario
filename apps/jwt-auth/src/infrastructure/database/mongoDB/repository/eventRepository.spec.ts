import { Model } from 'mongoose';
import { userRepository } from './eventRepository';
import { IUserEntity } from 'apps/shared';
import { DuplicateKeyException } from '../../../utils';

describe('UserRepository', () => {
    let UserRepository: userRepository;
    let userModel: Model<any>;
  
    beforeEach(() => {
      userModel = {
        create: jest.fn(),
        findOne: jest.fn(),
        countDocuments: jest.fn(),
        exec: jest.fn(),
      } as any;
  
      UserRepository = new userRepository(userModel);
    });
  
    it('should be defined', () => {
      expect(UserRepository).toBeDefined();
    });
  
    describe('registerUser', () => {
      it('should register a user', () => {
        const userData: IUserEntity = {
          id: '',
          name: '',
          password: '',
          email: '',
          role: '',
          branchId: '',
        };
  
        userModel.create = jest.fn().mockReturnValue(userData);

        UserRepository.registerUser(userData);
  
        expect(userModel.create).toHaveBeenCalledWith(userData);
      });
  
      it('should throw DuplicateKeyException on duplicate email', () => {
        const userData: IUserEntity = {
          id: '',
          name: '',
          password: '',
          email: '',
          role: '',
          branchId: '',
        };
  
        userModel.create = jest.fn(() => {
          const error = new Error() as any;
          error.code = 11000;
          throw error;
        });
  
        expect(() => UserRepository.registerUser(userData)).toThrow(DuplicateKeyException);
      });
  
      it('should throw an error on other registration errors', () => {
        const userData: IUserEntity = {
          id: '',
          name: '',
          password: '',
          email: '',
          role: '',
          branchId: '',
        };
  
        userModel.create = jest.fn(() => {
          throw new Error('Some other error');
        });
  
        expect(() => UserRepository.registerUser(userData)).toThrow(Error);
      });
    });

    it('should throw an error on other registration errors', () => {
      const userData: IUserEntity = {
        id: '',
        name: '',
        password: '',
        email: '',
        role: '',
        branchId: '',
      };

      userModel.create = jest.fn(() => {
        throw new Error('Some other error');
      });

      expect(() => UserRepository.registerUser(userData)).toThrow(Error);
    });
  

  describe('countDocuments', () => {
    it('should count documents', async () => {
      const expectedCount = 42;

      userModel.countDocuments = jest.fn().mockResolvedValue(expectedCount);

      const result = await UserRepository.countDocuments();

      expect(result).toBe(expectedCount);
    });
  });

  describe('findByEmail', () => {
    it('should find a user by email', async () => {
      const email = 'test@example.com';
      const userEntity: IUserEntity = {
          id: '',
          name: '',
          password: '',
          email: '',
          role: '',
          branchId: ''
      };

      userModel.findOne = jest.fn().mockResolvedValue(userEntity);

      const result = await UserRepository.findByEmail(email);

      expect(result).toEqual(userEntity);
      expect(userModel.findOne).toHaveBeenCalledWith({ email });
    });

    it('should return null when no user found', async () => {
      const email = 'nonexistent@example.com';

      userModel.findOne = jest.fn().mockResolvedValue(null);

      const result = await UserRepository.findByEmail(email);

      expect(result).toBeNull();
      expect(userModel.findOne).toHaveBeenCalledWith({ email });
    });
  });
});
