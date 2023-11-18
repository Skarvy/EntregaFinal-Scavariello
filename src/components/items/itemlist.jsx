import React from 'react';
import Item from './Items';

export default function ItemList({ data }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {data.map((item) => (
        <Item key={item.id} item={item} />
      ))}
    </div>
  );
}