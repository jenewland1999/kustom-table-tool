import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { z } from 'zod';
import { env } from '@/env';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Helper function to turn a string environment secret of Clerk User IDs into an
 * array as well as parse them to ensure they're somewhat sane values
 * @returns string[] with Clerk user IDs
 */
export function getAllowedUsersFromEnv() {
  const authorizedUsersEnvSecret = env.AUTHORIZED_USERS.split(',').map((user) =>
    user.trim(),
  );

  const schema = z.array(z.string().startsWith('user_'));
  const parsedResults = schema.parse(authorizedUsersEnvSecret);

  return parsedResults;
}
