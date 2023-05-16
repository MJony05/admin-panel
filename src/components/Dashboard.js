import React, { useState } from "react";
import { Grid, Paper, Typography, makeStyles, Button } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { ProductList } from "./ProductList";
import { AddProductDialog } from "./AddProductDialog";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(3),
  },
  title: {
    marginBottom: theme.spacing(2),
  },
  addButton: {
    marginBottom: theme.spacing(2),
  },
}));

export const Dashboard = () => {
  const classes = useStyles();

  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Product 1",
      description: "This is product 1",
      price: 10.0,
      weight: 0.25,
    },
    {
      id: 2,
      name: "Product 2",
      description: "This is product 2",
      price: 20.0,
      weight: 0.5,
    },
    {
      id: 3,
      name: "Product 3",
      description: "This is product 3",
      price: 30.0,
      weight: 1.0,
    },
  ]);

  const [openAddProductDialog, setOpenAddProductDialog] = useState(false);

  const handleAddProduct = (product) => {
    setProducts([...products, product]);
  };

  const handleDeleteProduct = (productId) => {
    setProducts(products.filter((product) => product.id !== productId));
  };

  const handleOpenAddProductDialog = () => {
    setOpenAddProductDialog(true);
  };

  const handleCloseAddProductDialog = () => {
    setOpenAddProductDialog(false);
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h3" className={classes.title}>
            Products
          </Typography>
          <Button
            variant="contained"
            color="primary"
            className={classes.addButton}
            startIcon={<Add />}
            onClick={handleOpenAddProductDialog}
          >
            Add Product
          </Button>
          <Paper className={classes.paper}>
            <ProductList
              products={products}
              handleEdit={() => {}}
              handleDelete={handleDeleteProduct}
            />
          </Paper>
        </Grid>
      </Grid>
      <AddProductDialog
        open={openAddProductDialog}
        handleClose={handleCloseAddProductDialog}
        handleAddProduct={handleAddProduct}
      />
    </div>
  );
};
