export interface Category {
  id: number;
  name: string;
  color: string;
}

export const DEFAULT_CATEGORIES: Category[] = [
  { id: 1, name: 'Food', color: '#FF6384' },
  { id: 2, name: 'Transportation', color: '#36A2EB' },
  { id: 3, name: 'Entertainment', color: '#FFCE56' },
  { id: 4, name: 'Shopping', color: '#4BC0C0' },
  { id: 5, name: 'Bills', color: '#9966FF' },
  { id: 6, name: 'Healthcare', color: '#FF9F40' },
  { id: 7, name: 'Other', color: '#C9CBCF' },
];
