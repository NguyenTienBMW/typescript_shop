import { Button, Checkbox, Form, Input, Radio } from 'antd';
import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import './style.scss';

export const Register = () => {
    const [gender, setGender] = useState<string>('');
    const genderOption = ['Nam', 'Nữ', 'Khác'];
    const onFinish = (values: any) => {
        console.log('Success:', values);
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
            <h3 className='title'>Đăng Ký</h3>
            <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input placeholder='Enter name'/>
            </Form.Item>
            <Form.Item
                label="Gender"
                name="gender"
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Radio.Group onChange={(e) => setGender(e.target.value)} value={gender}>
                    <Radio value={1}>Nam</Radio>
                    <Radio value={2}>Nu</Radio>
                    <Radio value={3}>Khac</Radio>
                </Radio.Group>
            </Form.Item>
            <Form.Item
                label="Username (email)"
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input placeholder='Enter email'/>
            </Form.Item>
            <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password placeholder='Enter password' />
            </Form.Item>

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