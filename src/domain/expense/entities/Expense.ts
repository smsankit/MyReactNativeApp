export interface Expense {
  id: number;
  amount: number;
  category: string;
  description: string;
  date: string;
  createdAt: string;
}

export interface NewExpense {
  amount: number;
  category: string;
  description: string;
  date: string;
}
