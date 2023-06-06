import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRef } from 'react';
import { auth } from '../app/.firebase';

function SignIn() {
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);

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
    }
  };

  return (
    <div>
      <form className="m-3 flex flex-col " onSubmit={signIn}>
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
    </div>
  );
}

export default SignIn;
