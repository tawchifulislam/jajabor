export function displayLocation(place) {
  if (place.district) {
    return [place.area, place.district].filter(Boolean).join(', ');
  }
  return place.location || '';
}
