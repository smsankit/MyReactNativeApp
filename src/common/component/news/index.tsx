import React from 'react';
import { View, Text, Image, TouchableOpacity, Linking } from 'react-native';
import { styles } from './styles';
import { Article } from '../../../screens/news/types/article.type';

export default function NewsCard({ article }: { article: Article }) {
  return (
    <TouchableOpacity onPress={() => Linking.openURL(article.url)}>
      <View style={styles.card}>
        {article.urlToImage && (
          <Image source={{ uri: article.urlToImage }} style={styles.image} />
        )}
        <View style={styles.content}>
          <Text style={styles.title}>{article.title}</Text>
          <Text style={styles.description} numberOfLines={2}>
            {article.description}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
