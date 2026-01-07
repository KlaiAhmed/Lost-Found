import { z } from 'zod';


// Found item schema
const foundItemSchema = z.object({
  title: z.string().min(2, 'Title is required'),
  description: z.string().min(10, 'Description is required'),
  category: z.string().min(1, 'Category is required'),
  dateOccurred: z.string().optional(),
  timeOccurred: z.string().optional(),
  holder: 
    z.object({
      address: z.string().optional(),
      city: z.string().optional(),
    }).optional(),
    
  contact: 
    z.object({
      name: z.string().min(2, 'Contact name is required'),
      email: z.string().email('Invalid email').optional(),
      phone: z.string().min(6, 'Phone is required').optional(),
      preferContact: z.enum(['phone', 'email', 'text']).optional(),
    }).optional(),

  delivery: 
    z.object({
      possible: z.boolean().optional(),
      details: z.string().optional(),
    }).optional(),

  meetup: z.object({ location: z.string().optional() }).optional(),
  additionalNotes: z.string().optional(),
});


// Rport lost item schema
const emptyToUndefined = (v: unknown) =>
  v === '' || v === null ? undefined : v;

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
