import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserTypeOrmEntity } from '../../entities';
import { userRepository } from '../userDBRepositori';


describe('UserRepository', () => {
  let repository: userRepository;
  let model: Repository<UserTypeOrmEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        userRepository,
        {
          provide: getRepositoryToken(UserTypeOrmEntity),
          useValue: {
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    repository = module.get<userRepository>(userRepository);
    model = module.get<Repository<UserTypeOrmEntity>>(
      getRepositoryToken(UserTypeOrmEntity),
    );
  });

  describe('registerUser', () => {
    test('Should save a user and return the result', async () => {
      const userData = {
        id: 'aff74ba8-7fd9-493f-848c-8252e4786797' as any,
        name: 'john_doe',
        email: 'john@example.com',
        password: 'password',
        role: 'admin',
        branchId: 'aff74ba8-7fd9-493f-848c-8252e4786797' as any,
      };

      const userEntity = Object.assign(new UserTypeOrmEntity(), userData);

      jest.spyOn(model, 'save').mockResolvedValue(userEntity);

      const result = repository.registerUser(userData);
      expect(await result.toPromise()).toEqual(userEntity);
    });
  });
});
