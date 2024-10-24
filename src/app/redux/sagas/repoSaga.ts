import { call, put, takeLatest } from 'redux-saga/effects';
import { setCurrentRepo } from '../slices/repoSlice';
import { Repository } from '@/app/interfaces/Repo';

function* fetchRepoDetails(action: { type: string; payload: Repository }) {
  try {
    yield put(setCurrentRepo(action.payload));
  } catch (error) {
    console.error('Failed to fetch repository details', error);
  }
}

export function* setRepoSaga() {
  yield takeLatest('repo/fetchRepoDetails', fetchRepoDetails);
}
