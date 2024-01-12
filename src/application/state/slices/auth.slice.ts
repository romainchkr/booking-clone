import { FirebaseAuthRepository } from "@/src/infrastructure/repositories/firebaseAuth.repository";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { clearUserDetails, fetchUserDetails } from "./user.slice";
import { SignUpUseCase } from "@/src/domain/useCases/auth/signUp.usecase";
import { SignOutUseCase } from "@/src/domain/useCases/auth/signOut.usecase";
import { SignInUseCase } from "@/src/domain/useCases/auth/signIn.usecase";
import { User } from "@/src/domain/entities/user.entity";

interface AuthState {
  userId: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  userId: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authenticate(state, action: PayloadAction<string>) {
      state.userId = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.loading = true;
      })
      .addCase(signUp.fulfilled, (state, action: PayloadAction<User>) => {
        state.userId = action.payload.id;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.error = action.error.message || null;
        state.loading = false;
      })
      .addCase(signIn.pending, (state) => {
        state.loading = true;
      })
      .addCase(signIn.fulfilled, (state, action: PayloadAction<string>) => {
        state.userId = action.payload;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.error = action.error.message || null;
        state.loading = false;
      })
      .addCase(signOut.fulfilled, (state) => {
        state.userId = null;
        state.isAuthenticated = false;
      });
  },
});

export const signUp = createAsyncThunk(
  'auth/signUp',
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const authRepository = FirebaseAuthRepository.getInstance();
      const signUpUseCase  = new SignUpUseCase(authRepository);
      const user = await signUpUseCase.execute({email, password});

      return user;
    } catch (error: any) {
      return rejectWithValue({message: error.message, code: error.code});
    }
  }
);

export const signIn = createAsyncThunk(
  'auth/signIn',
  async ({ email, password }: { email: string; password: string }, { dispatch, rejectWithValue }) => {
    try {
      const authRepository = FirebaseAuthRepository.getInstance();
      const signInUseCase = new SignInUseCase(authRepository);
      const userId = await signInUseCase.execute({email, password});

      dispatch(fetchUserDetails(userId)); // Fetch user details after successful signIn
      return userId;
    } catch (error : any) {
      return rejectWithValue({message: error.message, code: error.code});
    }
  }
);

export const signOut = createAsyncThunk(
  'auth/signOut',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const authRepository = FirebaseAuthRepository.getInstance();
      const signOutUseCase  = new SignOutUseCase(authRepository);
      await signOutUseCase.execute();
      
      dispatch(clearUserDetails()); // Clear user details on signOut
    } catch (error: any) {
      return rejectWithValue({message: error.message, code: error.code});
    }
  }
);

export const { authenticate } = authSlice.actions;

export const authReducer = authSlice.reducer;