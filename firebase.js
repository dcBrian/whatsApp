// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyCglsh_Xo1htp7HAsoVkZ0UkNfpt_oYw-s',
    authDomain: 'whatsapp-bd35c.firebaseapp.com',
    projectId: 'whatsapp-bd35c',
    storageBucket: 'whatsapp-bd35c.appspot.com',
    messagingSenderId: '501549388660',
    appId: '1:501549388660:web:56ba3c1c8f20931970d221',
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };
