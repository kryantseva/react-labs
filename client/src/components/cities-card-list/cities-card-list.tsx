import React from 'react';
import { CitiesCard } from '../cities-card/cities-card';
import { OffersList } from '../../types/offer';

type CitiesCardListProps = {
  offersList: OffersList[];
  onListItemHover?: (offerId: string | null) => void;
};

function CitiesCardList({ offersList, onListItemHover }: CitiesCardListProps): JSX.Element {
  return (
    <div className="cities__places-list places__list cities__places-list--active">
      {offersList.map((item) => (
        <CitiesCard
          key={item.id}
          id={item.id}
          title={item.title}
          type={item.type}
          price={item.price}
          previewImage={item.previewImage}
          isPremium={item.isPremium}
          rating={item.rating}
          onMouseOver={() => onListItemHover?.(item.id)}
          onMouseOut={() => onListItemHover?.(null)}
        />
      ))}
    </div>
  );
}

export { CitiesCardList };