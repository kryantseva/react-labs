import React from 'react';
import { Link } from 'react-router-dom';
import { RATING_COEFFICIENT } from '../../const/project';

type CitiesCardProps = {
  id: string;
  title: string;
  type: string;
  price: number;
  isPremium: boolean;
  previewImage: string;
  rating: number;
  onMouseOver?: () => void;
  onMouseOut?: () => void;
};

function CitiesCard({ id, title, type, price, isPremium, previewImage, rating, onMouseOver, onMouseOut }: CitiesCardProps): JSX.Element {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [activeOfferId, setActiveOfferId] = React.useState<string | null>(null); // Это предупреждение ESLint 'activeOfferId' is assigned a value but never used

  const ratingWidth = rating * RATING_COEFFICIENT;

  return (
    <article
      className="cities__card place-card"
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
    >
      {isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className="cities__image-wrapper place-card__image-wrapper">
        {/* ИСПРАВЛЕНИЕ: Прямая интерполяция ID в базовый путь */}
        <Link to={`/offer/${id}`}> {/* */}
          <img className="place-card__image" src={`/img/${previewImage}`} width="260" height="200" alt="Place image" />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className="place-card__bookmark-button button" type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${ratingWidth}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <a href="#">{title}</a>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

export { CitiesCard };