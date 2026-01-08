import { z } from 'zod';

const emptyToUndefined = (v: unknown) => v === '' || v === null ? undefined : v;

// Found item schema
const foundItemSchema = z.object({
  itemName: z.string().min(2),
  description: z.string().min(10),
  category: z.string().min(1),
  contactName: z.string().min(2),
  state: z.string().min(1),
  address: z.string().min(3),
  contactMethod: z.preprocess(
    emptyToUndefined,
    z.enum(['phone', 'email', 'text']).optional()
  ),
  phone: z.string().min(6),
  email: z.preprocess(
    emptyToUndefined,
    z.string().email().optional()
  ),
  locationFound: z.string().min(3),
  time: z.preprocess(
    emptyToUndefined,
    z.string().optional()
  ),
  date: z.string()
    .min(1)
    .refine(v => !Number.isNaN(Date.parse(v)), 'Invalid date'),
  additionalNotes: z.preprocess(
    emptyToUndefined,
    z.string().optional()
  ),
  deliveryPossible: z
    .string()
    .transform(v => v === 'true'),

  isDamaged: z
    .string()
    .transform(v => v === 'true'),
});


// Rport lost item schema
const lookForItemSchema = z.object({
  itemName: z.string().min(2),
  description: z.string().min(10),
  category: z.string().min(1),
  contactName: z.string().min(2),
  state: z.string().min(1),
  address: z.string().min(3),
  postalCode: z.preprocess(
    emptyToUndefined,
    z.string().min(4).optional()
  ),
  contactMethod: z.preprocess(
    emptyToUndefined,
    z.enum(['phone', 'email', 'text']).optional()
  ),
  phone: z.string().min(6),
  email: z.preprocess(
    emptyToUndefined,
    z.string().email().optional()
  ),
  locationLost: z.string().min(3),
  time: z.preprocess(
    emptyToUndefined,
    z.string().optional()
  ),
  date: z.string()
    .min(1)
    .refine(v => !Number.isNaN(Date.parse(v)), 'Invalid date'),
  reward: z.preprocess(
    emptyToUndefined,
    z.coerce.number().min(0).optional()
  ),
  additionalNotes: z.preprocess(
    emptyToUndefined,
    z.string().optional()
  ),
});


export type FoundItemInput = z.infer<typeof foundItemSchema>;
export type LookForItemInput = z.infer<typeof lookForItemSchema>;

export { foundItemSchema, lookForItemSchema };
