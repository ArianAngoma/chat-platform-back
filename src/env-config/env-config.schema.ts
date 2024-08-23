import { z } from 'zod';

export const envSchema = z.object({
  PORT: z.coerce.number(),
});

export type Env = z.infer<typeof envSchema>;
