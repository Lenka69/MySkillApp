import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, Alert, TextInput, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';

export default function HomeScreen({ navigation }) {
  const [contents, setContents] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('Semua');

  useEffect(() => {
    fetchContents();
  }, []);

  const fetchContents = async () => {
    try {
      const res = await api.get('/contents');
      setContents(res.data);
    } catch (err) {
      Alert.alert('Sesi Berakhir', 'Silakan login kembali');
      navigation.replace('Login');
    }
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    navigation.replace('Login');
  };

  // Mengambil kategori unik
  const categories = ['Semua', ...new Set(contents.map(c => c.category))];

  // Logic Filter
  const filteredContents = contents.filter(c => {
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase());
    const matchCategory = category === 'Semua' || c.category === category;
    return matchSearch && matchCategory;
  });

  return (
    <View style={{ flex: 1, backgroundColor: '#f8fafc' }}>
      {/* Header */}
      <View style={{ padding: 15, flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#0f172a' }}>
        <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>MySkill Mobile</Text>
        <TouchableOpacity onPress={handleLogout}>
          <Text style={{ color: '#f87171', fontWeight: 'bold' }}>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* === FITUR PENCARIAN === */}
      <View style={{ padding: 15, paddingBottom: 5 }}>
        <TextInput 
          placeholder="Cari konten praktik..." 
          style={{ backgroundColor: 'white', padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#cbd5e1' }}
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* === FITUR FILTER KATEGORI === */}
      <View style={{ paddingHorizontal: 15, paddingBottom: 15 }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {categories.map(cat => (
            <TouchableOpacity 
              key={cat} 
              onPress={() => setCategory(cat)}
              style={{ 
                backgroundColor: category === cat ? '#0f172a' : 'white', 
                paddingHorizontal: 16, 
                paddingVertical: 8, 
                borderRadius: 20, 
                marginRight: 10,
                borderWidth: 1,
                borderColor: category === cat ? '#0f172a' : '#cbd5e1'
              }}
            >
              <Text style={{ color: category === cat ? 'white' : '#475569', fontWeight: 'bold' }}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* === DAFTAR KONTEN === */}
      {filteredContents.length > 0 ? (
        <FlatList
          data={filteredContents}
          keyExtractor={(item) => item._id}
          contentContainerStyle={{ paddingHorizontal: 15, paddingBottom: 20 }}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={{ backgroundColor: 'white', padding: 10, borderRadius: 12, marginBottom: 15, elevation: 2 }}
              onPress={() => navigation.navigate('Detail', { id: item._id })}
            >
              <Image source={{ uri: item.imageUrl }} style={{ width: '100%', height: 160, borderRadius: 8 }} />
              <View style={{ alignSelf: 'flex-start', backgroundColor: '#ecfdf5', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 5, marginTop: 10 }}>
                <Text style={{ color: '#059669', fontSize: 12, fontWeight: 'bold' }}>{item.category}</Text>
              </View>
              <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 5, color: '#1e293b' }}>{item.title}</Text>
            </TouchableOpacity>
          )}
        />
      ) : (
        <View style={{ padding: 20, alignItems: 'center' }}>
          <Text style={{ color: '#64748b', fontSize: 16 }}>Konten tidak ditemukan</Text>
        </View>
      )}
    </View>
  );
}
