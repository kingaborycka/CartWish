import React from 'react'

import "./ProductsList.css"
import useData from '../../hooks/useData';
import { ProductCard } from './ProductCard'

const ProductsList = () => {
  const {data, error} = useData("/products")

  return (
    <section className="products_list_section">
        <header className="align_center products_list_header">
            <h2>Products</h2>
            <select name="sort" id="" className="products_sorting">
                <option value="">Relevance</option>
                <option value="price desc">Price HIGH to LOW</option>
                <option value="price asc">Price LOW to HIGH</option>
                <option value="rate asc">Rate HIGH to LOW</option>
                <option value="rate desc">Rate LOW to HIGH</option>
            </select>
        </header>

        <div className="products_list">
          {error && <em className='form_error'>{error}</em>}
          {data?.products && data.products.map(product => <ProductCard key={product._id} 
          id={product.id} 
          image={product.images[0]} 
          price={product.price} 
          title={product.title} 
          rating={product.reviews.rate} 
          ratingCounts={product.reviews.counts}
          stock={product.stock}/>)}
        </div>
    </section>
  )
}

export default ProductsList