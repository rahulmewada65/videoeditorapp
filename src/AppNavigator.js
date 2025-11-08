/**
 * --------------------------------------------------------------
 * 🚀 App Navigation Setup - AppNavigator.js
 * Author: Rahul Meewada
 * Date: 08th November 2025
 * --------------------------------------------------------------
 * Source References:
 * 📦 Libraries: npmjs.com (@react-navigation/native, @react-navigation/native-stack)
 * 📰 Tutorials: medium.com (React Navigation Stack Setup Guides)
 * 🌐 Research: google.com (React Native Navigation Examples)
 * --------------------------------------------------------------
 * Description:
 * Defines the navigation flow between screens:
 * 1️⃣ Home Screen → Allows user to select or record videos.
 * 2️⃣ Editor Screen → Enables trimming and text overlay editing.
 *
 * Uses React Navigation’s Native Stack for smooth transitions.
 * --------------------------------------------------------------
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// 🎬 Screens
import HomeScreen from './screens/HomeScreen';
import EditorScreen from './screens/EditorScreen';

// 📱 Create Stack Navigator instance
const Stack = createNativeStackNavigator();

/**
 * 🧭 Main App Navigation Container
 */
const AppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {backgroundColor: 'transparent'},
        headerTintColor: '#fff',
        headerTitleStyle: {fontWeight: 'bold'},
        headerShadowVisible: false,
        animation: 'slide_from_right',
      }}>
      {/* 🏠 Home Screen */}
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: '🎬 Video Editor',
          headerTitleAlign: 'center',
        }}
      />

      {/* ✂️ Editor Screen */}
      <Stack.Screen
        name="Editor"
        component={EditorScreen}
        options={{
          title: '🎞 Edit Your Video',
          headerTitleAlign: 'center',
        }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppNavigator;

/**
 * 💅 Notes:
 * - NavigationContainer wraps the entire app for navigation context.
 * - Stack.Navigator defines the screen transition stack.
 * - You can easily add more screens like "Settings" or "Preview" here.
 */
