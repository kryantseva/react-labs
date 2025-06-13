import React from 'react';
import { Review } from '../../types/review';
import { ReviewItem } from '../review/review';

interface ReviewListProps {
  reviews: Review[];
}

function ReviewList({ reviews }: ReviewListProps): JSX.Element {
  return (
    <section className="reviews">
      <h2 className="reviews__title">Reviews <span className="reviews__amount">{reviews.length}</span></h2>
      <ul className="reviews__list">
        {reviews.map((review) => (
          <ReviewItem key={review.id} review={review} />
        ))}
      </ul>
    </section>
  );
}

export { ReviewList };