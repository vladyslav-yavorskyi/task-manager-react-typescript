import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Modal, ModalContents } from '../context/ModalContext';
import { ModalOpenButton } from '../context/ModalContext';
import SingUp from './SingUp';
import { auth } from '../.firebase';
import SignIn from './SignIn';

function Navigation() {
  const { isSignedIn } = useContext(AuthContext);
  const signOut = async () => {
    await auth.signOut();
  };

  return (
    <nav className="h-[50px] flex justify-between px-5 bg-gray-500 items-center text-white">
      <span>TO-DO APP</span>
      <span>
        <Link to="/">About</Link>
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
