import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { AppRoute } from '../../const';
import { Main } from '../../pages/main-page/main-page';
import { Login } from '../../pages/login/login';
import { Offer } from '../../pages/offer/offer';
import { NotFound } from '../../pages/not-found/not-found';
import { FullOffer, OffersList } from '../../types/offer';
import Favorites from '../../pages/favorites/favorites';

type AppMainPageProps = {
  rentalOffersCount: number;
  offers: FullOffer[];
  offersList: OffersList[];
};

function App({ rentalOffersCount, offers, offersList }: AppMainPageProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Main} element={<Main rentalOffersCount={rentalOffersCount} offersList={offersList} />} />
        <Route path={AppRoute.Login} element={<Login />} />
        <Route path={`/offer/:id`} element={<Offer offers={offers} />} />
        <Route path={AppRoute.Favorites} element={<Favorites />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export { App };