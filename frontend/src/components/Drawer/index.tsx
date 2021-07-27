import styled from 'styled-components';
import { Drawer } from 'antd';

const StyledDrawer = styled(Drawer)`
  &.ant-drawer-left.ant-drawer-open .ant-drawer-content-wrapper {
    width: 40vw !important;
    left: 90px;
    overflow-y: auto;
  }
  &.ant-drawer .ant-drawer-content {
    border-radius: 0 6px 6px;
    color: ${(props) => props.theme.drawer.color};
    background-color: ${(props) => props.theme.drawer.background};
  }
  &.ant-drawer-content-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    justify-items: center;
    padding: 15px 20px;
  }
`;
export default StyledDrawer;
