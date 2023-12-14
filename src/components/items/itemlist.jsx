import React from 'react';
import Item from './Item';
import { Grid } from '@mui/material';

export default function ItemList({ data }) {
  return (
    <Grid container spacing={2} justifyContent="center">
      {data.map((item) => (
        <Grid item key={item.id}>
          <Item item={item} />
        </Grid>
      ))}
    </Grid>
  );
}
