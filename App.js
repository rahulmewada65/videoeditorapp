/**
 * --------------------------------------------------------------
 * ⚛️ Main Application Entry Point - App.js
 * Author: Rahul Meewada
 * Date: 9th November 2025
 * --------------------------------------------------------------
 * Source References:
 * 📦 Libraries: npmjs.com (react-native, @react-navigation/native)
 * 📰 Tutorials: medium.com (React Native Navigation Setup)
 * 🌐 Research: google.com (Best Practices for App.js structure)
 * --------------------------------------------------------------
 * Description:
 * The root of the React Native application.
 * - Initializes the main navigation flow via AppNavigator.
 * - Serves as the single entry point for the app.
 * --------------------------------------------------------------
 */

import React from 'react';
import AppNavigator from './src/AppNavigator';

/**
 * 🧭 App Component — Entry point for navigation and global setup.
 */
export default function App() {
  return <AppNavigator />;
}
