import { useState, useEffect } from 'react';
import { Expense, NewExpense } from '../../../domain/expense/entities/Expense';
import { UseCaseContainer } from '../../../domain/expense/usecase/UseCaseContainer';
import { SQLiteDataSource } from '../../../data/expense/local_db/SQLiteDataSource';
import { ExpenseRepository } from '../../../data/expense/repositories/ExpenseRepository';
import { BackupService } from '../../../data/expense/services/BackupService';

export const useExpenses = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [categoryData, setCategoryData] = useState<
    { category: string; total: number; color: string }[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [useCaseContainer, setUseCaseContainer] =
    useState<UseCaseContainer | null>(null);
  const [initializing, setInitializing] = useState(true);

  // Initialize dependencies inside the hook
  useEffect(() => {
    const initializeDependencies = async () => {
      try {
        setInitializing(true);

        const dataSource = new SQLiteDataSource();
        await dataSource.initDatabase();

        const expenseRepository = new ExpenseRepository(dataSource);

        const backupService = new BackupService();

        const container = new UseCaseContainer(
          expenseRepository,
          backupService,
        );
        setUseCaseContainer(container);
      } catch (err) {
        setError('Failed to initialize dependencies');
        console.error('Dependency initialization error:', err);
      } finally {
        setInitializing(false);
      }
    };

    initializeDependencies();
  }, []);

  const loadExpenses = async () => {
    if (!useCaseContainer) return;

    try {
      setLoading(true);
      setError(null);
      const data = await useCaseContainer.getGetAllExpensesUseCase().execute();
      setExpenses(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error loading expenses');
      console.error('Error loading expenses:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadCategoryData = async () => {
    if (!useCaseContainer) return;

    try {
      setError(null);
      const data = await useCaseContainer
        .getGetExpensesByCategoryUseCase()
        .execute();
      setCategoryData(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Error loading category data',
      );
      console.error('Error loading category data:', err);
    }
  };

  const addExpense = async (expense: NewExpense) => {
    if (!useCaseContainer) throw new Error('Services not initialized');

    try {
      setError(null);
      await useCaseContainer.getAddExpenseUseCase().execute(expense);
      await loadExpenses();
      await loadCategoryData();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error adding expense');
      console.error('Error adding expense:', err);
      throw err;
    }
  };

  const deleteExpense = async (id: number) => {
    if (!useCaseContainer) throw new Error('Services not initialized');

    try {
      setError(null);
      await useCaseContainer.getDeleteExpenseUseCase().execute(id);
      await loadExpenses();
      await loadCategoryData();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error deleting expense');
      console.error('Error deleting expense:', err);
      throw err;
    }
  };

  const backup = async () => {
    if (!useCaseContainer) throw new Error('Services not initialized');

    try {
      setError(null);
      await useCaseContainer.getBackupExpensesUseCase().execute();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error backing up data');
      console.error('Error backing up:', err);
      throw err;
    }
  };

  const restore = async () => {
    if (!useCaseContainer) throw new Error('Services not initialized');

    try {
      setError(null);
      await useCaseContainer.getRestoreExpensesUseCase().execute();
      await loadExpenses();
      await loadCategoryData();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error restoring data');
      console.error('Error restoring:', err);
      throw err;
    }
  };

  // Load data once dependencies are initialized
  useEffect(() => {
    if (useCaseContainer) {
      loadExpenses();
      loadCategoryData();
    }
  }, [useCaseContainer]);

  return {
    expenses,
    categoryData,
    loading,
    error,
    initializing, // Add this to show loading state while initializing
    addExpense,
    deleteExpense,
    backup,
    restore,
    refresh: () => {
      setError(null);
      loadExpenses();
      loadCategoryData();
    },
    clearError: () => setError(null),
  };
};
