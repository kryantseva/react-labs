import React from 'react';
import { FullOffer, OffersList } from '../../types/offer';
import { Logo } from '../../components/logo';
import { useParams } from 'react-router-dom';
import { CommentForm } from '../../components/comment-form/comment-form';
import { ReviewList } from '../../components/review-list/review-list';
import { reviews } from '../../mocks/reviews';
import { Map } from '../../components/map/Map';
import { offers as allOffers } from '../../mocks/offers';
import { CitiesCardList } from '../../components/cities-card-list/cities-card-list';

interface OfferProps {
  offers: FullOffer[];
}

function toOffersList(offer: FullOffer): OffersList {
  return {
    id: offer.id,
    title: offer.title,
    type: offer.type,
    price: offer.price,
    isPremium: offer.isPremium,
    previewImage: offer.images[0], // используем первое изображение как preview
    rating: offer.rating,
    city: offer.city,
    location: offer.location,
    isFavorite: offer.isFavorite,
  };
}

function Offer({ offers }: OfferProps): JSX.Element {
  const { id } = useParams();

  const offer = offers.find((o) => o.id === id) || offers[0];

  if (!offer) {
    return <div>Предложение не найдено.</div>;
  }

  const ratingWidth = (offer.rating / 5) * 100;

  // Выбираем 3 других предложения в том же городе и преобразуем к OffersList
  const nearbyOffers = allOffers
    .filter((o) => o.city.name === offer.city.name && o.id !== offer.id)
    .slice(0, 3)
    .map(toOffersList);

  // Формируем массив для карты: текущий оффер + соседние
  const mapOffers = [toOffersList(offer), ...nearbyOffers];

  return (
    <div className="page">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logo />
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {offer.images.map((image, index) => (
                <div className="offer__image-wrapper" key={image + index}>
                  <img className="offer__image" src={`/img/${image}`} alt={`Photo studio ${index + 1}`} />
                </div>
              ))}
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {offer.isPremium && (
                <div className="offer__mark">
                  <span>Premium</span>
                </div>
              )}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">
                  {offer.title}
                </h1>
                <button className="offer__bookmark-button button" type="button">
                  <svg className="offer__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{ width: `${ratingWidth}%` }}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{offer.rating}</span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {offer.type}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  {offer.bedrooms} Bedrooms
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max {offer.maxAdults} adults
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">&euro;{offer.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {offer.goods.map((good) => (
                    <li className="offer__inside-item" key={good}>{good}</li>
                  ))}
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className={`offer__avatar-wrapper user__avatar-wrapper ${offer.host.isPro ? 'offer__avatar-wrapper--pro' : ''}`}>
                    <img className="offer__avatar user__avatar" src={`/img/${offer.host.avatarUrl}`} width="74" height="74" alt="Host avatar" />
                  </div>
                  <span className="offer__host-name">{offer.host.name}</span>
                  {offer.host.isPro && (
                    <span className="offer__host-status">Pro</span>
                  )}
                </div>
                <div className="offer__description">
                  <p className="offer__text">{offer.description}</p>
                </div>
              </div>
              <section className="offer__reviews reviews">
                <ReviewList reviews={reviews} />
                <CommentForm />
              </section>
            </div>
          </div>
          <section className="offer__map map">
            <Map
              key={offer.id}
              offers={mapOffers}
              className="offer__map"
              height="350px"
            />
          </section>
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <CitiesCardList offersList={nearbyOffers} />
          </section>
        </section>
      </main>
    </div>
  );
}

export { Offer };