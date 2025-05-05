import { Layout as AntLayout, Menu, Dropdown, Space, Avatar } from 'antd';
import { Link, Outlet } from 'react-router-dom';
import {
  DashboardOutlined,
  LogoutOutlined,
  MenuOutlined,
  DownOutlined,
} from '@ant-design/icons';
import { useAppSelector } from '../../../store';
import { useNavigation } from '../../../hooks/useNavigation';
import styles from '../../../styles/Layout.module.css';
import { JSX, ReactNode, useState } from 'react';
import { ImageAtom } from '../../atoms';
import logo from '../../../assets/images/shared image.png';
import { RightSidebar } from '../../organism/Right Sidebar/RightSidebar';
import { useMediaQuery } from 'react-responsive';

const { Header, Sider, Content } = AntLayout;

/**
 * Props for the Layout component.
 */
type LayoutProps = {
  /**
   * Additional class names for the Layout component.
   */
  className?: string;

  /**
   * Child components to be rendered inside the Layout.
   */
  children?: ReactNode;
};

/**
 * Layout component that serves as the main structure for the application.
 *
 * @param {LayoutProps} props - Props for the Layout component.
 * @returns {JSX.Element} The rendered Layout component.
 */
export const Layout = ({
  className,
  children: _,
}: LayoutProps): JSX.Element => {
  const { user } = useAppSelector((state) => state.auth);
  const { currentPath, handleLogout } = useNavigation();
  const [drawerVisible, setDrawerVisible] = useState(false);

  // Detect if the screen size is small (less than 768px)
  const isSmallScreen = useMediaQuery({ maxWidth: 768 });

  /**
   * Toggles the visibility of the drawer.
   */
  const handleDrawerToggle = (): void => {
    setDrawerVisible(!drawerVisible);
  };

  /**
   * Dropdown menu for the user profile.
   */
  const profileMenu = (
    <Menu>
      <Menu.Item key="1">{user?.username}</Menu.Item>
      <Menu.Item key="2" onClick={handleLogout}>
        <LogoutOutlined /> Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <AntLayout className={`${styles['container']} ${className ?? ''}`}>
      {!isSmallScreen && (
        <Sider
          trigger={null}
          collapsible
          breakpoint="lg"
          collapsedWidth="0"
          theme="dark"
          className={styles['sider']}
          collapsed={!drawerVisible}
        >
          <ImageAtom
            src={logo}
            alt="Logo"
            preview={false}
            className={`${styles['logo']} ${styles['logoAnimation']}`}
          />
          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={[currentPath]}
            className={styles['menu']}
            items={[
              {
                key: '/',
                icon: <DashboardOutlined />,
                label: <Link to="/">Dashboard</Link>,
              },
              {
                key: '/menu',
                icon: <MenuOutlined />,
                label: <Link to="/menu">Menu Items</Link>,
              },
            ]}
          />
        </Sider>
      )}
      <AntLayout>
        <Header className={`${styles['header']} ${styles['headerCustom']}`}>
          {!isSmallScreen && (
            <MenuOutlined
              onClick={handleDrawerToggle}
              className={styles['menuIcon']}
            />
          )}
          <h1 className={styles['title']}>Taj Mahal Restaurant Admin</h1>
          <div className={styles['userSection']}>
            {isSmallScreen && (
              // Render menu links in the header for small screens
              <Menu
                theme="dark"
                mode="horizontal"
                selectedKeys={[currentPath]}
                className={styles['headerMenu']}
                items={[
                  {
                    key: '/',
                    icon: <DashboardOutlined />,
                    label: <Link to="/">Dashboard</Link>,
                  },
                  {
                    key: '/menu',
                    icon: <MenuOutlined />,
                    label: <Link to="/menu">Menu Items</Link>,
                  },
                ]}
              />
            )}
            <Dropdown overlay={profileMenu} trigger={['click']}>
              <Space>
                <Avatar src={'https://avatar.iran.liara.run/public/87'} />
                <span className={styles['username']}>
                  Welcome, {user?.username}
                </span>
                <DownOutlined />
              </Space>
            </Dropdown>
          </div>
        </Header>
        <Content className={styles['content']}>
          <Outlet />
        </Content>
      </AntLayout>
      <RightSidebar />
    </AntLayout>
  );
};
