import { isAdmin } from './isAdmin';

export function canEditPlace(place, session) {
  if (isAdmin(session)) return true;
  return Boolean(session?.user?.id) && place.addedBy?.id === session.user.id;
}
