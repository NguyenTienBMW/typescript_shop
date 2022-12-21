import { Pagination, PaginationProps } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { QueryAPI } from '../../../access';
import { BreadCrumb, ProductItem } from '../../../components';
import { ProductModel, ShopModel } from '../../../model';
import './style.scss';

export function ViewShop() {
    const { shopId } = useParams<any>();
    const [productList, setProductList] = useState<ProductModel[]>([])
    const [shop, setShop] = useState<ShopModel>()
    const [current, setCurrent] = useState(1);

    useEffect(() => {
        if (!shopId) return
        axios.get(QueryAPI.product.shopProduct(shopId))
            .then((res) => {
                setProductList(res.data)
            })
            .catch((err) => {
                alert(err)
            })
    }, [shopId])

    useEffect(() => {
		if(!shopId) return
		axios.get(QueryAPI.shop.signleWithshopId(shopId))
			.then(res => {
				setShop(res.data.data)
			})
			.catch(err => {
				console.log(err)
			})
	}, [shopId])

    const onChange: PaginationProps['onChange'] = (page) => {
        setCurrent(page);
    };

    return (
        <div className='view-shop-container'>
			<BreadCrumb shop={shop} hideButton/>
            <div className='product-list-container container'>
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
