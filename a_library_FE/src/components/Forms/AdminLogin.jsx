import React from 'react';
import './AdminLogin.css'
import { gql, useMutation } from '@apollo/client'
import { Button, Checkbox, Form, Input } from 'antd';


const AdminLogin = () => {

    const ADMIN_LOGIN = gql`
    mutation loginAdmin($username: String! , $password: String!){
     loginAdmin(username:$username , password:$password)
     }
    `;

    const [login, { data }] = useMutation(ADMIN_LOGIN);
    const OnFinish = async (values) => {
        try {
            const response = await login({ variables: { username: values.username, password: values.password } });
            if (data?.loginAdmin || response?.data?.loginAdmin) {
                console.log(response.data)
            }            
        } catch (error) {
            console.log(error)            
        }
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className='loginform-container'>
            <Form className='form-adminlogin'
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 400 }}
                initialValues={{ remember: true, }}
                onFinish={OnFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <h3 className="loginform-title">Admin Login</h3>
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name="remember"
                    valuePropName="checked"
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button type="default" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}
export default AdminLogin;