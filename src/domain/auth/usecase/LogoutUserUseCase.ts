import { IAuthRepository } from '../repositories/authRepository';

export class LogoutUserUseCase {
  constructor(private authRepository: IAuthRepository) {}

  async execute(): Promise<void> {
    await this.authRepository.clearToken();
  }
}
