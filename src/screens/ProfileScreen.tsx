import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AppText from '../components/AppText';
import { COLORS, SIZES, SPACING, SHADOWS } from '../constaints/hotelTheme';
import { User } from '../types';
import ScreenContainer from '../components/layout/ScreenContainer';

interface ProfileScreenProps {
  user: User | null;
  onLogout: () => void;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ user, onLogout }) => {
  return (
    <ScreenContainer withScroll={true}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <Icon name="person" size={50} color={COLORS.primary} />
          </View>
          <AppText variant="subtitle" style={styles.userName}>{user?.name || "Khách"}</AppText>
          <AppText variant="body" style={styles.userEmail}>{user?.email || "Chưa đăng nhập"}</AppText>
        </View>

        <View style={styles.section}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={onLogout}
          >
            <Icon name="log-out-outline" size={24} color={COLORS.danger} style={styles.menuIcon} />
            <AppText variant="body" style={{ color: COLORS.danger }}>Đăng xuất</AppText>
          </TouchableOpacity>
        </View>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: SIZES.padding,
  },
  header: {
    alignItems: 'center',
    marginBottom: SPACING.xxl,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  userName: {
    marginBottom: 4,
  },
  userEmail: {
    color: COLORS.textLight,
  },
  section: {
    marginTop: SPACING.md,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    marginBottom: SPACING.sm,
    ...SHADOWS.light,
  },
  menuIcon: {
    marginRight: SPACING.md,
  }
});

export default ProfileScreen;
