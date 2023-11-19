import {z} from 'zod'

const draftSchema = z.object({
  name: z.string().min(3).max(255),
  description: z.string().min(3).max(255),
});

export { draftSchema }