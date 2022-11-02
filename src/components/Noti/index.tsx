import { Button, Divider, notification, Space } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';
import './style.scss';
export const notificationSuccess = ({message = 'Success', description} : {message?: string, description: string}) => {
    notification.info({
        className: 'noti-success',
        message: message,
        description: description,
        placement: 'bottomRight',
        icon: <CheckCircleOutlined />
      });
}

export const notificationError = ({message = 'Failed', description} : {message?: string, description: string}) => {
    notification.info({
        className: 'noti-failed',
        message: message,
        description: description,
        placement: 'bottomRight',
        icon: ''
      });
}