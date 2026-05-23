import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import api from '../services/api';

const fallbackImage =
  'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=1400&auto=format&fit=crop';

export default function DetailScreen({ route, navigation }) {
  const { id } = route.params || {};

  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const response = await api.get(`/contents/${id}`);
        const data = response.data.content || response.data;
        setContent(data);
      } catch (error) {
        console.log('DETAIL ERROR:', error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id]);

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <ActivityIndicator size="large" color="#10b981" style={{ flex: 1 }} />
      </SafeAreaView>
    );
  }

  if (!content) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>Konten tidak ditemukan.</Text>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Text style={styles.backButtonText}>Kembali</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />

      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <TouchableOpacity style={styles.backLink} onPress={() => navigation.goBack()}>
          <Text style={styles.backLinkText}>← Kembali ke Home</Text>
        </TouchableOpacity>

        <View style={styles.card}>
          <View style={styles.imageWrapper}>
            <Image
              source={{ uri: content.imageUrl || fallbackImage }}
              style={styles.image}
            />

            <View style={styles.imageOverlay}>
              <Text style={styles.imageBadge}>{content.category || 'Teknik SMK'}</Text>
            </View>
          </View>

          <View style={styles.body}>
            <View style={styles.badgeRow}>
              <Text style={styles.badge}>{content.category || 'Teknik SMK'}</Text>
              <Text style={styles.badge}>{content.difficulty || 'Mudah'}</Text>
              <Text style={styles.badge}>{content.duration || '20 menit'}</Text>
            </View>

            <Text style={styles.title}>{content.title}</Text>

            <Text style={styles.description}>{content.description}</Text>

            <View style={styles.infoGrid}>
              <InfoCard label="Bidang" value={content.field || 'Teknik SMK'} />
              <InfoCard label="Format" value={content.format || 'Artikel + Video'} />
              <InfoCard label="Penulis" value={content.author || 'Siswa SMK'} />
              <InfoCard label="Estimasi" value={content.duration || '20 menit'} />
            </View>

            <Section title="Video Praktik">
              <View style={styles.videoPlaceholder}>
                <Text style={styles.videoTitle}>Video tutorial belum tersedia</Text>
                <Text style={styles.videoText}>
                  Placeholder ini dapat diganti dengan link YouTube asli saat konten sudah lengkap.
                </Text>
              </View>
            </Section>

            <Section title="Alat dan Bahan">
              <ListBox title="Alat yang Dibutuhkan" items={content.tools} />
              <ListBox title="Bahan yang Dibutuhkan" items={content.materials} />
            </Section>

            <Section title="Langkah-langkah Praktik">
              {(content.steps || []).length > 0 ? (
                content.steps.map((step, index) => (
                  <View style={styles.stepItem} key={index}>
                    <View style={styles.stepNumber}>
                      <Text style={styles.stepNumberText}>{index + 1}</Text>
                    </View>
                    <Text style={styles.stepText}>{step}</Text>
                  </View>
                ))
              ) : (
                <Text style={styles.emptySmall}>Belum ada langkah praktik.</Text>
              )}
            </Section>

            <View style={styles.safetySection}>
              <Text style={styles.safetyTitle}>Tips Keselamatan Kerja</Text>

              {(content.safetyTips || []).length > 0 ? (
                content.safetyTips.map((tip, index) => (
                  <View style={styles.safetyItem} key={index}>
                    <Text style={styles.safetyIcon}>!</Text>
                    <Text style={styles.safetyText}>{tip}</Text>
                  </View>
                ))
              ) : (
                <Text style={styles.safetyText}>Belum ada tips keselamatan.</Text>
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function InfoCard({ label, value }) {
  return (
    <View style={styles.infoCard}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

function Section({ title, children }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
}

function ListBox({ title, items = [] }) {
  return (
    <View style={styles.listBox}>
      <Text style={styles.listTitle}>{title}</Text>

      {(items || []).length > 0 ? (
        items.map((item, index) => (
          <Text style={styles.listItem} key={index}>
            • {item}
          </Text>
        ))
      ) : (
        <Text style={styles.emptySmall}>Belum ada data.</Text>
      )}
    </View>
  );
}

const styles = {
  safeArea: { flex: 1, backgroundColor: '#f8fafc' },
  container: { padding: 20, paddingBottom: 50 },
  backLink: { marginBottom: 16 },
  backLinkText: { color: '#2563eb', fontWeight: '900' },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 28,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e2e8f0'
  },
  imageWrapper: { height: 260, backgroundColor: '#e2e8f0' },
  image: { width: '100%', height: '100%', resizeMode: 'cover' },
  imageOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    padding: 18,
    backgroundColor: 'rgba(15, 23, 42, 0.38)'
  },
  imageBadge: {
    alignSelf: 'flex-start',
    color: '#ffffff',
    fontWeight: '900',
    backgroundColor: 'rgba(255,255,255,0.18)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999
  },
  body: { padding: 22 },
  badgeRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 9, marginBottom: 16 },
  badge: {
    color: '#1d4ed8',
    backgroundColor: '#dbeafe',
    borderRadius: 999,
    paddingVertical: 7,
    paddingHorizontal: 11,
    fontWeight: '900'
  },
  title: {
    color: '#0f172a',
    fontSize: 30,
    lineHeight: 36,
    fontWeight: '900',
    marginBottom: 12
  },
  description: { color: '#475569', fontSize: 15, lineHeight: 24 },
  infoGrid: { gap: 12, marginTop: 24 },
  infoCard: {
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 18,
    padding: 16
  },
  infoLabel: { color: '#64748b', fontWeight: '800', marginBottom: 5 },
  infoValue: { color: '#0f172a', fontWeight: '900', fontSize: 15 },
  section: { marginTop: 30 },
  sectionTitle: {
    color: '#0f172a',
    fontSize: 23,
    fontWeight: '900',
    marginBottom: 14
  },
  videoPlaceholder: {
    backgroundColor: '#0f172a',
    borderRadius: 20,
    padding: 22
  },
  videoTitle: { color: '#ffffff', fontWeight: '900', fontSize: 18, marginBottom: 8 },
  videoText: { color: '#dbeafe', lineHeight: 22 },
  listBox: {
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 20,
    padding: 18,
    marginBottom: 14
  },
  listTitle: { color: '#0f172a', fontSize: 18, fontWeight: '900', marginBottom: 10 },
  listItem: { color: '#475569', lineHeight: 24, marginBottom: 4 },
  stepItem: {
    flexDirection: 'row',
    gap: 12,
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 18,
    padding: 15,
    marginBottom: 12
  },
  stepNumber: {
    width: 36,
    height: 36,
    borderRadius: 13,
    backgroundColor: '#10b981',
    alignItems: 'center',
    justifyContent: 'center'
  },
  stepNumberText: { color: '#ffffff', fontWeight: '900' },
  stepText: { flex: 1, color: '#334155', lineHeight: 22 },
  safetySection: {
    marginTop: 30,
    backgroundColor: '#fffbeb',
    borderWidth: 1,
    borderColor: '#fde68a',
    borderRadius: 22,
    padding: 20
  },
  safetyTitle: { color: '#92400e', fontSize: 22, fontWeight: '900', marginBottom: 14 },
  safetyItem: { flexDirection: 'row', gap: 10, marginBottom: 10 },
  safetyIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    textAlign: 'center',
    color: '#ffffff',
    backgroundColor: '#f59e0b',
    fontWeight: '900'
  },
  safetyText: { flex: 1, color: '#78350f', lineHeight: 22 },
  emptySmall: { color: '#64748b', lineHeight: 22 },
  emptyState: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  emptyText: { color: '#64748b', fontWeight: '900', marginBottom: 16 },
  backButton: {
    backgroundColor: '#10b981',
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 18
  },
  backButtonText: { color: '#ffffff', fontWeight: '900' }
};