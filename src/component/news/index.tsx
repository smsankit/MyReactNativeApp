import React from 'react';
import { View, Text, Image, TouchableOpacity, Linking } from 'react-native';
import { Article } from '../../screens/news/types/article.type';
import { styles } from './styles';

export default function NewsCard({ article }: { article: Article }) {
  return (
    <TouchableOpacity onPress={() => Linking.openURL(article.link)}>
      <View style={styles.card}>
        {article.image_url && (
          <Image source={{ uri: article.image_url }} style={styles.image} />
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
