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

  const createErrorNotification = () => {
    setNotification({
      type: 'error',
      title: 'Oops!',
      msg: 'It seems something went wrong on our end. Please try again later',
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
