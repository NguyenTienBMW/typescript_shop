// import React, { useState } from 'react';
// import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
// import type { MenuProps } from 'antd';
// import { Breadcrumb, Layout, Menu } from 'antd';
// import { AutoComplete } from 'antd';
// import { Typography } from 'antd';
// import { PlusOutlined } from '@ant-design/icons';
// import { Modal, Upload } from 'antd';
// import placeholderImg from "../../../assets/images/placeholder_img.png";
// import type { RcFile, UploadProps } from 'antd/es/upload';
// import type { UploadFile } from 'antd/es/upload/interface';
// import { Button, Form, Input, InputNumber, Select } from 'antd';

// const { Content, Sider } = Layout;
// const { Option } = Select;

// const items2: MenuProps['items'] = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
// 	(icon, index) => {
// 		const key = String(index + 1);

// 		return {
// 			key: `sub${key}`,
// 			icon: React.createElement(icon),
// 			label: `subnav ${key}`,

// 			children: new Array(4).fill(null).map((_, j) => {
// 				const subKey = index * 4 + j + 1;
// 				return {
// 					key: subKey,
// 					label: `option${subKey}`,
// 				};
// 			}),
// 		};
// 	},
// );


// const mockVal = (str: string, repeat = 1) => ({
// 	value: str.repeat(repeat),
// });
// const { Title } = Typography;
// const getBase64 = (file: RcFile): Promise<string> =>
// 	new Promise((resolve, reject) => {
// 		const reader = new FileReader();
// 		reader.readAsDataURL(file);
// 		reader.onload = () => resolve(reader.result as string);
// 		reader.onerror = error => reject(error);
// 	});
// const validateMessages = {
// 	required: '${label} is required!',
// 	types: {
// 		email: '${label} is not a valid email!',
// 		number: '${label} is not a valid number!',
// 	},
// 	number: {
// 		range: '${label} must be between ${min} and ${max}',
// 	},
// };
// const layout = {
// 	labelCol: { span: 4 },
// 	wrapperCol: { span: 20 },
// };

// const AddProduct = () => {
// 	const [value, setValue] = useState('');
// 	const [options, setOptions] = useState<{ value: string }[]>([]);
// 	const [form] = Form.useForm();

// 	const onSearch = (searchText: string) => {
// 		setOptions(
// 			!searchText ? [] : [mockVal(searchText), mockVal(searchText, 2), mockVal(searchText, 3)],
// 		);
// 	};

// 	const onSelect = (data: string) => {
// 		console.log('onSelect', data);
// 	};

// 	const onChange = (data: string) => {
// 		setValue(data);
// 	}
// 	const [fileList, setFileList] = useState<UploadFile[]>([
// 		{
// 			uid: '-1',
// 			name: 'image.png',
// 			status: 'done',
// 			url: placeholderImg,
// 		}
// 	]);
// 	const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
// 		setFileList(newFileList);

// 	const uploadButton = (
// 		<div>
// 			<PlusOutlined />
// 			<div style={{ marginTop: 8 }}>Upload</div>
// 		</div>
// 	);
// 	const onFinish = (values: any) => {
// 		console.log(values);
// 	};
// 	// const onGenderChange = (value: string) => {
// 	// 	switch (value) {
// 	// 		case 'male':
// 	// 			form.setFieldsValue({ note: 'Hi, man!' });
// 	// 			return;
// 	// 		case 'female':
// 	// 			form.setFieldsValue({ note: 'Hi, lady!' });
// 	// 			return;
// 	// 		case 'other':
// 	// 			form.setFieldsValue({ note: 'Hi there!' });
// 	// 	}
// 	// };
// 	return (
// 		<Layout>
// 			<Layout>
// 				<Sider width={200} className="site-layout-background">
// 					<Menu
// 						mode="inline"
// 						defaultSelectedKeys={['1']}
// 						defaultOpenKeys={['sub1']}
// 						style={{ height: '100%', borderRight: 0 }}
// 						items={items2}
// 					/>
// 				</Sider>
// 				<Layout style={{ padding: '0 24px 24px' }}>
// 					<Breadcrumb style={{ margin: '16px 0' }}>
// 						<Breadcrumb.Item>Home</Breadcrumb.Item>
// 						<Breadcrumb.Item>Product</Breadcrumb.Item>
// 						<Breadcrumb.Item>Add Product</Breadcrumb.Item>
// 					</Breadcrumb>
// 					<Content
// 						className="site-layout-background"
// 						style={{
// 							padding: 24,
// 							margin: 0,
// 							minHeight: 280,
// 						}}
// 					>
// 						<Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
// 							<Form.Item name={['user', 'name']} label=" Tên sản phẩm" rules={[{ required: true }]}>
// 								<Input />
// 							</Form.Item>
// 							<Form.Item name="gender" label="Danh mục" rules={[{ required: true }]}>
// 								<Select
// 									placeholder="Select a option and change input text above"
// 									// onChange={onGenderChange}
// 									allowClear
// 								>
// 									<Option value="quan-ao">Quần áo</Option>
// 									<Option value="giay-dep">Giày dép</Option>
// 									<Option value="dien-thoai">Điện thoại</Option>
// 									<Option value="laptop">Laptop</Option>
// 									<Option value="sac-dep">Sắc đẹp</Option>
// 									<Option value="suc-khoe">Sức khoẻ</Option>
// 									<Option value="the-thao">Thể thao</Option>
// 									<Option value="sach">Sách</Option>
// 									<Option value="thiet-bi-dien-tu">Thiết bị điện tử</Option>
// 									<Option value="dong-ho">Đồng hồ</Option>
// 									<Option value="may-anh">Máy ảnh</Option>
// 									<Option value="khac">Khác</Option>
// 								</Select>
// 							</Form.Item>
// 							<Form.Item name={['user', 'description']} label="Mô tả" rules={[{ required: true }]}>
// 								<Input.TextArea />
// 							</Form.Item>
// 							<Form.Item name={['user', 'images']} label="Hình ảnh" rules={[{ required: true }]}>
// 								<Upload
// 									listType="picture-card"
// 									fileList={fileList}
// 									onChange={handleChange}
// 								>
// 									{fileList.length >= 2 ? null : uploadButton}
// 								</Upload>
// 							</Form.Item>
// 							<Form.Item label="Price">
// 								<InputNumber min={1} />
// 							</Form.Item>
// 							<Form.Item label="Quanlity">
// 								<InputNumber min={1} />
// 							</Form.Item>
// 							<Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
// 								<Button type="primary" htmlType="submit">
// 									Thêm sản phẩm
// 								</Button>
// 							</Form.Item>
// 						</Form>
// 					</Content>
// 				</Layout>
// 			</Layout>
// 		</Layout>
// 	)
// };

// export default AddProduct;

import axios from 'axios';
import { useEffect, useState } from 'react'
import { QueryAPI } from '../../../access';
import { ProductItem } from '../../../components';
import { ProductModel } from '../../../model';
import { UserModel } from '../../../model/user';
import './index.scss'

type typeSubPanel = 'view' | 'create'
export const AddProduct = () => {
	const [subPanel, setSubPanel] = useState<typeSubPanel>('view');
	const [productList, setProductList] = useState<ProductModel[]>([]);
	const user: any = localStorage.getItem('user');
	const userInfo: UserModel = JSON.parse(user);

	const handleSetSubPanel = (value: typeSubPanel) => {
		setSubPanel(value)
	}

	const renderPanel = () => {
		if(subPanel === 'view') {
			return productList.map(item => {
				return <ProductItem key={item.id} data={item}/>
			})
		}else if(subPanel === 'create') {
			return <>create</>
		}
	}

	useEffect(() => {
		if(subPanel !== 'view') return;
		axios.get(QueryAPI.product.shopProduct(userInfo.id))
		.then(res => {
			setProductList(res.data)
		})
		.catch(err => {
			console.log(err)
		})
	}, [subPanel])

 	return <div className="container shop-container">
		<div className="side-bar-container">
			<div className="side-bar-list">
				<div className="side-bar-item" onClick={() => handleSetSubPanel('view')}>view all</div>
				<div className="side-bar-item" onClick={() => handleSetSubPanel('create')}>Create product</div>
			</div>
		</div>	
		<div className="product-container">
			{renderPanel()}
		</div>	
	</div>
}