import { BackupService } from '../../../data/expense/services/BackupService';
import { IExpenseRepository } from '../repositories/IExpenseRepository';

export class BackupExpensesUseCase {
  constructor(
    private expenseRepository: IExpenseRepository,
    private backupService: BackupService,
  ) {}

  async execute(): Promise<void> {
    const expenses = await this.expenseRepository.getAllExpenses();

    if (expenses.length === 0) {
      throw new Error('No expenses to backup');
    }

    await this.backupService.backupExpenses(expenses);
  }
}
