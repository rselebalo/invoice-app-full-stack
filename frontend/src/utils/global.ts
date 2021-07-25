import { createGlobalStyle } from 'styled-components';

interface ThemeType {
  body: string;
  text: string;
}

export const GlobalStyles = createGlobalStyle<{ theme: ThemeType }>`
 @import '~antd/dist/antd.css';  
*,
  *::after,
  *::before {
    box-sizing: border-box;
  }
  body {
    height: 100vh;
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
  }
  
 

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
}

.layout-sider {
  background: hsl(233, 30%, 21%);
  border-radius: 0 6px 6px;
}
.ant-layout-sider-children {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
.sider-divider {
  background: hsl(233, 37%, 63%);
  position: absolute;
  bottom: 58px;
  width: 90px;
}
.avatar-container {
  height: 60px;
}
.logo {
  height: 80px;
  width: 90%;
  border-radius: 0 10px 10px 0;
  background: hsl(252, 94%, 67%);
  display: flex;
  justify-items: center;
  align-items: center;
  justify-content: center;
}
.theme-selector {
  position: absolute;
  bottom: 105px;
}

`;
