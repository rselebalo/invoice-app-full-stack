import styled from 'styled-components';

const LineItem = styled.div`
  height: 65px;
  color: ${(props) => props.theme.invoiceLineItem.color};
  background-color: ${(props) => props.theme.invoiceLineItem.background};
  margin: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  justify-items: center;
  border-radius: 8px;
  padding: 10px;
`;
export default LineItem;
