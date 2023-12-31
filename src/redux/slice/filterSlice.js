const { createSlice } = require('@reduxjs/toolkit');

const initialState = {
  filteredProducts: [],
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    FILTER_BY_CATEGORY: (state, action) => {
      const { products, category } = action.payload;
      let tempProduct = [];
      if (category === 'All') {
        tempProduct = products;
      } else {
        tempProduct = products.filter(
          (product) => product.category === category,
        );
      }
      state.filteredProducts = tempProduct;
    },
    FILTER_BY_BRAND: (state, action) => {
      const { products, brand } = action.payload;
      let tempProduct = [];
      if (brand === 'All') {
        tempProduct = products;
      } else {
        tempProduct = products.filter((product) => product.brand === brand);
      }
      state.filteredProducts = tempProduct;
    },
    FILTER_BY_PRICE: (state, action) => {
      const { products, price } = action.payload;
      let tempProducts = [];

      tempProducts = products.filter((product) => product.price <= price);
    },

    FILTER_BY: (state, action) => {
      const { products, price, brand, category } = action.payload;
      let tempProducts = [];

      if (category === 'All') {
        tempProducts = products;
      } else {
        tempProducts = products.filter(
          (product) => product.category === category,
        );
      }
      if (brand === 'All') {
        tempProducts = tempProducts;
      } else {
        tempProducts = tempProducts.filter(
          (product) => product.brand === brand,
        );
      }

      tempProducts = tempProducts.filter((product) => product.price <= price);
      state.filteredProducts = tempProducts;
    },
    SORT_PRODUCTS: (state, action) => {
      const { products, sort } = action.payload;
      let tempProducts = [];

      if (sort === 'latest') {
        tempProducts = products;
      }
      if (sort === 'lowest-price') {
        tempProducts = products.slice().sort((a, b) => {
          return a.price - b.price;
        });
      }
      if (sort === 'highest-price') {
        tempProducts = products.slice().sort((a, b) => {
          return b.price - a.price;
        });
      }

      state.filteredProducts = tempProducts;
    },
  },
});

export const {
  FILTER_BY_BRAND,
  FILTER_BY_CATEGORY,
  FILTER_BY_PRICE,
  FILTER_BY,
  SORT_PRODUCTS,
} = filterSlice.actions;

export const selectFilteredProducts = (state) => state.filter.filteredProducts;

export default filterSlice.reducer;
