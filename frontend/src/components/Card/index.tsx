import styled from 'styled-components';

const Holder = styled.div`
  border-radius: 8px;
  color: ${(props) => props.theme.card.color};
  background-color: ${(props) => props.theme.card.background};
`;
export default Holder;
