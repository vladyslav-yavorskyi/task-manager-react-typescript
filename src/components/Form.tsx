import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

function Form() {
  const [value, setValue] = useState<string>('');
  const [error, setError] = useState<string>('');

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (value.trim().length === 0) {
      setError('You can not use this name for task');
      return;
    }

    try {
      const collectionRef = await collection(db, 'todo');
      await addDoc(collectionRef, {
        title: value,
        completed: false,
        time: serverTimestamp(),
      });
      setValue('');
      window.location.reload();
    } catch (err: unknown) {
      console.error('err0r', err);
    }
  };

  const typeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <form onSubmit={submitHandler} className="my-4">
      <input
        type="text"
        className="outline-none py-2 px-4"
        placeholder="Enter your task..."
        value={value}
        onChange={typeHandler}
      />
      <button
        type="submit"
        className="text-white font-bold bg-green-400 py-2 px-4 rounded"
      >
        Add
      </button>
      {error && <p>Write something</p>}
    </form>
  );
}

export default Form;
