import { Button, Checkbox, Form, Input } from 'antd';
import axios from 'axios';
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Command } from '../../../access';
import { notificationSuccess } from '../../../components';
import { notificationError } from '../../../components/Noti';
import './style.scss';

export const Login = () => {
    const history = useHistory();
    const [error, setError] = useState<string>('');
    const onFinish = (values: any) => {
        axios({
            method: 'post',
            url: Command.user.login(),
            headers: {},
            data: values
        })
            .then((response) => {
                if (response.data.code !== '404') {
                    notificationSuccess({ description: 'Bạn đã đăng nhập thành công' });
                    window.location.href = '/'
                    setError('')
                    localStorage.setItem('user', JSON.stringify(response.data));
                } else {
                    notificationError({ description: response.data.message });
                    setError(response.data.message)
                }
            }, (error) => {
                alert(error)
            });
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className='page-login'>
            <Form
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                className='form-login'
            >
                <h3 className='title'>Đăng Nhập</h3>
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password />
                </Form.Item>
                {error && <div className='error-form'>{error}</div>}
                <Form.Item>
                    <Button type="primary" htmlType="submit">Log in</Button>
                </Form.Item>
                <div className='redirect-register'>
                    <Link to={'/register'}>create new account</Link>
                </div>
            </Form>
        </div>
    );
};