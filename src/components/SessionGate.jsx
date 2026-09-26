import { headers } from 'next/headers';
import { auth } from '@/lib/auth';
import { SessionProvider } from './SessionProvider';

export default async function SessionGate({ children }) {
  const session = await auth.api.getSession({ headers: await headers() });
  return (
    <SessionProvider user={session?.user || null}>{children}</SessionProvider>
  );
}
