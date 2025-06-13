import React from 'react';
import { FavoriteCard } from '../favorite-card/favorite-card';
import { OffersList } from '../../types/offer';

type FavoriteCardListProps = {
  offersList: OffersList[];
};

function FavoriteCardList({ offersList }: FavoriteCardListProps): JSX.Element {
  const groupedOffers = offersList.reduce((acc, offer) => {
    const city = offer.city.name;
    if (!acc[city]) {
      acc[city] = [];
    }
    acc[city].push(offer);
    return acc;
  }, {} as Record<string, OffersList[]>);

  return (
    <ul className="favorites__list">
      {Object.entries(groupedOffers).map(([city, offers]) => (
        <li className="favorites__locations-items" key={city}>
          <div className="favorites__locations locations locations--current">
            <div className="locations__item">
              <a className="locations__item-link">
                <span>{city}</span>
              </a>
            </div>
          </div>
          <div className="favorites__places">
            {offers.map((offer) => (
              <FavoriteCard
                key={offer.id}
                id={offer.id}
                title={offer.title}
                type={offer.type}
                price={offer.price}
                previewImage={offer.previewImage}
                isPremium={offer.isPremium}
                rating={offer.rating}
                city={offer.city}
              />
            ))}
          </div>
        </li>
      ))}
    </ul>
  );
}

export { FavoriteCardList };