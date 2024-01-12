import { IUseCase } from '@/src/shared/IUseCase';
import { User } from '@/src/domain/entities/user.entity';
import { IUserRepository } from '@/src/domain/repositories/IUser.repository';

export class GetUserDetailsUseCase implements IUseCase<string, User> {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async execute(userId: string): Promise<User> {
    const userDetails = await this.userRepository.getUserDetails(userId);
    const user = new User(userDetails);
    return {... user};
  }
}