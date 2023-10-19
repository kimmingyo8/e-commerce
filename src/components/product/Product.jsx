'use client';

import useFetchCollection from '@/hooks/useFetchCollection';
import React, { useEffect } from 'react';
import styles from './Product.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import {
  GET_PRICE_RANGE,
  STORE_PRODUCTS,
  selectProducts,
} from '@/redux/slice/productSlice';
import Loader from '../loader/Loader';
import ProductList from './ProductList/ProductList';
import ProductFilter from './ProductFilter/ProductFilter';

const Product = () => {
  const { data, isLoading } = useFetchCollection('products');

  const dispath = useDispatch();

  useEffect(() => {
    dispath(
      STORE_PRODUCTS({
        products: data,
      }),
    );

    dispath(
      GET_PRICE_RANGE({
        products: data,
      }),
    );
  }, [data, dispath]);

  const products = useSelector(selectProducts);

  return (
    <section className={styles.product}>
      <aside className={styles.filter}>
        {isLoading ? null : <ProductFilter />}
      </aside>
      <div className={styles.content}>
        {isLoading ? <Loader /> : <ProductList />}
      </div>
    </section>
  );
};

export default Product;
