import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '@/src/domain/entities/user.entity';
import { GetUserDetailsUseCase } from '@/src/domain/useCases/user/getUserDetails.usecase';
import { FirebaseUserRepository } from '@/src/infrastructure/repositories/firebaseUser.repository';

interface UserState {
  userDetails: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  userDetails: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUserDetails(state) {
      state.userDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserDetails.pending, (state) => {
      state.loading = true;
    })
    .addCase(fetchUserDetails.fulfilled, (state, action: PayloadAction<User>) => {
      state.userDetails = action.payload;
      state.loading = false;
    })
    .addCase(fetchUserDetails.rejected, (state, action) => {
      state.error = action.error.message || null;
      state.loading = false;
    });
  },
});

export const fetchUserDetails = createAsyncThunk(
  'user/fetchUserDetails',
  async (userId: string, { rejectWithValue }) => {
    try {
      const firebaseUserRepository = new FirebaseUserRepository();
      const getUserDetailsUseCase = new GetUserDetailsUseCase(firebaseUserRepository);
      return await getUserDetailsUseCase.execute(userId);
    } catch (error: any) {
      return rejectWithValue({message: error.message, code: error.code});
    }
  }
);

export const { clearUserDetails } = userSlice.actions;

export const userReducer = userSlice.reducer;