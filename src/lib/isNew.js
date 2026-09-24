export function isNew(createdAt, days = 7) {
  if (!createdAt) return false;
  const created = new Date(createdAt).getTime();
  return Date.now() - created < days * 24 * 60 * 60 * 1000;
}
