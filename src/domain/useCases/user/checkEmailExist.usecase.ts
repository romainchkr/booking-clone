import { IUserRepository } from '@/src/domain/repositories/IUser.repository';
import { IUseCase } from '@/src/shared/IUseCase';

export class CheckEmailExistUseCase implements IUseCase<string, boolean> {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async execute(email: string): Promise<boolean> {
    return await this.userRepository.isEmailAlreadyUse(email);
  }
}