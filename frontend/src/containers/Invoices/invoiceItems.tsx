import React from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Form, Space } from 'antd';
import Container from '../../components/Container';
import NewItemButton from '../../components/Buttons/newItem';
import DeleteIcon from '../../assets/icon-delete.svg';
import StyleDeleteIcon from '../../components/DeleteIcon';
import Input from '../../components/Input';

const InvoiceItems: React.FC<any> = (props) => {
  return (
    <Form.List name="fields">
      {(fields, { add, remove }) => {
        return (
          <div>
            {fields.map((field, index) => (
              <Container key={field.key}>
                <Space align="baseline">
                  <Form.Item>
                    <label>Item Name</label>
                    <Input
                      size="large"
                      name="name"
                      placeholder="Enter name"
                      onChange={(e) => props.onInvoiceItemChange(e, index)}
                      value={props.invoice.items[index]?.name}
                    />
                  </Form.Item>
                  <Form.Item>
                    <label>Qty.</label>
                    <Input
                      size="large"
                      type="number"
                      name="quantity"
                      placeholder="Enter quantity."
                      onChange={(e) => props.onInvoiceItemChange(e, index)}
                      value={props.invoice.items[index]?.quantity}
                    />
                  </Form.Item>
                  <Form.Item>
                    <label>Price</label>
                    <Input
                      size="large"
                      type="number"
                      name="price"
                      placeholder="Enter price"
                      onChange={(e) => props.onInvoiceItemChange(e, index)}
                      value={props.invoice.items[index]?.price}
                    />
                  </Form.Item>
                  <Form.Item>
                    <label>Total</label>
                    <Input
                      size="large"
                      type="number"
                      name="total"
                      placeholder="Enter total"
                      onChange={(e) => props.onInvoiceItemChange(e, index)}
                      value={props.invoice.items[index]?.total}
                      disabled
                    />
                  </Form.Item>

                  {fields.length > 1 && <StyleDeleteIcon src={DeleteIcon} onClick={() => remove(field.name)} />}
                </Space>
              </Container>
            ))}

            <Form.Item>
              <NewItemButton onClick={() => add()} block icon={<PlusOutlined />}>
                Add New Item
              </NewItemButton>
            </Form.Item>
          </div>
        );
      }}
    </Form.List>
  );
};

export default InvoiceItems;
