import React from 'react';
import styled from 'styled-components';
import Plus from '../../assets/icon-plus.svg';

const Button = styled.div`
  width: 140px;
  height: 45px;
  text-align: center;
  border-radius: 24px;
  font-weight: 700;
  padding: 10px;

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

const DefaultButton = ({ title }: { title: string }) => {
  return <Button>{title}</Button>;
};
export default DefaultButton;
