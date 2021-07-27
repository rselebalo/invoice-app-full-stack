import React, { useState } from 'react';
import { Form, Input, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete } from 'antd';
import { IInvoice } from '../../interfaces';

const EditInvoice: React.FC<any> = ({ ...props }) => {
  const [form] = Form.useForm();
  const [invoice, setInvoice] = useState<IInvoice>(props.selected);
  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };

  return (
    <Form name="edit" onFinish={onFinish} form={form}>
      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          {
            required: true,
            message: 'Please input your E-mail!',
          },
        ]}
      >
        <Input size="large" placeholder="Enter street address" />
      </Form.Item>
      <Form.Item label="Street Adress" required tooltip="This is a required field">
        <Input size="large" placeholder="Enter street address" />
      </Form.Item>
      <Row>
        <Form.Item label="City" required tooltip="This is a required field">
          <Input size="large" placeholder="Enter city" />
        </Form.Item>
        <Form.Item label="Postal Code" required tooltip="This is a required field">
          <Input size="large" placeholder="Enter postal code" />
        </Form.Item>
        <Form.Item label="Country" required tooltip="This is a required field">
          <Input size="large" placeholder="Enter country" />
        </Form.Item>
      </Row>
    </Form>
  );
};
export default EditInvoice;
