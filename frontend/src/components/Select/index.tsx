import styled from 'styled-components';
import { Select } from 'antd';

const StyledSelect = styled(Select)`
  background: ${(props) => props.theme.input.background};
  height: 45px;
  border-radius: 5px;
  '&:hover': {
  }
`;
export default StyledSelect;
