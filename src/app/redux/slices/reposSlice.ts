import { ReposState,SearchParameters,QueryResults } from '@/app/interfaces/Repo';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {ReposSort,ReposSortDirection} from '@/app/enums/repoEnums';

const initialState: ReposState = {
  loading: false,
  error: null,
  repos: [],
  page:1,
  query:"",
  sort: ReposSort.stars,
  direction: ReposSortDirection.desc,
  total_count: 0,
  incomplete_results: false,
};

const reposSlice = createSlice({
  name: 'repos',
  initialState,
  reducers: {
    fetchMoreRepos:(state, action: PayloadAction<SearchParameters>) => {
      state.query = action.payload.query
      state.page = action.payload.page
      state.sort = action.payload.sort
      state.direction = action.payload.direction
    },
    fetchReposRequest: (state, action: PayloadAction<SearchParameters>) => {
      state.page=1;
      state.loading = true;
      state.query = action.payload.query
      state.sort = action.payload.sort
      state.direction = action.payload.direction
    },
    fetchReposSuccess: (state, action: PayloadAction<QueryResults>) => {
      state.loading = false;
      state.repos = action.payload.items;
      state.total_count = action.payload.total_count;
      state.incomplete_results = action.payload.incomplete_results;
    },
    fetchReposSuccessAppend: (state, action: PayloadAction<QueryResults>) => {
      state.loading = false;
      state.repos = state.repos.concat(action.payload.items);
    },
    fetchReposFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchReposRequest, fetchReposSuccess, fetchReposFailure,fetchMoreRepos,fetchReposSuccessAppend } = reposSlice.actions;
export default reposSlice.reducer;
