import { IExpenseRepository } from '../repositories/IExpenseRepository';

export class DeleteExpenseUseCase {
  constructor(private expenseRepository: IExpenseRepository) {}

  async execute(id: number): Promise<void> {
    if (id <= 0) {
      throw new Error('Invalid expense ID');
    }

    await this.expenseRepository.deleteExpense(id);
  }
}
