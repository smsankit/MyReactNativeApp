import axiosInstance from './baseApi';
import { AuthRequestDTO, AuthResponseDTO } from './model/authModels';
import { LOGIN_ENDPOINT } from '../../common/utils/config';

export const login = async (
  credentials: AuthRequestDTO,
): Promise<AuthResponseDTO> => {
  const response = await axiosInstance.post<AuthResponseDTO>(LOGIN_ENDPOINT, {
    email: credentials.username,
    password: credentials.password,
  });
  return response.data;
};
