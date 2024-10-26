import { call, put, takeEvery } from 'redux-saga/effects';
import { fetchRepoSuccess,fetchRepoFailure }  from '@/app/redux/slices/repoSlice';
import axios from 'axios';

const fetchRepoAPI = async (search: string) => {
  try {
    const url = process.env.NEXT_PUBLIC_GITHUB_API + `/repos/${search}`
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching repositories:", error);
    throw error;
  }
};

// Worker Saga: Fetch Repositories
function* fetchRepoSaga(action: { type: string; payload: string }):Generator<object> {
  try {
    const repos = yield call(fetchRepoAPI, action.payload);
    yield put(fetchRepoSuccess(repos));
  } catch (error:unknown) {
    if (error instanceof Error) {
      yield put(fetchRepoFailure(error.message));
    } else {
      // Handle cases where error is not an instance of Error
      yield put(fetchRepoFailure("An unknown error occurred."));
    }
  }
}

export function* watchFetchRepo() {
  yield takeEvery('repo/fetchRepoRequest',  fetchRepoSaga);
}