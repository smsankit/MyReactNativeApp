import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  AuthToken,
  UserCredentials,
} from '../../../domain/auth/entities/authEntities';
import { AuthRepositoryImpl } from '../../../domain/auth/repositories/authRepository';
import { GetAuthTokenUseCase } from '../../../domain/auth/usecase/GetAuthTokenUseCase';
import { LoginUserUseCase } from '../../../domain/auth/usecase/LoginUserUseCase';
import { LogoutUserUseCase } from '../../../domain/auth/usecase/LogoutUserUseCase';

// Initialize domain use cases
const authRepository = new AuthRepositoryImpl();
const loginUserUseCase = new LoginUserUseCase(authRepository);
const logoutUserUseCase = new LogoutUserUseCase(authRepository);
const getAuthTokenUseCase = new GetAuthTokenUseCase(authRepository);

interface AuthState {
  token: AuthToken | null;
  isLoading: boolean;
  isInitialLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  token: null,
  isLoading: false,
  isInitialLoading: true,
  error: null,
};

export const loginAsync = createAsyncThunk(
  'auth/login',
  async (credentials: UserCredentials, { rejectWithValue }) => {
    try {
      const token = await loginUserUseCase.execute(credentials);
      return token.value;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Login failed.');
    }
  },
);

export const logoutAsync = createAsyncThunk('auth/logout', async () => {
  await logoutUserUseCase.execute();
});

export const autoLoginAsync = createAsyncThunk(
  'auth/autoLogin',
  async (_, { rejectWithValue }) => {
    try {
      const token = await getAuthTokenUseCase.execute();
      return token ? token.value : null;
    } catch (error: any) {
      return rejectWithValue('Auto-login failed.');
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loginAsync.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginAsync.fulfilled, (state, action: PayloadAction<string>) => {
        state.isLoading = false;
        state.token = { value: action.payload };
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.token = null;
      })
      .addCase(autoLoginAsync.pending, state => {
        state.isInitialLoading = true;
        state.error = null;
      })
      .addCase(
        autoLoginAsync.fulfilled,
        (state, action: PayloadAction<string | null>) => {
          state.isInitialLoading = false;
          if (action.payload) {
            state.token = { value: action.payload };
          }
        },
      )
      .addCase(autoLoginAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.token = null;
      })
      .addCase(logoutAsync.pending, state => {
        state.isLoading = true;
      })
      .addCase(logoutAsync.fulfilled, state => {
        state.isLoading = false;
        state.token = null;
      })
      .addCase(logoutAsync.rejected, state => {
        state.isLoading = false;
        state.error = 'Logout failed.';
      });
  },
});

export default authSlice.reducer;
