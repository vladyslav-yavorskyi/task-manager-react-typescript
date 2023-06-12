import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { decrementDay, incrementDay } from '../features/slices/dateSlice';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

import Button from '@mui/material/Button';
import { RootState } from '../app/store';

function Date() {
  const currentDate = useSelector((state: RootState) => state.date.date);
  const dispatch = useDispatch();

  return (
    <div className="container mx-auto max-w-2xl my-5 text-center">
      <Button
        onClick={() => dispatch(decrementDay())}
        startIcon={<KeyboardArrowLeftIcon />}
      ></Button>

      <Button>{currentDate}</Button>

      <Button
        onClick={() => dispatch(incrementDay())}
        startIcon={<KeyboardArrowRightIcon />}
      ></Button>
    </div>
  );
}

export default Date;
