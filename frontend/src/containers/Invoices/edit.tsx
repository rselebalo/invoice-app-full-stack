import React, { useEffect, useState } from 'react';
import { Form, Typography, Space } from 'antd';
import { IInvoice } from '../../interfaces';
import { PlusOutlined } from '@ant-design/icons';
import { isEmpty } from 'lodash';
import localForage from 'localforage';
import Container from '../../components/Container';
import StyledLabel from '../../components/Label';
import DatePicker from '../../components/DatePicker';
import Button2 from '../../components/Buttons/default2';
import Button3 from '../../components/Buttons/default3';
import NewItemButton from '../../components/Buttons/newItem';
import DeleteIcon from '../../assets/icon-delete.svg';
import StyleDeleteIcon from '../../components/DeleteIcon';
import Input from '../../components/Input';
import Select from '../../components/Select';
import { DEFAULT_INVOICE, DRAFT_INVOICE_KEY } from '../../constants';
import { format } from 'date-fns';
import localforage from 'localforage';

const EditInvoice: React.FC<any> = ({ ...props }) => {
  const [form] = Form.useForm();
  const [invoice, setInvoice] = useState<IInvoice>(DEFAULT_INVOICE);
  const [mounted, setMounted] = useState(false);
  //const [editAsDraft, setEditAsDraft] = useState(false);
  const { Title, Text } = Typography;
  const items = invoice?.items;

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
    if (props.editAsDraft) {
      return localForage.setItem(DRAFT_INVOICE_KEY, invoice);
    }
  };

  const validateFields = (rule: any, value: any, callback: CallableFunction) => {
    // validate email address
    //@ts-ignore
    const _value = invoice[field];
    console.log(rule, value);
    if (isEmpty(_value)) {
      callback('This value is required');
    } else {
      callback();
    }
  };

  const onChangeAdress = (event: React.ChangeEvent<HTMLInputElement>) => {
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

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const state = { ...invoice, [event.target.name]: event.target.value };
    setInvoice(state);
  };

  useEffect(() => {
    localforage.getItem(DRAFT_INVOICE_KEY).then((result: any) => {
      if (!isEmpty(result)) {
        setInvoice(result);
        //setMounted(true);
      }
    });
  }, [props]);

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
          <Form.Item name="senderAddress-street" rules={[{ validator: validateFields }]}>
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
              <Form.Item name="senderAddress-city" rules={[{ validator: validateFields }]}>
                <label>City</label>
                <Input
                  name="senderAddress-city"
                  size="large"
                  placeholder="Enter city"
                  value={invoice?.senderAddress?.city}
                  onChange={onChangeAdress}
                />
              </Form.Item>
              <Form.Item name="senderAddress-city" rules={[{ validator: validateFields }]}>
                <label>Postal Code</label>
                <Input
                  name="senderAddress-postCode"
                  size="large"
                  placeholder="Enter postal code"
                  value={invoice?.senderAddress?.postCode}
                  onChange={onChangeAdress}
                />
              </Form.Item>
              <Form.Item name="senderAddress-country" rules={[{ validator: validateFields }]}>
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
          <Form.Item name="clientName" rules={[{ validator: validateFields }]}>
            <label>{"Client's Name"}</label>
            <Input
              size="large"
              placeholder="Enter client's name"
              name="clientName"
              value={invoice?.clientName}
              onChange={onChange}
            />
          </Form.Item>
          <Form.Item name="clientEmail" rules={[{ validator: validateFields }]}>
            <label>{"Client's Email"}</label>
            <Input
              size="large"
              placeholder="Enter client's email address"
              name="clientEmail"
              value={invoice?.clientEmail}
              onChange={onChange}
            />
          </Form.Item>

          <Form.Item name="clientAddress-street" rules={[{ validator: validateFields }]}>
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
              <Form.Item name="clientAddress-city" rules={[{ validator: validateFields }]}>
                <label>City</label>
                <Input
                  name="clientAddress-city"
                  size="large"
                  placeholder="Enter city"
                  value={invoice?.clientAddress?.city}
                  onChange={onChangeAdress}
                />
              </Form.Item>
              <Form.Item name="clientAddress-postCode" rules={[{ validator: validateFields }]}>
                <label>Postal Code</label>
                <Input
                  name="clientAddress-postCode"
                  size="large"
                  placeholder="Enter postal code"
                  value={invoice?.clientAddress?.postCode}
                  onChange={onChangeAdress}
                />
              </Form.Item>
              <Form.Item name="clientAddress-country" rules={[{ validator: validateFields }]}>
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
              <Form.Item name="createdAt" rules={[{ validator: validateFields }]}>
                <label>Invoice Date</label>
                <DatePicker
                  size="large"
                  name="createdAt"
                  placeholder="Select date"
                  value={invoice ? new Date(invoice?.createdAt) : new Date()}
                  onChange={onDateChange}
                />
              </Form.Item>
              <Form.Item name="paymentTerms" rules={[{ validator: validateFields }]}>
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
          <Form.Item rules={[{ validator: validateFields }]}>
            <label>Project Description</label>
            <Input size="large" placeholder="Enter description" name="description" value={invoice?.description} />
          </Form.Item>

          <>
            <h3>Item List</h3>
            <br />
          </>
          <Form.List name="items">
            {(fields, { add, remove }) => (
              <>
                {fields.map((field) => (
                  <Container key={field.key}>
                    <Space align="baseline">
                      <Form.Item
                        required
                        tooltip="This is a required field"
                        name="item-name"
                        fieldKey="item-name"
                        shouldUpdate={() => true}
                      >
                        <label>Item Name</label>
                        <Input size="large" placeholder="Enter name" value={field?.name} />
                      </Form.Item>
                      <Form.Item
                        required
                        tooltip="This is a required field"
                        // name={[field.name, 'quantity']}
                        // fieldKey={[field.fieldKey, 'quantity']}
                        name="item-quantity"
                        fieldKey="item-name"
                        shouldUpdate={() => true}
                      >
                        <label>Qty.</label>
                        <Input size="large" placeholder="Enter qty." value={''} />
                      </Form.Item>
                      <Form.Item
                        required
                        tooltip="This is a required field"
                        // name={[field.name, 'price']}
                        // fieldKey={[field.fieldKey, 'price']}
                        name="item-price"
                        fieldKey="item-price"
                        shouldUpdate={() => true}
                      >
                        <label>Price</label>
                        <Input size="large" placeholder="Enter price" value={''} />
                      </Form.Item>
                      <Form.Item
                        required
                        tooltip="This is a required field"
                        //name={[field.name, 'total']}
                        //fieldKey={[field.fieldKey, 'total']}
                        name="item-total"
                        fieldKey="item-total"
                        shouldUpdate={() => true}
                      >
                        <label>Total</label>
                        <Input size="large" placeholder="Enter total" value={''} />
                      </Form.Item>

                      <StyleDeleteIcon src={DeleteIcon} onClick={() => remove(field.name)} />
                    </Space>
                  </Container>
                ))}
                <Form.Item>
                  <NewItemButton onClick={() => add()} block icon={<PlusOutlined />}>
                    Add New Item
                  </NewItemButton>
                </Form.Item>
              </>
            )}
          </Form.List>
          <div style={{ textAlign: 'right' }}>
            <Space>
              <Button3 title="Cancel" onClick={() => props.onCloseDrawer()} />
              <Button2 title="Save Changes" />
            </Space>
          </div>
        </>
      </Form>
    </>
  );
};
export default EditInvoice;
