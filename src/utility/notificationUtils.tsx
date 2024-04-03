import { showNotification } from '@mantine/notifications';
import { IconCheck, IconX } from '@tabler/icons-react';

type NotificationOptions = {
  title?: string;
  message?: string;
};

interface ErrorNotificationProps extends NotificationOptions {
  error?: unknown;
}

const genericErrorMessage = 'An error occurred. Please try again later.';
const genericSuccessMessage = 'Everything went well.';

const parseErrorMessage = (error: unknown) =>
  error instanceof Error
    ? error.message
    : typeof error === 'string'
      ? error
      : genericErrorMessage;

export const errorNotification = ({
  title = 'Error occurred',
  message,
  error,
}: ErrorNotificationProps) => {
  showNotification({
    title,
    message: message ?? parseErrorMessage(error),
    icon: <IconX size="1.1rem" />,
    color: 'red',
  });
};

export const errorNotificationCurried =
  (props?: NotificationOptions) => (error?: unknown) => {
    errorNotification({ ...props, error });
  };

export const successNotification = (props?: NotificationOptions) => {
  showNotification({
    title: props?.title ?? 'Success',
    message: props?.message ?? genericSuccessMessage,
    icon: <IconCheck size="1.1rem" />,
    color: 'green',
  });
};

export const successNotificationCurried =
  (props?: NotificationOptions) => () => {
    successNotification(props);
  };
