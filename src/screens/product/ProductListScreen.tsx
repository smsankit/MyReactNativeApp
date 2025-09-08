import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { useProductsHook } from './useProductHook';
import { SearchBar } from './SearchBar';
import { ProductCard } from './ProductCard';
import LoadingComponent from '../../common/component/loader';

export default function ProductListScreen() {
  const {
    products,
    categories,
    selectedCategory,
    setSelectedCategory,
    page,
    setSearch,
    loadProducts,
    hasMore,
    loading,
  } = useProductsHook();

  if (loading && page === 0) return <LoadingComponent />;

  return (
    <View style={styles.container}>
      <SearchBar onChange={text => setSearch(text)} />

      <View style={styles.resetContainer}>
        <TouchableOpacity
          style={styles.filterBtn}
          onPress={() => {
            setSearch('');
            setSelectedCategory(null);
          }}
        >
          <Text style={styles.filterText}>All</Text>
        </TouchableOpacity>

        <FlatList
          data={categories}
          horizontal
          showsHorizontalScrollIndicator={false}
          // keyExtractor={c => c}
          keyExtractor={(item, index) => `${item.slug}-${index}`}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.category,
                selectedCategory?.slug === item.slug && styles.categorySelected,
              ]}
              onPress={() => {
                setSelectedCategory(
                  selectedCategory?.slug === item.slug ? null : item,
                );
                setSearch('');
              }}
            >
              <Text
                style={{
                  color:
                    selectedCategory?.slug === item.slug ? 'white' : 'black',
                }}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      <FlatList
        data={products}
        // keyExtractor={item => item.id.toString()}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        numColumns={2}
        renderItem={({ item }) => (
          <ProductCard
            title={item.title}
            price={item.price}
            thumbnail={item.thumbnail}
          />
        )}
        contentContainerStyle={styles.list}
        onEndReached={() => hasMore && loadProducts(false)}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loading ? <ActivityIndicator size={40} /> : null}
        initialNumToRender={10}
        removeClippedSubviews={true}
        windowSize={5}
        getItemLayout={(_, index) => ({
          length: 250,
          offset: 250 * index,
          index,
        })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: '#fff' },
  search: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    marginBottom: 10,
  },
  category: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#eee',
    borderRadius: 20,
    marginRight: 8,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categorySelected: {
    backgroundColor: 'black',
  },
  list: { paddingVertical: 10 },
  resetContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  filterBtn: {
    marginLeft: 8,
    backgroundColor: 'pink',
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginEnd: 10,
    borderRadius: 20,
    marginRight: 8,
    height: 40,
  },
  filterText: {
    color: 'white',
    fontWeight: '600',
  },
});
