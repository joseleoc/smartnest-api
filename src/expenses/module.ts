import { v4 as uuidv4 } from 'uuid';

import { DrizzleDB } from '@middlewares/drizzle';
import { Expenses as ExpensesTable } from '@db/schema';
import { eq } from 'drizzle-orm';
import { Expense, NewExpense } from './expenses.types';

const localExpenses: Expense[] = [];
export class ExpensesModule {

    static async create({ DB, expense }: { DB: DrizzleDB, expense: NewExpense }): Promise<string> {
        return new Promise(async (resolve, reject) => {
            try {
                console.log({ expense });
                const newExpense: Expense = {
                    ...expense,
                    id: uuidv4(),
                    deleted: false,
                }
                DB.insert(ExpensesTable).values({
                    id: newExpense.id,
                    budget_id: newExpense.budget_id,
                    category_id: newExpense.category_id,
                    community_id: newExpense.community_id,
                    amount: newExpense.amount,
                    date: newExpense.date,
                    deleted: newExpense.deleted ? 1 : 0,
                    description: newExpense.description,
                    voucher: newExpense.voucher,
                }).returning({ id: ExpensesTable.id }).then((result) => {
                    console.log(result);
                    const id = result[0].id
                    resolve(id)
                }).catch((error) => {
                    reject(error)
                });
            } catch (error) {
                reject(error)
            }

        });

    }


    static async edit({ id, expense }: { id: string, expense: Partial<Expense> }): Promise<Expense> {
        return new Promise((resolve, reject) => {
            if (id) {
                const expenseInd = localExpenses.findIndex((expenseToEdit) => expenseToEdit.id === id);
                if (expenseInd !== -1) {
                    localExpenses[expenseInd] = {
                        ...localExpenses[expenseInd],
                        ...expense
                    }
                    resolve(localExpenses[expenseInd])
                }
                reject(('Expense not found'))
            } else {
                reject(('Expense id is required'))
            }
        });


    }

    static getAll(DB: DrizzleDB): Promise<Expense[]> {
        return new Promise(async (resolve, reject) => {
            DB.select().from(ExpensesTable).where(eq(ExpensesTable.deleted, 0)).then((results) => {
                console.log(results);
                const data = results.map((result) => new Expense({ ...result, deleted: result.deleted === 1 ? true : false }))
                resolve(data)
            }).catch((error) => {
                reject(error)
            });
        });
    };


    static async getById(id: string): Promise<Expense | null> {
        return new Promise((resolve, reject) => {
            try {
                const expense = localExpenses.find(expense => expense.id === id)
                if (expense != undefined) {
                    resolve(expense)
                } else {
                    resolve(null)
                }
            } catch (error) {
                reject(error)
            }

        });

    }

    static async delete(id: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            if (id == null || id === '') {
                throw new Error('id is required')
            }

            const expenseInd = localExpenses.findIndex(expense => expense.id === id)
            if (expenseInd !== -1) {
                localExpenses[expenseInd].deleted = true
                resolve(true);
            } else {
                reject(('Expense not found'))
            }
        });

    }
}