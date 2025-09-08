import { IExpenseRepository } from '../repositories/IExpenseRepository';
import { NewExpense } from '../entities/Expense';

export class AddExpenseUseCase {
  constructor(private expenseRepository: IExpenseRepository) {}

  async execute(expense: NewExpense): Promise<number> {
    // Business logic validation can go here
    if (expense.amount <= 0) {
      throw new Error('Amount must be greater than zero');
    }

    if (!expense.category.trim()) {
      throw new Error('Category is required');
    }

    return await this.expenseRepository.addExpense(expense);
  }
}
