import { IAuthRepository } from "@/src/domain/repositories/IAuth.repository";
import { IUseCase } from "@/src/shared/IUseCase";
import { User } from "@/src/domain/entities/user.entity";

export class SignUpUseCase implements IUseCase<{email: string, password: string}, User> {
  private authRepository: IAuthRepository;

  constructor(authRepository: IAuthRepository) {
    this.authRepository = authRepository;
  }

  async execute({email, password} : {email: string, password: string}): Promise<User> {
    const user = await this.authRepository.signUp(email, password);
    return {... user};
  }
}