import React, { useEffect, useRef } from 'react';
import {
  View,
  Animated,
  StyleSheet,
  ImageBackground,
  Image,
  Easing,
} from 'react-native';

const Loader = ({ onEnd }) => {
  const appearingAnim = useRef(new Animated.Value(0)).current;    // Для появления
  const disappearingAnim = useRef(new Animated.Value(1)).current; // Для исчезновения
  const rotateAnim = useRef(new Animated.Value(0)).current;       // Для вращения спиннера

  useEffect(() => {
    // 1. Анимация появления логотипа
    Animated.timing(appearingAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();

    // 2. Запускаем анимацию вращения
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();

    // 3. Через 6 секунд запускаем исчезновение
    setTimeout(() => {
      Animated.timing(disappearingAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }).start(() => onEnd && onEnd());
    }, 6000);
  }, []);

  // Преобразование rotateAnim -> угол вращения
  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
     
      <Animated.View
        style={[
          styles.overlay,
          { opacity: disappearingAnim },
        ]}
      >
        
        <Animated.Image
          source={require('../assets/Logo.png')}
          style={[
            styles.logo,
            {
              opacity: appearingAnim,
              transform: [{ scale: appearingAnim }],
            },
          ]}
          resizeMode="contain"
        />
       
        <Animated.View
          style={[
            styles.spinnerContainer,
            { transform: [{ rotate: spin }] },
          ]}
        >
          <View style={styles.spinnerDot} />
        </Animated.View>
      </Animated.View>
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#143468', // Цвет фона
  },
  overlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: '70%',
    maxWidth: 300,
    aspectRatio: 1.5, // можно подогнать под ваши пропорции
    marginBottom: 60,
  },
  spinnerContainer: {
    width: 40,
    height: 40,
    marginTop: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  spinnerDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#FFFFFF',
  },
});