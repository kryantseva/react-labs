// client/src/pages/main-page/main-page.tsx

import React, { useState } from 'react';
import { CitiesCardList } from '../../components/cities-card-list/cities-card-list';
import { Logo } from '../../components/logo';
import { useAppSelector } from '../../hooks';
import { getOffersByCity } from '../../utils';
import { CitiesList } from '../../components/cities-list/cities-list';
import { SortOptions } from '../../components/sort-options/sort-options';
import { SortOffer } from '../../types/sort';
import { SortOffersType } from '../../const/const';
import { Map } from '../../components/map/Map';

function Main(): JSX.Element {
  const selectedCity = useAppSelector((state) => state.city);
  const offersList = useAppSelector((state) => state.offers);
  const selectedCityOffers = getOffersByCity(selectedCity.name, offersList);
  const rentalOffersCount = selectedCityOffers.length;

  const [sortType, setSortType] = useState<SortOffer>('Popular');
  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);

  const getSortedOffers = () => {
    switch (sortType) {
      case 'PriceToHigh':
        return [...selectedCityOffers].sort((a, b) => a.price - b.price);
      case 'PriceToLow':
        return [...selectedCityOffers].sort((a, b) => b.price - a.price);
      case 'TopRated':
        return [...selectedCityOffers].sort((a, b) => b.rating - a.rating);
      default:
        return selectedCityOffers;
    }
  };

  const sortedOffers = getSortedOffers();

  const handleListItemHover = (offerId: string | null) => {
    setActiveOfferId(offerId);
  };

  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logo />
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list"></ul>
            </nav>
          </div>
        </div>
      </header>
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CitiesList />
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{rentalOffersCount} places to stay in {selectedCity.name}</b>
              <SortOptions activeSorting={sortType} onChange={setSortType} />
              <CitiesCardList offersList={sortedOffers} onListItemHover={handleListItemHover} />
            </section>
            <div className="cities__right-section">
              <Map offers={sortedOffers} activeOfferId={activeOfferId} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export { Main };