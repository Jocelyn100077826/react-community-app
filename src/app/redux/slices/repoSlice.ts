import { Repository } from '@/app/interfaces/Repo';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface RepoState {
    currentRepo: Repository | null;
}

const initialState: RepoState = {
    currentRepo: null,
};

const repoSlice = createSlice({
    name: 'currentRepo',
    initialState,
    reducers: {
      setCurrentRepo: (state, action: PayloadAction<Repository | null>) => {
        state.currentRepo = action.payload;
      },
    },
  });
  
export const { setCurrentRepo } = repoSlice.actions;
export default repoSlice.reducer;
