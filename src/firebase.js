import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyBxSfd0_yJ_JdoWpNPErdkusQT9L9MY_DA",
  authDomain: "ecommerce-62beb.firebaseapp.com",
  projectId: "ecommerce-62beb",
  storageBucket: "ecommerce-62beb.appspot.com",
  messagingSenderId: "635210970046",
  appId: "1:635210970046:web:3dfa24926834647c53bfef",
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider;


