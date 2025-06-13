// client/src/mocks/offers-list.ts

import { OffersList } from '../types/offer'; // Импортируем только OffersList
import { offers as fullOffers } from './offers'; // Импортируем моковые данные (массив) из offers.ts

const offersList: OffersList[] = fullOffers.map(offer => ({
  id: offer.id,
  title: offer.title,
  type: offer.type,
  price: offer.price,
  city: offer.city,
  location: offer.location,
  isFavorite: offer.isFavorite,
  isPremium: offer.isPremium,
  rating: offer.rating,
  previewImage: offer.images[0],
}));

export { offersList };