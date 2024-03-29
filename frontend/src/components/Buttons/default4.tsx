import React from 'react';
import styled from 'styled-components';
import Plus from '../../assets/icon-plus.svg';
import { Button } from 'antd';

const StyledButton = styled(Button)`
  width: 180px;
  height: 45px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  justify-items: center;
  border-radius: 24px;
  font-weight: 700;
  padding: 5px 30px 10px 10px;

  :hover {
    color: ${(props) => props.theme.button1.default.color};
    background-color: ${(props) => props.theme.button1.default.background};
  }
  color: ${(props) => props.theme.button1.default.color};
  background-color: ${(props) => props.theme.button1.default.background};
  div {
    width: 30px;
    height: 30px;
    background: white;
    border-radius: 40px;
    text-align: center;
    img {
      position: relative;
      top: 3px;
      height: 13px;
    }
  }
`;

const DefaultButton = ({ title }: { title: string }) => {
  return (
    <StyledButton>
      <div>
        <img src={Plus} />
      </div>
      {title}
    </StyledButton>
  );
};
export default DefaultButton;
