import React from 'react';
import { List, Space, Typography, Badge } from 'antd';
import Button from '../../components/Buttons/default1';
import data from '../../utils/data.json';
import Container from '../../components/Container';
import ArrowDown from '../../assets/icon-arrow-down.svg';
import ArrowUp from '../../assets/icon-arrow-up.svg';
import ArrowRight from '../../assets/icon-arrow-right.svg';
import { Invoice } from '../../interfaces';
import { nanoid } from 'nanoid';
import InvoiceLineItem from '../../components/InvoiceLineItem';
import LineItemStatus from '../../components/InvoiceLineItem/status';

const Invoices: React.FC<any> = () => {
  const { Text, Title } = Typography;
  const header = [{ title: 'Invoices', description: `There are ${data.length} total invoices` }];

  return (
    <>
      <List
        size="large"
        bordered
        dataSource={header}
        renderItem={(item) => (
          <List.Item
            extra={
              <Container>
                <Space>
                  <Title level={5}>
                    Filter by status <img alt="down" src={ArrowDown} />
                  </Title>
                  <Button title="New Invoice" />
                </Space>
              </Container>
            }
          >
            <List.Item.Meta
              title={<Title level={2}>Invoices</Title>}
              description={`There are ${data.length} total invoices`}
            />
          </List.Item>
        )}
      />

      <div>
        {data.map((invoice: Invoice) => (
          <InvoiceLineItem key={nanoid()}>
            <Text>#{invoice.id}</Text>
            <Text>Due {invoice.paymentDue}</Text>
            <Text>{invoice.clientName}</Text>
            <Text>£{invoice.total}</Text>
            <LineItemStatus status={invoice.status}>
              <Badge
                status={invoice.status === 'paid' ? 'success' : invoice.status === 'pending' ? 'warning' : 'error'}
                text={invoice.status}
              />
            </LineItemStatus>
            <img src={ArrowRight} alt="" />
          </InvoiceLineItem>
        ))}
      </div>
    </>
  );
};

export default Invoices;
