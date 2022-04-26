import createSagaMiddleware from 'redux-saga';
import reducers from './reducers';
import sagas from './sagas';
import { configureStore } from '@reduxjs/toolkit';
import { DEBUG } from 'src/constants';

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

export const store = configureStore({
  reducer: reducers,
  middleware: middlewares,
  devTools: DEBUG
});
sagaMiddleware.run(sagas);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
