import { IUserEntity } from "../../domain/entity/userEntity";
import { IUserMongooseInterface } from "../../domain/service/user.mongoose.interface";

export class UserMongooseSeedService {
  constructor(private readonly mongooseRepository: IUserMongooseInterface) {}

  seedData(): void {
    this.mongooseRepository.countDocuments().subscribe((count) => {
      if (count === 0) {
        const superAdmin: IUserEntity = {
            name: 'Super',
            email: 'admin@admin.com',
            password: 'admin',
            role: 'SuperAdmin',
            branchId: '1',
            id: "ef15459b-b224-4fcb-bfae-896bf567f512"
        };

        this.mongooseRepository.registerUser(superAdmin);
      }
    });
  }
}