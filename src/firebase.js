import firebase from 'firebase/app';
import 'firebase/database';

import { firebaseConfig } from './secretStuff';

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const db = firebase.database();