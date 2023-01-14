import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { QueryAPI } from "../../access";
import { CategoryModel } from "../../model";
import './style.scss'

export const Category = ({ type }: { type?: 'vertical' | 'horizontal' }) => {
    const [categoryList, setCategoryList] = useState<CategoryModel[]>([]);
    const { category } = useParams<any>();
    console.log("🚀 ~ file: index.tsx:11 ~ Category ~ category", category)

    useEffect(() => {
        axios.get(QueryAPI.category.all())
            .then(res => {
                setCategoryList(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    return <div className="category-container">
        <div className="container category-wrap">
            <h2 className="product-heading">Categories</h2>
            <ul className={`category-list ${type === 'vertical' ? 'vertical' : ''}`}>
                {categoryList.map(categoryItem => {
                    return <Link to={`/product-category/${categoryItem.id}`} className={`category-item ${Number(categoryItem.id) === Number(category) ? 'active' : ''}`}>
                        <img src={categoryItem.image} alt={categoryItem.display_category} />
                        <span className="title">{categoryItem.display_category}</span>
                    </Link>
                })}
            </ul>
        </div>
    </div>
}