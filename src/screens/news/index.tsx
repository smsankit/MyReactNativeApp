import React from 'react';
import {
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  View,
} from 'react-native';
import NewsCard from '../../component/news';
import { useNewsFeed } from '../../domain/news/useNewsFeed.hook';
import { styles } from './styles';
import ErrorComponent from '../../component/error';
import LoadingComponent from '../../common/component/loader';

const ItemSeparator = () => <View style={styles.itemSeparator} />;

export default function NewsScreen() {
  const {
    articles,
    loading,
    loadingMore,
    refreshing,
    error,
    loadMore,
    refresh,
    hasMore,
  } = useNewsFeed();

  if (loading) {
    return <LoadingComponent />;
  } else if (articles.length === 0) {
    return <ErrorComponent errorMsg="No news available at the moment." />;
  }

  return (
    <SafeAreaView style={styles.container}>
      {error && <ErrorComponent errorMsg={error} />}
      <FlatList
        data={articles}
        keyExtractor={item => item.article_id}
        renderItem={({ item }) => <NewsCard article={item} />}
        onEndReached={() => {
          if (hasMore) loadMore();
        }}
        ItemSeparatorComponent={ItemSeparator}
        onEndReachedThreshold={0.1}
        ListFooterComponent={
          loadingMore ? <ActivityIndicator size={40} /> : null
        }
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={refresh} />
        }
      />
    </SafeAreaView>
  );
}
