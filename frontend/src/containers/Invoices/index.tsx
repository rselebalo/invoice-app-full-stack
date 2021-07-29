import React, { useContext, useEffect, useState } from 'react';
import { List, Space, Typography, Badge, Drawer, Menu } from 'antd';
import Button from '../../components/Buttons/default1';
import data from '../../utils/data.json';
import Container from '../../components/Container';
import ArrowDown from '../../assets/icon-arrow-down.svg';
import ArrowRight from '../../assets/icon-arrow-right.svg';
import ArrowLeft from '../../assets/icon-arrow-left.svg';
import { IInvoice } from '../../interfaces';
import { nanoid } from 'nanoid';
import { isEmpty } from 'lodash';
import InvoiceLineItem from '../../components/InvoiceLineItem';
import LineItemStatus from '../../components/InvoiceLineItem/status';
import Invoice from './invoice';
import { ThemeContext } from 'styled-components';
import EditInvoice from './edit';
import StyledDrawer from '../../components/Drawer';
import InvoiceWrapper from '../../components/InvoiceWrapper';

const Invoices: React.FC<any> = () => {
  const [showDetail, setShowDetail] = useState(false);
  const themeContext = useContext(ThemeContext);
  const [selectedTheme, setSelectedTheme] = useState(themeContext.themeMode);
  const [editInvoice, setEditInvoice] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<IInvoice>();
  const { Text, Title } = Typography;
  const { SubMenu } = Menu;
  const header = [{ title: 'Invoices', description: `There are ${data.length} total invoices` }];

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

  useEffect(() => {
    setSelectedTheme(themeContext.themeMode);
  }, [themeContext.themeMode]);

  return (
    <>
      <StyledDrawer
        //title={isEmpty(selectedInvoice) ? `Create Invoice` : `Edit #${selectedInvoice?.id}`}
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
                        Filter by status <img alt="down" src={ArrowDown} />
                      </Title>
                      <Button title="New Invoice" onClick={() => onOpenDrawer(undefined)} />
                    </Space>
                  </Container>
                }
              >
                <List.Item.Meta title={<Text>Invoices</Text>} description={`There are ${data.length} total invoices`} />
              </List.Item>
            )}
          />

          <div>
            {data.map((invoice: IInvoice) => (
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
        </InvoiceWrapper>
      )}
      {showDetail && (
        <InvoiceWrapper>
          <div onClick={() => setShowDetail(false)}>
            <Space>
              <img src={ArrowLeft} /> <Text> Go Back</Text>
            </Space>
          </div>
          <Invoice selected={selectedInvoice} onOpenDrawer={onOpenDrawer} onCloseDrawer={onCloseDrawer} />
        </InvoiceWrapper>
      )}
    </>
  );
};

export default Invoices;
