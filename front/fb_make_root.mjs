import firebase from 'firebase/compat/app';
import 'firebase/compat/auth'; 
import 'firebase/compat/firestore';

const targetEmail = process.argv[2];
if (targetEmail == "") {
    console.error("Error: No target email provided.");
    process.exit(1);
}

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
};

console.log(firebaseConfig);

const app = firebase.initializeApp(firebaseConfig);

const auth = app.auth();
const db = app.firestore();
const usersCollection = db.collection('users');

usersCollection
    .where("email", "==", targetEmail)
    .get()
    .then(querySnapshot => {
        querySnapshot.forEach(doc => {
            const docId = doc.id;
            const userData = doc.data();
            
            // Update the document in Firestore
            usersCollection.doc(docId).update({"accountType": "root"})
                .then(() => {
                    console.log("Document updated successfully!");
                    process.exit(0);
                })
                .catch(error => {
                    console.error("Error updating document: ", error);
                    process.exit(1);
                });
            });
        })
    .catch(error => {
        console.error("Error getting documents: ", error);
        process.exit(1);
    });