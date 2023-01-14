import { Pagination, PaginationProps } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { QueryAPI } from '../../../access';
import { Category, ProductItem } from '../../../components';
import { ProductModel } from '../../../model';
import './style.scss'

export function ProductCategory() {
    const { category } = useParams<any>();
    const [productList, setProductList] = useState<ProductModel[]>([])
    const [current, setCurrent] = useState(1);

    useEffect(() => {
        if (!category) return
        axios.get(QueryAPI.product.productCategory(category))
            .then((res) => {
                setProductList(res.data)
            })
            .catch((err) => {
                alert(err)
            })
    }, [category])

    const onChange: PaginationProps['onChange'] = (page) => {
        setCurrent(page);
    };

    return (
        <div className='container product-category-container'>
            <div className='category-container'>
                <Category type='vertical' />
            </div>
            <div className='product-list-container'>
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
