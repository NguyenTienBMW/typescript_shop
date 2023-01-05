import { Avatar, Button, DatePicker, Form, Input, Modal, Radio, Select, Tooltip } from 'antd';
import axios from 'axios';
import { ReactElement, useEffect, useRef, useState } from 'react'
import './index.scss'

import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import moment from 'moment';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { ref, uploadBytes, getDownloadURL, uploadString } from "firebase/storage"
import { async } from '@firebase/util';
import { UserOutlined } from '@ant-design/icons'
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { relative } from 'path';
import { UserModel } from '../../model/user';
import { ShopModel } from '../../model/shop';
import { CategoryModel, ProductModel } from '../../model';
import { Command, QueryAPI } from '../../access';
import { HeaderItem } from '../../components/HeaderItem';
import { notificationSuccess } from '../../components';
import { notificationError } from '../../components/Noti';
import { storage } from '../../firebase';

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

type typeSubPanel = 'profile' | 'address' | 'password'
export const Account = () => {
  const [subPanel, setSubPanel] = useState<typeSubPanel>('profile');
  const [refresh, setRefresh] = useState(0);
  const [productList, setProductList] = useState<ProductModel[]>([]);
  const [shop, setShop] = useState<ShopModel>();
  const [checkShop, setCheckShop] = useState(false);
  const user: any = localStorage.getItem('user');
  const userInfo: UserModel = JSON.parse(user);

  const handleSetSubPanel = (value: typeSubPanel) => {
    setSubPanel(value)
  }

  const renderPanel = () => {
    if (subPanel === 'profile') {
      return <Generate />
    } else if (subPanel === 'address') {
      return <UpdateAddress />
    } else if (subPanel === 'password') {
      return <UpdatePassword />
    }

  }


  useEffect(() => {
    axios.get(QueryAPI.user.single(userInfo.id))
      .then(res => {
        if (res.data.type === 'OK') {
          console.log("OK", res.data)
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

  return <div className="container shop-container">
    {
      <>
        <div className="side-bar-container">
          <div className="side-bar-list">
            <div className={`side-bar-item ${subPanel === 'profile' ? 'active' : ''}`} onClick={() => handleSetSubPanel('profile')}>Profile</div>
            <div className={`side-bar-item ${subPanel === 'password' ? 'active' : ''}`} onClick={() => handleSetSubPanel('password')}>Password</div>
            <div className={`side-bar-item ${subPanel === 'address' ? 'active' : ''}`} onClick={() => handleSetSubPanel('address')}>Address</div>
          </div>
        </div>
        <div className="product-container">
          {renderPanel()}
        </div>
      </>
    }
  </div>
}

const Generate = () => {
  const [account, setAccount] = useState<UserModel>()
  const user: any = localStorage.getItem('user');
  const userInfo: UserModel = JSON.parse(user);
  const [form] = Form.useForm()


  const [src, setSrc] = useState<any>()
  const [image, setImage] = useState<any>(null)
  const [count, setCount] = useState(0)
  const imageShopRef = useRef<any>()

  const [cropData, setCropData] = useState<any>("#");
  const [cropper, setCropper] = useState<any>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const getCropData = () => {
    if (typeof cropper !== "undefined") {
      setCropData(cropper.getCroppedCanvas().toDataURL());
    }
  };

  const handleOk = () => {
    setIsModalOpen(false);
    getCropData();
  };

  const handleCancel = () => {
    imageShopRef.current.value = null
    setIsModalOpen(false);
    setImage(null)
    setSrc(null)
    setCropData("#")
    setCropper(undefined)
    setCount(prev => prev + 1)
  };


  useEffect(() => {
    axios.get(QueryAPI.user.single(userInfo.id))
      .then(res => {
        console.log(res.data);
        setAccount(res.data)
        res.data.avatar && setCropData(res.data.avatar)
      })
      .catch(err => alert(err))
  }, [])

  useEffect(() => {
    const date = new Date(account?.date_of_birth ?? '');
    const day = `${date.getFullYear()}-${date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1}-${date.getDate()}`

    form.setFieldsValue({
      name: account?.name ?? undefined,
      avatar: account?.avatar ?? undefined,
      gender: Number(account?.gender) ?? undefined,
      date_of_birth: day,
      description: account?.description ?? undefined,
    })
  }, [account])

  function handlerInputImage(e: any) {
    if (e.target.files[0]) {
      setImage(e.target.files[0])
      setSrc(() => URL.createObjectURL(e.target.files[0]))
      showModal();
    } else {
      setImage(null)
    }
  }

  const onFinish = (values: any) => {
    if (cropData.length > 10) {
      const date = new Date();
      if (cropData.includes('https://')) {
        axios({
          method: 'post',
          url: Command.user.update(userInfo.id),
          headers: {},
          data: {
            ...values,
            avatar: cropData
          }
        })
          .then((response) => {
            if (response.data.code !== '404') {
              notificationSuccess({ description: 'Bạn tạo shop thành công' });
              handleSuccess()
            } else {
              notificationError({ description: response.data.message });
            }
          })
          .catch((error) => {
            alert(error)
          });
      } else {
        const name = `${image.name}-${date.getFullYear()}-${date.getMonth()}-${date.getDate()}-${date.getDay()}-${date.getHours()}-${date.getHours()}-${date.getMinutes()}-${date.getMilliseconds()}`

        fetch(cropData)
          .then(res => res.blob())
          .then(blob => {
            const file = new File([blob], name, { type: "image/png" })
            const imageRef = ref(storage, name);
            uploadBytes(imageRef, file).then(() => {
              getDownloadURL(imageRef).then((url) => {
                console.log("🚀 ~ file: index.tsx:206 ~ getDownloadURL ~ url", url)
                axios({
                  method: 'post',
                  url: Command.user.update(userInfo.id),
                  headers: {},
                  data: {
                    ...values,
                    avatar: url
                  }
                })
                  .then((response) => {
                    if (response.data.code !== '404') {
                      notificationSuccess({ description: 'Bạn tạo shop thành công' });
                      handleSuccess()
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
    } else {
      axios({
        method: 'post',
        url: Command.user.update(userInfo.id),
        headers: {},
        data: {
          ...values,
        }
      })
        .then((response) => {
          if (response.data.code !== '404') {
            notificationSuccess({ description: 'Bạn Update account thành công' });
            handleSuccess()
          } else {
            notificationError({ description: response.data.message });
          }
        })
        .catch((error) => {
          alert(error)
        });
    }
  };

  const handleSuccess = () => {
    axios.get(QueryAPI.user.single(userInfo.id))
      .then(res => {
        localStorage.setItem('user', JSON.stringify(res.data));
        setCount(prev => prev + 1)
        window.dispatchEvent(new Event("storage"));
      })
  }

  return <div className='form-view-info-container'>
    <Form
      form={form}
      name="basic"
      className='form-view-info'
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      autoComplete="off"
      onFinish={onFinish}
      onFinishFailed={() => { }}
    >
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: 'Please input your name!' }]}
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
            <div className="image-item" key={src} style={{ marginTop: '10px' }}>
              {/* <img src={src} alt="" /> */}
              <div className='avata-container' onClick={() => imageShopRef.current?.click()} style={{ position: 'relative' }}>
                <Avatar style={{ cursor: 'pointer' }} size={100} src={cropData} icon={<UserOutlined />} />
                <div className='btn-edit-avata'>Edit</div>
              </div>
              <ul>
                <li>Recommended image dimensions: width 300px, height 300px</li>
                <li>Image format accepted: JPG,JPEG,PNG</li>
              </ul>
            </div>
          </div>
        </div>
      </div>


      <Form.Item
        label="Gender"
        name="gender"
        rules={[{ required: true, message: 'Please input your gender!' }]}
      >
        <Radio.Group>
          <Radio value={1}>Nam</Radio>
          <Radio value={2}>Nu</Radio>
          <Radio value={3}>Khac</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item
        label="Date_of_birth"
        name="date_of_birth"
      >
        {/* <DatePicker /> */}
        <Input type="date" />
      </Form.Item>

      <Form.Item
        label="Description"
        name="description"
      >
        <Input />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8, span: 16 }} className='list-btn-footer'>
        <Button type="primary" htmlType="submit">
          Save
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
      </div>
    </Modal>
  </div>
}

const UpdatePassword = () => {
  const user: any = localStorage.getItem('user');
  const userInfo: UserModel = JSON.parse(user);
  const [form] = Form.useForm()
  const [account, setAccount] = useState<UserModel>()
  const [error, setError] = useState(false)
  const [refresh, setRefresh] = useState(0)

  const onFinish = (data: any) => {
    const { password, passwordNew, passwordNewConfirm } = data
    if (passwordNew !== passwordNewConfirm) {
      setError(true)
      return;
    }

    setError(false)
    axios({
      method: 'post',
      url: Command.user.password(userInfo.id),
      headers: {},
      data: {
        password: passwordNew
      }
    })
      .then((response) => {
        if (response.data.code !== '404') {
          notificationSuccess({ description: 'Bạn thay đổi mật khẩu thành công' });
          setRefresh(prev => prev + 1)
          form.setFieldsValue({
            password: passwordNew,
            passwordNew: undefined,
            passwordNewConfirm: undefined
          })
        } else {
          notificationError({ description: response.data.message });
        }
      })
      .catch((error) => {
        alert(error)
      });
  }

  useEffect(() => {
    axios.get(QueryAPI.user.single(userInfo.id))
      .then(res => {
        setAccount(res.data)
      })
      .catch(err => alert(err))
  }, [])

  useEffect(() => {
    form.setFieldsValue({
      password: account?.password ?? undefined,
      passwordNew: undefined,
      passwordNewConfirm: undefined
    })
  }, [account])

  return <div className='form-view-info-container'>
    <Form
      name="basic"
      form={form}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      onFinishFailed={() => { }}
      autoComplete="off"
      className='form-view-info'
    >
      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        label="New Password"
        name="passwordNew"
        rules={[{ required: true, message: 'Please input your new password!' }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        label="New Password Confirm"
        name="passwordNewConfirm"
        rules={[{ required: true, message: 'Please input your confirm password!' }]}
      >
        <Input.Password />
      </Form.Item>
      {error && <div className='error-form'>chưa khớp</div>}
      <Form.Item wrapperCol={{ offset: 8, span: 16 }} className='list-btn-footer'>
        <Button type="primary" htmlType="submit">
          Save
        </Button>
      </Form.Item>
    </Form>
  </div>
}

const UpdateAddress = () => {
  const user: any = localStorage.getItem('user');
  const userInfo: UserModel = JSON.parse(user);

  const [city, setCity] = useState('');
  const [district, setDistrict] = useState('');
  const [ward, setWard] = useState('');
  const [line, setLine] = useState('');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [provinceList, setProvinceList] = useState<any>([]);
  const [districtList, setDistrictList] = useState<any>([]);
  const [wardList, setWardList] = useState<any>([]);
  // const [services, setServices] = useState<any>([]);
  const [form] = Form.useForm()

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const onFinish = (values: any) => {
    if (userInfo.address) {
      axios({
        method: 'post',
        url: Command.address.update(userInfo.id),
        headers: {},
        data: values
      })
        .then((response) => {
          if (response.data.code !== '404') {
            notificationSuccess({ description: 'Bạn đã đổi địa chỉ thành công' });
            // handleSetAddress();
          } else {
            notificationError({ description: response.data.message });
          }
        }, (error) => {
          alert(error)
        });
    } else {
      axios({
        method: 'post',
        url: Command.address.add(userInfo.id),
        headers: {},
        data: values
      })
        .then((response) => {
          if (response.data.code !== '404') {
            notificationSuccess({ description: 'Bạn đã thêm địa chỉ thành công' });
            handleSetAddress();
          } else {
            notificationError({ description: response.data.message });
          }
        }, (error) => {
          alert(error)
        });
    }
  };
  useEffect(() => {
    if (userInfo.address) {
      axios.get(QueryAPI.address.all(userInfo.id))
        .then(res => {
          const { full_name, phone, address, city, district, ward } = res.data;
          setCity(String(city))
          setDistrict(String(district))
          setWard(String(ward))
          setPhone(phone)
          setName(full_name)
          setLine(address)

          form.setFieldsValue({
            phone: phone,
            name: full_name,
          })
        })
        .catch(err => {
          alert(err)
        })
    }
  }, [])

  const handleSetAddress = () => {
    axios.get(QueryAPI.user.single(userInfo.id))
      .then(res => {
        localStorage.setItem('user', JSON.stringify(res.data));
      })
  }
  useEffect(() => {
    axios.get(QueryAPI.province.province())
      .then(res => {
        setProvinceList(res.data.data)
      })
  }, [])

  useEffect(() => {
    if (!city) return
    axios.get(QueryAPI.province.district(city))
      .then(res => {
        setDistrictList(res.data.data)
      })
  }, [city])

  useEffect(() => {
    if (!district) return
    axios.get(QueryAPI.province.ward(district))
      .then(res => {
        setWardList(res.data.data)
      })
  }, [district])

  useEffect(() => {
    form.setFieldsValue({
      address: line,
      city: city ? Number(city) : undefined,
      district: district ? Number(district) : undefined,
      ward: ward ? String(ward) : undefined,
    })
  }, [district, city, ward])

  return <div className='form-view-info-container'>
    <Form
      form={form}
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      className='form-view-info'
    >
      <Form.Item
        label="Full Name"
        name="name"
        rules={[{ required: true, message: 'Please input your name!' }]}
      >
        <Input placeholder='Full Name' />
      </Form.Item>

      <Form.Item
        label="Phone"
        name="phone"
        rules={[{ required: true, message: 'Please input your phone!' }]}
      >
        <Input placeholder='Phone' />
      </Form.Item>

      <Form.Item
        label="City"
        name="city"
        rules={[{ required: true, message: 'Please input your city!' }]}
      >
        <Select
          showSearch
          placeholder="Select a city"
          options={provinceList?.map((item: any) => ({
            label: item.ProvinceName,
            value: item.ProvinceID
          }))}
          value={city}
          onChange={(value) => {
            setCity(value)
            setDistrict('')
            setWard('')
          }}
        />
      </Form.Item>

      <Form.Item
        label="District"
        name="district"
        rules={[{ required: true, message: 'Please input your district!' }]}
      >
        <Select
          showSearch
          disabled={city === ''}
          placeholder="Select a district"
          options={districtList?.map((item: any) => ({
            label: item.DistrictName,
            value: item.DistrictID
          }))}
          value={district}
          onChange={(value) => {
            setDistrict(value)
            setWard('')
          }}
        />
      </Form.Item>

      <Form.Item
        label="Ward"
        name="ward"
        rules={[{ required: true, message: 'Please input your ward!' }]}
      >
        <Select
          showSearch
          disabled={district === ''}
          placeholder="Select a ward"
          options={wardList?.map((item: any) => ({
            label: item.WardName,
            value: item.WardCode
          }))}
          value={ward}
          onChange={(value) => setWard(value)}
        />
      </Form.Item>

      <Form.Item
        label="Address"
        name="address"
        rules={[{ required: true, message: 'Please input your address!' }]}
      >
        <Input placeholder='address' />
      </Form.Item>


      <Form.Item wrapperCol={{ offset: 8, span: 16 }} className='list-btn-footer'>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  </div>
}