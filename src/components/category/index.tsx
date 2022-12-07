import axios from "axios";
import React, { useEffect, useState } from "react";
import { QueryAPI } from "../../access";
import { CategoryModel } from "../../model";
import './style.scss'

export const Category = () => {
    const [categoryList, setCategoryList] = useState<CategoryModel[]>([]);

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
        <h2 className="product-heading">Danh mục</h2>
            <ul className="category-list">
                {categoryList.map(category => {
                    return <li className="category-item">
                    <img src={category.image} alt={category.display_category} />
                    <span className="title">{category.display_category}</span>
                </li>
                })}
            </ul>
        </div>
    </div>
}