import { Empty, Pagination, PaginationProps } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { QueryAPI } from '../../../access';
import { Category, ProductItem } from '../../../components';
import { ProductModel } from '../../../model';
import { SearchOutlined } from '@ant-design/icons'
import './style.scss';
import { UserModel } from '../../../model/user';
import { HeaderItem } from '../../../components/HeaderItem';

export function ProductSearch() {
    const { keyword } = useParams<any>();
    const [productList, setProductList] = useState<ProductModel[]>([])
    const [productListTopRate, setProductListTopRate] = useState<ProductModel[]>([])
    const [current, setCurrent] = useState(1);
    const [loading, setLoading] = useState<boolean>(false)
    const user: any = localStorage.getItem('user');
    const userInfo: UserModel = JSON.parse(user);

    useEffect(() => {
        if (!keyword) return
        axios.get(QueryAPI.product.search(keyword))
            .then((res) => {
                setProductList(res.data)
            })
            .catch((err) => {
                alert(err)
            })
    }, [keyword])

    useEffect(() => {
        setLoading(true)
        axios.get(QueryAPI.product.topRate())
            .then(res => {
                setLoading(false)
                setProductListTopRate(res.data)
            })
            .catch(err => {
                setLoading(false)
                console.log(err)
            })
    }, [])

    const onChange: PaginationProps['onChange'] = (page) => {
        setCurrent(page);
    };

    return (
        <div className='container product-category-container'>
            <div className='category-container'>
                <Category type='vertical' />
            </div>
            <div className='product-list-container'>
                <div className='key-search-label'>
                    <SearchOutlined />
                    Kết quả tìm kiếm cho từ khoá
                    <span className='key-word'>'{keyword}'</span>
                </div>

                {productList.length > 0
                    ? <div className='product-list'>{productList.slice((current - 1) * 12, current * 12).map(item => {
                        return <ProductItem data={item} />
                    })}</div>
                    : <Empty />}
                {productList.length === 0 && productListTopRate.length > 0 &&
                    <>
                        <HeaderItem content='Product Top Rate' />
                        <div className='product-list'>
                            {productListTopRate.slice((current - 1) * 12, current * 12).map(item => {
                                return <ProductItem data={item} />
                            })}
                        </div>
                        {productListTopRate.length > 12 && <div className='paginator-container'>
                            <Pagination current={current} onChange={onChange} pageSize={12} total={productListTopRate.length} />
                        </div>}
                    </>}
                {productList.length > 12 && <div className='paginator-container'>
                    <Pagination current={current} onChange={onChange} pageSize={12} total={productList.length} />
                </div>}
            </div>
        </div>
    )
}
