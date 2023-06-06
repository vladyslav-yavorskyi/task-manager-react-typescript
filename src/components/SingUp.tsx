import React, { useRef } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../app/.firebase';
import { doc, setDoc } from 'firebase/firestore';

function SingUp() {
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);

  const createAccount = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email.current!.value,
        password.current!.value
      );
      console.log(response);
      const account = {
        userID: response.user.uid,
        tasks: [],
      };

      await setDoc(doc(db, 'accounts', account.userID), account);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <form className="m-3 flex flex-col " onSubmit={createAccount}>
      <label htmlFor="email">Your email</label>
      <input
        className="outline-none py-2 px-4"
        placeholder="Enter your email..."
        ref={email}
        type="text"
        id="email"
      />
      <label htmlFor="password">Your password</label>
      <input
        className="outline-none py-2 px-4"
        placeholder="Enter your password..."
        ref={password}
        type="password"
        id="password"
      />
      <button
        type="submit"
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 border border-green-700 rounded mx-3 my-3"
      >
        Sing up
      </button>
    </form>
  );
}

export default SingUp;
