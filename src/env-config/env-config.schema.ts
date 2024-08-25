import { z } from 'zod';

export const envSchema = z.object({
  PORT: z.coerce.number(),
  MYSQL_DB_HOST: z.string(),
  MYSQL_DB_USERNAME: z.string(),
  MYSQL_DB_PASSWORD: z.string(),
  MYSQL_DB_PORT: z.coerce.number(),
  MYSQL_DB_NAME: z.string(),
});

export type Env = z.infer<typeof envSchema>;
