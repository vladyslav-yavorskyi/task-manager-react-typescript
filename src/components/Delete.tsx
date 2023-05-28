// import { deleteDoc, doc } from 'firebase/firestore';
// import React from 'react';
// import { db } from '../firebase';

function Delete() {
  // const todoRef = doc(db, 'todo', id);

  // const deleteHandler = async () => {
  //   try {
  //     await deleteDoc(todoRef);
  //     window.location.reload();
  //   } catch (e) {
  //     console.error(e);
  //   }
  // };

  return (
    <div>
      <h1 className="font-bold py-5 text-center ">Are you sure?</h1>
      <button className="text-white font-bold bg-green-400 py-2 px-3 rounded mx-4 my-3">
        Yes, I do!{' '}
      </button>
      <button className="text-white font-bold bg-red-400 py-2 px-4 rounded mx-4 my-3">
        No, nevermind{' '}
      </button>
    </div>
  );
}

export default Delete;
