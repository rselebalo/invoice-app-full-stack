import React, { useEffect, useState } from 'react';
import { Form, Typography, Space } from 'antd';
import { IInvoice } from '../../interfaces';
import { isEmpty, isInteger, some } from 'lodash';
import localForage from 'localforage';
import Container from '../../components/Container';
import StyledLabel from '../../components/Label';
import DatePicker from '../../components/DatePicker';
import Button2 from '../../components/Buttons/default2';
import Button3 from '../../components/Buttons/default3';
import Input from '../../components/Input';
import Select from '../../components/Select';
import { DEFAULT_INVOICE, DRAFT_INVOICE_KEY } from '../../constants';
import { format } from 'date-fns';
import localforage from 'localforage';
import { openNotificationWithIcon } from '../../utils/funtions/notification';
import { saveInvoice } from '../../utils/funtions/saveInvoice';
import InvoiceItems from './invoiceItems';

const EditInvoice: React.FC<any> = ({ ...props }) => {
  const [form] = Form.useForm();
  const [invoice, setInvoice] = useState<IInvoice>(DEFAULT_INVOICE);
  const { Title, Text } = Typography;

  const onFinish = async (values: any) => {
    // validate fields
    const validation = validateFields();

    if (validation.result === 'success') {
      // set status to pending
      const finalInvoice = { ...invoice, status: 'pending' };
      await saveInvoice(finalInvoice);

      openNotificationWithIcon({ type: 'success', description: 'Invoice succesfully updated!!', message: 'Success' });
      props.onCloseDrawer();
    }
  };

  const onInvoiceItemChange = (event: React.ChangeEvent<any>, index: number) => {
    const target = event.target.name;
    let newTotal = 0;

    if (isEmpty(invoice.items)) {
      let item = { name: '', quantity: 0, price: 0, total: 0 };

      // if change is on price or qty - update total
      if (target === 'price') newTotal = item.quantity * Number(event.target.value);
      if (target === 'quantity') newTotal = item.price * Number(event.target.value);

      item = { ...item, [target]: event.target.value, total: newTotal };
      setInvoice({ ...invoice, items: [item], total: newTotal });
    } else {
      let item = invoice.items[index];

      // if change is on price or qty - update total
      if (target === 'price') newTotal = item.quantity * Number(event.target.value);
      if (target === 'quantity') newTotal = item.price * Number(event.target.value);

      item = { ...item, [target]: event.target.value, total: newTotal };
      let updatedItems = invoice.items;
      updatedItems[index] = item;

      let invoiceTotal = 0;
      updatedItems.map((x) => (invoiceTotal += x.total));
      setInvoice({ ...invoice, items: updatedItems, total: invoiceTotal });
    }
  };

  const validateFields = (): any => {
    //if no fields are empty - return result success
    if (!some(invoice, (x: any) => isEmpty(x) && !isInteger(x))) return { result: 'success' };

    openNotificationWithIcon({
      type: 'error',
      description: 'All fields are required',
      message: 'Error',
    });

    return { result: 'fail' };
  };

  const onChangeAdress = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const address = event.target.name.split('-');

    let updatedAddress: IInvoice['senderAddress'];

    if (address[0] === 'clientAddress') {
      updatedAddress = {
        ...invoice?.clientAddress,
        [address[1]]: event.target.value,
      };

      setInvoice({ ...invoice, clientAddress: updatedAddress });
    }
    if (address[0] === 'senderAddress') {
      updatedAddress = {
        ...invoice?.senderAddress,
        [address[1]]: event.target.value,
      };

      setInvoice({ ...invoice, senderAddress: updatedAddress });
    }
  };

  const onChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const state = { ...invoice, [event.target.name]: event.target.value };
    setInvoice(state);
  };

  useEffect(() => {
    localforage.getItem(DRAFT_INVOICE_KEY).then((result: any) => {
      if (!isEmpty(result)) {
        setInvoice(result);
      }
    });
  }, []);

  const onSaveAsDraft = async () => {
    await localForage.setItem(DRAFT_INVOICE_KEY, { ...invoice, status: 'draft' });
    openNotificationWithIcon({ type: 'success', description: 'Invoice succesfully updated!!', message: 'Success' });
    props.onCloseDrawer();
  };

  const onPaymentTermChange = (terms: number) => {
    const _date = new Date(invoice.paymentDue);

    let _paymentDue = new Date(_date.setDate(_date.getDate() + terms)).toISOString();
    _paymentDue = _paymentDue.substr(0, 10);

    const state = { ...invoice, paymentTerms: terms, paymentDue: _paymentDue };
    setInvoice(state);
  };

  const onDateChange = (value: Date | null) => {
    if (value) {
      const state = { ...invoice, createdAt: format(value, 'yyyy-MM-dd') };
      setInvoice(state);
    }
  };

  return (
    <>
      <Title level={4}>{isEmpty(invoice) ? `Create Invoice` : `Edit #${invoice?.id}`}</Title>

      <Form name="edit" onFinish={onFinish} form={form}>
        <StyledLabel>Bill From</StyledLabel>
        <>
          <Form.Item>
            <label>Street Adress</label>
            <Input
              size="large"
              name="senderAddress-street"
              placeholder="Enter street address"
              value={invoice?.senderAddress?.street}
              onChange={onChangeAdress}
            />
          </Form.Item>
          <Container>
            <Space>
              <Form.Item>
                <label>City</label>
                <Input
                  name="senderAddress-city"
                  size="large"
                  placeholder="Enter city"
                  value={invoice?.senderAddress?.city}
                  onChange={onChangeAdress}
                />
              </Form.Item>
              <Form.Item>
                <label>Postal Code</label>
                <Input
                  name="senderAddress-postCode"
                  size="large"
                  placeholder="Enter postal code"
                  value={invoice?.senderAddress?.postCode}
                  onChange={onChangeAdress}
                />
              </Form.Item>
              <Form.Item>
                <label>Country</label>
                <Input
                  name="senderAddress-country"
                  size="large"
                  placeholder="Enter country"
                  value={invoice?.senderAddress?.country}
                  onChange={onChangeAdress}
                />
              </Form.Item>
            </Space>
          </Container>
        </>

        <>
          <StyledLabel>Bill To</StyledLabel>
          <Form.Item>
            <label>{"Client's Name"}</label>
            <Input
              size="large"
              placeholder="Enter client's name"
              name="clientName"
              value={invoice?.clientName}
              onChange={onChange}
            />
          </Form.Item>
          <Form.Item>
            <label>{"Client's Email"}</label>
            <Input
              size="large"
              placeholder="Enter client's email address"
              name="clientEmail"
              value={invoice?.clientEmail}
              onChange={onChange}
            />
          </Form.Item>

          <Form.Item>
            <label>Street Address</label>
            <Input
              size="large"
              placeholder="Enter street address"
              name="clientAddress-street"
              value={invoice?.clientAddress?.street}
              onChange={onChangeAdress}
            />
          </Form.Item>
          <Container>
            <Space>
              <Form.Item>
                <label>City</label>
                <Input
                  name="clientAddress-city"
                  size="large"
                  placeholder="Enter city"
                  value={invoice?.clientAddress?.city}
                  onChange={onChangeAdress}
                />
              </Form.Item>
              <Form.Item>
                <label>Postal Code</label>
                <Input
                  name="clientAddress-postCode"
                  size="large"
                  placeholder="Enter postal code"
                  value={invoice?.clientAddress?.postCode}
                  onChange={onChangeAdress}
                />
              </Form.Item>
              <Form.Item>
                <label>Country</label>
                <Input
                  name="clientAddress-country"
                  size="large"
                  placeholder="Enter country"
                  value={invoice?.clientAddress?.country}
                  onChange={onChangeAdress}
                />
              </Form.Item>
            </Space>
          </Container>

          <br />
          <Container>
            <Space>
              <Form.Item>
                <label>Invoice Date</label>
                <DatePicker
                  size="large"
                  style={{ width: '100%' }}
                  name="createdAt"
                  placeholder="Select date"
                  value={invoice ? new Date(invoice?.createdAt) : new Date()}
                  onChange={onDateChange}
                />
              </Form.Item>
              <Form.Item>
                <label>Payment Terms</label>
                <Select
                  size="large"
                  placeholder="Select term"
                  value={invoice?.paymentTerms}
                  id="paymentTerms"
                  onChange={(e) => onPaymentTermChange(Number(e))}
                >
                  <Select.Option value={1}>Net 1 Day</Select.Option>
                  <Select.Option value={7}>Net 7 Days</Select.Option>
                  <Select.Option value={14}>Net 14 Days</Select.Option>
                  <Select.Option value={30}>Net 30 Days</Select.Option>
                </Select>
              </Form.Item>
            </Space>
          </Container>
          <Form.Item>
            <label>Project Description</label>
            <Input
              size="large"
              placeholder="Enter description"
              name="description"
              value={invoice?.description}
              onChange={onChange}
            />
          </Form.Item>

          <>
            <h3>Item List</h3>
            <br />
          </>

          <InvoiceItems invoice={invoice} onInvoiceItemChange={onInvoiceItemChange} />

          <div style={{ textAlign: 'right' }}>
            <Space>
              <Button3 title="Cancel" onClick={() => props.onCloseDrawer()} />
              <Button2 title="Save As Draft" onClick={onSaveAsDraft} />
              <Button2 title="Save $ Send" type="submit" />
            </Space>
          </div>
        </>
      </Form>
    </>
  );
};
export default EditInvoice;
