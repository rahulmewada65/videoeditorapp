/**
 * --------------------------------------------------------------
 * 📄 Permissions Utility - requestVideoPermissions.js
 * Author: Rahul Meewada
 * Date: 08th November 2025
 * --------------------------------------------------------------
 * Source References:
 * 🧠 Logic Inspired by AI (ChatGPT)
 * 📦 Documentation: npmjs.com (react-native-permissions, react-native-image-picker)
 * 📰 Tutorials: medium.com (React Native Camera & Storage Permission Handling)
 * 🌐 Research: google.com (Android Permissions Flow & Platform Checks)
 * --------------------------------------------------------------
 * Description:
 * This helper function handles permission requests for:
 * 1️⃣ Camera (to record video)
 * 2️⃣ Storage (to read or save video)
 * 3️⃣ Microphone (for recording audio along with video)
 *
 * ⚙️ Works seamlessly on Android — iOS permissions are handled
 * automatically by `react-native-image-picker`.
 * --------------------------------------------------------------
 */

import {PermissionsAndroid, Platform, Alert} from 'react-native';

/**
 * 🧩 Request Camera + Storage + Audio Permissions (Android Only)
 * Returns: true → if permissions granted, false → if denied
 */
export const requestVideoPermissions = async () => {
  if (Platform.OS === 'android') {
    try {
      // ✅ First, check if permissions are already granted
      const cameraGranted = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.CAMERA,
      );
      const readGranted = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      );
      const audioGranted = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      );

      if (cameraGranted && readGranted && audioGranted) {
        console.log('✅ Permissions already granted');
        return true;
      }

      // ✅ Request all three permissions together
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      ]);

      // ✅ Verify if all permissions were approved
      const allGranted =
        granted['android.permission.CAMERA'] ===
          PermissionsAndroid.RESULTS.GRANTED &&
        granted['android.permission.READ_EXTERNAL_STORAGE'] ===
          PermissionsAndroid.RESULTS.GRANTED &&
        granted['android.permission.RECORD_AUDIO'] ===
          PermissionsAndroid.RESULTS.GRANTED;

      if (allGranted) {
        console.log('🎥 All required permissions granted');
        return true;
      }

      // ⚠️ If any permission was denied
      Alert.alert(
        'Permission Required',
        'Camera, storage, and microphone permissions are needed to record or pick videos.',
      );
      return false;
    } catch (err) {
      console.warn('⚠️ Permission Error:', err);
      return false;
    }
  }

  // ✅ iOS automatically handles permissions via ImagePicker
  console.log('ℹ️ iOS device detected — no manual permission needed');
  return true;
};
