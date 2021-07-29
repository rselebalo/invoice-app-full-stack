import styled from 'styled-components';
import { Select } from 'antd';

const StyledSelect = styled(Select)`
  &.ant-select-single.ant-select-lg:not(.ant-select-customize-input) .ant-select-selector {
    background: ${(props) => props.theme.input.background};
    height: 45px;
    border-radius: 5px;
    '&:hover': {
    }
  }
`;
export default StyledSelect;
