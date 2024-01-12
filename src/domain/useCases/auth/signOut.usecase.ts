import { IAuthRepository } from "@/src/domain/repositories/IAuth.repository";
import { IUseCase } from "@/src/shared/IUseCase";

export class SignOutUseCase implements IUseCase<void, void> {
  private authRepository: IAuthRepository;

  constructor(authRepository: IAuthRepository) {
    this.authRepository = authRepository;
  }

  async execute(): Promise<void> {
    await this.authRepository.signOut();
  }
}