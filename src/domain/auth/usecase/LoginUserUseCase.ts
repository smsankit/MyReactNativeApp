import { AuthToken, UserCredentials } from '../entities/authEntities';
import { IAuthRepository } from '../repositories/authRepository';

export class LoginUserUseCase {
  constructor(private authRepository: IAuthRepository) {}

  async execute(credentials: UserCredentials): Promise<AuthToken> {
    const authToken = await this.authRepository.login(credentials);
    await this.authRepository.saveToken(authToken);
    return authToken;
  }
}
