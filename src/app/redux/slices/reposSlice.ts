import { Repository } from '@/app/interfaces/Repo';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {ReposSortTypes,ReposSort,ReposSortDirection} from '@/app/enums/repoEnums';

interface ReposState {
  loading: boolean;
  error: string | null;
  repos: Repository[];
  page: number;
  type: ReposSortTypes;
  sort: ReposSort;
  direction: ReposSortDirection;
}

interface SortParameters{
  type: ReposSortTypes;
  sort: ReposSort;
  direction: ReposSortDirection;
}

const initialState: ReposState = {
  loading: false,
  error: null,
  repos: [],
  page:0,
  type: ReposSortTypes.all,
  sort: ReposSort.created,
  direction: ReposSortDirection.desc
};

const reposSlice = createSlice({
  name: 'repos',
  initialState,
  reducers: {
    setSortParameters: (state, action: PayloadAction<SortParameters>) => {
      state.page = 0;
      state.type = action.payload.type
      state.sort = action.payload.sort
      state.direction = action.payload.direction
    },
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
