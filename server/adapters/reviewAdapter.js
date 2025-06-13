const adaptReviewToClient = (review) => {
  return {
    id: String(review.id),
    comment: review.text,
    rating: parseFloat(review.rating),
    date: review.publishDate instanceof Date
      ? review.publishDate.toISOString()
      : new Date(review.publishDate).toISOString(),
    user: {
      name: review.author?.username || 'Unknown',
      avatarUrl: review.author?.avatar || '',
      isPro: review.author?.userType === 'pro'
    }
  };
};

export { adaptReviewToClient };