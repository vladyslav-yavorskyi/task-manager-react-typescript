import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { decrementDay, incrementDay } from '../features/dateSlice';

function Date() {
  const currentDate = useSelector((state: any) => state?.date?.date);
  const dispatch = useDispatch();

  return (
    <div className="container mx-auto max-w-2xl pt-5 text-center">
      <button onClick={() => dispatch(decrementDay())}> {'<'}</button>
      {'    '}
      {currentDate}
      {'    '}
      <button onClick={() => dispatch(incrementDay())}> {'>'}</button>
    </div>
  );
}

export default Date;
