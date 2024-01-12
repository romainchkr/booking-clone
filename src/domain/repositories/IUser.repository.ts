import { User } from '@/src/domain/entities/user.entity';

export interface IUserRepository {
  getUserDetails(userId: string): Promise<User>;
  isEmailAlreadyUse(email: string): Promise<boolean>;
}