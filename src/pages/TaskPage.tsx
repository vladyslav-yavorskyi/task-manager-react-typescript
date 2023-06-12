import Task from '../components/Task';
import { Modal } from '../context/ModalContext';
import CreateTask from '../components/CreateTask';
import { ModalOpenButton, ModalContents } from '../context/ModalContext';
import { useFetchAllTasksQuery } from '../features/slices/apiSlice';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useSelector } from 'react-redux';
import Date from '../components/Date';
import { RootState } from '../app/store';

function TaskPage() {
  const currentDate = useSelector((state: RootState) => state.date.date);
  const { currentUser: user } = useContext(AuthContext);

  const { data, isLoading, isError } = useFetchAllTasksQuery({
    user: user.uid,
    date: currentDate,
  });

  return (
    <div className="container mx-auto max-w-2xl pt-5">
      <h1 className="text-center font-bold text-5xl my-10">YOUR TASKS</h1>
      <Date />
      <>
        {isError && <p>Something went wrong.... {isError}</p>}

        {data?.length ? (
          !isLoading &&
          data?.map((task) => <Task task={task} key={task.idTask} />)
        ) : (
          <p className="text-gray-400/[.60] text-center mt-10">
            You don't have any task on that day :){' '}
          </p>
        )}
      </>

      <Modal>
        <ModalOpenButton>
          <button className="text-green-700 border-2 border-green-700 hover:bg-green-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:focus:ring-green-800 dark:hover:bg-green-500 fixed bottom-10 right-10">
            +
          </button>
        </ModalOpenButton>
        <ModalContents title="Add new task">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <CreateTask />
          </LocalizationProvider>
        </ModalContents>
      </Modal>
    </div>
  );
}

export default TaskPage;
