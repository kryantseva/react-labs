// client\src\pages\favorites\favorites.tsx
import React from 'react';
import { FavoriteCardList } from '../../components/favorite-card-list/favorite-card-list';
import { offersList } from '../../mocks/offers-list';
import { Logo } from '../../components/logo';

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
        <div className="footer__logo-wrapper">
          <Logo />
        </div>
      </footer>
    </div>
  );
}

export default Favorites;