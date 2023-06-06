import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDRmQTXhVBDe5HVJcdv9eajOEGTxm65qVY',
  authDomain: 'to-do-b7191.firebaseapp.com',
  projectId: 'to-do-b7191',
  storageBucket: 'to-do-b7191.appspot.com',
  messagingSenderId: '288110499689',
  appId: '1:288110499689:web:24f27392247c427d710ff8',
};
const app = initializeApp(firebaseConfig);
// Export firestore database
// It will be imported into your react app whenever it is needed
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
