import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { NewExpense } from '../../../domain/expense/entities/Expense';
import { DEFAULT_CATEGORIES } from '../../../domain/expense/entities/Category';
import { Picker } from '@react-native-picker/picker';

interface Props {
  onAddExpense: (expense: NewExpense) => void;
}

export const ExpenseForm: React.FC<Props> = ({ onAddExpense }) => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState(DEFAULT_CATEGORIES[0].name);
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    if (!amount || isNaN(Number(amount))) {
      Alert.alert('Error', 'Please enter a valid amount');
      return;
    }

    const expense: NewExpense = {
      amount: Number(amount),
      category,
      description,
      date: new Date().toISOString().split('T')[0],
    };

    onAddExpense(expense);
    setAmount('');
    setDescription('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New Expense</Text>

      <TextInput
        style={styles.input}
        placeholder="Amount"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
      />

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={category}
          style={styles.picker}
          onValueChange={setCategory}
        >
          {DEFAULT_CATEGORIES.map(cat => (
            <Picker.Item key={cat.id} label={cat.name} value={cat.name} />
          ))}
        </Picker>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Description (optional)"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Add Expense</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    margin: 10,
    borderRadius: 10,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginBottom: 15,
  },
  picker: {
    height: 50,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
