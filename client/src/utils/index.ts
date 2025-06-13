import { CityOffer, OffersList } from '../types/offer';

export function getCity(name: string, cities: CityOffer[]): CityOffer {
  return cities.find((city) => city.name === name) || cities[0];
}

export function getOffersByCity(cityName: string, offers: OffersList[]): OffersList[] {
  return offers.filter((offer) => offer.city.name === cityName);
} 