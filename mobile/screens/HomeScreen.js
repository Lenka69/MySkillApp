import React, { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

import api from '../services/api';

const categories = [
  'Semua',
  'Kelistrikan',
  'Bangunan',
  'Otomotif',
  'Elektronika',
  'Peralatan Rumah'
];

const fallbackImage =
  'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=1200&auto=format&fit=crop';

export default function HomeScreen({ navigation }) {
  const [contents, setContents] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const init = async () => {
      const storedUser = await AsyncStorage.getItem('user');
      setUser(storedUser ? JSON.parse(storedUser) : null);

      try {
        const response = await api.get('/contents');
        const data = Array.isArray(response.data)
          ? response.data
          : response.data.contents || [];

        setContents(data);
      } catch (error) {
        console.log('HOME ERROR:', error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  const filteredContents = useMemo(() => {
    return contents.filter((item) => {
      const keyword = search.toLowerCase();

      const matchCategory =
        selectedCategory === 'Semua' || item.category === selectedCategory;

      const matchSearch =
        item.title?.toLowerCase().includes(keyword) ||
        item.description?.toLowerCase().includes(keyword) ||
        item.category?.toLowerCase().includes(keyword);

      return matchCategory && matchSearch;
    });
  }, [contents, search, selectedCategory]);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('user');
    navigation.replace('Login');
  };

  const renderHeader = () => (
    <View>
      <View style={styles.navbar}>
        <View style={styles.brandRow}>
          <View style={styles.logo}>
            <Text style={styles.logoText}>M</Text>
          </View>
          <Text style={styles.brandText}>MySkill</Text>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>

      {user?.role === 'admin' && (
        <TouchableOpacity
          style={styles.adminBanner}
          onPress={() => navigation.navigate('AdminDashboard')}
        >
          <Text style={styles.adminBannerText}>Admin Panel</Text>
          <Text style={styles.adminBannerSubtext}>Buka halaman khusus admin</Text>
        </TouchableOpacity>
      )}

      <ImageBackground
        source={{
          uri: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=1600&auto=format&fit=crop'
        }}
        style={styles.hero}
        imageStyle={styles.heroImage}
      >
        <View style={styles.heroOverlay}>
          <Text style={styles.heroBadge}>Platform Praktik Teknik SMK</Text>
          <Text style={styles.heroTitle}>
            Pelajari Skill Praktik Teknik dari Hasil Karya Siswa SMK
          </Text>
          <Text style={styles.heroSubtitle}>
            Temukan panduan membuat barang, memperbaiki kendaraan,
            kelistrikan, elektronika, bangunan, dan perbaikan rumah.
          </Text>

          <View style={styles.heroStats}>
            <View style={styles.heroStat}>
              <Text style={styles.heroStatValue}>{contents.length}</Text>
              <Text style={styles.heroStatLabel}>Konten</Text>
            </View>

            <View style={styles.heroStat}>
              <Text style={styles.heroStatValue}>{categories.length - 1}</Text>
              <Text style={styles.heroStatLabel}>Kategori</Text>
            </View>
          </View>
        </View>
      </ImageBackground>

      <View style={styles.searchBox}>
        <Text style={styles.searchIcon}>⌕</Text>
        <TextInput
          placeholder="Cari konten praktik..."
          value={search}
          onChangeText={setSearch}
          style={styles.searchInput}
        />
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryList}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryChip,
              selectedCategory === category && styles.categoryChipActive
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text
              style={[
                styles.categoryChipText,
                selectedCategory === category && styles.categoryChipTextActive
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.sectionHeading}>
        <Text style={styles.sectionTitle}>Konten Praktik Terbaru</Text>
        <Text style={styles.sectionSubtitle}>
          Pilih konten untuk melihat alat, bahan, langkah praktik, dan tips keselamatan.
        </Text>
      </View>
    </View>
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity
      activeOpacity={0.86}
      style={styles.contentCard}
      onPress={() => navigation.navigate('Detail', { id: item._id })}
    >
      <View style={styles.imageWrapper}>
        <Image
          source={{ uri: item.imageUrl || fallbackImage }}
          style={styles.contentImage}
        />

        <View style={styles.categoryBadge}>
          <Text style={styles.categoryBadgeText}>{item.category}</Text>
        </View>
      </View>

      <View style={styles.contentBody}>
        <Text style={styles.contentTitle}>{item.title}</Text>
        <Text style={styles.contentDescription} numberOfLines={3}>
          {item.description}
        </Text>

        <View style={styles.metaRow}>
          <View style={styles.metaChip}>
            <Text style={styles.metaText}>{item.difficulty || 'Mudah'}</Text>
          </View>

          <View style={styles.metaChip}>
            <Text style={styles.metaText}>{item.duration || '20 menit'}</Text>
          </View>
        </View>

        <View style={styles.detailButton}>
          <Text style={styles.detailButtonText}>Lihat Detail</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <ActivityIndicator size="large" color="#10b981" style={{ flex: 1 }} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />

      <FlatList
        data={filteredContents}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>Konten tidak ditemukan.</Text>
          </View>
        }
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = {
  safeArea: { flex: 1, backgroundColor: '#f8fafc' },
  listContent: { padding: 20, paddingBottom: 40 },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18
  },
  brandRow: { flexDirection: 'row', alignItems: 'center' },
  logo: {
    width: 44,
    height: 44,
    borderRadius: 15,
    backgroundColor: '#10b981',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10
  },
  logoText: { color: '#ffffff', fontWeight: '900', fontSize: 18 },
  brandText: { color: '#0f172a', fontSize: 27, fontWeight: '900' },
  logoutButton: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 14,
    paddingVertical: 9,
    paddingHorizontal: 13
  },
  logoutButtonText: { color: '#0f172a', fontWeight: '900' },
  adminBanner: {
    backgroundColor: '#0f172a',
    borderRadius: 20,
    padding: 18,
    marginBottom: 18
  },
  adminBannerText: { color: '#ffffff', fontWeight: '900', fontSize: 18 },
  adminBannerSubtext: { color: '#dbeafe', marginTop: 4 },
  hero: {
    minHeight: 360,
    borderRadius: 30,
    overflow: 'hidden',
    marginBottom: 18
  },
  heroImage: { borderRadius: 30 },
  heroOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 24,
    backgroundColor: 'rgba(15, 23, 42, 0.68)'
  },
  heroBadge: {
    alignSelf: 'flex-start',
    color: '#ffffff',
    backgroundColor: 'rgba(255,255,255,0.18)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    fontWeight: '900',
    marginBottom: 16
  },
  heroTitle: {
    color: '#ffffff',
    fontSize: 32,
    fontWeight: '900',
    lineHeight: 38,
    marginBottom: 12
  },
  heroSubtitle: { color: '#dbeafe', fontSize: 14, lineHeight: 22 },
  heroStats: { flexDirection: 'row', gap: 10, marginTop: 20 },
  heroStat: {
    backgroundColor: 'rgba(255,255,255,0.16)',
    borderRadius: 18,
    padding: 14,
    minWidth: 110
  },
  heroStatValue: { color: '#ffffff', fontSize: 22, fontWeight: '900' },
  heroStatLabel: { color: '#dbeafe', marginTop: 2, fontWeight: '700' },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 20,
    paddingHorizontal: 16,
    minHeight: 56,
    marginBottom: 14
  },
  searchIcon: { fontSize: 24, color: '#64748b', marginRight: 8 },
  searchInput: { flex: 1, color: '#0f172a', fontSize: 15 },
  categoryList: { paddingVertical: 4, paddingBottom: 18 },
  categoryChip: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#dbeafe',
    borderRadius: 999,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginRight: 10
  },
  categoryChipActive: {
    backgroundColor: '#10b981',
    borderColor: '#10b981'
  },
  categoryChipText: { color: '#334155', fontWeight: '900' },
  categoryChipTextActive: { color: '#ffffff' },
  sectionHeading: { marginBottom: 16 },
  sectionTitle: { color: '#0f172a', fontSize: 26, fontWeight: '900' },
  sectionSubtitle: { color: '#64748b', marginTop: 6, lineHeight: 21 },
  contentCard: {
    backgroundColor: '#ffffff',
    borderRadius: 26,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 18
  },
  imageWrapper: { height: 210, backgroundColor: '#e2e8f0' },
  contentImage: { width: '100%', height: '100%', resizeMode: 'cover' },
  categoryBadge: {
    position: 'absolute',
    top: 14,
    left: 14,
    backgroundColor: 'rgba(15, 23, 42, 0.78)',
    borderRadius: 999,
    paddingVertical: 7,
    paddingHorizontal: 11
  },
  categoryBadgeText: { color: '#ffffff', fontWeight: '900', fontSize: 12 },
  contentBody: { padding: 20 },
  contentTitle: {
    color: '#0f172a',
    fontSize: 22,
    fontWeight: '900',
    lineHeight: 28,
    marginBottom: 9
  },
  contentDescription: { color: '#64748b', lineHeight: 21 },
  metaRow: { flexDirection: 'row', gap: 10, marginTop: 16, marginBottom: 16 },
  metaChip: {
    backgroundColor: '#f1f5f9',
    borderRadius: 999,
    paddingVertical: 7,
    paddingHorizontal: 11
  },
  metaText: { color: '#475569', fontWeight: '900' },
  detailButton: {
    backgroundColor: '#10b981',
    borderRadius: 15,
    paddingVertical: 13,
    alignItems: 'center'
  },
  detailButtonText: { color: '#ffffff', fontWeight: '900' },
  emptyState: {
    backgroundColor: '#ffffff',
    borderRadius: 22,
    padding: 30,
    alignItems: 'center'
  },
  emptyText: { color: '#64748b', fontWeight: '800' }
};