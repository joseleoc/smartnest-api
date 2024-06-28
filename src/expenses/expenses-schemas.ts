import { transactionSchema } from '@schemas/generalSchemas'
import { SafeParseReturnType, string } from 'zod'
import { Expense, NewExpense } from './expenses.types'

export const expenseSchema = transactionSchema.extend({
    category_id: string({
        invalid_type_error: 'category_id must be a string',
        required_error: 'category_id is required'
    }).uuid({ message: 'Invalid format uuid' }),
    voucher: string({
        invalid_type_error: 'voucher must be a string',
    }).trim().default('N/A'),
})

/** Validates an expense object against the expense schema. */
export function validateExpense(shape: unknown): SafeParseReturnType<NewExpense, NewExpense> {
    return expenseSchema.safeParse(shape)
}

/** Validates a partial expense object against the expense schema. */
export function validatePartialExpense(shape: unknown): SafeParseReturnType<Expense, Partial<Expense>> {
    return expenseSchema.partial().safeParse(shape)
}