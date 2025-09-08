import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { VictoryPie } from 'victory-native';

interface Props {
  data: { category: string; total: number; color: string }[];
}

export const PieChartComponent: React.FC<Props> = ({ data }) => {
  if (data.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.noDataText}>No expense data available</Text>
      </View>
    );
  }

  const pieData = data.map(item => ({
    x: item.category,
    y: item.total,
  }));

  const pieColors = data.map(item => item.color);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Expenses by Category</Text>

      <VictoryPie
        data={pieData}
        width={250}
        height={250}
        colorScale={pieColors}
        innerRadius={50}
      />

      <View style={styles.legendRow}>
        <View style={styles.legend}>
          {data.map((item, index) => (
            <View key={index} style={styles.legendItem}>
              <View
                style={[styles.legendColor, { backgroundColor: item.color }]}
              />
              <Text style={styles.legendText}>
                {item.category}: ${item.total.toFixed(2)}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    margin: 10,
    padding: 20,
    borderRadius: 10,
    elevation: 3,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  legendRow: {
    width: '100%',
    marginTop: 20,
  },
  legend: {
    flexDirection: 'column',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  legendColor: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 10,
  },
  legendText: {
    fontSize: 14,
  },
  noDataText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    marginTop: 50,
  },
});
