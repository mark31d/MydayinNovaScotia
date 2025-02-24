import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Switch,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  Image,
  Alert,
  ScrollView,
} from 'react-native';
import { useAudio } from './AudioContext';    // Контекст для музыки
import { useVibration } from './VibrationContext'; // Контекст для вибрации

const { width, height } = Dimensions.get('window');

// Функция сброса счётчиков (пример)
const resetScoreboard = () => {
  Alert.alert('Scores Reset', 'All scores have been reset!');
};

const Settings = ({ navigation }) => {
  const { isMusicPlaying, setIsMusicPlaying, volume, setVolume } = useAudio();
  const { vibrationOn, setVibrationOn } = useVibration();
  const [localVolume, setLocalVolume] = useState(volume);

  // Увеличение/уменьшение громкости
  const handleVolumeChange = (change) => {
    const newVolume = Math.max(0, Math.min(1, localVolume + change));
    setLocalVolume(newVolume);
    setVolume(newVolume);
  };

  useEffect(() => {
    setVolume(localVolume);
  }, [localVolume, setVolume]);

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Общий фон - тёмно-синий, как на скриншоте */}
      <View style={styles.container}>

        {/* Прокрутка на случай маленьких экранов */}
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          
          {/* Заголовок "Settings" */}
          <Text style={styles.title}>Settings</Text>

          {/* Крупная иконка вверху (шестерёнка/самолёт) */}
          <Image
            source={require('../assets/settingslog.png')} // Замените путь на вашу иконку
            style={styles.icon}
          />

          {/* Кнопка "Rate us!" - белая прямоугольная область */}
          <TouchableOpacity style={styles.rateButton} onPress={() => Alert.alert('Rate Us', 'Thank you for rating!')}>
            <Text style={styles.rateButtonText}>Rate us!</Text>
          </TouchableOpacity>

          {/* Блок с переключателями и громкостью */}
          <View style={styles.settingsBlock}>
            {/* Включение/выключение музыки */}
            <View style={styles.settingItem}>
              <Text style={styles.settingItemText}>Turn Music On/Off</Text>
              <Switch
                value={isMusicPlaying}
                onValueChange={setIsMusicPlaying}
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={isMusicPlaying ? '#f5dd4b' : '#f4f3f4'}
              />
            </View>

            {/* Громкость музыки (с кнопками +/-) */}
            <View style={styles.settingItem}>
              <Text style={styles.settingItemText}>
                Music Volume: {Math.round(localVolume * 100)}%
              </Text>
              <View style={styles.volumeControls}>
                <TouchableOpacity onPress={() => handleVolumeChange(-0.1)} style={styles.volumeButton}>
                  <Text style={styles.volumeButtonText}>-</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleVolumeChange(0.1)} style={styles.volumeButton}>
                  <Text style={styles.volumeButtonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Включение/выключение вибрации */}
            <View style={styles.settingItem}>
              <Text style={styles.settingItemText}>Enable Vibration</Text>
              <Switch
                value={vibrationOn}
                onValueChange={setVibrationOn}
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={vibrationOn ? '#f5dd4b' : '#f4f3f4'}
              />
            </View>
          </View>

          {/* Дополнительные пункты (как в примере на скриншоте) */}
          <TouchableOpacity
            style={styles.listButton}
            onPress={() => Alert.alert('Developer Website', 'Open Developer Website')}
          >
            <Text style={styles.listButtonText}>Developer Website</Text>
          </TouchableOpacity><TouchableOpacity
            style={styles.listButton}
            onPress={() => Alert.alert('Privacy Policy', 'Open Privacy Policy')}
          >
            <Text style={styles.listButtonText}>Privacy Policy</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.listButton}
            onPress={() => Alert.alert('Terms of Use', 'Open Terms of Use')}
          >
            <Text style={styles.listButtonText}>Terms of Use</Text>
          </TouchableOpacity>

          {/* Кнопка сброса всех результатов */}
          <TouchableOpacity onPress={resetScoreboard} style={styles.resetButton}>
            <Text style={styles.resetButtonText}>Reset All Scores</Text>
          </TouchableOpacity>

          {/* Возврат в меню */}
          <TouchableOpacity onPress={navigation.goBack} style={styles.exitButton}>
            <Text style={styles.exitButtonText}>Return to Menu</Text>
          </TouchableOpacity>

        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Settings;

// ------------------ Стили ------------------
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0C2A47', // Тёмно-синий цвет фона
  },
  container: {
    flex: 1,
    paddingHorizontal: width * 0.05,
  },
  scrollContainer: {
    paddingBottom: height * 0.03,
    alignItems: 'center',
  },
  title: {
    fontSize: width * 0.08,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: height * 0.02,
    marginBottom: height * 0.01,
    textAlign: 'center',
  },
  icon: {
    width: width * 0.3,
    height: width * 0.3,
    resizeMode: 'contain',
    marginVertical: height * 0.02,
  },
  rateButton: {
    width: '90%',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    paddingVertical: height * 0.02,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: height * 0.01,
  },
  rateButtonText: {
    fontSize: width * 0.05,
    color: '#0C2A47',
    fontWeight: '600',
  },
  settingsBlock: {
    width: '90%',
    backgroundColor: '#1E3D66',
    borderRadius: 15,
    paddingVertical: height * 0.02,
    marginVertical: height * 0.02,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: width * 0.05,
    marginVertical: height * 0.01,
  },
  settingItemText: {
    fontSize: width * 0.045,
    color: '#FFFFFF',
    flexWrap: 'wrap',
    flex: 1,
    marginRight: 10,
  },
  volumeControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  volumeButton: {
    width: width * 0.1,
    height: width * 0.1,
    borderRadius: width * 0.02,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: width * 0.01,
  },
  volumeButtonText: {
    fontSize: width * 0.07,
    color: '#0C2A47',
    fontWeight: 'bold',
  },
  listButton: {
    width: '90%',
    backgroundColor: '#1E3D66',
    borderRadius: 15,
    paddingVertical: height * 0.02,
    paddingHorizontal: width * 0.05,
    marginVertical: height * 0.01,
    justifyContent: 'center',
  },
  listButtonText: {
    fontSize: width * 0.045,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  resetButton: {
    width: '90%',
    backgroundColor: '#FF6F61',
    borderRadius: 15,
    paddingVertical: height * 0.02,
    alignItems: 'center',
    marginTop: height * 0.03,
  },
  resetButtonText: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  exitButton: {
    width: '90%',
    backgroundColor: '#344E71',
    borderRadius: 15,
    paddingVertical: height * 0.02,
    alignItems: 'center',
    marginTop: height * 0.02,
  },
  exitButtonText: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});