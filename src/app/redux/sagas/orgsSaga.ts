import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { fetchOrgsSuccess, fetchOrgsFailure } from '@/app/redux/slices/orgsSlice';

const fetchOrgAPI = async (search: string) => {
  try {
    let url = process.env.NEXT_PUBLIC_GITHUB_API + `/users/${search}`
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching organizations:", error);
    throw error;
  }
};

// Worker Saga: Fetch Repositories
function* fetchOrgSaga(action: { type: string; payload: string }):Generator<object> {
  try {
    const repos = yield call(fetchOrgAPI, action.payload);
    yield put(fetchOrgsSuccess(repos));
  } catch (error:any) {
    yield put(fetchOrgsFailure(error.message));
  }
}

export function* watchFetchOrgs() {
  yield takeEvery('orgs/fetchOrgRequest',  fetchOrgSaga);
}