import React from 'react'

import "./ProductsPage.css"
import ProductsList from './ProductsList';
import { ProductsSidebar } from './ProductsSidebar';

const ProductsPage = () => {
  return (
    <section className='products_page'>
        <ProductsSidebar />
        <ProductsList />
    </section>
    )
}

export default ProductsPage