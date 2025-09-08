import React, { memo } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

const CARD_GAP = 12;
const CARD_PADDING = 10;
export const CARD_HEIGHT = 240; // used by getItemLayout

export type ProductCardProps = {
  title: string;
  price: number;
  thumbnail: string;
};

function ProductCardBase({ title, price, thumbnail }: ProductCardProps) {
  return (
    <View style={styles.card}>
      <Image
        source={{ uri: thumbnail }}
        style={styles.image}
        resizeMode="cover"
      />
      <Text numberOfLines={2} style={styles.title}>
        {title}
      </Text>
      <Text style={styles.price}>₹{price.toLocaleString()}</Text>
    </View>
  );
}

export const ProductCard = memo(ProductCardBase);

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: colors.card,
    margin: 5,
    padding: CARD_PADDING,
    borderRadius: 8,
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 140,
    borderRadius: 8,
    marginBottom: CARD_GAP,
  },
  title: {
    fontSize: 14,
    color: colors.text,
    fontWeight: '600',
    marginBottom: 6,
  },
  price: { fontSize: 12, color: colors.subText },
});
