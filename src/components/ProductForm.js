import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
  makeStyles,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  IconButton,
  CircularProgress,
  Box,
} from "@material-ui/core";
import { Add as AddIcon } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    margin: theme.spacing(2),
  },
  textField: {
    margin: theme.spacing(1),
  },
  submitButton: {
    marginTop: theme.spacing(2),
    alignSelf: "center",
  },
  imageWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: theme.spacing(2),
    border: `1px solid ${theme.palette.grey[400]}`,
    borderRadius: theme.shape.borderRadius,
    height: 200,
    position: "relative",
    overflow: "hidden",
  },
  imageInput: {
    display: "none",
  },
  addButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
  },
  loadingIndicator: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
}));

const ProductForm = ({ open, onClose, onSubmit, product }) => {
  const classes = useStyles();
  console.log(product);
  const [name, setName] = useState(product.name);
  console.log(product.name);
  const [description, setDescription] = useState(
    product ? product.description : ""
  );
  const [category, setCategory] = useState(product ? product.category : "");
  const [price, setPrice] = useState(product ? product.price : "");
  const [date, setDate] = useState(product ? product.date : "");
  const [weight, setWeight] = useState(product ? product.weight : "");
  const [number, setNumber] = useState(product ? product.number : "");
  const [image, setImage] = useState(product ? product.image : "");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setName(product.name);
    setDescription(product.description);
    setDate(product.date);
    setPrice(product.price);
    setDate(product.date);
    setCategory(product.category);
    setWeight(product.weight);
    setNumber(product.number);
    setImage(product.image);
  }, [
    product.name,
    product.description,
    product.date,
    product.weight,
    product.number,
    product.image,
    product.price,
    product.category,
  ]);
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleWeightChange = (event) => {
    setWeight(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNumber(event.target.value);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setLoading(true);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImage(reader.result);
        setLoading(false);
      };
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newProduct = {
      id: product ? product.id : null,
      name,
      description,
      category,
      price,
      date,
      weight,
      number,
      image,
    };
    onSubmit(newProduct);
  };

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">
        {product ? "Edit Product" : "Add Product"}
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit} className={classes.form}>
          <TextField
            id="name"
            label="Name"
            variant="outlined"
            value={name}
            onChange={handleNameChange}
            required
            className={classes.textField}
          />
          <TextField
            id="description"
            label="Description"
            variant="outlined"
            value={description}
            onChange={handleDescriptionChange}
            multiline
            rows={3}
            required
            className={classes.textField}
          />
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormControl variant="outlined" className={classes.textField}>
                <InputLabel id="category-label">Category</InputLabel>
                <Select
                  labelId="category-label"
                  id="category"
                  value={category}
                  onChange={handleCategoryChange}
                  label="Category"
                  required
                >
                  <MenuItem value="electronics">Electronics</MenuItem>
                  <MenuItem value="clothing">Clothing</MenuItem>
                  <MenuItem value="books">Books</MenuItem>
                  <MenuItem value="home">Home</MenuItem>
                  <MenuItem value="sports">Sports</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="price"
                label="Price"
                variant="outlined"
                value={price}
                onChange={handlePriceChange}
                type="number"
                required
                className={classes.textField}
                InputProps={{
                  startAdornment: <Typography variant="body1">$</Typography>,
                }}
              />
            </Grid>
          </Grid>
          <TextField
            id="date"
            label="Date"
            variant="outlined"
            value={date}
            onChange={handleDateChange}
            type="date"
            required
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                id="weight"
                label="Weight (kg)"
                variant="outlined"
                value={weight}
                onChange={handleWeightChange}
                type="number"
                required
                className={classes.textField}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="number"
                label="Number in stock"
                variant="outlined"
                value={number}
                onChange={handleNumberChange}
                type="number"
                required
                className={classes.textField}
              />
            </Grid>
          </Grid>
          <div className={classes.imageWrapper}>
            {loading ? (
              <CircularProgress
                size={60}
                className={classes.loadingIndicator}
              />
            ) : image ? (
              <img
                src={image}
                alt="Product"
                style={{ height: "100%", width: "100%", objectFit: "cover" }}
              />
            ) : (
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                height="100%"
                width="100%"
              >
                <Typography variant="h6" component="span">
                  Add an image
                </Typography>
                <IconButton
                  component="label"
                  htmlFor="image-input"
                  className={classes.addButton}
                >
                  <AddIcon />
                </IconButton>
                <input
                  type="file"
                  id="image-input"
                  accept="image/*"
                  className={classes.imageInput}
                  onChange={handleImageChange}
                />
              </Box>
            )}
          </div>
          <DialogActions>
            <Button onClick={onClose} color="primary">
              Cancel
            </Button>
            <Button
              type="submit"
              color="primary"
              variant="contained"
              className={classes.submitButton}
            >
              {product ? "Save" : "Add"}
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProductForm;
