// import { ExpensesModel } from "./expenses-model";

// describe('Expenses schemas', () => {

//     it('should create a new expense with random UUID id and deleted set to false', async () => {
//         const newExpense = {
//             community_id: '123',
//             description: 'Test Expense',
//             date: '2022-12-31',
//             category_id: '456',
//             voucher: 'ABC123',
//             budget_id: 'XXX',
//             amount: 123.45
//         };

//         const createdExpense = await ExpensesModel.create({ expense: newExpense });

//         expect(createdExpense).toHaveProperty('id');
//         expect(createdExpense.id).toMatch(/[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}/); // UUID v4 regex
//         expect(createdExpense.deleted).toBe(false);
//         expect(createdExpense.community_id).toBe(newExpense.community_id);
//         expect(createdExpense.description).toBe(newExpense.description);
//         expect(createdExpense.date).toBe(newExpense.date);
//         expect(createdExpense.category_id).toBe(newExpense.category_id);
//         expect(createdExpense.voucher).toBe(newExpense.voucher);
//     });

// })