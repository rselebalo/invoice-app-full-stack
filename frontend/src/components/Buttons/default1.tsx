import { Button } from 'antd';
import React from 'react';
import styled from 'styled-components';
import Plus from '../../assets/icon-plus.svg';

const StyledButton = styled(Button)`
  width: 180px;
  height: 45px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  justify-items: center;
  border-radius: 24px;
  font-weight: 700;
  padding: 10px 30px 10px 10px;

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

const DefaultButton = ({
  title,
  onClick,
}: {
  title: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
}) => {
  return (
    <StyledButton onClick={onClick}>
      <div>
        <img src={Plus} />
      </div>
      {title}
    </StyledButton>
  );
};
export default DefaultButton;
