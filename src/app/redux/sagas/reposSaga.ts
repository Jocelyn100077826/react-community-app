import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { fetchReposSuccessAppend, fetchReposSuccess, fetchReposFailure } from '@/app/redux/slices/reposSlice';
import {ReposState,SortParameters,SearchParameters} from '@/app/interfaces/Repo'
import { ReposSort } from '@/app/enums/repoEnums';

const fetchReposAPIWithQuery = async (search: SearchParameters) => {
  try {
    let url = process.env.NEXT_PUBLIC_GITHUB_API +`/search/repositories?q=${search.query}+owner:${search.owner}&`

    url += `page=${search.page}`
    url += `&sort=${search.sort}`
    url += `&order=${search.direction}`
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching repositories:", error);
    throw error
  }
};

// Worker Saga: Fetch Repositories
function* fetchReposSaga(action: { type: string; payload: SearchParameters }):Generator<object> {
  try {
    const repos = yield call(fetchReposAPIWithQuery, action.payload);
    yield put(fetchReposSuccess(repos));
  } catch (error:any) {
    yield put(fetchReposFailure(error.message));
  }
}

// Worker Saga: Fetch Repositories
function* fetchMoreReposSaga(action: { type: string; payload: SearchParameters }):Generator<object> {
  try {
    const repos = yield call(fetchReposAPIWithQuery, action.payload);
    yield put(fetchReposSuccessAppend(repos));
  } catch (error:any) {
    yield put(fetchReposFailure(error.message));
  }
}


export function* watchFetchRepos() {
  yield takeEvery('repos/fetchReposRequest', fetchReposSaga);
}

export function* watchFetchMoreRepos() {
  yield takeEvery('repos/fetchMoreRepos', fetchMoreReposSaga);
}