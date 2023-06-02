import { doc, runTransaction } from 'firebase/firestore';
import { db } from '../.firebase';
import { ModalDismissButton } from '../context/ModalContext';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ITodo } from '../models';

function Delete({ id }: any) {
  const { currentUser: user } = useContext(AuthContext);
  const todoRef = doc(db, 'accounts', String(user?.uid));

  const deleteHandler = async () => {
    try {
      await runTransaction(db, async (transaction) => {
        const todoDoc = await transaction.get(todoRef);
        if (!todoDoc.exists()) {
          return 'document doesnt exist!';
        }

        const data = todoDoc.data().tasks;

        const newData = data.filter((el: ITodo) => el.idTask !== id);
        console.log(newData);

        transaction.update(todoRef, {
          tasks: [...newData],
        });
      });
      window.location.reload();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <h1 className="font-bold py-5 text-center ">Are you sure?</h1>
      <ModalDismissButton>
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 border border-green-700 rounded mx-3 mb-3"
          onClick={deleteHandler}
        >
          Yes, I do!{' '}
        </button>
      </ModalDismissButton>

      <ModalDismissButton>
        <button className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded mr-3">
          No, nevermind{' '}
        </button>
      </ModalDismissButton>
    </div>
  );
}

export default Delete;
