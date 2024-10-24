import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { fetchReposRequest, fetchReposSuccess, fetchReposFailure } from '@/app/redux/slices/reposSlice';

const fetchReposAPI = () =>
  axios.get(process.env.NEXT_PUBLIC_GITHUB_API).then((response)=>response.data.items);

// Worker Saga: Fetch Repositories
function* fetchReposSaga():Generator<object> {
  try {
    const repos = yield call(fetchReposAPI);
    console.log(repos)
    yield put(fetchReposSuccess(repos));
  } catch (error:any) {
    yield put(fetchReposFailure(error.message));
  }
}

export function* watchFetchRepos() {
  yield takeEvery('repos/fetchReposRequest', fetchReposSaga);
}