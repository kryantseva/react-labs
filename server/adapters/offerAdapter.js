const cityCoordinates = {
    Paris: { latitude: 48.8566, longitude: 2.3522, zoom: 13 },
    Cologne: { latitude: 50.9375, longitude: 6.9603, zoom: 13 },
    Brussels: { latitude: 50.8503, longitude: 4.3517, zoom: 13 },
    Amsterdam: { latitude: 52.3676, longitude: 4.9041, zoom: 13 },
    Hamburg: { latitude: 53.5511, longitude: 9.9937, zoom: 13 },
    Dusseldorf: { latitude: 51.2277, longitude: 6.7735, zoom: 13 }
};

const getBaseUrl = () => `${process.env.HOST}:${process.env.PORT || 5000}`;

const adaptImagePaths = (imagePath) => {
    const baseUrl = getBaseUrl();
    if (imagePath && !imagePath.startsWith('http')) {
        return `${baseUrl}${imagePath.startsWith('/') ? '' : '/'}${imagePath}`;
    }
    return imagePath;
};

const adaptOfferToClient = (offer) => {
    const cityLocation = cityCoordinates[offer.city];
    let previewImage = offer.previewImage;
    if (previewImage && !previewImage.startsWith('http')) {
      previewImage = `${getBaseUrl()}${previewImage.startsWith('/') ? '' : '/'}${previewImage}`;
    }
    return {
        id: String(offer.id),
        title: offer.title,
        type: offer.type,
        price: offer.price,
        city: {
            name: offer.city,
            location: cityLocation
        },
        location: offer.latitude && offer.longitude ? {
            latitude: parseFloat(offer.latitude),
            longitude: parseFloat(offer.longitude)
        } : { latitude: 0, longitude: 0 },
        isFavorite: offer.isFavorite,
        isPremium: offer.isPremium,
        rating: parseFloat(offer.rating),
        previewImage
    };
};

const adaptFullOfferToClient = (offer) => { 
    const baseAdapted = adaptOfferToClient(offer); 

    const photos = offer.photos ? offer.photos.map(adaptImagePaths) : [];
    const features = offer.features || [];

    return {
        ...baseAdapted,
        description: offer.description,
        bedrooms: offer.rooms,
        maxAdults: offer.guests,
        goods: features,
        host: offer.author ? {
            id: String(offer.author.id),
            name: offer.author.username,
            isPro: offer.author.userType === 'pro',
            avatarUrl: adaptImagePaths(offer.author.avatar)
        } : null,
        images: photos,
        commentsCount: offer.commentsCount,
    };
};

export { adaptOfferToClient, adaptFullOfferToClient };