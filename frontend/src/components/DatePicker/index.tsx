import dateFnsGenerateConfig from 'rc-picker/lib/generate/dateFns';
import generatePicker from 'antd/es/date-picker/generatePicker';
import 'antd/es/date-picker/style/index';
import styled from 'styled-components';

const DatePicker = generatePicker<Date>(dateFnsGenerateConfig);

const StyledDatePicker = styled(DatePicker)`
  background: ${(props) => props.theme.input.background};
  height: 45px;
  border-radius: 5px;
  '&:hover': {
  }
`;
export default StyledDatePicker;
