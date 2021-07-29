import styled from 'styled-components';
import { Input } from 'antd';

const StyledInput = styled(Input)`
  background: ${(props) => props.theme.input.background};
  height: 45px;
  border-radius: 5px;
  '&:hover': {
  }
`;
export default StyledInput;
