import React, { useEffect } from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks/useTypedHooks';
import { getProducts } from '../../features/products/productsSlice';
import { Product } from 'features/products/productTypes';

const ProductList = () => {
	const dispatch = useAppDispatch();
	const {items, loading, error} = useAppSelector(state => state.products);
  
	useEffect(() => {
		dispatch(getProducts());
	},[dispatch]);

	if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
	
	return (
    <div>
			{items.map((product:Product) => (
        <div key={product.id}>
          {product.title} - ${product.price}
        </div>
      ))}
		</div>
  )
}

export default ProductList;