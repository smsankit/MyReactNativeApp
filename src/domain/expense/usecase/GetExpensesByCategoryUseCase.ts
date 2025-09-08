import { IExpenseRepository } from '../repositories/IExpenseRepository';

export class GetExpensesByCategoryUseCase {
  constructor(private expenseRepository: IExpenseRepository) {}

  async execute(): Promise<
    { category: string; total: number; color: string }[]
  > {
    const categoryData = await this.expenseRepository.getExpensesByCategory();

    // Business logic: Filter out categories with zero amounts and sort by total
    return categoryData
      .filter(item => item.total > 0)
      .sort((a, b) => b.total - a.total);
  }
}
