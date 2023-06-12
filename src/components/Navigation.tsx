import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Modal, ModalContents } from '../context/ModalContext';
import { ModalOpenButton } from '../context/ModalContext';
import SingUp from './SingUp';
import { auth } from '../app/.firebase';
import SignIn from './SignIn';

function Navigation() {
  const { isSignedIn } = useContext(AuthContext);
  const signOut = async () => {
    await auth.signOut();
  };

  return (
    <nav className="h-[50px] flex justify-between px-5 bg-zinc-100 items-center text-stone-700">
      <h1 className="font-bold">TO-DO MANAGER</h1>
      <span>
        <Link to="/">
          <button
            type="button"
            className="inline-block rounded-full border-2 border-info px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-info transition duration-150 ease-in-out hover:border-info-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-info-600 focus:border-info-600 focus:text-info-600 focus:outline-none focus:ring-0 active:border-info-700 active:text-info-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
            data-te-ripple-init
          >
            About
          </button>
        </Link>
        {isSignedIn ? (
          <>
            <Link to="/tasks" className="mx-2">
              Your tasks
            </Link>
            <Link to="/">
              <button onClick={signOut}>Sign out</button>
            </Link>
          </>
        ) : (
          <>
            <Modal>
              <ModalOpenButton>
                <button className="ml-2">Sign in</button>
              </ModalOpenButton>
              <ModalContents title="Sign in">
                <SignIn />
              </ModalContents>
            </Modal>
            <Modal>
              <ModalOpenButton>
                <button className="ml-2">Sign up</button>
              </ModalOpenButton>
              <ModalContents title="Sign up">
                <SingUp />
              </ModalContents>
            </Modal>
          </>
        )}
      </span>
    </nav>
  );
}

export default Navigation;
