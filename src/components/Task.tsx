import React, { useState } from 'react';
import { ITodo } from '../models';
import { db } from '../.firebase';
import { doc, runTransaction } from 'firebase/firestore';
import { checked_icon, del_icon } from '../icons';
import { Modal, ModalContents, ModalOpenButton } from '../context/ModalContext';
import Delete from './Delete';

interface TaskProps {
  task: ITodo;
}

function Task({ task }: TaskProps) {
  const [done, setDone] = useState<boolean>(task.completed);
  const todoRef = doc(db, 'todo', task.id);
  console.log(task.id);

  const clickHandler = async () => {
    try {
      await runTransaction(db, async (transaction) => {
        const todoDoc = await transaction.get(todoRef);
        if (!todoDoc.exists()) {
          return 'document doesnt exist!';
        }

        const newValue = !todoDoc.data().completed;
        transaction.update(todoRef, { completed: newValue });
        setDone(newValue);
      });
    } catch (e) {
      console.error(e);
    }
  };

  const textClassName = done ? 'line-through' : '';
  const textClasses = ['font-bold px-5', textClassName];

  return (
    <div className="container flex border-2 justify-between border-black py-1 rounded w-63 my-2 mx-4">
      <h1 className={textClasses.join(' ')}>{task.title}</h1>
      <p className={textClasses.join(' ')}>
        {new Date(task.time.seconds * 1000).toLocaleString()}
      </p>
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
            <Delete id={task.id} />
          </ModalContents>
        </Modal>
      </div>
    </div>
  );
}

export default Task;
