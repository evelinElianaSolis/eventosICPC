// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL} from "firebase/storage";
import {v4} from 'uuid'


const firebaseConfig = {
  apiKey: "AIzaSyB4DLPybKuIQXcVz4TSqJB0pFBVoEJgKPI",
  authDomain: "competencias-b0ceb.firebaseapp.com",
  projectId: "competencias-b0ceb",
  storageBucket: "competencias-b0ceb.appspot.com",
  messagingSenderId: "771731120784",
  appId: "1:771731120784:web:8474c7d31b59537fafae15",
  measurementId: "G-EJMHGVTFLY"
};
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)

export async function uploadFile(file){
    const storageRef = ref(storage, v4())
    await uploadBytes(storageRef, file)
    const url = await getDownloadURL(storageRef)
    return url
}