import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  makeStyles,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  header: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  actions: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  editButton: {
    marginRight: theme.spacing(1),
    backgroundColor: theme.palette.common.white,
    color: theme.palette.primary.main,
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
    },
  },
  deleteButton: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.common.white,
    "&:hover": {
      backgroundColor: theme.palette.error.dark,
    },
  },
}));

const ProductList = ({
  products,
  onEditProduct,
  onDeleteProduct,
  setSelectedProduct,
}) => {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="product table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.header}>Name</TableCell>
            <TableCell className={classes.header}>Description</TableCell>
            <TableCell className={classes.header}>Price</TableCell>
            <TableCell className={classes.header}>Date</TableCell>
            <TableCell className={classes.header}>Weight</TableCell>
            <TableCell className={classes.header}>Number</TableCell>
            <TableCell className={classes.header} align="center">
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell component="th" scope="row">
                {product.name}
              </TableCell>
              <TableCell>{product.description}</TableCell>
              <TableCell>${Number(product.price).toFixed(2)}</TableCell>
              <TableCell>
                {new Date(product.date).toLocaleDateString()}
              </TableCell>
              <TableCell>{product.weight} kg</TableCell>
              <TableCell>{product.number}</TableCell>
              <TableCell className={classes.actions} align="center">
                <Button
                  variant="contained"
                  className={classes.editButton}
                  startIcon={<EditIcon />}
                  onClick={() => {
                    onEditProduct(product);
                    // console.log(product);
                  }}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  className={classes.deleteButton}
                  startIcon={<DeleteIcon />}
                  onClick={() => onDeleteProduct(product.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProductList;
