import { Button, Checkbox, Form, Input, Radio } from 'antd';
import axios from 'axios';
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Command } from '../../../access';
import { notificationSuccess } from '../../../components';
import { notificationError } from '../../../components/Noti';
import './style.scss';

export const Register = () => {
    const history = useHistory();
    const [gender, setGender] = useState<string>('');
    const [error, setError] = useState<string>('');
    const genderOption = ['Nam', 'Nữ', 'Khác'];


    const onFinish = (values: any) => {
        axios({
            method: 'post',
            url: Command.user.register(),
            headers: {},
            data: values
        })
            .then((response) => {
                if (response.data.code !== '404') {
                    notificationSuccess({ description: 'You have successfully registered an account' });
                    history.push('/login')
                    setError('')
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
        <div className='page-register'>
            <Form
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                className='form-register'
            >
                <h3 className='title'>Register</h3>
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input placeholder='Enter name' />
                </Form.Item>
                <Form.Item
                    label="Gender"
                    name="gender"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Radio.Group onChange={(e) => setGender(e.target.value)} value={gender}>
                        <Radio value={1}>Male</Radio>
                        <Radio value={2}>Female</Radio>
                        <Radio value={3}>Other</Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item
                    label="Username (email)"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input placeholder='Enter email' />
                </Form.Item>
                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password placeholder='Enter password' />
                </Form.Item>
                {error && <div className='error-form'>{error}</div>}

                <Form.Item>
                    <Button type="primary" htmlType="submit">Đăng ký</Button>
                </Form.Item>
                <div className='redirect-register'>
                    <Link to={'/login'}>has account</Link>
                </div>
            </Form>
        </div>
    );
};