import { authMiddleware } from '@clerk/nextjs';
import { getAllowedUsersFromEnv } from '@/lib/utils';

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware
export default authMiddleware({
  afterAuth(auth, _req, _evt) {
    if (!auth.userId) {
      return;
    }

    if (!getAllowedUsersFromEnv().includes(auth.userId)) {
      return new Response('Unauthorized', { status: 401 });
    }
  },
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
