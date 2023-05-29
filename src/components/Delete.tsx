import { deleteDoc, doc } from 'firebase/firestore';
import React from 'react';
import { db } from '../firebase';
import { ModalDismissButton } from '../context/ModalContext';

function Delete({ id }: any) {
  const todoRef = doc(db, 'todo', id);

  const deleteHandler = async () => {
    try {
      await deleteDoc(todoRef);
      window.location.reload();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <h1 className="font-bold py-5 text-center ">Are you sure?</h1>
      <button
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 border border-green-700 rounded mx-3 mb-3"
        onClick={deleteHandler}
      >
        Yes, I do!{' '}
      </button>
      <ModalDismissButton>
        <button className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded mr-3">
          No, nevermind{' '}
        </button>
      </ModalDismissButton>
    </div>
  );
}

export default Delete;
