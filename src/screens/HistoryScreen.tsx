import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import AppText from '../components/AppText';
import AppButton from '../components/AppButton';
import { COLORS, SIZES, SPACING, SHADOWS } from '../constaints/hotelTheme';
import { User, BookingHistoryItem } from '../types';
import ScreenContainer from '../components/layout/ScreenContainer';

interface HistoryScreenProps {
  onBack: () => void;
  user: User;
}

const HistoryScreen: React.FC<HistoryScreenProps> = ({ onBack, user }) => {
  const [history, setHistory] = useState<BookingHistoryItem[]>([]);

  const fetchHistory = async (): Promise<void> => {
    try {
      const res = await fetch(`http://10.0.2.2:3000/history/${user.userID}`);
      const data = await res.json();
      if (!res.ok) {
        throw new Error((data as { message?: string }).message || 'Get history failed');
      }
      setHistory(data as BookingHistoryItem[]);
    } catch (error) {
      console.log('Lỗi lấy lịch sử:', error);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const renderItem = ({ item }: { item: BookingHistoryItem }) => (
    <View style={[styles.card, { ...SHADOWS.light }]}>
      <AppText variant="body" color={COLORS.textDark} style={{ fontWeight: "600", marginBottom: SPACING.md }}>
        Phòng: {item.room.name}
      </AppText>
      <AppText variant="caption" color={COLORS.text}>
        Khách: {item.formData.name}
      </AppText>
      <AppText variant="caption" color={COLORS.text}>
        Ngày đặt: {item.createdAt}
      </AppText>
      <AppText variant="caption" color={COLORS.text}>
        Giá: {item.room.price} VND
      </AppText>
      <AppText variant="caption" color={COLORS.text}>
        Trang thái: {item.status}
      </AppText>
    </View>
  );

  return (
    <ScreenContainer withScroll={false} style={{ backgroundColor: COLORS.screenBackGround }}>
      <View style={styles.header}>
        <AppButton
          title="← Back"
          onPress={onBack}
          style={styles.backButton}
        />
      </View>
      <AppText variant="title" color={COLORS.textDark} style={styles.title}>
        Lịch sử đặt phòng
      </AppText>
      <FlatList
        data={history}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.listContent}
      />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { paddingHorizontal: SIZES.padding, paddingVertical: SPACING.md, paddingTop: SIZES.padding * 2.5 },
  backButton: { backgroundColor: COLORS.primary, width: 100 },
  title: { paddingHorizontal: SIZES.padding, marginBottom: SPACING.lg },
  card: {
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: SIZES.radiusSmall,
    marginHorizontal: SIZES.padding,
    marginBottom: SPACING.md,
    backgroundColor: COLORS.white,
  },
  listContent: { paddingBottom: SPACING.xl },
});

export default HistoryScreen;
