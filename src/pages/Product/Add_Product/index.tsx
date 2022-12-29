import { Avatar, Button, Form, Input, Modal, Select, Tooltip } from 'antd';
import axios from 'axios';
import { ReactElement, useEffect, useRef, useState } from 'react'
import { Command, QueryAPI } from '../../../access';
import { CategoryModel, ProductModel } from '../../../model';
import { UserModel } from '../../../model/user';
import './index.scss'

import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import moment from 'moment';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { notificationSuccess } from '../../../components';
import { notificationError } from '../../../components/Noti';
import { storage } from '../../../firebase';
import { ref, uploadBytes, getDownloadURL, uploadString } from "firebase/storage"
import { async } from '@firebase/util';
import { UserOutlined } from '@ant-design/icons'
import { ShopModel } from '../../../model/shop';
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

const modules = {
	toolbar: [
		[{ header: [1, 2, false] }],
		['bold', 'italic', 'underline', 'strike', 'blockquote'],
		[
			{ list: 'ordered' },
			{ list: 'bullet' },
			{ indent: '-1' },
			{ indent: '+1' },
		],
		['link', 'image'],
		['clean'],
	],
};

const formats = [
	'header',
	'bold',
	'italic',
	'underline',
	'strike',
	'blockquote',
	'list',
	'bullet',
	'indent',
	'link',
	'image',
];

type typeSubPanel = 'view' | 'create'
export const AddProduct = () => {
	const [subPanel, setSubPanel] = useState<typeSubPanel>('view');
	const [refresh, setRefresh] = useState(0);
	const [productList, setProductList] = useState<ProductModel[]>([]);
	const [shop, setShop] = useState<ShopModel>();
	const [checkShop, setCheckShop] = useState(false);
	const user: any = localStorage.getItem('user');
	const userInfo: UserModel = JSON.parse(user);

	const handleSetSubPanel = (value: typeSubPanel) => {
		setSubPanel(value)
	}

	const handleUpdateSuccess = () => {
		setRefresh(prev => prev + 1)
	}

	const renderPanel = () => {
		if (subPanel === 'view') {
			return <ProductList productList={productList} handleUpdateSuccess={handleUpdateSuccess} />
		} else if (subPanel === 'create') {
			return <AddProductForm shopId={shop?.id ?? ''} />
		}
	}

	useEffect(() => {
		if (subPanel !== 'view') return;
		if (Object.keys(shop ?? {}).length === 0) return;
		axios.get(QueryAPI.product.shopProduct(shop?.id ?? ''))
			.then(res => {
				setProductList(res.data)
			})
			.catch(err => {
				console.log(err)
			})
	}, [subPanel, refresh, shop])

	useEffect(() => {
		axios.get(QueryAPI.shop.single(userInfo.id))
			.then(res => {
				if (res.data.type === 'OK') {
					setShop(res.data.data)
					setCheckShop(false)
				} else {
					setCheckShop(true)
				}
			})
			.catch(err => {
				console.log(err)
			})
	}, [refresh])

	const renderCreateShop = () => {
		return <CreateShopForm handleCreateSuccess={() => setRefresh(prev => prev + 1)} />
	}

	return <div className="container shop-container">
		{checkShop
			? <div className='create-shop-container'>
				{renderCreateShop()}
			</div>
			: <>
				<div className="side-bar-container">
					<div className="side-bar-list">
						<div className={`side-bar-item ${subPanel === 'view' ? 'active' : ''}`} onClick={() => handleSetSubPanel('view')}>view all</div>
						<div className={`side-bar-item ${subPanel === 'create' ? 'active' : ''}`} onClick={() => handleSetSubPanel('create')}>Create product</div>
					</div>
				</div>
				<div className="product-container">
					{renderPanel()}
				</div>
			</>
		}
	</div>
}


const CreateShopForm = ({ handleCreateSuccess }: { handleCreateSuccess: () => void }) => {
	const [src, setSrc] = useState<any>()
	const [image, setImage] = useState<any>(null)
	const [loading, setLoading] = useState(false)
	const [errorImage, setErrorImage] = useState(false)
	const [singup, setSingup] = useState(false)
	const [count, setCount] = useState(0)
	const imageShopRef = useRef<any>()

	const [cropData, setCropData] = useState<any>("#");
	const [cropper, setCropper] = useState<any>();

	const user: any = localStorage.getItem('user');
	const userInfo: UserModel = JSON.parse(user);

	const [isModalOpen, setIsModalOpen] = useState(false);

	const showModal = () => {
		setIsModalOpen(true);
	};

	const handleOk = () => {
		setIsModalOpen(false);
		getCropData();
	};

	// console.log(cropper)

	const handleCancel = () => {
		imageShopRef.current.value = null
		setIsModalOpen(false);
		setImage(null)
		setSrc(null)
		setCropData("#")
		setCropper(undefined)
		setCount(prev => prev + 1)
	};

	function handlerInputImage(e: any) {
		if (e.target.files[0]) {
			setErrorImage(false)
			setImage(e.target.files[0])
			setSrc(() => URL.createObjectURL(e.target.files[0]))
			showModal();
		} else {
			setImage(null)
		}
	}

	const onFinishFailed = (errorInfo: any) => {
		if (!src) {
			setErrorImage(true)
		}
		console.log('Failed:', errorInfo);
	};

	const onFinish = (values: any) => {
		if (!src) {
			setErrorImage(true)
			return;
		}
		setErrorImage(false)

		setLoading(true)
		if (cropData) {
			const date = new Date();
			const name = `${image.name}-${date.getFullYear()}-${date.getMonth()}-${date.getDate()}-${date.getDay()}-${date.getHours()}-${date.getHours()}-${date.getMinutes()}-${date.getMilliseconds()}`
			fetch(cropData)
				.then(res => res.blob())
				.then(blob => {
					const file = new File([blob], name, { type: "image/png" })
					const imageRef = ref(storage, name);
					uploadBytes(imageRef, file).then(() => {
						getDownloadURL(imageRef).then((url) => {
							axios({
								method: 'post',
								url: Command.shop.add(userInfo.id),
								headers: {},
								data: {
									...values,
									shop_avatar: url
								}
							})
								.then((response) => {
									if (response.data.code !== '404') {
										notificationSuccess({ description: 'Bạn tạo shop thành công' });
										handleCreateSuccess()
										setLoading(false)
									} else {
										notificationError({ description: response.data.message });
									}
								})
								.catch((error) => {
									alert(error)
								});
						}).catch(err => {
							console.log(err.message, "error geting the image url")
						})
					}).catch(err => {
						console.log(err.message)
					})
				})
		}
	};

	const getCropData = () => {
		if (typeof cropper !== "undefined") {
			setCropData(cropper.getCroppedCanvas().toDataURL());
		}
	};

	if (!singup) {
		return <div className='shop-introduction'>
			<h1>wellcome to TT</h1>
			<span>Để đăng ký bán hàng trên Shopee, bạn cần cung cấp một số thông tin cơ bản.</span>
			<Button className='btn-sign-up-shop' onClick={() => setSingup(true)}>Sign Up</Button>
		</div>
	}



	return <div className='form-create-shop-container'>
		<Form
			name="basic"
			className='form-create-shop'
			labelCol={{ span: 8 }}
			wrapperCol={{ span: 16 }}
			onFinish={onFinish}
			onFinishFailed={onFinishFailed}
			autoComplete="off"
		>
			<Form.Item
				label="Shop Name"
				name="shop_name"
				rules={[{ required: true, message: 'Please input your username!' }]}
			>
				<Input />
			</Form.Item>

			<div className='ant-form-item'>
				<div className='ant-row ant-form-item-row'>
					<div className="ant-col ant-col-8 ant-form-item-label" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
						<label className="ant-form-item-required" title="Description">Logo Shop</label>
					</div>
					<div className='ant-col ant-col-16 ant-form-item-control'>
						<input
							style={{ display: 'none' }}
							ref={imageShopRef}
							type='file'
							id='file'
							onChange={handlerInputImage}
						/>
						{errorImage && <div className="ant-form-item-explain-error" >Please input your Image!</div>}
						<div className="image-item" key={src} style={{ marginTop: '10px' }}>
							{/* <img src={src} alt="" /> */}
							<Avatar onClick={() => imageShopRef.current?.click()} style={{ cursor: 'pointer' }} size={100} src={cropData} icon={<UserOutlined />} />
							<ul>
								<li>Recommended image dimensions: width 300px, height 300px</li>
								<li>Image format accepted: JPG,JPEG,PNG</li>
							</ul>
						</div>
					</div>
				</div>
			</div>

			<Form.Item
				label="Description"
				name="shop_description"
				rules={[{ required: true, message: 'Please input your username!' }]}
			>
				<ReactQuill
					placeholder='Nhập mô tả sản phẩm'
					modules={modules}
					formats={formats}
				/>
			</Form.Item>

			<Form.Item wrapperCol={{ offset: 8, span: 16 }} className='list-btn-footer'>
				<Button type="primary" htmlType="submit" disabled={loading}>
					Create Shop
				</Button>
			</Form.Item>
		</Form>
		<Modal width={900} title="Edit Logo" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>

			<div className='modal-cropper'>
				<Cropper
					className='view-image'
					key={`${src}${count}`}
					style={{ height: 400, width: "100%" }}
					zoomTo={0.5}
					initialAspectRatio={1}
					preview=".img-preview"
					src={src}
					viewMode={1}
					minCropBoxHeight={300}
					minCropBoxWidth={300}
					max={300}
					background={false}
					responsive={true}
					autoCropArea={1}
					checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
					onInitialized={(instance) => {
						setCropper(instance);
					}}
					guides={true}
				/>
				<div className="box">
					<h1>Preview</h1>
					<div
						className="img-preview"
						style={{ width: "100%", float: "left", height: "300px" }}
					/>
				</div>
				{/* <div
					className="box"
					style={{ width: "50%", float: "right", height: "300px" }}
				>
					<h1>
						<span>Crop</span>
						<button style={{ float: "right" }} onClick={getCropData}>
							Crop Image
						</button>
					</h1>
					<img style={{ width: "100%" }} src={cropData} alt="cropped" />
				</div> */}
			</div>
		</Modal>
	</div>
};

const AddProductForm = ({ shopId }: { shopId: string }) => {
	const [category, setCategory] = useState<CategoryModel[]>();
	const [src, setSrc] = useState<any>()
	const [image, setImage] = useState<any>(null)
	const [loading, setLoading] = useState(false)
	const [errorImage, setErrorImage] = useState(false)


	useEffect(() => {
		axios.get(QueryAPI.category.all())
			.then((res) => {
				setCategory(res.data)
			})
	}, [])

	function handlerInputImage(e: any) {
		if (e.target.files[0]) {
			setErrorImage(false)
			setImage(e.target.files[0])
			setSrc(URL.createObjectURL(e.target.files[0]))
		} else {
			setImage(null)
		}
	}

	const onFinishFailed = (errorInfo: any) => {
		if (!src) {
			setErrorImage(true)
		}
		console.log('Failed:', errorInfo);
	};

	const onFinish = (values: any) => {
		console.log("🚀 ~ file: index.tsx:132 ~ onFinish ~ values", values)
		if (!src) {
			setErrorImage(true)
			return;
		}
		setErrorImage(false)

		setLoading(true)
		if (image) {
			const date = new Date();
			const name = `${image.name}-${date.getFullYear()}-${date.getMonth()}-${date.getDate()}-${date.getDay()}-${date.getHours()}-${date.getHours()}-${date.getMinutes()}-${date.getMilliseconds()}`
			const imageRef = ref(storage, name);
			uploadBytes(imageRef, image).then(() => {
				getDownloadURL(imageRef).then((url) => {
					console.log("🚀 ~ file: index.tsx:145 ~ getDownloadURL ~ url", url)
					axios({
						method: 'post',
						url: Command.product.add(),
						headers: {},
						data: {
							...values,
							shop_id: shopId,
							product_image: url
						}
					})
						.then((response) => {
							if (response.data.code !== '404') {
								notificationSuccess({ description: 'Bạn đã thêm săn phẩm thành công' });
								setLoading(false)
							} else {
								notificationError({ description: response.data.message });
							}
						})
						.catch((error) => {
							alert(error)
						});
				}).catch(err => {
					console.log(err.message, "error geting the image url")
				})
			}).catch(err => {
				console.log(err.message)
			})
		}
	};


	return <Form
		name="basic"
		labelCol={{ span: 8 }}
		wrapperCol={{ span: 16 }}
		onFinish={onFinish}
		onFinishFailed={onFinishFailed}
		autoComplete="off"
	>
		<Form.Item
			label="Product Name"
			name="product_name"
			rules={[{ required: true, message: 'Please input your username!' }]}
		>
			<Input />
		</Form.Item>

		<Form.Item
			label="Category"
			name="id_category"
			rules={[{ required: true, message: 'Please input your username!' }]}
		>
			<Select options={category?.map(item => ({
				value: item.id,
				label: item.display_category
			}))} />
		</Form.Item>

		<Form.Item
			label="Price"
			name="product_price"
			rules={[{ required: true, message: 'Please input your username!' }]}
		>
			<Input />
		</Form.Item>

		<Form.Item
			label="Quanlity"
			name="product_quanlity"
			rules={[{ required: true, message: 'Please input your username!' }]}
		>
			<Input />
		</Form.Item>

		<Form.Item
			label="Description"
			name="product_description"
			rules={[{ required: true, message: 'Please input your username!' }]}
		>
			<ReactQuill
				placeholder='Nhập mô tả sản phẩm'
				modules={modules}
				formats={formats}
			/>
		</Form.Item>

		<div className='ant-form-item'>
			<div className='ant-row ant-form-item-row'>
				<div className="ant-col ant-col-8 ant-form-item-label">
					<label className="ant-form-item-required" title="Description">Image</label>
				</div>
				<div className='ant-col ant-col-16 ant-form-item-control'>
					<input
						type='file'
						id='file'
						onChange={handlerInputImage}
					/>
					{errorImage && <div className="ant-form-item-explain-error" >Please input your Image!</div>}
					<div className="image-item" key={src} style={{ marginTop: '10px' }}>
						<img src={src} alt="" />
					</div>
				</div>
			</div>
		</div>

		<Form.Item wrapperCol={{ offset: 8, span: 16 }} className='list-btn-footer'>
			<Button type="primary" htmlType="submit" disabled={loading}>
				Add Product
			</Button>
		</Form.Item>
	</Form>
};

interface DataType {
	key: React.Key;
	name: ReactElement;
	price: string;
	quanlity: string;
	description: ReactElement;
	createdDate: string;
	updatedDate: string;
	category: string;
	action: ReactElement
}

const ProductList = ({ productList, handleUpdateSuccess
}: {
	productList: ProductModel[],
	handleUpdateSuccess: () => void
}) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [productEdit, setProductEdit] = useState<ProductModel>();
	const [category, setCategory] = useState<CategoryModel[]>();
	const [defaultImage, setDefaultImage] = useState<any>()
	const [src, setSrc] = useState<any>()
	const [loading, setLoading] = useState(false)
	const [image, setImage] = useState<any>(null)

	const columns: ColumnsType<DataType> = [
		{
			title: 'Name',
			dataIndex: 'name',
			width: '200px'
		},
		{
			title: 'Category',
			dataIndex: 'category',
		},
		{
			title: 'Price',
			dataIndex: 'price',
		},
		{
			title: 'Quanlity',
			dataIndex: 'quanlity',
		},
		{
			title: 'Description',
			dataIndex: 'description',
		},
		{
			title: 'Updated date',
			dataIndex: 'updatedDate',
		},
		{
			title: 'Created date',
			dataIndex: 'createdDate',
		},
		{
			title: 'Action',
			dataIndex: 'action',
		},
	];

	const showModal = () => {
		setIsModalOpen(true);
	};

	const handleOk = () => {
		setIsModalOpen(false);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
	};

	const handleDeleteProduct = (productId: string) => {
		axios({
			method: 'post',
			url: Command.product.delete(productId),
			headers: {},
			data: {}
		})
			.then((response) => {
				if (response.data.code !== '404') {
					notificationSuccess({ description: 'Bạn đã xoá săn phẩm thành công' });
					handleUpdateSuccess()
					handleCancel();
				} else {
					notificationError({ description: response.data.message });
				}
			}, (error) => {
				alert(error)
			});
	}

	const data: DataType[] = productList.map(product => {
		return {
			key: product.id,
			name: <div className='name-container'>
				<img src={product.product_image} alt={product.product_name} />
				<b>{product.product_name}</b>
			</div>,
			category: product.display_category,
			price: product.product_price,
			quanlity: product.product_quanlity,
			description: <div dangerouslySetInnerHTML={{ __html: product.product_description }}></div>,
			updatedDate: moment(product.updated_at).format('YYYY-MM-DD, h:mm:ss a'),
			createdDate: moment(product.created_at).format('YYYY-MM-DD, h:mm:ss a'),
			action: <div className='list-action-button'>
				<Tooltip title="Edit">
					<button className='edit-btn' style={{ cursor: 'pointer' }} onClick={() => {
						showModal()
						setDefaultImage(product?.product_image)
						setProductEdit(product)
					}}><EditOutlined /> Edit</button>
				</Tooltip>
				<Tooltip title="Delete">
					<button className='delete-btn' style={{ cursor: 'pointer' }} onClick={() => handleDeleteProduct(product.id)}><DeleteOutlined /> Delete</button>
				</Tooltip>
			</div>
		}
	})

	useEffect(() => {
		axios.get(QueryAPI.category.all())
			.then((res) => {
				setCategory(res.data)
			})
	}, [])

	const onFinishFailed = (errorInfo: any) => {
		console.log('Failed:', errorInfo);
	};

	const onFinish = (values: any) => {
		console.log(image)
		setLoading(true)
		if (image) {
			const date = new Date();
			const name = `${image.name}-${date.getFullYear()}-${date.getMonth()}-${date.getDate()}-${date.getDay()}-${date.getHours()}-${date.getHours()}-${date.getMinutes()}-${date.getMilliseconds()}`
			const imageRef = ref(storage, name);
			uploadBytes(imageRef, image).then(() => {
				getDownloadURL(imageRef).then((url) => {
					axios({
						method: 'post',
						url: Command.product.update(productEdit?.id ?? ''),
						headers: {},
						data: {
							...values,
							product_image: url
						}
					})
						.then((response) => {
							if (response.data.code !== '404') {
								notificationSuccess({ description: 'Bạn đã update săn phẩm thành công' });
								handleUpdateSuccess()
								handleCancel();
								setLoading(false)
							} else {
								notificationError({ description: response.data.message });
							}
						}, (error) => {
							alert(error)
						});
				}).catch(err => {
					console.log(err.message, "error geting the image url")
				})
			}).catch(err => {
				console.log(err.message)
			})
		} else {
			axios({
				method: 'post',
				url: Command.product.update(productEdit?.id ?? ''),
				headers: {},
				data: {
					...values,
					product_image: defaultImage
				}
			})
				.then((response) => {
					if (response.data.code !== '404') {
						notificationSuccess({ description: 'Bạn đã update săn phẩm thành công' });
						handleUpdateSuccess()
						handleCancel();
						setLoading(false)
					} else {
						notificationError({ description: response.data.message });
					}
				}, (error) => {
					alert(error)
				});
		}
	};

	function handlerInputImage(e: any) {
		if (e.target.files[0]) {
			setImage(e.target.files[0])
			setSrc(URL.createObjectURL(e.target.files[0]))
		} else {
			setImage(null)
		}
	}


	return <>
		<Table columns={columns} dataSource={data} />;
		<Modal key={productEdit?.id} width={600} title="Edit product" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} className='edit-product-modal'>
			<Form
				name="basic"
				labelCol={{ span: 8 }}
				wrapperCol={{ span: 16 }}
				initialValues={productEdit}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				autoComplete="off"
			>
				<Form.Item
					label="Product Name"
					name="product_name"
					rules={[{ required: true, message: 'Please input your username!' }]}
				>
					<Input />
				</Form.Item>

				<Form.Item
					label="Price"
					name="id_category"
					rules={[{ required: true, message: 'Please input your username!' }]}
				>
					<Select options={category?.map(item => ({
						value: item.id,
						label: item.display_category
					}))} />
				</Form.Item>

				<Form.Item
					label="Price"
					name="product_price"
					rules={[{ required: true, message: 'Please input your username!' }]}
				>
					<Input />
				</Form.Item>

				<Form.Item
					label="Quanlity"
					name="product_quanlity"
					rules={[{ required: true, message: 'Please input your username!' }]}
				>
					<Input />
				</Form.Item>

				<Form.Item
					label="Description"
					name="product_description"
					rules={[{ required: true, message: 'Please input your username!' }]}
				>
					<ReactQuill
						// defaultValue={data && data.description}
						placeholder='Nhập mô tả sản phẩm'
						// onChange={handleChangeEditor}
						// onBlur={handleBlurEditor}
						modules={modules}
						formats={formats}
					/>
				</Form.Item>

				<div className="ant-col ant-col-8 ant-form-item-label">
					<label className="ant-form-item-required" title="Description">Image</label>
				</div>
				<input
					type='file'
					id='file'
					onChange={handlerInputImage}
				/>
				<div className="image-item" key={src ?? defaultImage} style={{ marginTop: '10px' }}>
					<img src={src ?? defaultImage} alt="" />
				</div>

				<Form.Item wrapperCol={{ offset: 8, span: 16 }} className='list-btn-footer'>
					<Button type="ghost" onClick={handleCancel}>
						Cancel
					</Button>
					<Button type="primary" htmlType="submit" disabled={loading}>
						Submit
					</Button>
				</Form.Item>
			</Form>
		</Modal>
	</>

}

// const AddPro