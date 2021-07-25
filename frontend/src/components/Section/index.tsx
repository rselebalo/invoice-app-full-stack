import styled from 'styled-components';

const Section = styled.section`
  display: flex;
  min-height: 100vh;
  background: ${(props) => props.theme.body};
`;
export default Section;
