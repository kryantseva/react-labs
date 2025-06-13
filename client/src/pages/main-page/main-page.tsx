// client/src/pages/main-page/main-page.tsx

import React from 'react';
import { CitiesCardList } from '../../components/cities-card-list/cities-card-list';
import { Logo } from '../../components/logo';
import { OffersList } from '../../types/offer'; // Импортируем OffersList

// Описываем новый тип MainPageProps, как на скриншоте
interface MainPageProps {
  rentalOffersCount: number;
  offersList: OffersList[]; // Теперь MainPage принимает offersList
}

function Main({ rentalOffersCount, offersList }: MainPageProps): JSX.Element { // Деструктурируем offersList
  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logo />
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                {/* Здесь будет навигация */}
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <ul className="locations__list">
              {/* Здесь будут вкладки городов */}
            </ul>
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{rentalOffersCount} places to stay</b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex={0}>
                  Popular
                  <svg className="places__sorting-arrow" width="7" height="4">
                    <use xlinkHref="#icon-arrow-select"></use>
                  </svg>
                </span>
                <ul className="places__options places__options--custom places__options--opened">
                  <li className="places__option places__option--active" tabIndex={0}>Popular</li>
                  <li className="places__option" tabIndex={0}>Price: low to high</li>
                  <li className="places__option" tabIndex={0}>Price: high to low</li>
                  <li className="places__option" tabIndex={0}>Top rated first</li>
                </ul>
              </form>
              {/* Передаем offersList в CitiesCardList */}
              <CitiesCardList offersList={offersList} />
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}

export { Main };