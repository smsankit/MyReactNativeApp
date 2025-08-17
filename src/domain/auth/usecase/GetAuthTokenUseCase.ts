import { AuthToken } from '../entities/authEntities';
import { IAuthRepository } from '../repositories/authRepository';

export class GetAuthTokenUseCase {
  constructor(private authRepository: IAuthRepository) {}

  async execute(): Promise<AuthToken | null> {
    return this.authRepository.getToken();
  }
}
