import React from 'react';

const OrderDetailsPage = ({ params, searchParams }) => {
  const { hello } = searchParams;
  const { id } = params;

  console.log(id);
  return (
    <div>
      {id}
      {hello}
    </div>
  );
};

export default OrderDetailsPage;
