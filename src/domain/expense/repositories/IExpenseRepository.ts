import { Expense, NewExpense } from '../entities/Expense';

export interface IExpenseRepository {
  addExpense(expense: NewExpense): Promise<number>;
  getAllExpenses(): Promise<Expense[]>;
  getExpensesByCategory(): Promise<
    { category: string; total: number; color: string }[]
  >;
  deleteExpense(id: number): Promise<void>;
  clearAllExpenses(): Promise<void>;
}
