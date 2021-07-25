import React from 'react';
import { Layout, Avatar, Divider } from 'antd';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import ImgAvatar from '../../assets/image-avatar.jpg';
import Logo from '../../assets/logo.svg';
import { ROUTES } from '../../navigation/routes';

const { Header, Content, Footer, Sider } = Layout;

const LayoutComponent: React.FC<any> = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider width={90} className="layout-sider">
        <div className="logo">
          <img alt="logo" src={Logo} />
        </div>

        <Divider className="sider-divider" />
        <div className="avatar-container">
          <Avatar size={45} icon={<img alt="logo" src={ImgAvatar} />} />
        </div>
      </Sider>

      <Layout className="site-layout">
        <Content className="content-wrapper">
          <Switch>
            {ROUTES.map((route, idx) => {
              return route.component ? (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  render={(props) => <route.component {...props} />}
                />
              ) : null;
            })}
          </Switch>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  );
};

export default LayoutComponent;
