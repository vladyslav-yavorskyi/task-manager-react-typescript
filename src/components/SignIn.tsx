import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRef, useState } from 'react';
import { auth } from '../app/.firebase';

function SignIn() {
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const [error, setError] = useState(false);

  const signIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await signInWithEmailAndPassword(
        auth,
        email.current!.value,
        password.current!.value
      );
    } catch (e) {
      console.error(e);
      setError(true);
    }
  };

  return (
    <div>
      <form
        className="m-3 flex items-center flex-col w-[500px]"
        onSubmit={signIn}
      >
        <img
          src="https://inkstickers.com.br/wp-content/uploads/2022/09/rick-and-morty-2.png"
          className="w-[210px]"
          alt="rickandmorty"
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
    </div>
  );
}

export default SignIn;
