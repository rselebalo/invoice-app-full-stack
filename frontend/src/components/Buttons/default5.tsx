import React from 'react';
import styled from 'styled-components';
import { Button } from 'antd';

const StyledButton = styled(Button)`
  width: 110px;
  height: 40px;
  text-align: center;
  border-radius: 24px;
  font-weight: 700;
  padding: 10px;

  :hover {
    color: ${(props) => props.theme.button1.default.color};
    background-color: ${(props) => props.theme.button1.default.background};
  }
  color: ${(props) => props.theme.button5.default.color};
  background-color: ${(props) => props.theme.button5.default.background};
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
  return <StyledButton>{title}</StyledButton>;
};
export default DefaultButton;
