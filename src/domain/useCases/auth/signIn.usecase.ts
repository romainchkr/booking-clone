import { IAuthRepository } from "@/src/domain/repositories/IAuth.repository";
import { IUseCase } from "@/src/shared/IUseCase";

export class SignInUseCase implements IUseCase<{email: string, password: string}, string> {
  private authRepository: IAuthRepository;

  constructor(authRepository: IAuthRepository) {
    this.authRepository = authRepository;
  }

  async execute({email, password} : {email: string, password: string}): Promise<string> {
    return await this.authRepository.signIn(email, password);
  }
}