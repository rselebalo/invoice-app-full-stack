import React from 'react';
import { Result, Button } from 'antd';
import { Link } from 'react-router-dom';

export const PageNotFound: React.FC<any> = () => (
  <Result
    status="404"
    title="404"
    subTitle="Sorry, the page you visited does not exist."
    extra={
      <Button type="primary">
        <Link to="/">Back Home</Link>
      </Button>
    }
  />
);
