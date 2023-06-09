import { configureStore } from '@reduxjs/toolkit';
import { firestoreApi } from '../features/slices/apiSlice';
import dateReducer from '../features/slices/dateSlice';

export const store = configureStore({
  reducer: {
    [firestoreApi.reducerPath]: firestoreApi.reducer,
    date: dateReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(firestoreApi.middleware);
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
