import { showNotification } from '@mantine/notifications';
import { IconCheck, IconX } from '@tabler/icons-react';

type NotificationOptions = {
  message: string;
  title?: string;
  type: 'success' | 'error';
};

export const notification = ({ message, title, type }: NotificationOptions) => {
  showNotification({
    title,
    message,
    icon:
      type === 'success' ? (
        <IconCheck size={18} color="white" />
      ) : (
        <IconX size={18} color="white" />
      ),
    color: type === 'success' ? 'teal' : 'red',
  });
};
