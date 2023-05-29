import React, { useRef } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '../.firebase';

function SingUp() {
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);

  const signIn = async () => {
    try {
      await signInWithEmailAndPassword(
        auth,
        email.current!.value,
        password.current!.value
      );
    } catch (e) {
      console.error(e);
    }
  };

  const createAccount = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await createUserWithEmailAndPassword(
        auth,
        email.current!.value,
        password.current!.value
      );
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
        type="text"
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
