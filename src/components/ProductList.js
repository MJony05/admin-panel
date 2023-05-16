import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  makeStyles,
} from "@material-ui/core";
import { Product } from "./Product";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
}));

export const ProductList = ({ products, handleEdit, handleDelete }) => {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="Product List">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Weight</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <Product
              key={product.id}
              product={product}
              handleEdit={() => handleEdit(product)}
              handleDelete={() => handleDelete(product.id)}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
