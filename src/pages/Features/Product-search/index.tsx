import { Pagination, PaginationProps } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { QueryAPI } from '../../../access';
import { Category, ProductItem } from '../../../components';
import { ProductModel } from '../../../model';
import {SearchOutlined} from '@ant-design/icons'
import './style.scss';

export function ProductSearch() {
    const { keyword } = useParams<any>();
    const [productList, setProductList] = useState<ProductModel[]>([])
    const [current, setCurrent] = useState(1);

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
                <div className='product-list'>
                {productList.slice((current - 1) * 12, current * 12).map(item => {
                    return <ProductItem data={item} />
                })}
                </div>
                {productList.length > 12 && <div className='paginator-container'>
                    <Pagination current={current} onChange={onChange} pageSize={12} total={productList.length} />
                </div>}
            </div>
        </div>
    )
}
