import React, { useState } from 'react';
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
import { Button, Form, Input, InputNumber, Select } from 'antd';

const { Content, Sider } = Layout;
const { Option } = Select;

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


const mockVal = (str: string, repeat = 1) => ({
	value: str.repeat(repeat),
});
const { Title } = Typography;
const getBase64 = (file: RcFile): Promise<string> =>
	new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result as string);
		reader.onerror = error => reject(error);
	});
const validateMessages = {
	required: '${label} is required!',
	types: {
		email: '${label} is not a valid email!',
		number: '${label} is not a valid number!',
	},
	number: {
		range: '${label} must be between ${min} and ${max}',
	},
};
const layout = {
	labelCol: { span: 4 },
	wrapperCol: { span: 20 },
};

const AddProduct = () => {
	const [value, setValue] = useState('');
	const [options, setOptions] = useState<{ value: string }[]>([]);
	const [form] = Form.useForm();

	const onSearch = (searchText: string) => {
		setOptions(
			!searchText ? [] : [mockVal(searchText), mockVal(searchText, 2), mockVal(searchText, 3)],
		);
	};

	const onSelect = (data: string) => {
		console.log('onSelect', data);
	};

	const onChange = (data: string) => {
		setValue(data);
	}
	const [fileList, setFileList] = useState<UploadFile[]>([
		{
			uid: '-1',
			name: 'image.png',
			status: 'done',
			url: placeholderImg,
		}
	]);
	const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
		setFileList(newFileList);

	const uploadButton = (
		<div>
			<PlusOutlined />
			<div style={{ marginTop: 8 }}>Upload</div>
		</div>
	);
	const onFinish = (values: any) => {
		console.log(values);
	};
	// const onGenderChange = (value: string) => {
	// 	switch (value) {
	// 		case 'male':
	// 			form.setFieldsValue({ note: 'Hi, man!' });
	// 			return;
	// 		case 'female':
	// 			form.setFieldsValue({ note: 'Hi, lady!' });
	// 			return;
	// 		case 'other':
	// 			form.setFieldsValue({ note: 'Hi there!' });
	// 	}
	// };
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
						<Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
							<Form.Item name={['user', 'name']} label=" T??n s???n ph???m" rules={[{ required: true }]}>
								<Input />
							</Form.Item>
							<Form.Item name="gender" label="Danh m???c" rules={[{ required: true }]}>
								<Select
									placeholder="Select a option and change input text above"
									// onChange={onGenderChange}
									allowClear
								>
									<Option value="quan-ao">Qu???n ??o</Option>
									<Option value="giay-dep">Gi??y d??p</Option>
									<Option value="dien-thoai">??i???n tho???i</Option>
									<Option value="laptop">Laptop</Option>
									<Option value="sac-dep">S???c ?????p</Option>
									<Option value="suc-khoe">S???c kho???</Option>
									<Option value="the-thao">Th??? thao</Option>
									<Option value="sach">S??ch</Option>
									<Option value="thiet-bi-dien-tu">Thi???t b??? ??i???n t???</Option>
									<Option value="dong-ho">?????ng h???</Option>
									<Option value="may-anh">M??y ???nh</Option>
									<Option value="khac">Kh??c</Option>
								</Select>
							</Form.Item>
							<Form.Item name={['user', 'description']} label="M?? t???" rules={[{ required: true }]}>
								<Input.TextArea />
							</Form.Item>
							<Form.Item name={['user', 'images']} label="H??nh ???nh" rules={[{ required: true }]}>
								<Upload
									listType="picture-card"
									fileList={fileList}
									onChange={handleChange}
								>
									{fileList.length >= 2 ? null : uploadButton}
								</Upload>
							</Form.Item>
							<Form.Item label="Price">
								<InputNumber min={1} />
							</Form.Item>
							<Form.Item label="Quanlity">
								<InputNumber min={1} />
							</Form.Item>
							<Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
								<Button type="primary" htmlType="submit">
									Th??m s???n ph???m
								</Button>
							</Form.Item>
						</Form>
					</Content>
				</Layout>
			</Layout>
		</Layout>
	)
};

export default AddProduct;
