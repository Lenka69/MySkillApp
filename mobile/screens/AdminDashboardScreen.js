import React, { useEffect, useState } from 'react';
import {
  Alert,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AdminDashboardScreen({ navigation }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      const storedUser = await AsyncStorage.getItem('user');
      setUser(storedUser ? JSON.parse(storedUser) : null);
    };

    loadUser();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('user');
    navigation.replace('Login');
  };

  const handleComingSoon = () => {
    Alert.alert(
      'Fitur Admin',
      'Fitur tambah, edit, dan hapus konten dapat dikembangkan pada versi berikutnya. Untuk tugas ini, halaman admin sudah membuktikan pemisahan role admin.'
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />

      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <View style={styles.logo}>
            <Text style={styles.logoText}>A</Text>
          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.headerTitle}>Admin Panel</Text>
            <Text style={styles.headerSubtitle}>My Skill Management</Text>
          </View>
        </View>

        <View style={styles.heroCard}>
          <Text style={styles.heroBadge}>ADMIN ACCESS</Text>
          <Text style={styles.heroTitle}>Kelola Platform Konten Praktik SMK</Text>
          <Text style={styles.heroSubtitle}>
            Halaman ini hanya untuk akun dengan role admin. Admin dapat diarahkan
            untuk mengelola konten praktik, kategori, dan data platform.
          </Text>
        </View>

        <View style={styles.infoGrid}>
          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>Nama</Text>
            <Text style={styles.infoValue}>{user?.name || 'Admin MySkill'}</Text>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>Email</Text>
            <Text style={styles.infoValue}>{user?.email || 'admin@myskill.com'}</Text>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>Role</Text>
            <Text style={styles.infoValue}>{user?.role || 'admin'}</Text>
          </View>
        </View>

        <View style={styles.menuCard}>
          <Text style={styles.menuTitle}>Manajemen Konten</Text>
          <Text style={styles.menuDescription}>
            Untuk versi sederhana, data konten masih diisi melalui seeder/backend.
            Halaman ini dapat dijadikan bukti adanya pemisahan akun admin dari user biasa.
          </Text>

          <TouchableOpacity style={styles.primaryButton} onPress={handleComingSoon}>
            <Text style={styles.primaryButtonText}>Tambah Konten Praktik</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={styles.secondaryButtonText}>Lihat Aplikasi Sebagai User</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = {
  safeArea: { flex: 1, backgroundColor: '#f8fafc' },
  container: { padding: 20, paddingBottom: 50 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 22 },
  logo: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: '#0f172a',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12
  },
  logoText: { color: '#ffffff', fontWeight: '900', fontSize: 20 },
  headerTitle: { color: '#0f172a', fontSize: 24, fontWeight: '900' },
  headerSubtitle: { color: '#64748b', marginTop: 2 },
  heroCard: {
    backgroundColor: '#0f172a',
    borderRadius: 28,
    padding: 24,
    marginBottom: 18
  },
  heroBadge: {
    alignSelf: 'flex-start',
    color: '#34d399',
    fontWeight: '900',
    marginBottom: 14
  },
  heroTitle: {
    color: '#ffffff',
    fontSize: 29,
    lineHeight: 36,
    fontWeight: '900',
    marginBottom: 10
  },
  heroSubtitle: { color: '#dbeafe', lineHeight: 22 },
  infoGrid: { gap: 12, marginBottom: 18 },
  infoCard: {
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: '#e2e8f0'
  },
  infoLabel: { color: '#64748b', fontWeight: '800', marginBottom: 6 },
  infoValue: { color: '#0f172a', fontWeight: '900', fontSize: 16 },
  menuCard: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 22,
    borderWidth: 1,
    borderColor: '#e2e8f0'
  },
  menuTitle: { color: '#0f172a', fontSize: 24, fontWeight: '900', marginBottom: 8 },
  menuDescription: { color: '#64748b', lineHeight: 22, marginBottom: 18 },
  primaryButton: {
    backgroundColor: '#10b981',
    borderRadius: 16,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 12
  },
  primaryButtonText: { color: '#ffffff', fontWeight: '900' },
  secondaryButton: {
    backgroundColor: '#ecfdf5',
    borderRadius: 16,
    paddingVertical: 15,
    alignItems: 'center'
  },
  secondaryButtonText: { color: '#059669', fontWeight: '900' },
  logoutButton: {
    marginTop: 18,
    backgroundColor: '#fee2e2',
    borderRadius: 16,
    paddingVertical: 15,
    alignItems: 'center'
  },
  logoutButtonText: { color: '#dc2626', fontWeight: '900' }
};