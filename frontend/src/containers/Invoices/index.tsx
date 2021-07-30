import React, { useContext, useEffect, useState } from 'react';
import { List, Space, Typography, Badge, notification, Menu, Popover } from 'antd';
import Button from '../../components/Buttons/default1';
import Container from '../../components/Container';
import ArrowDown from '../../assets/icon-arrow-down.svg';
import ArrowRight from '../../assets/icon-arrow-right.svg';
import ArrowLeft from '../../assets/icon-arrow-left.svg';
import { IInvoice } from '../../interfaces';
import { nanoid } from 'nanoid';
import InvoiceLineItem from '../../components/InvoiceLineItem';
import LineItemStatus from '../../components/InvoiceLineItem/status';
import Invoice from './invoice';
import { ThemeContext } from 'styled-components';
import EditInvoice from './edit';
import StyledDrawer from '../../components/Drawer';
import InvoiceWrapper from '../../components/InvoiceWrapper';
import { getInvoices } from '../../utils/funtions/getInvoices';
import { saveInvoice } from '../../utils/funtions/saveInvoice';
import { isEmpty } from 'lodash';
import EmptyState from '../../components/EmptyState';
import { getInvoicesByStatus } from '../../utils/funtions/getInvoicesByStatus';

const Invoices: React.FC<any> = () => {
  const [showDetail, setShowDetail] = useState(false);
  const themeContext = useContext(ThemeContext);
  const [selectedTheme, setSelectedTheme] = useState(themeContext.themeMode);
  const [editInvoice, setEditInvoice] = useState(false);
  const [invoiceData, setInvoiceData] = useState<IInvoice[]>([]);
  const [selectedInvoice, setSelectedInvoice] = useState<IInvoice>();
  const { Text, Title } = Typography;
  const { SubMenu } = Menu;
  const header = [{ title: 'Invoices', description: `There are ${invoiceData.length} total invoices` }];

  const handleShowDetails = (invoice: IInvoice) => {
    setShowDetail(true);
    setSelectedInvoice(invoice);
  };

  const onCloseDrawer = () => {
    setSelectedInvoice(undefined);
    setEditInvoice(false);
  };

  const onOpenDrawer = (invoice: IInvoice | undefined) => {
    setSelectedInvoice(invoice);
    setEditInvoice(true);
  };

  const onMarkAsPaid = async () => {
    //@ts-ignore
    const result = await saveInvoice({ ...selectedInvoice, status: 'paid' });

    if (result === 'success') {
      openNotificationWithIcon('Invoice succesfully updated!!');
      setShowDetail(false);
      const updated = await getInvoices();
      setInvoiceData(updated);
    }
  };

  const openNotificationWithIcon = (message: string) => {
    notification['success']({
      message: 'Success',
      description: message,
    });
  };

  const onFilterInvoices = async (status: string) => {
    const resullt = await getInvoicesByStatus(status);
    setInvoiceData(resullt);
  };

  const content = (
    <Menu style={{ width: 146 }} mode="inline" title="Filter by status">
      <Menu.Item key="1" onClick={() => onFilterInvoices('pending')}>
        Pending
      </Menu.Item>
      <Menu.Item key="2" onClick={() => onFilterInvoices('paid')}>
        Paid
      </Menu.Item>
      <Menu.Item key="3" onClick={() => onFilterInvoices('draft')}>
        Draft
      </Menu.Item>
    </Menu>
  );

  useEffect(() => {
    setSelectedTheme(themeContext.themeMode);
  }, [themeContext.themeMode]);

  useEffect(() => {
    console.log(process.env);
    getInvoices().then((result) => setInvoiceData(result));
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
        <EditInvoice selectedInvoice={selectedInvoice} onCloseDrawer={onCloseDrawer} />
      </StyledDrawer>

      {!showDetail && (
        <InvoiceWrapper>
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
                        Filter by status{' '}
                        <Popover placement="bottom" content={content} trigger="click">
                          <img alt="down" src={ArrowDown} />
                        </Popover>
                      </Title>
                      <Button title="New Invoice" onClick={() => onOpenDrawer(undefined)} />
                    </Space>
                  </Container>
                }
              >
                <List.Item.Meta
                  title={<Text>Invoices</Text>}
                  description={`There are ${invoiceData.length} total invoices`}
                />
              </List.Item>
            )}
          />

          {!isEmpty(invoiceData) ? (
            <div>
              {invoiceData.map((invoice: IInvoice) => (
                <InvoiceLineItem key={nanoid()}>
                  <Text>#{invoice.id}</Text>
                  <Text>Due {invoice.paymentDue}</Text>
                  <Text>{invoice.clientName}</Text>
                  <Text>£{invoice.total}</Text>
                  <LineItemStatus status={invoice.status}>
                    <Badge
                      status={
                        invoice.status === 'paid' ? 'success' : invoice.status === 'pending' ? 'warning' : 'error'
                      }
                      text={invoice.status}
                    />
                  </LineItemStatus>
                  <Menu style={{ width: 45 }} mode="vertical">
                    <SubMenu key="sub1">
                      <Menu.Item key="1" onClick={() => handleShowDetails(invoice)}>
                        View
                      </Menu.Item>
                      <Menu.Item key="2" onClick={() => onOpenDrawer(invoice)}>
                        Edit
                      </Menu.Item>
                    </SubMenu>
                  </Menu>
                </InvoiceLineItem>
              ))}
            </div>
          ) : (
            <EmptyState />
          )}
        </InvoiceWrapper>
      )}

      {showDetail && (
        <InvoiceWrapper>
          <div onClick={() => setShowDetail(false)}>
            <Space>
              <img src={ArrowLeft} /> <Text> Go Back</Text>
            </Space>
          </div>
          <Invoice
            selected={selectedInvoice}
            onOpenDrawer={onOpenDrawer}
            onCloseDrawer={onCloseDrawer}
            onMarkAsPaid={onMarkAsPaid}
          />
        </InvoiceWrapper>
      )}
    </>
  );
};

export default Invoices;
