import React from 'react';
import styled from 'styled-components';
import Empty from '../../assets/illustration-empty.svg';
const StyledEmpty = styled.div`
  top: 30px;
  position: relative;
  display: flex;
  flex-direction: column;
  height: 60vh;
  align-items: center;
  justify-content: center;
`;

const EmptyState: React.FC<any> = () => {
  return (
    <StyledEmpty>
      <img src={Empty} alt="Empty" />
      <h3>There is nothing here</h3>
    </StyledEmpty>
  );
};
export default EmptyState;
