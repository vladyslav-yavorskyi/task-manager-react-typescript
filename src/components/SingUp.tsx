import React, { useRef, useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../app/.firebase';
import { doc, setDoc } from 'firebase/firestore';

function SingUp() {
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const confirmPassword = useRef<HTMLInputElement>(null);
  const [error, setError] = useState(false);

  const createAccount = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password.current?.value !== confirmPassword.current?.value) {
      setError(true);
      return;
    }

    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email.current!.value,
        password.current!.value
      );
      const account = {
        userID: response.user.uid,
        tasks: [],
      };

      await setDoc(doc(db, 'accounts', account.userID), account);
      setError(false);
    } catch (e) {
      console.error(e);
      setError(true);
    }
  };

  return (
    <form
      className="m-3 flex flex-col items-center w-[300px]"
      onSubmit={createAccount}
    >
      <img
        src="https://inkstickers.com.br/wp-content/uploads/2022/08/lisa.png"
        className="w-[210px]"
        alt="frog"
      />
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
      <label htmlFor="confirmPassword">Confirm your password</label>
      <input
        className="outline-none py-2 px-4"
        placeholder="Your password again..."
        ref={confirmPassword}
        type="password"
        id="confirmPassword"
      />
      {error && (
        <p className="font-bold text-red-400">❌Something went wrong... ❌</p>
      )}
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
