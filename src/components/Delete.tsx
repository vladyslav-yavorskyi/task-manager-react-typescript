import { ModalDismissButton } from '../context/ModalContext';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useDeleteTaskMutation } from '../features/slices/apiSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';

function Delete({ id }: { id: string }) {
  const currentDate = useSelector((state: RootState) => state.date.date);
  const { currentUser: user } = useContext(AuthContext);
  const [deleteTask] = useDeleteTaskMutation();

  const deleteHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    deleteTask({ user: user?.uid, id, date: currentDate });
  };

  return (
    <div className=" flex flex-col items-center">
      <img
        src="https://inkstickers.com.br/wp-content/uploads/2023/03/c36d4670bb6d15d0ddfe3ec00923ddb1-Editado-1.png"
        className="h-[220px]"
        alt="notsure"
      />
      <h1 className="font-bold py-5 text-center ">Are you sure?</h1>
      <div>
        <ModalDismissButton>
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 border border-green-700 rounded mx-3 mb-3"
            onClick={deleteHandler}
          >
            Yes, I am!{' '}
          </button>
        </ModalDismissButton>

        <ModalDismissButton>
          <button className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded mr-3">
            No, nevermind{' '}
          </button>
        </ModalDismissButton>
      </div>
    </div>
  );
}

export default Delete;
