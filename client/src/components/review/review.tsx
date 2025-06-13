import React from 'react';
import { Review } from '../../types/review';

interface ReviewProps {
  review: Review;
}

function ReviewItem({ review }: ReviewProps): JSX.Element {
  const { user, comment, rating, date } = review;
  const formattedDate = new Date(date).toLocaleDateString();
  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src="/img/avatar.svg" width="54" height="54" alt="Reviews avatar" />
        </div>
        <span className="reviews__user-name">{user.name}</span>
        {user.isPro && <span className="reviews__user-status">Pro</span>}
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{ width: `${(rating / 5) * 100}%` }}></span>
            <span className="visually-hidden">Rating</span>
            <svg className="reviews__star" width="18" height="19">
              <use xlinkHref="#icon-star"></use>
            </svg>
          </div>
        </div>
        <p className="reviews__text">{comment}</p>
        <time className="reviews__time" dateTime={date}>{formattedDate}</time>
      </div>
    </li>
  );
}

export { ReviewItem };