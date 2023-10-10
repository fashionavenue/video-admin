import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore"
import {
    ref,
    uploadBytes,
    getDownloadURL,
} from "firebase/storage";
import { v4 } from "uuid";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC4J7wZAVpS_6LtMX0yWKnWzAqZIkSXCMA",
    authDomain: "fir-70ae6.firebaseapp.com",
    projectId: "fir-70ae6",
    storageBucket: "fir-70ae6.appspot.com",
    messagingSenderId: "1094917266554",
    appId: "1:1094917266554:web:a3decdbdd215fa1dbc6fc3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getFirestore(app)

const storage = getStorage(app)

export const uploadFiles = async (imageUpload) => {
    try {
        const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
        const snapshot = await uploadBytes(imageRef, imageUpload);
        console.log("snapshot========------", snapshot)
        const url = await getDownloadURL(snapshot.ref);
        console.log("url=======--------=======", url);
        return url;
    } catch (error) {
        console.log({ error })
    }
}
export { database, app, storage }