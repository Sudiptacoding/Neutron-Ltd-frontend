import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// const firebaseConfig = {
//     apiKey: import.meta.env.VITE_apiKey,
//     authDomain: import.meta.env.VITE_authDomain,
//     databaseURL: import.meta.env.VITE_databaseURL,
//     projectId: import.meta.env.VITE_projectId,
//     storageBucket: import.meta.env.VITE_storageBucket,
//     messagingSenderId: import.meta.env.VITE_messagingSenderId,
//     appId: import.meta.env.VITE_appId,
// };


const firebaseConfig = {
    apiKey: "AIzaSyATKqrsnpLIqiAPEkAjIEP9vwKA6V_CWRo",
    authDomain: "neutron-ltd-14a0b.firebaseapp.com",
    projectId: "neutron-ltd-14a0b",
    storageBucket: "neutron-ltd-14a0b.appspot.com",
    messagingSenderId: "476698366864",
    appId: "1:476698366864:web:f5db77b09012b6f1319915"
  };


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth