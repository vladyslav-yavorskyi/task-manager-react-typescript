import React from 'react';
import useTodos from '../todos';
import Task from '../components/Task';
import { Modal } from '../context/ModalContext';
import Form from '../components/Form';
import { ModalOpenButton, ModalContents } from '../context/ModalContext';

function TaskPage() {
  const { data, error } = useTodos();

  return (
    <div className="container mx-auto max-w-2xl pt-5">
      <h1 className="text-center font-bold text-5xl mt-5">TO-DO App</h1>

      {error && <p>Something went wrong.... :( {error}</p>}

      {data.map((task) => (
        <Task task={task} key={task.id} />
      ))}
      <Modal>
        <ModalOpenButton>
          <button className="text-green-700 border-2 border-green-700 hover:bg-green-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:focus:ring-green-800 dark:hover:bg-green-500 fixed bottom-10 right-10">
            +
          </button>
        </ModalOpenButton>
        <ModalContents title="Add new task">
          <Form />
        </ModalContents>
      </Modal>
    </div>
  );
}

export default TaskPage;
