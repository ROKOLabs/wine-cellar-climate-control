import { useState } from 'react';

import { INotification } from 'features/auth/pages/types';

export const useNotification = () => {
  const [notification, setNotification] = useState<INotification>({});

  const createSuccessNotification = () => {
    setNotification({
      type: 'success',
      title: 'Congratulations!',
      msg: 'Your account is all set up and you will now be redirected to the Login page',
      color: 'green',
    });
  };

  const createErrorNotification = (msg: string) => {
    setNotification({
      type: 'error',
      title: 'Oops!',
      msg: msg,
      color: 'red',
    });
  };

  const resetNotification = () => {
    setNotification({});
  };

  return {
    notification,
    createSuccessNotification,
    createErrorNotification,
    resetNotification,
  };
};
