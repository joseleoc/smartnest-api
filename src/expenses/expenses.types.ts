import { Transaction } from '../types/types';

export class Expense extends Transaction {
    category_id = '';
    voucher?: string | null;

    constructor(data: Expense) {
        super(data);
        Object.assign(this, data)
    }
}

export type NewExpense = Omit<Expense, 'id' | 'deleted'>