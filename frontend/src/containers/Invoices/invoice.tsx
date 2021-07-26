import React, { useState, useEffect, useContext } from 'react';
import { Table, Space, Typography, Badge } from 'antd';
import Button2 from '../../components/Buttons/default2';
import Button5 from '../../components/Buttons/default5';
import Button3 from '../../components/Buttons/default3';
import data from '../../utils/data.json';
import Container from '../../components/Container';
import Card from '../../components/Card';
import ArrowLeft from '../../assets/icon-arrow-left.svg';
import { IInvoice } from '../../interfaces';
import { nanoid } from 'nanoid';
import InvoiceLineItem from '../../components/InvoiceLineItem';
import LineItemStatus from '../../components/InvoiceLineItem/status';
import InformationPiece from '../../components/Card/containter';
import { ThemeContext } from '../../contexts';

const Invoice: React.FC<any> = ({ ...props }) => {
  const { Text, Title } = Typography;
  const themeContext = useContext(ThemeContext);
  const [selectedTheme, setSelectedTheme] = useState(themeContext.themeMode);
  const [invoice, setInvoice] = useState<IInvoice>(props.selected);
  const footer = () => (
    <Container>
      <Title level={5}>Amount Due: </Title> <Title level={5}>{invoice?.total}</Title>
    </Container>
  );
  const columns = [
    {
      title: 'Item Name',
      dataIndex: 'name',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
    },
    {
      title: 'Price',
      dataIndex: 'price',
    },
    {
      title: 'Total',
      dataIndex: 'total',
    },
  ];

  useEffect(() => {
    setSelectedTheme(themeContext.themeMode);
  }, [themeContext.themeMode]);

  return (
    <>
      <InvoiceLineItem key={nanoid()}>
        <Space>
          <Title level={5}>Status</Title>
          <LineItemStatus status={invoice?.status || 'draft'}>
            <Badge
              status={invoice?.status === 'paid' ? 'success' : invoice?.status === 'pending' ? 'warning' : 'error'}
              text={invoice?.status}
            />
          </LineItemStatus>
        </Space>

        <Container>
          <Button3 title="Edit" />;
          <Button5 title="Delete" />;
          <Button2 title="Mark as Paid" />
        </Container>
      </InvoiceLineItem>

      <Card>
        <InformationPiece>
          <div>
            <Title level={5}>#{invoice?.id}</Title>
            <Text>{invoice?.description}</Text>
          </div>
          <div className="">
            <Text>{invoice?.senderAddress.street}</Text>
            <br />
            <Text>{invoice?.senderAddress.city}</Text>
            <br />
            <Text>{invoice?.senderAddress.postCode}</Text>
            <br />
            <Text>{invoice?.senderAddress.country}</Text>
          </div>
        </InformationPiece>

        <InformationPiece>
          <div>
            <Text>Invoice Date</Text>
            <Title level={5}>{invoice?.createdAt}</Title>
            <br />
            <Text>Payment Due</Text>
            <Title level={5}>{invoice?.paymentDue}</Title>
          </div>
          <div>
            <Text>Bill To</Text>
            <Title level={5}>{invoice?.clientName}</Title>
            <br />
            <Text>{invoice?.clientAddress.street}</Text>
            <br />
            <Text>{invoice?.clientAddress.city}</Text>
            <br />
            <Text>{invoice?.clientAddress.postCode}</Text>
            <br />
            <Text>{invoice?.clientAddress.country}</Text>
          </div>

          <div>
            <Text>Send To</Text>
            <Title level={5}>{invoice?.clientEmail}</Title>
          </div>
        </InformationPiece>
        <InformationPiece>
          <Table columns={columns} dataSource={invoice?.items} size="middle" pagination={false} footer={footer} />
        </InformationPiece>
      </Card>
    </>
  );
};

export default Invoice;
