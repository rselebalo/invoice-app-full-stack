import React from 'react';
import styled from 'styled-components';
import { Button } from 'antd';

const StyledButton = styled(Button)`
  width: 140px;
  height: 40px;
  text-align: center;
  border-radius: 24px;
  font-weight: 700;
  padding: 5px;

  :hover {
    color: ${(props) => props.theme.button2.default.color};
    background-color: ${(props) => props.theme.button2.default.background};
  }
  color: ${(props) => props.theme.button2.default.color};
  background-color: ${(props) => props.theme.button2.default.background};
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

const DefaultButton = ({
  title,
  type,
  onClick,
}: {
  title: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: React.EventHandler<any>;
}) => {
  return (
    <StyledButton htmlType={type || 'button'} onClick={onClick}>
      {title}
    </StyledButton>
  );
};
export default DefaultButton;
