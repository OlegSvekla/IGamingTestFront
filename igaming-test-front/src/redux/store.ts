// store.ts
import { configureStore } from '@reduxjs/toolkit';
import meteoritesSlice from './slices/meteoritesSlice';

export const store = configureStore({
  reducer: {
    meteorites: meteoritesSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
