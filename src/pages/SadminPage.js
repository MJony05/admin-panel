import React, { useState } from "react";
import { Container, makeStyles, Typography, Button } from "@material-ui/core";
import SadminList from "./SadminList";
import SadminForm from "./SadminForm";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  title: {
    marginBottom: theme.spacing(2),
  },
  addButton: {
    margin: theme.spacing(2),
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    "&:hover": {
      backgroundColor: theme.palette.common.white,
      color: theme.palette.primary.main,
    },
  },
}));

const adminData = [
  {
    id: 1,
    name: "Jonibek",
    sname: "Munirov",
    age: "20",
    username: "jony",
    password: "jony123",
  },
  {
    id: 2,
    name: "Sherzod",
    sname: "Abduhakimov",
    age: "21",
    username: "sher",
    password: "sher123",
  },
];
const SadminPage = () => {
  const classes = useStyles();
  const [products, setProducts] = useState(adminData);
  const [productFormOpen, setProductFormOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState("");

  const handleAddProduct = () => {
    setSelectedProduct("");
    setProductFormOpen(true);
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setProductFormOpen(true);
  };
  // const handleChangee = (e) => {
  //   setValue(e.target.value);
  // };

  const handleDeleteProduct = (productId) => {
    setProducts(products.filter((product) => product.id !== productId));
  };

  const handleSubmitProductForm = (product) => {
    if (product.id) {
      setProducts(products.map((p) => (p.id === product.id ? product : p)));
    } else {
      const newProductId =
        products.length > 0 ? products[products.length - 1].id + 1 : 1;
      setProducts([...products, { ...product, id: newProductId }]);
    }
    setProductFormOpen(false);
  };

  const handleProductSelect = (productId) => {
    const product = products.find((product) => product.id === productId);
    setSelectedProduct(product);
  };

  return (
    <Container maxWidth="md" className={classes.container}>
      <Typography variant="h3" component="h1" className={classes.title}>
        Admin List
      </Typography>

      <Button onClick={handleAddProduct} className={classes.addButton}>
        Add Admin
      </Button>
      <SadminList
        products={products}
        onEditProduct={handleEditProduct}
        onDeleteProduct={handleDeleteProduct}
        onProductSelect={handleProductSelect}
        setSelectedProduct={setSelectedProduct}
      />

      <SadminForm
        open={productFormOpen}
        onClose={() => setProductFormOpen(false)}
        onSubmit={handleSubmitProductForm}
        product={selectedProduct}
      />
    </Container>
  );
};

export default SadminPage;
