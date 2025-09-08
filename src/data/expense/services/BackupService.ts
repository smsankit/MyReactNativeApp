import RNFS from 'react-native-fs';
import { Alert, Platform } from 'react-native';
import { Expense } from '../../../domain/expense/entities/Expense';

export class BackupService {
  private getBackupPath(): string {
    const fileName = `expense_backup_${
      new Date().toISOString().split('T')[0]
    }.json`;

    if (Platform.OS === 'android') {
      return `${RNFS.ExternalDirectoryPath}/${fileName}`;
    } else {
      return `${RNFS.DocumentDirectoryPath}/${fileName}`;
    }
  }

  async backupExpenses(expenses: Expense[]): Promise<void> {
    try {
      const backupData = {
        version: '1.0',
        timestamp: new Date().toISOString(),
        expenses: expenses,
      };

      const backupPath = this.getBackupPath();
      await RNFS.writeFile(
        backupPath,
        JSON.stringify(backupData, null, 2),
        'utf8',
      );

      Alert.alert('Backup Successful', `Expenses backed up to: ${backupPath}`, [
        { text: 'OK' },
      ]);
    } catch (error) {
      console.error('Backup error:', error);
      Alert.alert('Backup Failed', 'Failed to create backup file');
    }
  }

  async restoreExpenses(): Promise<Expense[]> {
    try {
      // For simplicity, we'll read from a fixed backup file
      // In a real app, you'd let users pick a file
      const backupPath = this.getBackupPath();

      const fileExists = await RNFS.exists(backupPath);
      if (!fileExists) {
        Alert.alert('Restore Failed', 'No backup file found');
        return [];
      }

      const backupContent = await RNFS.readFile(backupPath, 'utf8');
      const backupData = JSON.parse(backupContent);

      if (backupData.expenses && Array.isArray(backupData.expenses)) {
        Alert.alert(
          'Restore Successful',
          `Restored ${backupData.expenses.length} expenses`,
        );
        return backupData.expenses;
      } else {
        Alert.alert('Restore Failed', 'Invalid backup file format');
        return [];
      }
    } catch (error) {
      console.error('Restore error:', error);
      Alert.alert('Restore Failed', 'Failed to restore from backup');
      return [];
    }
  }
}
