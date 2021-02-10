import firebase from 'firebase';
import 'firebase/firestore';

firebase.initializeApp({
	apiKey: "AIzaSyB3b_Y9pmVLPn2KyiAxQ7NitJ2obeYRSm0",
	authDomain: "weshare-8c49d.firebaseapp.com",
	projectId: "weshare-8c49d"
});

const db = firebase.firestore();

export default db;