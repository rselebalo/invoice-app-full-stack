import React from 'react';
import { List, Typography, Divider } from 'antd';
import data from '../../utils/data.json'

const Invoices: React.FC<any> = () => {

    return <>
<List
      size="large"
      header={<div>Header</div>}
      footer={<div>Footer</div>}
      bordered
      dataSource={data}
      renderItem={item => <List.Item>
          {item.id}
          </List.Item>}
    />
    </>
} 

export default Invoices;