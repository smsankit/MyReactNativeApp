import { IExpenseRepository } from '../repositories/IExpenseRepository';
import { Expense } from '../entities/Expense';

export class GetAllExpensesUseCase {
  constructor(private expenseRepository: IExpenseRepository) {}

  async execute(): Promise<Expense[]> {
    const expenses = await this.expenseRepository.getAllExpenses();

    // Business logic: Sort by date descending
    return expenses.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
  }
}
