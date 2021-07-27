import styled from 'styled-components';
import { Table } from 'antd';

const StyledTable = styled(Table)`
  &.ant-table-wrapper {
    width: 90%;
    position: relative;
    left: 5%;
    color: ${(props) => props.theme.drawer.color};
    background-color: ${(props) => props.theme.drawer.background};
  }
`;
export default StyledTable;
