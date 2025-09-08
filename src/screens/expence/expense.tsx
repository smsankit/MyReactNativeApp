import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
  FlatList,
  Alert,
} from 'react-native';
import { useExpenses } from './hooks/useExpenses';
import { Expense } from '../../domain/expense/entities/Expense';
import { ExpenseForm } from './components/ExpenseForm';
import { PieChartComponent } from './components/PieChartComponent';

// ✅ No Props interface needed - completely self-contained!
export const ExpenseScreen = () => {
  const {
    expenses,
    categoryData,
    loading,
    error,
    initializing,
    addExpense,
    deleteExpense,
    backup,
    restore,
    refresh,
  } = useExpenses(); // No parameters needed!

  const handleAddExpense = async (expense: any) => {
    try {
      await addExpense(expense);
    } catch (err) {
      Alert.alert(
        'Error',
        err instanceof Error ? err.message : 'Failed to add expense',
      );
    }
  };

  const handleBackup = async () => {
    try {
      await backup();
    } catch (err) {
      Alert.alert(
        'Backup Failed',
        err instanceof Error ? err.message : 'Failed to backup data',
      );
    }
  };

  const handleRestore = async () => {
    try {
      await restore();
    } catch (err) {
      Alert.alert(
        'Restore Failed',
        err instanceof Error ? err.message : 'Failed to restore data',
      );
    }
  };

  // Show loading while initializing dependencies
  if (initializing) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Initializing Expense Tracker...</Text>
      </View>
    );
  }

  // Show error if initialization failed
  if (error && !expenses.length) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={refresh}>
          <Text style={styles.retryButtonText}>Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const renderExpenseItem = ({ item }: { item: Expense }) => (
    <View style={styles.expenseItem}>
      <View style={styles.expenseInfo}>
        <Text style={styles.expenseAmount}>${item.amount.toFixed(2)}</Text>
        <Text style={styles.expenseCategory}>{item.category}</Text>
        <Text style={styles.expenseDescription}>{item.description}</Text>
        <Text style={styles.expenseDate}>{item.date}</Text>
      </View>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => {
          Alert.alert(
            'Delete Expense',
            'Are you sure you want to delete this expense?',
            [
              { text: 'Cancel', style: 'cancel' },
              {
                text: 'Delete',
                style: 'destructive',
                onPress: async () => {
                  try {
                    await deleteExpense(item.id);
                  } catch (err) {
                    Alert.alert('Error', 'Failed to delete expense');
                  }
                },
              },
            ],
          );
        }}
      >
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <ExpenseForm onAddExpense={handleAddExpense} />

      <PieChartComponent data={categoryData} />
      <View style={styles.backupContainer}>
        <TouchableOpacity style={styles.backupButton} onPress={handleBackup}>
          <Text style={styles.backupButtonText}>Backup Data</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.restoreButton} onPress={handleRestore}>
          <Text style={styles.restoreButtonText}>Restore Data</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.expensesContainer}>
        <Text style={styles.expensesTitle}>
          Recent Expenses {loading && '(Loading...)'}
        </Text>
        <FlatList
          data={expenses}
          renderItem={renderExpenseItem}
          keyExtractor={item => item.id.toString()}
          scrollEnabled={false}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: '#dc3545',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 5,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  backupContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
  },
  backupButton: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 5,
    flex: 1,
    marginRight: 5,
  },
  restoreButton: {
    backgroundColor: '#17a2b8',
    padding: 15,
    borderRadius: 5,
    flex: 1,
    marginLeft: 5,
  },
  backupButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  restoreButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  expensesContainer: {
    backgroundColor: '#fff',
    margin: 10,
    padding: 20,
    borderRadius: 10,
    elevation: 3,
  },
  expensesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  expenseItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  expenseInfo: {
    flex: 1,
  },
  expenseAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  expenseCategory: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  expenseDescription: {
    fontSize: 12,
    color: '#888',
    marginTop: 1,
  },
  expenseDate: {
    fontSize: 12,
    color: '#999',
    marginTop: 1,
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    padding: 8,
    borderRadius: 4,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
