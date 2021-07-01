import firebase from "firebase"

const config = {
    apiKey: "AIzaSyBgz5zQ2OHH14xHvUrOlGHPPt3m3NGIFOA",
    authDomain: "whatsapp-clone-c35bf.firebaseapp.com",
    projectId: "whatsapp-clone-c35bf",
    storageBucket: "whatsapp-clone-c35bf.appspot.com",
    messagingSenderId: "917305981522",
    appId: "1:917305981522:web:2ec9a976a4faa77d39bd8b"
};

const app = !firebase.apps.length
  ? firebase.initializeApp(config)
  : firebase.app();


const db = app.firestore();
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export {
    db,
    auth,
    provider
}