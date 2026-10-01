import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Switch,
  RefreshControl, // <-- BỔ SUNG CÂU 6.a: Import RefreshControl
  StyleSheet,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import MovieCard, { Movie } from './components/MovieCard';
import mockData from './data/MOCK_DATA.json';

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isTile, setIsTile] = useState<boolean>(false);

  // <-- BỔ SUNG CÂU 6.a: State quản lý trạng thái đang refresh
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const numColumns = isTile ? 2 : 1;

  // Hàm load dữ liệu giả lập API GET
  const fetchData = () => {
    setTimeout(() => {
      setMovies(mockData as Movie[]);
      setLoading(false);
      setRefreshing(false); // Kết thúc refresh
    }, 1000);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // <-- BỔ SUNG CÂU 6.b: Hàm xử lý kéo xuống làm mới (vẫn giữ nguyên isTile)
  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  const handleSelect = (id: string) => {
    console.log('Selected movie ID:', id);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Movie App</Text>

          <View style={styles.switchContainer}>
            <Text style={styles.switchLabel}>Dạng lưới</Text>
            <Switch
              value={isTile}
              onValueChange={(val) => setIsTile(val)}
            />
          </View>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
        ) : (
          <FlatList
            key={String(numColumns)}
            data={movies}
            numColumns={numColumns}
            keyExtractor={(item) => item.id.toString()}
            columnWrapperStyle={isTile ? styles.rowWrapper : undefined}
            // <-- BỔ SUNG CÂU 6.a & 6.b: Thêm RefreshControl vào FlatList
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            renderItem={({ item }) => (
              <MovieCard
                movie={item}
                layout={isTile ? 'tile' : 'row'}
                onSelect={handleSelect}
              />
            )}
          />
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  switchLabel: {
    marginRight: 8,
    fontSize: 14,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowWrapper: {
    paddingHorizontal: 4,
    justifyContent: 'space-between',
  },
});