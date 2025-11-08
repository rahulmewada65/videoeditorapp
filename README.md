# 🎬 VideoEditorApp

A modern, lightweight **React Native Video Editor** app that allows users to **record**, **import**, **trim**, **add text overlays**, and **export HD videos** with smooth animations — all built using React Native and native Android modules.

---

## 👨‍💻 Developer Info

**Author:** Rahul Mewada  
**Role:** Senior Software Engineer  
**UI Created By:** ChatGPT (AI Design) 🤖  
**Date:** November 8–9, 2025  
**Sources Used:** React Native Docs, NPM, Medium, Google  

---

## 🚀 Features

✅ Record video directly from camera  
✅ Import video from gallery  
✅ Trim videos with intuitive sliders  
✅ Add customizable text overlays (color, font, size, position)  
✅ Real-time video preview player  
✅ Export in HD quality  
✅ Smooth gradient UI with vector icons  
✅ Native Android integration for fast processing  

---

## 🧠 Tech Stack

| Technology | Description |
|-------------|-------------|
| **React Native 0.79** | Cross-platform mobile framework |
| **Reanimated 3.12 (GitHub build)** | Smooth native animations |
| **React Native Video** | Video playback and preview |
| **Linear Gradient** | Beautiful gradient UI |
| **Vector Icons** | Material icons integration |
| **Native Modules (Java)** | Custom trimming and text overlay features |

---

## 📱 Screens / Components

| Component | Description |
|------------|-------------|
| `HomeScreen.js` | Pick or record videos |
| `EditorScreen.js` | Trim and overlay text |
| `VideoPlayer.js` | Play and scrub through videos |
| `TrimEditor.js` | Slider-based trimming tool |
| `TextOverlay.js` | Draggable text overlay input |
| `permissions.js` | Camera & storage permission handling |
| `AppNavigator.js` | Stack navigation setup |
| `VideoEditor.java` | Native Android module for trimming and rendering |

---

## ⚙️ Installation & Setup

1️⃣ Clone the repository:
```bash
git clone https://github.com/<your-username>/VideoEditorApp.git

npm install

npx react-native run-android

🧩 Folder Structure

VideoEditorApp/
 ├── android/
 ├── src/
 │   ├── screens/
 │   │   ├── HomeScreen.js
 │   │   ├── EditorScreen.js
 │   ├── components/
 │   │   ├── VideoPlayer.js
 │   │   ├── TrimEditor.js
 │   │   ├── TextOverlay.js
 │   ├── utils/
 │   │   ├── permissions.js
 │   ├── AppNavigator.js
 ├── App.js
 ├── package.json
 └── README.md

🛠️ Build Info

Gradle Plugin: 8.8.2

Gradle Version: 8.10.2

NDK: Latest

JDK: 17+

Architecture: armeabi-v7a, arm64-v8a, x86, x86_64
