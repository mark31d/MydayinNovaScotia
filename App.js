import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Loader from './Components/Loader';
import MainMenu from './Components/Menu';
import Settings from './Components/Settings';
import PlaceDetails from './Components/PlaceDetails';
import FavoritesScreen from './Components/FavoritesScreen';
import MiniGame from './Components/MiniGame';

import { AudioProvider } from './Components/AudioContext';
import { VibrationProvider } from './Components/VibrationContext';

import { EventsList, EventDetails, FavoritesEventsScreen } from './Components/Events';

// Импортируем MyDay как объект, где:
// MyDayList, RouteDetails, AddRouteStep1, AddRouteStep2
import MyDayList from './Components/MyDayList';

// Кастомный таб-бар
import CustomTabBar from './Components/CustomTabBar';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tab.Screen
        name="MenuTab"
        component={MainMenu}
        options={{ title: 'Menu' }}
      />

      <Tab.Screen
        name="EventsTab"
        component={EventsList} 
        options={{ title: 'Events' }}
      />

      
      <Tab.Screen
        name="MyDayTab"
        component={MyDayList.MyDayList}
        options={{ title: 'MyDayList' }}
      />

      <Tab.Screen
        name="SettingsTab"
        component={Settings}
        options={{ title: 'Settings' }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  const [louderIsEnded, setLouderIsEnded] = useState(false);

  return (
    <AudioProvider>
      <VibrationProvider>
        <NavigationContainer>
          {!louderIsEnded ? (
            <Loader onEnd={() => setLouderIsEnded(true)} />
          ) : (
            <Stack.Navigator 
              initialRouteName="Tabs" 
              screenOptions={{ headerShown: false }}
            >
              {/* Табы как главный экран */}
              <Stack.Screen name="Tabs" component={MyTabs} />

              {/* Экраны PlaceDetails, FavoritesScreen, MiniGame */}
              <Stack.Screen name="PlaceDetails" component={PlaceDetails} />
              <Stack.Screen name="FavoritesScreen" component={FavoritesScreen} />
              <Stack.Screen name="MiniGame" component={MiniGame} />

              {/* Экраны для событий: детальный и избранные */}
              <Stack.Screen name="EventDetails" component={EventDetails} />
              <Stack.Screen name="FavoritesEvents" component={FavoritesEventsScreen} />

              {/* Экраны для MyDay: детали маршрута, добавление/редактирование */}
              <Stack.Screen name="RouteDetails" component={MyDayList.RouteDetails} />
              <Stack.Screen name="AddRouteStep1" component={MyDayList.AddRouteStep1} />
              <Stack.Screen name="AddRouteStep2" component={MyDayList.AddRouteStep2} />
              
            </Stack.Navigator>
          )}
        </NavigationContainer>
      </VibrationProvider>
    </AudioProvider>
  );
}