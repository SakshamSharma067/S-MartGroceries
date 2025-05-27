import React from 'react'
import ProductCard from './ProductCard'
import { useAppContext } from '../context/AppContext';

const BestSeller = () => {
    const { products } = useAppContext();
  return (
    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6 lg:grid-cols-5'>
      {products.filter((product)=> product.inStock).slice(0,5).map((product, index)=>(
          <ProductCard key={index} product={product}/>
      ))}
    </div>
  )
}

export default BestSeller
