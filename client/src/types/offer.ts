// client\src\types\offer.ts
type CityOffer = {
  name: string;
  location: Location;
};

type Location = {
  latitude: number;
  longitude: number;
  zoom: number;
};

type Host = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
};

type FullOffer = {
  id: string;
  title: string;
  type: string;
  price: number;
  city: CityOffer;
  location: Location;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  description: string;
  bedrooms: number;
  goods: string[];
  host: Host;
  images: string[];
  maxAdults: number;
};

type OffersList = {
  id: string;
  title: string;
  type: string;
  price: number;
  isPremium: boolean;
  previewImage: string;
  rating: number;
  city: CityOffer;
  location: Location;
  isFavorite: boolean;
};

type AppMainPageProps = {
  rentalOffersCount: number;
  offers: FullOffer[];
  offersList: OffersList[];
};

export type { CityOffer, Location, Host, FullOffer, OffersList, AppMainPageProps };