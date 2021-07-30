import React, { useEffect, useState } from 'react';
import { Space, Typography, Badge, notification } from 'antd';
import localForage from 'localforage';
import Button2 from '../../components/Buttons/default2';
import Button5 from '../../components/Buttons/default5';
import Button3 from '../../components/Buttons/default3';
import Container from '../../components/Container';
import Card from '../../components/Card';
import { IInvoice } from '../../interfaces';
import { nanoid } from 'nanoid';
import InvoiceLineItem from '../../components/InvoiceLineItem';
import LineItemStatus from '../../components/InvoiceLineItem/status';
import InformationPiece from '../../components/Card/containter';
import StyledTable from '../../components/Table';
import localforage from 'localforage';
import { DRAFT_INVOICE_KEY } from '../../constants';
import InvoiceWrapper from '../../components/InvoiceWrapper';
import ArrowLeft from '../../assets/icon-arrow-left.svg';
import { saveInvoice } from '../../utils/funtions/saveInvoice';
import StyledDrawer from '../../components/Drawer';
import EditInvoice from './edit';

const Invoice: React.FC<any> = ({ ...props }) => {
  const { Text, Title } = Typography;
  const [invoice, setInvoice] = useState<IInvoice>();
  const [mounted, setMounted] = useState(false);
  const [editInvoice, setEditInvoice] = useState(false);

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

  const onCloseDrawer = async () => {
    await localForage.removeItem(DRAFT_INVOICE_KEY);
    setEditInvoice(false);
  };

  const onOpenDrawer = async (invoice: IInvoice | undefined) => {
    await localForage.setItem(DRAFT_INVOICE_KEY, invoice);

    setEditInvoice(true);
  };

  const onMarkAsPaid = async () => {
    const selectedInvoice = await localForage.getItem(DRAFT_INVOICE_KEY);
    //@ts-ignore
    const result = await saveInvoice({ ...selectedInvoice, status: 'paid' });

    if (result === 'success') {
      openNotificationWithIcon('Invoice succesfully updated!!');
    }

    await localForage.removeItem(DRAFT_INVOICE_KEY);
  };

  const openNotificationWithIcon = (message: string) => {
    notification['success']({
      message: 'Success',
      description: message,
    });
  };

  useEffect(() => {
    console.log(props);
    localforage.getItem(DRAFT_INVOICE_KEY).then((result: any) => {
      setInvoice(result);
    });
    setMounted(true);
  }, []);

  return (
    <>
      <StyledDrawer
        placement="left"
        closable={false}
        onClose={onCloseDrawer}
        visible={editInvoice}
        getContainer={false}
        style={{ position: 'absolute' }}
      >
        <EditInvoice onCloseDrawer={onCloseDrawer} />
      </StyledDrawer>

      <InvoiceWrapper>
        <div onClick={() => window.location.replace('/')}>
          <Space>
            <img src={ArrowLeft} /> <Text> Go Back</Text>
          </Space>
        </div>

        <InvoiceLineItem key={nanoid()}>
          <Space>
            <Title level={5} style={{ paddingTop: 5 }}>
              Status
            </Title>
            <LineItemStatus status={invoice?.status || 'draft'}>
              <Badge
                status={invoice?.status === 'paid' ? 'success' : invoice?.status === 'pending' ? 'warning' : 'error'}
                text={invoice?.status}
              />
            </LineItemStatus>
          </Space>

          <Container>
            <Space>
              <Button3 title="Edit" onClick={() => onOpenDrawer(invoice)} />
              <Button5 title="Delete" />
              <Button2 title="Mark as Paid" onClick={() => onMarkAsPaid()} disabled={invoice?.status === 'paid'} />
            </Space>
          </Container>
        </InvoiceLineItem>

        <Card>
          <InformationPiece>
            <div>
              <Title level={5}>#{invoice?.id}</Title>
              <Text>{invoice?.description}</Text>
            </div>
            <div>
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
            <StyledTable
              columns={columns}
              dataSource={invoice?.items}
              size="middle"
              pagination={false}
              footer={footer}
            />
          </InformationPiece>
        </Card>
      </InvoiceWrapper>
    </>
  );
};

export default Invoice;
