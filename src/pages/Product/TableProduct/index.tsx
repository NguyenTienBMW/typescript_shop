import React, { useContext, useEffect, useRef, useState } from 'react';
import type { InputRef } from 'antd';
import { Button, Form, Input, Popconfirm, Table, Image } from 'antd';
import type { FormInstance } from 'antd/es/form';
import "./index.scss"
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu } from 'antd';
import { AutoComplete } from 'antd';
import { Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload } from 'antd';
import placeholderImg from "../../../assets/images/placeholder_img.png";
import type { RcFile, UploadProps } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';

const { Content, Sider } = Layout;

const items2: MenuProps['items'] = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
  (icon, index) => {
    const key = String(index + 1);

    return {
      key: `sub${key}`,
      icon: React.createElement(icon),
      label: `subnav ${key}`,

      children: new Array(4).fill(null).map((_, j) => {
        const subKey = index * 4 + j + 1;
        return {
          key: subKey,
          label: `option${subKey}`,
        };
      }),
    };
  },
);

const EditableContext = React.createContext<FormInstance<any> | null>(null);

interface Item {
  key: string;
  id: Number;
  productName: string;
  productImage: string;
  productDescription: string;
  productQuanlity: number;
  productPrice: number;
  created_at: string;
  updated_at: string;
}

interface EditableRowProps {
  index: number;
}

const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

type EditableTableProps = Parameters<typeof Table>[0];

interface DataType {
  key: React.Key;
  id: Number;
  productName: string;
  productImage: string;
  productDescription: string;
  productQuanlity: number;
  productPrice: number;
  created_at: string;
  updated_at: string;
}

type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;

const App: React.FC = () => {
  const [dataSource, setDataSource] = useState<DataType[]>([
    {
      key: '0',
      id: 1,
      productName: 'Edward King 0',
      productImage: "https://cf.shopee.vn/file/sg-11134201-22110-ig1ga0vkatjvab",
      productDescription: "Chiều dài tay áo: Dài tay",
      productQuanlity: 10,
      productPrice: 10,
      created_at: "2022-12-02 10:21:21",
      updated_at: "2022-12-02 10:21:21",
    },
    {
      key: '1',
      id: 2,
      productName: 'Edward King 0',
      productImage: "https://cf.shopee.vn/file/sg-11134201-22110-ig1ga0vkatjvab",
      productDescription: "Chiều dài tay áo: Dài tay",
      productQuanlity: 10,
      productPrice: 10,
      created_at: "2022-12-02 10:21:21",
      updated_at: "2022-12-02 10:21:21",
    },
  ]);

  const [count, setCount] = useState(2);

  const handleDelete = (key: React.Key) => {
    const newData = dataSource.filter(item => item.key !== key);
    setDataSource(newData);
  };

  const defaultColumns: (ColumnTypes[number] & { editable?: boolean; dataIndex: string })[] = [
    {
      title: 'Id',
      dataIndex: 'id',
      width: '5%',
    },
    {
      title: 'productName',
      dataIndex: 'productName',
    },
    {
      title: 'productImage',
      dataIndex: 'productImage',
      key: 'productImage',
      render: record => (
        <img src={`${record}`} style={{ height: '10%' }} />
      ),
    },
    {
      title: 'productDescription',
      dataIndex: 'productDescription',
      width: '30%',
    },

    {
      title: 'productQuanlity',
      dataIndex: 'productQuanlity',
    },
    {
      title: 'productPrice',
      dataIndex: 'productPrice',
    },
    {
      title: 'created_at',
      dataIndex: 'created_at',
    },
    {
      title: 'updated_at',
      dataIndex: 'updated_at',
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      // render: (_, record: { key: React.Key }) =>
      //   dataSource.length >= 1 ? (
      //     <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
      //       <a>Delete</a>
      //     </Popconfirm>
      //   ) : null,
    },
  ];


  const handleSave = (row: DataType) => {
    const newData = [...dataSource];
    const index = newData.findIndex(item => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData);
  };

  const components = {
    body: {
      row: EditableRow,
    },
  };

  const columns = defaultColumns.map(col => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: DataType) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });

  return (
    <Layout>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
            items={items2}
          />
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>Product</Breadcrumb.Item>
            <Breadcrumb.Item>Add Product</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            {/* <Button onClick={handleAdd} type="primary" style={{ marginBottom: 16 }}>
              Add a row
            </Button> */}
            <Table
              components={components}
              bordered
              dataSource={dataSource}
              columns={columns as ColumnTypes}
            />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default App; 