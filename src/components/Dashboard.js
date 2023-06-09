import React, { useState } from "react";
import {
  Container,
  makeStyles,
  Typography,
  Button,
  TextField,
} from "@material-ui/core";
import ProductList from "./ProductList";
import ProductForm from "./ProductForm";

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

const productsData = [
  {
    id: 1,
    name: "olma",
    description: "This is the first product",
    price: 9.99,
    date: "2023-05-17",
    weight: "0.5",
    number: 10,
    image: "",
    category: "electronics",
  },
  {
    id: 2,
    name: "behi",
    description: "This is the second product",
    price: 19.99,
    date: "2023-05-18",
    weight: "1",
    number: 5,
    image: "",
    category: "electronics",
  },
  {
    id: 3,
    name: "printer",
    description: "This is the first product",
    price: 9.99,
    date: "2023-05-17",
    weight: "0.5",
    number: 10,
    image: "",
    category: "electronics",
  },
  {
    id: 4,
    name: "sichqoncha",
    description: "This is the second product",
    price: 19.99,
    date: "2023-05-18",
    weight: "1",
    number: 5,
    image: "",
    category: "electronics",
  },
];
const Dashboard = ({ userId }) => {
  console.log(userId);
  const classes = useStyles();
  const [products, setProducts] = useState(productsData);
  const [productFormOpen, setProductFormOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [value, setValue] = useState("");

  const handleAddProduct = () => {
    setSelectedProduct("");
    setProductFormOpen(true);
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setProductFormOpen(true);
  };
  const handleChangee = (e) => {
    setValue(e.target.value);
  };

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
        Product List
      </Typography>
      {userId === "admin" ? (
        <div
          style={{
            display: "flex",
            margin: "5px",
          }}
        >
          <Button onClick={handleAddProduct} className={classes.addButton}>
            Add Product
          </Button>
          <Button className={classes.addButton}>Hisobot</Button>
          <Button className={classes.addButton}>Sprafka</Button>
          <TextField
            id="name"
            label="filter"
            variant="outlined"
            className={classes.textField}
            onChange={(e) => handleChangee(e)}
          />
        </div>
      ) : (
        <Button onClick={handleAddProduct} className={classes.addButton}>
          Add Product
        </Button>
      )}
      <ProductList
        products={products.filter((product) => product.name.includes(value))}
        onEditProduct={handleEditProduct}
        onDeleteProduct={handleDeleteProduct}
        onProductSelect={handleProductSelect}
        setSelectedProduct={setSelectedProduct}
      />

      <ProductForm
        open={productFormOpen}
        onClose={() => setProductFormOpen(false)}
        onSubmit={handleSubmitProductForm}
        product={selectedProduct}
      />
    </Container>
  );
};

export default Dashboard;
