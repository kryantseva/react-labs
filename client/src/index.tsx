// client\src\index.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { App } from './components/app/app';
import { offersList } from './mocks/offers-list';
import { offers } from './mocks/offers';
import { store } from './store';

const Setting = {
  RentalOffersCount: 312,
} as const;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App rentalOffersCount={Setting.RentalOffersCount} offers={offers} offersList={offersList} />
    </Provider>
  </React.StrictMode>
);