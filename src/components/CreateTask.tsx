import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useCreateNewTaskMutation } from '../todoSlice';
import { ModalDismissButton } from '../context/ModalContext';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import dayjs, { Dayjs } from 'dayjs';

function CreateTask() {
  const [value, setValue] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [date, setDate] = useState<Dayjs | null>(dayjs(Date.now()));
  const { currentUser: user } = useContext(AuthContext);
  const [createNewTask] = useCreateNewTaskMutation();

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (value.trim().length === 0) {
      setError('You can not use this name for task');
      return;
    }

    createNewTask({
      user: user?.uid,
      value,
      date: dayjs(date).format('DD-MM-YYYY'),
    });

    setValue('');
  };

  const typeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <form onSubmit={submitHandler} className="my-4">
      <input
        type="text"
        className="outline-none py-2 px-4"
        placeholder="Enter your task..."
        value={value}
        onChange={typeHandler}
      />
      {error && (
        <p className="text-red-600 font-bold text-center">Write something!</p>
      )}
      <DateCalendar value={date} onChange={(newDate) => setDate(newDate)} />
      <ModalDismissButton>
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 border border-green-700 rounded mx-3 mb-3"
        >
          Add
        </button>
      </ModalDismissButton>
    </form>
  );
}

export default CreateTask;
