import { useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import { ITodo } from './models';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from './firebase';

function useTodos() {
  const [data, setData] = useState<ITodo[]>([]);
  const [error, setError] = useState('');

  const collectionRef = collection(db, 'todo');

  const getData = async () => {
    try {
      setError('');
      const q = query(collectionRef, orderBy('time'));
      const response = await getDocs(q);
      const newData = response.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      })) as ITodo[];

      setData(newData);
    } catch (e: unknown) {
      const error = e as AxiosError;
      setError(error.message);
    }
  };
  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { data, error };
}

export default useTodos;
