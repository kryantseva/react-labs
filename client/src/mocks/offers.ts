// client/src/mocks/offers.ts

import { FullOffer } from '../types/offer'; // Импортируем тип FullOffer

const offers: FullOffer[] = [
  {
    id: 'bbb06a0e-3f92-446d-9a68-cb64b5d3de2b',
    title: 'Beautiful & luxurious apartment at great location',
    type: 'apartment',
    price: 120,
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.370216,
        longitude: 4.895168,
        zoom: 10
      }
    },
    location: {
      latitude: 52.39091,
      longitude: 4.8530966,
      zoom: 16
    },
    isFavorite: false,
    isPremium: true,
    rating: 4.8,
    description: 'A quiet cozy and picturesque apartment with a beautiful river view. A perfect place to escape from all the noise and bustle of the city.',
    bedrooms: 3,
    goods: ['Wi-Fi', 'Washing machine', 'Coffee machine', 'Dishwasher', 'Towels', 'Baby seat', 'Cabel TV'],
    host: {
      name: 'Angelina',
      avatarUrl: 'avatar-angelina.jpg',
      isPro: true
    },
    images: ['apartment-01.jpg', 'apartment-02.jpg', 'apartment-03.jpg'],
    maxAdults: 4,
  },
  {
    id: 'a1b2c3d4-e5f6-7890-1234-567890abcdef',
    title: 'Wood and stone place',
    type: 'room',
    price: 80,
    city: {
      name: 'Paris',
      location: {
        latitude: 48.85661,
        longitude: 2.351499,
        zoom: 10
      }
    },
    location: {
      latitude: 48.86861,
      longitude: 2.342499,
      zoom: 16
    },
    isFavorite: true,
    isPremium: false,
    rating: 3.5,
    description: 'Cozy room in a historic building, perfect for a short stay.',
    bedrooms: 1,
    goods: ['Wi-Fi', 'Towels'],
    host: {
      name: 'Lirili',
      avatarUrl: 'lirili.png',
      isPro: false
    },
    images: ['apartment1-01.png', 'apartment1-02.png', 'apartment1-03.png', 'apartment1-04.png', 'apartment1-05.png', 'apartment1-06.png'],
    maxAdults: 2,
  },
  {
    id: 'cde45f67-890a-1234-5678-90abcdef1234',
    title: 'Canal View Apartment',
    type: 'apartment',
    price: 250,
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.370216,
        longitude: 4.895168,
        zoom: 10
      }
    },
    location: {
      latitude: 52.37561,
      longitude: 4.90197,
      zoom: 16
    },
    isFavorite: false,
    isPremium: true,
    rating: 4.2,
    description: 'Modern apartment with stunning views of the Amsterdam canals.',
    bedrooms: 2,
    goods: ['Wi-Fi', 'Dishwasher', 'Parking'],
    host: {
      name: 'Crocodilo',
      avatarUrl: 'crocodilo.png',
      isPro: true
    },
    images: ['apartment2-01.png', 'apartment2-02.png', 'apartment2-03.png', 'apartment2-04.png', 'apartment2-05.png', 'apartment2-06.png'],
    maxAdults: 3,
  },
  {
    id: 'fgh78i90-123j-456k-789l-0123456789ab',
    title: 'Nice, clean apartment',
    type: 'house',
    price: 300,
    city: {
      name: 'Brussels',
      location: {
        latitude: 50.846557,
        longitude: 4.351697,
        zoom: 10
      }
    },
    location: {
      latitude: 50.864557,
      longitude: 4.351697,
      zoom: 16
    },
    isFavorite: true,
    isPremium: false,
    rating: 3.9,
    description: 'Spacious and bright house located in a quiet neighborhood.',
    bedrooms: 4,
    goods: ['Wi-Fi', 'Kitchen', 'Fireplace'],
    host: {
      name: 'Tralalero',
      avatarUrl: 'tralalero.png',
      isPro: false
    },
    images: ['apartment3-01.png', 'apartment3-02.png', 'apartment3-03.png', 'apartment3-04.png', 'apartment3-05.png', 'apartment3-06.png'],
    maxAdults: 6,
  },
];

export { offers };