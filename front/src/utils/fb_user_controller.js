import firebase from 'firebase/compat/app';
import 'firebase/compat/auth'; 
import 'firebase/compat/firestore';
import { FBUser } from './fb_user';

export const FirebaseUserAccountType = {
  USER: 'user',
  MODERATOR: 'moderator',
  ROOT: 'root'
};

class FBUserController {
  constructor() {
    if (!FBUserController.instance) {
      const firebaseConfig = {
        apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
        authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
        projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
        storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.REACT_APP_FIREBASE_APP_ID
      };
      
      const app = firebase.initializeApp(firebaseConfig);
      
      this.auth = app.auth();
      this.db = app.firestore();
      this.usersCollection = this.db.collection('users');
      this.user = null;

      FBUserController.instance = this;
    }
    return FBUserController.instance;
  }

  static getInstance() {
    if (!FBUserController.instance) {
      FBUserController.instance = new FBUserController();
    }
    return FBUserController.instance;
  }

  async createUserWithEmailAndPassword(email, password) {
    try {
      const userCredential = await this.auth.createUserWithEmailAndPassword(email, password);
      this.uid = userCredential.user.uid;
      this.accountType = FirebaseUserAccountType.USER;
      this.user = new FBUser(this.uid, userCredential.user.email, this.accountType);

      // Store to Database
      this.usersCollection.doc(this.uid).set(this.user.serialize());

    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async signInWithEmailAndPassword(email, password) {
    try {
      const userCredential = await this.auth.signInWithEmailAndPassword(email, password);
      
      // Retrieve from database
      const userDoc = await this.usersCollection.doc(userCredential.user.uid).get();
      if (userDoc.exists) {
          const serializedUser = userDoc.data();
          this.user = FBUser.deserialize(userCredential.user.uid, serializedUser);
      } else {
          throw new Error("Error!");
      }

    } catch (error) {
      throw error;
    }
  }
}

export default FBUserController;
