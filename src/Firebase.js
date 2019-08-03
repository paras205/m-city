import firebase from 'firebase/app';
import 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCTFA2WWDxUSsh8YZBBdyFlaseKVswIBFc",
    authDomain: "football-project-5d259.firebaseapp.com",
    databaseURL: "https://football-project-5d259.firebaseio.com",
    projectId: "football-project-5d259",
    storageBucket: "",
    messagingSenderId: "309598258356",
    appId: "1:309598258356:web:c204bbf6dd116b96"
};
firebase.initializeApp(firebaseConfig);

const firebaseDB = firebase.database();
const firebaseMatches = firebaseDB.ref('matches');
const firebasePromotions = firebaseDB.ref('promotions');
const firebaseTeams = firebaseDB.ref('teams');
export {
    firebase,
    firebaseMatches,
    firebasePromotions,
    firebaseTeams,
    firebaseDB
}