import { useState } from 'react';

import { PostFormData } from '../types/AppTypes';

const postFormData: PostFormData = {
  title: '',
  content: '',
  link: '',
  profileMsg: '',
  username: '',
};

export default function useChangePostForm() {
  const [postForm, setPostForm] = useState(postFormData);

  const handleChangeInputField = (
    event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { target } = event;

    if (target.id === 'title' || target.id === 'content') {
      if (target.value.length > target.maxLength) {
        target.value = target.value.slice(0, target.maxLength);
      } else {
        target.value = target.value;
      }
    }

    const {
      target: { value, id },
    } = event;

    setPostForm({
      ...postForm,
      [id]: value,
    });
  };

  return {
    postForm,
    handleChangeInputField,
  };
}
