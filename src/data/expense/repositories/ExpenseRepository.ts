import { Expense, NewExpense } from '../../../domain/expense/entities/Expense';
import { IExpenseRepository } from '../../../domain/expense/repositories/IExpenseRepository';
import { SQLiteDataSource } from '../local_db/SQLiteDataSource';

export class ExpenseRepository implements IExpenseRepository {
  constructor(private dataSource: SQLiteDataSource) {}

  async addExpense(expense: NewExpense): Promise<number> {
    return await this.dataSource.addExpense(expense);
  }

  async getAllExpenses(): Promise<Expense[]> {
    return await this.dataSource.getAllExpenses();
  }

  async getExpensesByCategory(): Promise<
    { category: string; total: number; color: string }[]
  > {
    return await this.dataSource.getExpensesByCategory();
  }

  async deleteExpense(id: number): Promise<void> {
    return await this.dataSource.deleteExpense(id);
  }

  async clearAllExpenses(): Promise<void> {
    return await this.dataSource.clearAllExpenses();
  }
}
