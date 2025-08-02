import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from '../redux/store.ts';
import { Meteorites } from '../components/meteorites/Meteorites.tsx';
import '../i18n';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <Meteorites />
    </Provider>
  </StrictMode>,
);
