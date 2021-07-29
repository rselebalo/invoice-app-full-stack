import React from 'react';
import styled from 'styled-components';
import Plus from '../../assets/icon-plus.svg';

const Button = styled.div`
  width: 80px;
  height: 40px;
  text-align: center;
  border-radius: 24px;
  font-weight: 700;
  padding: 10px;

  color: ${(props) => props.theme.button3.default.color};
  background-color: ${(props) => props.theme.button3.default.background};
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
  onClick,
}: {
  title: string;
  onClick?: React.MouseEventHandler<HTMLDivElement> | undefined;
}) => {
  return <Button onClick={onClick}>{title}</Button>;
};
export default DefaultButton;
