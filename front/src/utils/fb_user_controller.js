import firebase from 'firebase/compat/app';
import 'firebase/compat/auth'; 
import 'firebase/compat/firestore';
import { FBUser } from './fb_user';
import { FBPost } from './fb_post';
import { useNavigate } from "react-router-dom";

export const FirebaseUserAccountType = {
  USER: 'user',
  EDITOR: 'editor',
  SUPERUSER: 'superuser'
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
      this.postsCollection = this.db.collection('posts');
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
      
    } catch (error) {
      throw error;
    }
  }

  async signOut() {
    await this.auth.signOut();
  }

  async updateUserRole(email, role) {
    this.usersCollection
    .where("email", "==", email)
    .get()
    .then(querySnapshot => {
        querySnapshot.forEach(doc => {
            const docId = doc.id;

            this.usersCollection.doc(docId).update({"accountType": role})
                .then(() => {
                    console.log("Document updated successfully!");
                })
                .catch(error => {
                    console.error("Error updating document: ", error);
                });
            });
        })
    .catch(error => {
        console.error("Error getting documents: ", error);
    });
  }

  async getPosts() {
      try {
        if (this.user.accountType == FirebaseUserAccountType.SUPERUSER) {
          const snapshot = await this.postsCollection.where('visibility', 'in', ['public', 'private']).get();
          const postsData = snapshot.docs.map(doc => {
              const data = doc.data();
              return FBPost.deserialize(doc.id, data);
          });
          return postsData;
        }

        const snapshot = await this.postsCollection.where('visibility', '==', 'public').get();
        const postsData = snapshot.docs.map(doc => {
            const data = doc.data();
            return FBPost.deserialize(doc.id, data);
        });

        const userPostsSnapshot = await this.postsCollection.where('visibility', '==', 'private').where('userId', '==', this.user.uid).get();
        const usersPostData = userPostsSnapshot.docs.map(doc => {
            const data = doc.data();
            return FBPost.deserialize(doc.id, data);
        });

        return [...postsData, ...usersPostData];
      } catch (error) {
          console.error('Error fetching posts:', error);
      }
  }

  async addNewPost(newPostTitle, newPostContent, newPostVisibility) {
    try {
      await this.postsCollection.add({
        userId: this.user.uid,
        userEmail: this.user.email,
        text: newPostContent,
        title: newPostTitle,
        visibility: newPostVisibility,
        dateAdded: firebase.firestore.FieldValue.serverTimestamp()
      });
    } catch (error) {
        console.error('Error adding new post:', error);
    }
  }

  async updatePost(post) {
    try {
        await this.postsCollection.doc(post.postId).update({
          text: post.text,
          title: post.title,
          visibility: post.visibility,
      });
    } catch (error) {
        console.error('Error updating post:', error);
    }
  } 
  
  async removePost(post) {
    try {
      await this.postsCollection.doc(post.postId).delete();
      console.log('Post successfully removed:', post.postId);
  } catch (error) {
      console.error('Error removing post:', error);
  }
  } 
}


export default FBUserController;
