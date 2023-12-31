import { type Config } from 'drizzle-kit';

import { env } from '@/env';

export default {
  schema: './src/server/db/schema.ts',
  driver: 'mysql2',
  verbose: env.NODE_ENV === 'development',
  dbCredentials: {
    uri: env.DATABASE_URL,
  },
  tablesFilter: ['table-tool_*'],
} satisfies Config;
