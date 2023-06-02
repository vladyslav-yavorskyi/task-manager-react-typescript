import { useEffect, useState, useContext } from 'react';
import { AxiosError } from 'axios';
import { ITodo } from './models';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './.firebase';
import { AuthContext } from './context/AuthContext';

function useTodos() {
  const [data, setData] = useState<ITodo[]>([]);
  const [error, setError] = useState('');
  const { currentUser: user } = useContext(AuthContext);

  useEffect(() => {
    const getData = async () => {
      try {
        setError('');
        const collectionRef = collection(db, 'accounts');
        const response = await getDocs(collectionRef);

        const newData = response.docs.map((doc) => ({
          ...doc.data(),
        }));

        setData(newData.find((acc) => acc?.userID === user?.uid)?.tasks);
      } catch (e: unknown) {
        const error = e as AxiosError;
        setError(error.message);
      }
    };

    getData();
  }, [user?.uid]);

  console.log(data);

  return { data, error };
}

export default useTodos;
