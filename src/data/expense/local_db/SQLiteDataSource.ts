import SQLite from 'react-native-sqlite-storage';
import { Expense, NewExpense } from '../../../domain/expense/entities/Expense';
import { DEFAULT_CATEGORIES } from '../../../domain/expense/entities/Category';

SQLite.DEBUG(true);
SQLite.enablePromise(true);

export class SQLiteDataSource {
  private database: SQLite.SQLiteDatabase | null = null;

  async initDatabase(): Promise<void> {
    try {
      this.database = await SQLite.openDatabase({
        name: 'ExpenseTracker.db',
        location: 'default',
      });

      await this.createTables();
    } catch (error) {
      console.error('Database initialization error:', error);
      throw error;
    }
  }

  private async createTables(): Promise<void> {
    if (!this.database) throw new Error('Database not initialized');

    const createExpensesTable = `
      CREATE TABLE IF NOT EXISTS expenses (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        amount REAL NOT NULL,
        category TEXT NOT NULL,
        description TEXT,
        date TEXT NOT NULL,
        createdAt TEXT NOT NULL
      );
    `;

    await this.database.executeSql(createExpensesTable);
  }

  async addExpense(expense: NewExpense): Promise<number> {
    if (!this.database) throw new Error('Database not initialized');

    const insertQuery = `
      INSERT INTO expenses (amount, category, description, date, createdAt)
      VALUES (?, ?, ?, ?, ?);
    `;

    const result = await this.database.executeSql(insertQuery, [
      expense.amount,
      expense.category,
      expense.description,
      expense.date,
      new Date().toISOString(),
    ]);

    return result[0].insertId;
  }

  async getAllExpenses(): Promise<Expense[]> {
    if (!this.database) throw new Error('Database not initialized');

    const selectQuery = 'SELECT * FROM expenses ORDER BY createdAt DESC;';
    const results = await this.database.executeSql(selectQuery);

    const expenses: Expense[] = [];
    for (let i = 0; i < results[0].rows.length; i++) {
      expenses.push(results[0].rows.item(i));
    }

    return expenses;
  }

  async getExpensesByCategory(): Promise<
    { category: string; total: number; color: string }[]
  > {
    if (!this.database) throw new Error('Database not initialized');

    const selectQuery = `
      SELECT category, SUM(amount) as total
      FROM expenses
      GROUP BY category;
    `;

    const results = await this.database.executeSql(selectQuery);
    const categoryData: { category: string; total: number; color: string }[] =
      [];

    for (let i = 0; i < results[0].rows.length; i++) {
      const row = results[0].rows.item(i);
      const category = DEFAULT_CATEGORIES.find(
        cat => cat.name === row.category,
      );

      categoryData.push({
        category: row.category,
        total: row.total,
        color: category?.color || '#C9CBCF',
      });
    }

    return categoryData;
  }

  async deleteExpense(id: number): Promise<void> {
    if (!this.database) throw new Error('Database not initialized');

    const deleteQuery = 'DELETE FROM expenses WHERE id = ?;';
    await this.database.executeSql(deleteQuery, [id]);
  }

  async clearAllExpenses(): Promise<void> {
    if (!this.database) throw new Error('Database not initialized');

    const deleteQuery = 'DELETE FROM expenses;';
    await this.database.executeSql(deleteQuery);
  }

  async closeDatabase(): Promise<void> {
    if (this.database) {
      await this.database.close();
      this.database = null;
    }
  }
}
