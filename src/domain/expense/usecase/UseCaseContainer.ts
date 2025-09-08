import { IExpenseRepository } from '../repositories/IExpenseRepository';
import { AddExpenseUseCase } from './AddExpenseUseCase';
import { GetAllExpensesUseCase } from './GetAllExpensesUseCase';
import { GetExpensesByCategoryUseCase } from './GetExpensesByCategoryUseCase';
import { DeleteExpenseUseCase } from './DeleteExpenseUseCase';
import { BackupExpensesUseCase } from './BackupExpensesUseCase';
import { RestoreExpensesUseCase } from './RestoreExpensesUseCase';
import { BackupService } from '../../../data/expense/services/BackupService';

export class UseCaseContainer {
  private addExpenseUseCase: AddExpenseUseCase;
  private getAllExpensesUseCase: GetAllExpensesUseCase;
  private getExpensesByCategoryUseCase: GetExpensesByCategoryUseCase;
  private deleteExpenseUseCase: DeleteExpenseUseCase;
  private backupExpensesUseCase: BackupExpensesUseCase;
  private restoreExpensesUseCase: RestoreExpensesUseCase;

  constructor(
    private expenseRepository: IExpenseRepository,
    private backupService: BackupService,
  ) {
    this.addExpenseUseCase = new AddExpenseUseCase(expenseRepository);
    this.getAllExpensesUseCase = new GetAllExpensesUseCase(expenseRepository);
    this.getExpensesByCategoryUseCase = new GetExpensesByCategoryUseCase(
      expenseRepository,
    );
    this.deleteExpenseUseCase = new DeleteExpenseUseCase(expenseRepository);
    this.backupExpensesUseCase = new BackupExpensesUseCase(
      expenseRepository,
      backupService,
    );
    this.restoreExpensesUseCase = new RestoreExpensesUseCase(
      expenseRepository,
      backupService,
    );
  }

  getAddExpenseUseCase(): AddExpenseUseCase {
    return this.addExpenseUseCase;
  }

  getGetAllExpensesUseCase(): GetAllExpensesUseCase {
    return this.getAllExpensesUseCase;
  }

  getGetExpensesByCategoryUseCase(): GetExpensesByCategoryUseCase {
    return this.getExpensesByCategoryUseCase;
  }

  getDeleteExpenseUseCase(): DeleteExpenseUseCase {
    return this.deleteExpenseUseCase;
  }

  getBackupExpensesUseCase(): BackupExpensesUseCase {
    return this.backupExpensesUseCase;
  }

  getRestoreExpensesUseCase(): RestoreExpensesUseCase {
    return this.restoreExpensesUseCase;
  }
}
