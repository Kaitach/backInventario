import { UserMongooseSeedService } from '.';
import { IUserMongooseInterface } from '../../domain/service/user.mongoose.interface';
import { of } from 'rxjs';

describe('UserMongooseSeedService', () => {
    let mongooseRepository: IUserMongooseInterface;
    let seedService: UserMongooseSeedService;
  
    beforeEach(() => {
      mongooseRepository = {
        countDocuments: jest.fn(),
        registerUser: jest.fn(),
      };
  
      seedService = new UserMongooseSeedService(mongooseRepository);
    });
  
    it('should seed data when count is 0', (done) => {
      const userData = {
        name: 'Super',
        email: 'admin@admin.com',
        password: 'admin',
        role: 'SuperAdmin',
        branchId: '1',
        id: 'ef15459b-b224-4fcb-bfae-896bf567f512',
      };
  
describe('UserMongooseSeedService', () => {
  let mongooseRepository: IUserMongooseInterface;
  let seedService: UserMongooseSeedService;

  beforeEach(() => {
    mongooseRepository = {
      countDocuments: () => of(0), // Simula que countDocuments retorna un Observable con valor 0
      registerUser: jest.fn(),
    };

    seedService = new UserMongooseSeedService(mongooseRepository);
  });

  it('should seed data when count is 0', (done) => {
    const userData = {
      name: 'Super',
      email: 'admin@admin.com',
      password: 'admin',
      role: 'SuperAdmin',
      branchId: '1',
      id: 'ef15459b-b224-4fcb-bfae-896bf567f512',
    };

    seedService.seedData();

    setTimeout(() => {
      expect(mongooseRepository.registerUser).toHaveBeenCalledWith(userData);

      done();
    });
  });

  it('should not seed data when count is greater than 0', (done) => {
    // Simula que countDocuments retorna un Observable con valor 1
    mongooseRepository.countDocuments = () => of(1);

    seedService.seedData();

    setTimeout(() => {
      expect(mongooseRepository.registerUser).not.toHaveBeenCalled();

      done();
    });
  });
});  
      seedService.seedData();
  
      setTimeout(() => {
        expect(mongooseRepository.registerUser).toHaveBeenCalledWith(userData);
  
        done();
      });
    });
  
    it('should not seed data when count is greater than 0', (done) => {
      mongooseRepository.countDocuments.mockReturnValue(of(1));
  
      seedService.seedData();
  
      setTimeout(() => {
        expect(mongooseRepository.registerUser).not.toHaveBeenCalled();
  
        done();
      });
    });
  });
  
  
  
  
  
