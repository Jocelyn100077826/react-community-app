import { all, fork } from 'redux-saga/effects';
import { watchFetchRepos } from './reposSaga';
import { setRepoSaga } from './repoSaga';


export default function* rootSaga() {
  yield all([
    fork(watchFetchRepos), 
    fork(setRepoSaga)
  ]);
}