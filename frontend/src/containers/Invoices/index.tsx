import React, { useContext, useEffect, useState } from 'react';
import { List, Space, Typography, Badge, Menu, Popover } from 'antd';
import localForage from 'localforage';
import Button from '../../components/Buttons/default1';
import Container from '../../components/Container';
import ArrowDown from '../../assets/icon-arrow-down.svg';
import { IInvoice } from '../../interfaces';
import { nanoid } from 'nanoid';
import InvoiceLineItem from '../../components/InvoiceLineItem';
import LineItemStatus from '../../components/InvoiceLineItem/status';
import { ThemeContext } from 'styled-components';
import EditInvoice from './edit';
import StyledDrawer from '../../components/Drawer';
import InvoiceWrapper from '../../components/InvoiceWrapper';
import { getInvoices } from '../../utils/funtions/getInvoices';
import { isEmpty } from 'lodash';
import EmptyState from '../../components/EmptyState';
import { getInvoicesByStatus } from '../../utils/funtions/getInvoicesByStatus';
import { DEFAULT_INVOICE, DRAFT_INVOICE_KEY } from '../../constants';
import localforage from 'localforage';

const Invoices: React.FC<any> = () => {
  const themeContext = useContext(ThemeContext);
  const [selectedTheme, setSelectedTheme] = useState(themeContext.themeMode);
  const [editInvoice, setEditInvoice] = useState(false);
  const [invoiceData, setInvoiceData] = useState<IInvoice[]>([]);
  const { Text, Title } = Typography;
  const { SubMenu } = Menu;
  const header = [{ title: 'Invoices', description: `There are ${invoiceData.length} total invoices` }];

  const handleShowDetails = async (action: string, invoice: IInvoice) => {
    await localForage.setItem(DRAFT_INVOICE_KEY, invoice);

    if (action === 'view') window.location.replace('/invoice');
    else setEditInvoice(true);
  };

  const onCloseDrawer = async () => {
    updateInvoiceList();
    setEditInvoice(false);
  };

  const onAddNewInvoice = async () => {
    await localForage.setItem(DRAFT_INVOICE_KEY, DEFAULT_INVOICE);

    setEditInvoice(true);
  };

  const updateInvoiceList = async () => {
    // check if there is invoice on localForage
    const localData: any = await localforage.getItem(DRAFT_INVOICE_KEY);
    const apiDataList = await getInvoices();

    //replace api invoice with matching on in localforage
    if (!isEmpty(localData)) {
      let newList: IInvoice[] = [];
      // if invoice is new and was only stored in localforage - add to list
      apiDataList.map((apiData: IInvoice) => {
        if (apiData.id === localData.id) {
          apiData = localData;
        }
        newList.push(apiData);
      });
      setInvoiceData(newList);
    } else setInvoiceData(apiDataList);
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
    updateInvoiceList();
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
        <EditInvoice key={nanoid()} onCloseDrawer={onCloseDrawer} />
      </StyledDrawer>
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
                    <Button title="New Invoice" onClick={onAddNewInvoice} />
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
                    status={invoice.status === 'paid' ? 'success' : invoice.status === 'pending' ? 'warning' : 'error'}
                    text={invoice.status}
                  />
                </LineItemStatus>
                <Menu style={{ width: 45 }} mode="vertical">
                  <SubMenu key="sub1">
                    <Menu.Item key="1" onClick={() => handleShowDetails('view', invoice)}>
                      View
                    </Menu.Item>
                    <Menu.Item key="2" onClick={() => handleShowDetails('edit', invoice)}>
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
    </>
  );
};

export default Invoices;
