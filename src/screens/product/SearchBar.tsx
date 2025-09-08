import React, { useMemo, useRef, useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import { colors } from '../theme/colors';
import { debounce } from '../../data/product/util/debounce';

export const SearchBar = ({ onChange }: { onChange: (q: string) => void }) => {
  const [value, setValue] = useState('');
  const debounced = useMemo(() => debounce(onChange, 400), [onChange]);
  const ref = useRef<TextInput>(null);

  const handleChange = (text: string) => {
    setValue(text);
    debounced(text);
  };

  const handleClear = () => {
    setValue('');
    debounced('');
    ref.current?.clear();
  };

  return (
    <View style={styles.c}>
      <TextInput
        ref={ref}
        value={value}
        placeholder="Search products…"
        placeholderTextColor={colors.subText}
        style={styles.input}
        onChangeText={handleChange}
        returnKeyType="search"
      />

      {value.length > 0 && (
        <TouchableOpacity onPress={handleClear} style={styles.clearBtn}>
          <Text style={styles.clearText}>❌</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  c: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: 12,
  },
  input: {
    flex: 1,
    color: colors.text,
    padding: 8,
  },
  clearBtn: {
    padding: 6,
  },
  clearText: {
    fontSize: 16,
    color: colors.subText,
    paddingEnd: 8,
  },
});
