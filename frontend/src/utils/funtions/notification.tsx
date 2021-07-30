import { notification } from 'antd';

export const openNotificationWithIcon = (data: {
  message: string;
  type: 'success' | 'error' | 'warning';
  description: string;
}) => {
  notification[data.type]({
    message: data.message,
    description: data.description,
  });
};
