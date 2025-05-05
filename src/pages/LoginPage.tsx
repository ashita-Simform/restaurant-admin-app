import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Form, message, Typography, Tabs } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../store';
import { login } from '@/store/features';
import ButtonAtom from '../components/atoms/Button/button';
import { InputAtom } from '@/components/atoms';
import styles from '../styles/LoginPage.module.css';
import logo from '../assets/images/shared image.png';
import { MailOutlined } from '@ant-design/icons';
const { Title, Text, Link } = Typography;
/**
 * LoginPage component for the Taj Mahal Restaurant Admin application.
 *
 * This component renders a login form for the admin panel. It includes fields for
 * username and password, and handles the login process by dispatching a login action
 * and navigating to the home page upon successful authentication.
 *
 * A functional React component.
 *
 * @returns {JSX.Element} The rendered LoginPage component.
 *
 * @remarks
 * - Uses useNavigate from react-router-dom for navigation.
 * - Uses useAppDispatch and useAppSelector for Redux state management.
 * - Displays success or error messages using Ant Design's message utility.
 * - Includes a loading state to indicate the login process.
 *
 */
const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { error } = useAppSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [loginMethod, setLoginMethod] = useState<'email' | 'id'>('email');
  const onFinish = async (values: { username: string; password: string }) => {
    setLoading(true);
    dispatch(login(values));
    setLoading(false);

    if (!error) {
      message.success('Login successful!');
      navigate('/');
    } else {
      message.error('Login Unsuccessful!');
    }
  };
  const handleTabChange = (key: string) => {
    setLoginMethod(key as 'email' | 'id');
  };
  return (
    <div className={styles.container}>
      <div className={styles.formSection}>
        <img src={logo} alt="Logo" className={styles.logo} />
        <Card className={styles.card}>
          <Title level={2} className={styles.title}>
            Sign In to Your Account
          </Title>

          <Tabs
            centered
            activeKey={loginMethod}
            onChange={handleTabChange}
            items={[
              { key: 'email', label: 'Email Login' },
              { key: 'id', label: 'User ID Login' },
            ]}
          />

          <Form name="login" layout="vertical" onFinish={onFinish}>
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: `Please input your ${loginMethod === 'email' ? 'email' : 'ID'}!`,
                },
              ]}
            >
              <InputAtom
                prefix={
                  loginMethod === 'email' ? <MailOutlined /> : <UserOutlined />
                }
                placeholder={loginMethod === 'email' ? 'Email' : 'User ID'}
                size="large"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: 'Please input your password!' },
              ]}
            >
              <InputAtom
                type="password"
                prefix={<LockOutlined />}
                placeholder="Password"
                size="large"
              />
            </Form.Item>

            <Form.Item>
              <ButtonAtom
                type="primary"
                htmlType="submit"
                loading={loading}
                block
                size="large"
              >
                Log In
              </ButtonAtom>
            </Form.Item>
          </Form>

          <div className={styles.signup}>
            <Text className="login-page-text">
              Don&apos;t have an account? <Link>Sign up</Link>
            </Text>
          </div>
        </Card>
      </div>
      {/* Removed extra image section and applied background to container */}
    </div>
  );
};
export default LoginPage;
