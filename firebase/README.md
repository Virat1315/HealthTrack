# Firebase Authentication Dashboard

This project demonstrates a simple dashboard with Firebase Authentication. Users can sign in with Google and view a personalized dashboard. The project is built using HTML, Tailwind CSS, and Firebase.

## Features
- Google Sign-In using Firebase Authentication.
- Responsive design for mobile and desktop.
- Personalized dashboard with user details.
- Sign-out functionality.

## Prerequisites
- A Firebase project.
- A Google account for Firebase setup.
- Basic knowledge of HTML, CSS, and JavaScript.

## Steps to Set Up Firebase

### 1. Create a Firebase Project
1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Click on **"Add Project"**.
3. Enter a project name and follow the steps to create the project.

### 2. Enable Google Authentication
1. In the Firebase Console, go to **Authentication** > **Sign-in method**.
2. Click on **Google** and enable it.
3. Save the changes.

### 3. Get Firebase Project Configuration
1. In the Firebase Console, go to **Project Settings** (gear icon next to "Project Overview").
2. Scroll down to the **"Your apps"** section and click on **"Add app"**.
3. Choose **Web** and register the app.
4. Copy the Firebase configuration object (apiKey, authDomain, projectId, etc.).

### 4. Add Authorized Domains
1. In the Firebase Console, go to **Authentication** > **Settings**.
2. Under **Authorized domains**, add the domainsz where your app will be hosted (e.g., `localhost` for development).

### 5. Update Firebase Configuration in the Code
Replace the `firebaseConfig` object in the `script` tag of the `index.html` file with your Firebase project's configuration.

```javascript
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID",
    measurementId: "YOUR_MEASUREMENT_ID"
};
