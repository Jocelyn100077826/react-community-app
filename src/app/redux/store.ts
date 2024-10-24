import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import reposReducer from '@/app/redux/slices/reposSlice'; 
import repoReducer from '@/app/redux/slices/repoSlice'; 
import rootSaga from '@/app/redux/sagas';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    repos: reposReducer,
    repo: repoReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
