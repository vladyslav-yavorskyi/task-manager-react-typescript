import { useContext, useRef } from 'react';
import ContentEditable from 'react-contenteditable';
import { useUpdateTitleMutation } from '../features/slices/apiSlice';
import { useSelector } from 'react-redux';
import { AuthContext } from '../context/AuthContext';

function Edit({ title, taskId }: any) {
  const currentDate = useSelector((state: any) => state?.date?.date);
  const { currentUser: user } = useContext(AuthContext);
  const text = useRef(title);
  const [updateTitle] = useUpdateTitleMutation();

  const handleChange = (event: any) => {
    text.current = event.target.value;
  };
  const handleBlur = () => {
    updateTitle({
      user,
      date: currentDate,
      id: taskId,
      newTitle: text.current,
    });
  };

  return (
    <ContentEditable
      onChange={handleChange}
      onBlur={handleBlur}
      html={text.current}
      style={{
        outline: '0px solid transparent',
      }}
    />
  );
}

export default Edit;
