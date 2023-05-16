import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  formControl: {
    marginTop: theme.spacing(2),
    minWidth: 120,
  },
}));

export const AddProductDialog = ({ open, handleClose, handleAddProduct }) => {
  const classes = useStyles();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [weight, setWeight] = useState("");
  const [nameError, setNameError] = useState(false);
  const [priceError, setPriceError] = useState(false);

  const handleNameChange = (event) => {
    setName(event.target.value);
    setNameError(false);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
    setPriceError(false);
  };

  const handleWeightChange = (event) => {
    setWeight(event.target.value);
  };

  const handleAdd = () => {
    if (name.trim() === "") {
      setNameError(true);
      return;
    }

    if (price.trim() === "" || isNaN(price)) {
      setPriceError(true);
      return;
    }

    const newProduct = {
      id: Math.floor(Math.random() * 1000) + 1,
      name: name.trim(),
      description: description.trim(),
      price: parseFloat(price),
      weight: parseFloat(weight),
    };

    handleAddProduct(newProduct);

    setName("");
    setDescription("");
    setPrice("");
    setWeight("");
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add Product</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Name"
          fullWidth
          value={name}
          onChange={handleNameChange}
          error={nameError}
          helperText={nameError && "Please enter a name"}
        />
        <TextField
          margin="dense"
          label="Description"
          fullWidth
          value={description}
          onChange={handleDescriptionChange}
        />
        <TextField
          margin="dense"
          label="Price"
          fullWidth
          value={price}
          onChange={handlePriceChange}
          error={priceError}
          helperText={priceError && "Please enter a valid price"}
        />
        <FormControl className={classes.formControl}>
          <InputLabel>Weight</InputLabel>
          <Select value={weight} onChange={handleWeightChange}>
            <MenuItem value={0.25}>0.25 kg</MenuItem>
            <MenuItem value={0.5}>0.5 kg</MenuItem>
            <MenuItem value={1}>1 kg</MenuItem>
            <MenuItem value={2}>2 kg</MenuItem>
            <MenuItem value={5}>5 kg</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleAdd} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};
