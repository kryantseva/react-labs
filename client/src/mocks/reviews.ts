import { Review } from '../types/review';

const reviews: Review[] = [
  {
    id: '463623e8-eecc-4a2a-b2fc-797a99b5230',
    comment: 'The room was spacious and clean. The pool looked nothing like the photos',
    date: '2023-06-29T21:00:00.465Z',
    rating: 4,
    user: {
      name: 'Isaac',
      avatarUrl: 'img/avatar/8.jpg',
      isPro: true,
    },
  },
  {
    id: '563623e8-eecc-4a2a-b2fc-797a99b5231',
    comment: 'Great location, friendly staff, and comfortable beds.',
    date: '2023-07-01T15:30:00.465Z',
    rating: 5,
    user: {
      name: 'Anna',
      avatarUrl: 'img/avatar/3.jpg',
      isPro: false,
    },
  },
  {
    id: '663623e8-eecc-4a2a-b2fc-797a99b5232',
    comment: 'Average experience, could be better.',
    date: '2023-07-10T10:00:00.465Z',
    rating: 3,
    user: {
      name: 'John',
      avatarUrl: 'img/avatar/5.jpg',
      isPro: false,
    },
  },
];

export { reviews };