import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';

import { getDB } from '@db/helpers';
import { Context } from 'types/context';
import { ExpensesModule } from './module';
import { expenseSchema, validateExpense } from './expenses-schemas';


const expensesRouter = new Hono<Context>();

/**
 * Create a new expense
 * body: @see Expense as JSON
 */
expensesRouter.post('/', zValidator('json', expenseSchema, (result, c) => {
    if (!result.success) {
        c.status(400)
        return c.json({ error: JSON.parse(result.error.message) });
    }
}), async (c) => {
    try {
        const DB = getDB(c);
        const body = await c.req.json();
        const { success, data, error } = validateExpense(body)
        if (!success || data == undefined) {
            c.status(400)
            return c.json({ error, data })
        }
        console.log({ data });
        const expenseId = await ExpensesModule.create({ DB, expense: data })
        c.status(201)
        return c.json(expenseId)
    } catch (error) {
        console.error(error);
        c.status(500)
        return c.json({ error: error })
    }
})

expensesRouter.patch('/:id', zValidator('json', expenseSchema.partial(), async (result, c) => {
    try {
        const id = c.req.param('id');
        if (id == null || id === '') {
            c.status(400)
            return c.json({ error: 'id is required' })
        }
        if (!result.success) {
            c.status(400)
            return c.json({ error: JSON.parse(result.error.message) })
        }
        try {
            const editedExpense = await ExpensesModule.edit({ id: id, expense: result.data })
            c.status(201);
            return c.json({ message: 'expense edited successfully', editedExpense })
        } catch (error) {
            c.status(500)
            return c.json({ error, })
        }
    } catch (error) {
        c.status(500)
        return c.json({ error, })
    }

}));

/** 
 * Get An array of expenses
 */
expensesRouter.get('/all', async (c) => {
    try {

        const DB = getDB(c)
        const expenses = await ExpensesModule.getAll(DB)
        c.status(200)
        return c.json(expenses)
    } catch (error) {
        c.status(500)
        return c.json({ error, })
    }
});

expensesRouter.get('/:id', async (c) => {
    try {
        const id = c.req.param('id');
        if (id == null || id === '') {
            c.status(400)
            return c.json({ error: 'id is required' })
        }
        const expense = await ExpensesModule.getById(id)
        if (expense == null) {
            c.status(404)
            return c.json({ error: 'expense not found' })
        } else {
            c.status(200)
            return c.json(expense)
        }

    } catch (error) {
        c.status(500)
        return c.json({ error, })
    }
});


expensesRouter.delete('/:id', async (c) => {
    try {
        const id = c.req.param('id');
        if (id == null || id === '') {
            c.status(400)
            return c.json({ error: 'id is required' })
        }
        const res = await ExpensesModule.delete(id)

        c.status(200)
        return c.json({ message: 'expense deleted successfully' })




    } catch (error) {
        console.error(error);
        c.status(500)
        return c.json({ error, })
    }
});

export default expensesRouter;