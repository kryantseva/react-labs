import { createAction } from '@reduxjs/toolkit';
import { CityOffer, OffersList } from '../types/offer';

export const changeCity = createAction<CityOffer>('offers/changeCity');
export const offersCityList = createAction<OffersList[]>('offers/offersCityList'); 