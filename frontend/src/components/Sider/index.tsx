import styled from 'styled-components';
import { Layout } from 'antd';

const { Sider } = Layout;

const StyledSider = styled(Sider)`
  &.layout-sider {
    background: ${(props) => props.theme.sider.background};
    border-radius: 0 6px 6px;
  }
`;
export default StyledSider;
