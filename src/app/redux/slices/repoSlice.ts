import { Repository } from '@/app/interfaces/Repo';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface RepoState {
    currentRepo: Repository | null;
    loading: boolean,
    error: string | null,
    search: string
}

const initialState: RepoState = {
    currentRepo: null,
    loading: false,
    error: null,
    search: ""
};

const repoSlice = createSlice({
    name: 'repo',
    initialState,
    reducers: {
      fetchRepoRequest: (state, action: PayloadAction<string>) => {
        state.loading = true;
        state.search = action.payload;
      },
      fetchRepoSuccess: (state, action: PayloadAction<Repository>) => {
        state.loading = false;
        state.currentRepo = action.payload;
      },
      fetchRepoFailure: (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.error = action.payload;
      },
    },
  });
  
export const { fetchRepoRequest,fetchRepoSuccess,fetchRepoFailure } = repoSlice.actions;
export default repoSlice.reducer;
