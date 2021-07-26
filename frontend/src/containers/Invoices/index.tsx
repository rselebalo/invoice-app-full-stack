import React, { useContext, useEffect, useState } from 'react';
import { List, Space, Typography, Badge } from 'antd';
import Button from '../../components/Buttons/default1';
import data from '../../utils/data.json';
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

const Invoices: React.FC<any> = () => {
  const [showDetail, setShowDetail] = useState(false);
  const themeContext = useContext(ThemeContext);
  const [selectedTheme, setSelectedTheme] = useState(themeContext.themeMode);
  const [selectedInvoice, setSelectedInvoice] = useState({});
  const { Text, Title } = Typography;
  const header = [{ title: 'Invoices', description: `There are ${data.length} total invoices` }];

  const handleShowDetails = (invoice: IInvoice) => {
    setShowDetail(true);
    setSelectedInvoice(invoice);
  };

  useEffect(() => {
    setSelectedTheme(themeContext.themeMode);
  }, [themeContext.themeMode]);

  return (
    <>
      {!showDetail && (
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
                <img src={ArrowRight} alt="" onClick={() => handleShowDetails(invoice)} />
              </InvoiceLineItem>
            ))}
          </div>
        </>
      )}
      {showDetail && (
        <div className="invoice-details-wrapper">
          <div onClick={() => setShowDetail(false)}>
            <Space>
              <img src={ArrowLeft} /> <Text> Go Back</Text>
            </Space>
          </div>
          <Invoice selected={selectedInvoice} />
        </div>
      )}
    </>
  );
};

export default Invoices;
