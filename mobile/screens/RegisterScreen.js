import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  ImageBackground,
  Platform,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from '@react-native-async-storage/async-storage';

import api from '../services/api';

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name.trim() || !email.trim() || !password || !confirmPassword) {
      Alert.alert('Validasi', 'Semua field wajib diisi.');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Validasi', 'Password minimal 6 karakter.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Validasi', 'Konfirmasi password tidak sama.');
      return;
    }

    try {
      setLoading(true);

      const response = await api.post('/auth/register', {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password
      });

      const user = response.data.user;

      await AsyncStorage.setItem('token', response.data.token);
      await AsyncStorage.setItem('user', JSON.stringify(user));

      if (user?.role === 'admin') {
        navigation.replace('AdminDashboard');
      } else {
        navigation.replace('Home');
      }
    } catch (error) {
      console.log('REGISTER ERROR:', error.response?.data || error.message);

      if (error.response) {
        Alert.alert(
          'Register gagal',
          error.response.data?.message || 'Terjadi kesalahan saat membuat akun.'
        );
      } else {
        Alert.alert(
          'Koneksi gagal',
          'Tidak bisa terhubung ke backend. Pastikan backend berjalan, IP API benar, dan HP berada dalam jaringan yang sama dengan laptop.'
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />

      <KeyboardAwareScrollView
        enableOnAndroid
        extraScrollHeight={Platform.OS === 'android' ? 140 : 90}
        keyboardOpeningTime={0}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <ImageBackground
          source={{
            uri: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1200&auto=format&fit=crop'
          }}
          style={styles.heroCard}
          imageStyle={styles.heroImage}
        >
          <View style={styles.heroOverlay}>
            <View style={styles.brandRowLight}>
              <View style={styles.logoLight}>
                <Text style={styles.logoTextLight}>M</Text>
              </View>
              <Text style={styles.brandTextLight}>My Skill</Text>
            </View>

            <Text style={styles.heroTitle}>
              Learn practical skills from real SMK projects.
            </Text>

            <Text style={styles.heroSubtitle}>
              Daftar untuk mengakses panduan praktik teknik, membaca artikel,
              dan mempelajari skill terapan dari hasil praktik siswa SMK.
            </Text>

            <View style={styles.heroChipRow}>
              <Text style={styles.heroChip}>Otomotif</Text>
              <Text style={styles.heroChip}>Kelistrikan</Text>
              <Text style={styles.heroChip}>Bangunan</Text>
            </View>
          </View>
        </ImageBackground>

        <View style={styles.card}>
          <View style={styles.brandRow}>
            <View style={styles.logo}>
              <Text style={styles.logoText}>M</Text>
            </View>
            <Text style={styles.brandText}>My Skill</Text>
          </View>

          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>
            Daftar untuk mulai mengakses konten praktik teknik SMK.
          </Text>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Nama Lengkap</Text>
            <TextInput
              placeholder="Masukkan nama lengkap"
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
              returnKeyType="next"
              style={styles.input}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              placeholder="Masukkan email"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              returnKeyType="next"
              style={styles.input}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              placeholder="Minimal 6 karakter"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              returnKeyType="next"
              style={styles.input}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Konfirmasi Password</Text>
            <TextInput
              placeholder="Ulangi password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              returnKeyType="done"
              onSubmitEditing={handleRegister}
              style={styles.input}
            />
          </View>

          <TouchableOpacity
            onPress={handleRegister}
            style={[styles.primaryButton, loading && styles.disabledButton]}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#ffffff" />
            ) : (
              <Text style={styles.primaryButtonText}>Register</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('Login')}
            style={styles.switchButton}
          >
            <Text style={styles.switchText}>
              Sudah punya akun?{' '}
              <Text style={styles.switchTextStrong}>Login</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = {
  safeArea: {
    flex: 1,
    backgroundColor: '#f8fafc'
  },
  scrollContent: {
    padding: 20,
    paddingTop: 28,
    paddingBottom: 110
  },
  heroCard: {
    minHeight: 230,
    borderRadius: 28,
    overflow: 'hidden',
    marginBottom: 18
  },
  heroImage: {
    borderRadius: 28
  },
  heroOverlay: {
    flex: 1,
    padding: 22,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(15, 23, 42, 0.66)'
  },
  brandRowLight: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14
  },
  logoLight: {
    width: 38,
    height: 38,
    borderRadius: 14,
    backgroundColor: '#10b981',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10
  },
  logoTextLight: {
    color: '#ffffff',
    fontWeight: '900',
    fontSize: 17
  },
  brandTextLight: {
    color: '#ffffff',
    fontWeight: '900',
    fontSize: 20
  },
  heroTitle: {
    color: '#ffffff',
    fontSize: 27,
    fontWeight: '900',
    lineHeight: 33,
    marginBottom: 9
  },
  heroSubtitle: {
    color: '#dbeafe',
    fontSize: 14,
    lineHeight: 21
  },
  heroChipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 16
  },
  heroChip: {
    color: '#ffffff',
    fontWeight: '900',
    backgroundColor: 'rgba(255,255,255,0.18)',
    paddingVertical: 7,
    paddingHorizontal: 11,
    borderRadius: 999,
    overflow: 'hidden'
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 28,
    padding: 24,
    borderWidth: 1,
    borderColor: '#e2e8f0'
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 22
  },
  logo: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: '#10b981',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10
  },
  logoText: {
    color: '#ffffff',
    fontWeight: '900',
    fontSize: 18
  },
  brandText: {
    color: '#0f172a',
    fontWeight: '900',
    fontSize: 22
  },
  title: {
    color: '#0f172a',
    fontSize: 31,
    fontWeight: '900',
    marginBottom: 8
  },
  subtitle: {
    color: '#64748b',
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 22
  },
  formGroup: {
    marginBottom: 14
  },
  label: {
    color: '#334155',
    fontWeight: '800',
    marginBottom: 8
  },
  input: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 13,
    fontSize: 15,
    color: '#0f172a'
  },
  primaryButton: {
    backgroundColor: '#10b981',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8
  },
  disabledButton: {
    opacity: 0.7
  },
  primaryButtonText: {
    color: '#ffffff',
    fontWeight: '900',
    fontSize: 16
  },
  switchButton: {
    marginTop: 20,
    alignItems: 'center'
  },
  switchText: {
    color: '#64748b',
    fontSize: 15,
    fontWeight: '600'
  },
  switchTextStrong: {
    color: '#059669',
    fontWeight: '900'
  }
};