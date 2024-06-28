import * as z from 'zod'

export const transactionSchema = z.object({
    id: z.string({
        invalid_type_error: 'id must be a string',
    }).uuid({ message: 'Invalid format uuid' }).optional().or(z.undefined()),
    community_id: z.string({
        invalid_type_error: 'community_id must be a string',
        required_error: 'community_id is required'
    }).uuid({ message: 'Invalid format uuid' }),
    description: z.string({
        invalid_type_error: 'description must be a string',
    }).trim().optional().default(''),
    date: z.string({
        invalid_type_error: 'date must be a date',
        required_error: 'date is required'
    }
    ).date('Invalid format date'),
    budget_id: z.string({
        invalid_type_error: 'budget_id must be a string',
        required_error: 'budget_id is required'
    }).uuid({ message: 'Invalid format uuid' }),
    amount: z.number({
        invalid_type_error: 'amount must be a number',
        required_error: 'amount is required',

    }).nonnegative(),
    timestamp: z.string({
        invalid_type_error: 'timestamp must be a string',
    }).date('Invalid format date').optional().or(z.undefined())
}).required();