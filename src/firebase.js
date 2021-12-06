import firebase from 'firebase/compat/app';
import 'firebase/compat/database'

var firebaseConfig = {
    apiKey: "AIzaSyDowJOJykSjXj5tbwybpinypYh7UGV9YGc",
    authDomain: "myanimelist-e637e.firebaseapp.com",
    databaseURL: "https://myanimelist-e637e-default-rtdb.firebaseio.com",
    projectId: "myanimelist-e637e",
    storageBucket: "myanimelist-e637e.appspot.com",
    messagingSenderId: "854247297412",
    appId: "1:854247297412:web:4c977510e0f36b54220dd1"
  };

const fireDb = firebase.initializeApp(firebaseConfig);
export default fireDb.database().ref();