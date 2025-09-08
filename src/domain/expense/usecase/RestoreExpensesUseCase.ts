import { BackupService } from '../../../data/expense/services/BackupService';
import { IExpenseRepository } from '../repositories/IExpenseRepository';

export class RestoreExpensesUseCase {
  constructor(
    private expenseRepository: IExpenseRepository,
    private backupService: BackupService,
  ) {}

  async execute(): Promise<void> {
    // Clear existing expenses
    await this.expenseRepository.clearAllExpenses();

    // Restore from backup
    const restoredExpenses = await this.backupService.restoreExpenses();

    // Add each expense back to the repository
    for (const expense of restoredExpenses) {
      const { id, ...expenseWithoutId } = expense; // Remove ID for new insertion
      await this.expenseRepository.addExpense(expenseWithoutId);
    }
  }
}
