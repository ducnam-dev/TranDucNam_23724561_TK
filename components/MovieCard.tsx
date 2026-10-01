import React from 'react';
import { View, Text, Image, TouchableOpacity, Alert, StyleSheet } from 'react-native';

export interface Movie {
    id: string;
    title: string;
    rating: number;
    genre?: string;
    year?: number | string;
    poster?: string;
    isShowing: boolean;
}

export interface MovieCardProps {
    movie: Movie;
    layout?: 'row' | 'tile';
    onSelect: (id: string) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, layout = 'row', onSelect }) => {
    const isTile = layout === 'tile';

    return (
        <TouchableOpacity 
            style={[styles.card, isTile && styles.cardTile]} 
            onPress={() => {
                onSelect(movie.id);
                Alert.alert(movie.title);
            }}
        >
            {/* Phần hiển thị Poster kèm theo nhãn ⭐ tuyệt đối khi ở layout 'tile' */}
            {movie.poster ? (
                <View style={isTile ? styles.posterContainerTile : null}>
                    <Image 
                        source={{ uri: movie.poster }} 
                        style={[styles.poster, isTile && styles.posterTile]} 
                    />
                    {isTile && (
                        <View style={styles.ratingBadge}>
                            <Text style={styles.ratingBadgeText}>⭐✅/❌. {Number(movie.rating).toFixed(1)}</Text>
                        </View>
                    )}
                </View>
            ) : null}
            
            {/* Phần thông tin thay đổi theo layout */}
            <View style={[styles.info, !isTile && styles.infoRow]}>
                <Text style={styles.title} numberOfLines={isTile ? 1 : undefined}>
                    {movie.title}
                </Text>
                
                {/* layout 'tile' ẩn thể loại và năm */}
                {!isTile && (
                    <>
                        <Text>The loai: {movie.genre || 'N/A'}</Text>
                        <Text>Nam: {movie.year || 'N/A'}</Text>
                        <Text>Diem so:⭐  {Number(movie.rating).toFixed(1)}</Text>
                    </>
                )}
                
                <Text>Trang thai: {movie.isShowing ? '✅' : '❌'}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    // Bố cục mặc định layout = 'row' (1 cột, ngang)
    card: {
        flexDirection: 'row',
        padding: 10,
        marginVertical: 4,
        marginHorizontal: 8,
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#eee',
    },
    // Bố cục layout = 'tile' (2 cột, dọc)
    cardTile: {
        flexDirection: 'column',
        width: '46%', // Tùy chỉnh chiều rộng thẻ nếu dùng trong FlatList dạng grid (numColumns = 2)
        margin: '2%',
    },
    poster: {
        width: 70,
        height: 100,
        borderRadius: 4,
        backgroundColor: '#ccc',
    },
    posterContainerTile: {
        position: 'relative',
        width: '100%',
    },
    posterTile: {
        width: '100%',
        aspectRatio: 2 / 3, // Poster chiếm hết bề ngang theo tỉ lệ 2/3
        height: undefined,
    },

    ratingBadge: {
        position: 'absolute',
        top: 8,
        right: 8,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        paddingHorizontal: 6,
        paddingVertical: 3,
        borderRadius: 4,
    },
    ratingBadgeText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
    },
    info: {
        justifyContent: 'center',
    },
    infoRow: {
        marginLeft: 12,
        flex: 1,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
    },
});

export default React.memo(MovieCard);