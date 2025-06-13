// client\src\pages\favorites\favorites.tsx
import React from 'react';
import { FavoriteCardList } from '../../components/favorite-card-list/favorite-card-list';
import { offersList } from '../../mocks/offers-list';

function Favorites(): React.JSX.Element {
  const favoriteOffers = offersList.filter((offer) => offer.isFavorite);
  return (
    <div className="page">
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <FavoriteCardList offersList={favoriteOffers} />
          </section>
        </div>
      </main>
      <footer className="footer container">
        <a className="footer__logo-link" href="main.html">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
        </a>
      </footer>
    </div>
  );
}

export default Favorites;