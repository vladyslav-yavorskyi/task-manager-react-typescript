import { useContext, useState } from 'react';
import { ITodo } from '../models';
import { checked_icon, del_icon } from '../icons';
import { Modal, ModalContents, ModalOpenButton } from '../context/ModalContext';
import Delete from './Delete';
import { AuthContext } from '../context/AuthContext';
import { useSelector } from 'react-redux';
import { useUpdateCheckMutation } from '../todoSlice';

interface TaskProps {
  task: ITodo;
}

function Task({ task }: TaskProps) {
  const [done, setDone] = useState<boolean>(task.completed);

  const { currentUser: user } = useContext(AuthContext);
  const currentDate = useSelector((state: any) => state?.date?.date);
  const [updateCheck] = useUpdateCheckMutation();

  const clickHandler = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    updateCheck({
      user: user?.uid,
      date: currentDate,
      id: task.idTask,
      setDone,
    });
  };
  const textClassName = done ? 'line-through' : '';
  const textClasses = ['font-bold px-5', textClassName];

  return (
    <div className="container flex border-2 justify-between border-black py-1 rounded w-63 my-2 mx-4">
      <h1 className={textClasses.join(' ')}>{task.title}</h1>

      <div className="buttons">
        <button
          type="button"
          className="rounded-full bg-white border-2 mx-4 border-black-500 w-6 h-6 "
          onClick={clickHandler}
        >
          {done && checked_icon}
        </button>
        <Modal>
          <ModalOpenButton>
            <button className="rounded-full bg-white border-2 mx-4 border-black-500 w-6 h-6">
              {del_icon}
            </button>
          </ModalOpenButton>
          <ModalContents title="Delete task">
            <Delete id={String(task.idTask)} />
          </ModalContents>
        </Modal>
      </div>
    </div>
  );
}

export default Task;
