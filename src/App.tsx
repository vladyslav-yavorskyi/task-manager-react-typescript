import Form from './components/Form';
import useTodos from './todos';
import Task from './components/Task';
import { Modal, ModalContents, ModalOpenButton } from './context/ModalContext';

export function App() {
  const { data, error } = useTodos();

  return (
    <div className="container">
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
      {/* {modal && (
        <Modal title="Create new task." onClose={() => close()}>
          <Form onAdd={addTask} />
        </Modal>
      )}
      {modalDelete && (
        <Modal title="Are you sure" onClose={() => closeDelete()}>
          <Delete />
        </Modal>
      )} */}
    </div>
  );
}
