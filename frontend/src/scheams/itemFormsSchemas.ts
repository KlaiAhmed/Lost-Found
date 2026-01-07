import { z } from 'zod';

const lookForItemSchema = z.object({
    itemName: z.string().min(2, 'Item name must be at least 2 characters long'),
    description: z.string().min(10, 'Description must be at least 10 characters'),
    category: z.string().min(1, 'Please select a category'),
    image: z.custom<FileList>().refine(  (files) => files?.length === 1,'Please upload an image of the item')
        .refine(
        (files) => files?.[0]?.size <= 5 * 1024 * 1024,
        'Image size must be less than 5MB'
        ),

    contactName: z.string().min(2, 'Your name must be at least 2 characters'),
    state: z.string().min(1, 'Please select your state'),
    address: z.string().min(3, 'Street must be at least 3 characters'),
    contactMethod: z.enum(['phone', 'email', 'text']).optional().transform(v => v === '' ? undefined : v),
    phone: z.string().min(6, 'Please enter a valid phone number'),
    email: z.string().email('Please enter a valid email address').optional().transform((v) => (v === '' ? undefined : v)),
    locationLost: z.string().min(3, 'Please enter the location where the item was lost'),
    time: z.string().optional().transform((v) => (v === '' ? undefined : v)),
    date: z.string().min(1, 'Please enter the date when the item was lost').refine(v => !Number.isNaN(Date.parse(v)), 'Invalid date'),
    reward: z.number().min(0, 'Reward cannot be negative').optional().refine(v => v === undefined || !Number.isNaN(v), 'Invalid reward'),
    additionalNotes: z.string().optional()
        .transform((v) => (v === '' ? undefined : v)),
    postalCode: z.string().min(4, 'Enter a valid postal code').optional().transform(v => v === '' ? undefined : v),
});


export type LookForItemFormData = z.infer<typeof lookForItemSchema>;
export { lookForItemSchema };