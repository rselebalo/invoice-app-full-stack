import styled from 'styled-components';

export interface InvoiceStatusProps {
  status: string;
  theme: any;
}

const LineItemStatus = styled.div<InvoiceStatusProps>`
  height: 40px;
  width: 120px;
  text-align: center;
  padding-top: 11px;
  background: ${(props) => (props.status === 'paid' ? '#84d78473' : '#fcc65cd9')};
  color: ${(props) => (props.status === 'paid' ? '#52c41a' : '#e5b340e8')};

  border-radius: 7px;
`;

export default LineItemStatus;
