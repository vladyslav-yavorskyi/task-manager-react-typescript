import { useContext, useRef, useState } from 'react';
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable';
import { useUpdateTitleMutation } from '../features/slices/apiSlice';
import { useSelector } from 'react-redux';
import { AuthContext } from '../context/AuthContext';
import { RootState } from '../app/store';
import { pencil } from '../icons';

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
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (event: ContentEditableEvent) => {
    text.current = event.target.value;
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  };

  const handleBlur = async (
    event: React.FocusEvent<HTMLDivElement, Element>
  ) => {
    event.preventDefault();
    setIsFocused(false);
    if (text.current.length > 0) {
      await updateTitle({
        user,
        date: currentDate,
        id: taskId,
        newTitle: text.current,
      });
    }
  };

  return (
    <div>
      {isFocused ? pencil : null}
      <ContentEditable
        onChange={handleChange}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsFocused(true)}
        html={text.current}
        className={textClass.join(' ')}
        spellCheck={false}
      />
    </div>
  );
}

export default Edit;
