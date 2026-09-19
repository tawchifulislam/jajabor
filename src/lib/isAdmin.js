export function isAdmin(session) {
  if (!session?.user?.email) return false;
  return session.user.email === process.env.ADMIN_EMAIL;
}
