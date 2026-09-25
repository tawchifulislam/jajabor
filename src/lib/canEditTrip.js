import { isAdmin } from './isAdmin';

export function canEditTrip(trip, session) {
  if (isAdmin(session)) return true;
  return Boolean(session?.user?.id) && trip.createdBy?.id === session.user.id;
}
