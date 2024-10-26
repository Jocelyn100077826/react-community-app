import { all, fork } from 'redux-saga/effects';
import { watchFetchRepos, watchFetchMoreRepos } from '@/app/redux/sagas/reposSaga';
import { watchFetchOrgs } from '@/app/redux/sagas/orgsSaga';
import { watchFetchRepo } from '@/app/redux/sagas/repoSaga';

export default function* rootSaga() {
  yield all([
    fork(watchFetchRepo),
    fork(watchFetchOrgs),
    fork(watchFetchRepos), 
    fork(watchFetchMoreRepos), 
  ]);
}