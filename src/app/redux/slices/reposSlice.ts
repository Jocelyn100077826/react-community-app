import { Repository } from '@/app/interfaces/Repo';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ReposState {
  loading: boolean;
  error: string | null;
  repos: Repository[];
}

const initialState: ReposState = {
  loading: false,
  error: null,
  repos: [],
};

const reposSlice = createSlice({
  name: 'repos',
  initialState,
  reducers: {
    fetchReposRequest: (state) => {
      state.loading = true;
    },
    fetchReposSuccess: (state, action: PayloadAction<Repository[]>) => {
      state.loading = false;
      state.repos = action.payload;
    },
    fetchReposFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchReposRequest, fetchReposSuccess, fetchReposFailure } = reposSlice.actions;
export default reposSlice.reducer;
