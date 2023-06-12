import { useContext, useRef } from 'react';
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable';
import { useUpdateTitleMutation } from '../features/slices/apiSlice';
import { useSelector } from 'react-redux';
import { AuthContext } from '../context/AuthContext';
import { RootState } from '../app/store';

interface EditProps {
  textClass: string[];
  title: string;
  taskId: string;
}

function Edit({ textClass, title, taskId }: EditProps) {
  const currentDate = useSelector((state: RootState) => state.date.date);
  const { currentUser: user } = useContext(AuthContext);
  const [updateTitle] = useUpdateTitleMutation();
  const text = useRef(title);

  const handleChange = (event: ContentEditableEvent) => {
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
      className={textClass.join(' ')}
    />
  );
}

export default Edit;
