import React, { useContext, useState } from 'react';
import { Layout, Avatar, Divider } from 'antd';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import ImgAvatar from '../../assets/image-avatar.jpg';
import Logo from '../../assets/logo.svg';
import Sun from '../../assets/icon-sun.svg';
import Moon from '../../assets/icon-moon.svg';
import { ROUTES } from '../../navigation/routes';
import { ThemeContext } from '../../contexts';
import Main from '../../components/Main';
import Section from '../../components/Section';

const { Sider } = Layout;

const LayoutComponent: React.FC<any> = () => {
  const themeContext = useContext(ThemeContext);
  const [selectedTheme, setSelectedTheme] = useState(themeContext.themeMode);

  const handleToggleTheme = () => {
    if (themeContext.themeMode === 'light') {
      themeContext.themeMode = 'dark';
      setSelectedTheme('dark');
    } else {
      themeContext.themeMode = 'light';
      setSelectedTheme('light');
    }
  };

  return (
    <Section>
      <Sider width={90} className="layout-sider">
        <div className="logo">
          <img alt="logo" src={Logo} />
        </div>

        <div className="theme-selector" onClick={handleToggleTheme}>
          <img alt="theme" src={themeContext.themeMode === 'light' ? Moon : Sun} />
        </div>

        <Divider className="sider-divider" />
        <div className="avatar-container">
          <Avatar size={45} icon={<img alt="logo" src={ImgAvatar} />} />
        </div>
      </Sider>

      <Layout className="site-layout">
        <Main>
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
        </Main>
      </Layout>
    </Section>
  );
};

export default LayoutComponent;
