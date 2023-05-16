import React, { useState } from "react";
import {
  TableRow,
  TableCell,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@material-ui/core";
import { Delete, Edit } from "@material-ui/icons";

export const Product = ({ product, handleEdit, handleDelete }) => {
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [name, setName] = useState(product.name);
  const [description, setDescription] = useState(product.description);
  const [price, setPrice] = useState(product.price);
  const [weight, setWeight] = useState(product.weight);

  const handleOpenEditDialog = () => {
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleWeightChange = (event) => {
    setWeight(event.target.value);
  };

  const handleSave = () => {
    const editedProduct = {
      ...product,
      name,
      description,
      price,
      weight,
    };

    handleEdit(editedProduct);

    handleCloseEditDialog();
  };

  return (
    <>
      <TableRow key={product.id}>
        <TableCell>{product.name}</TableCell>
        <TableCell>{product.description}</TableCell>
        <TableCell>{product.price}</TableCell>
        <TableCell>{product.weight} kg</TableCell>
        <TableCell align="right">
          <IconButton aria-label="edit" onClick={handleOpenEditDialog}>
            <Edit />
          </IconButton>
          <IconButton aria-label="delete" onClick={handleDelete}>
            <Delete />
          </IconButton>
        </TableCell>
      </TableRow>
      <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
        <DialogTitle>Edit Product</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            fullWidth
            value={name}
            onChange={handleNameChange}
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
          />
          <TextField
            margin="dense"
            label="Weight"
            fullWidth
            value={weight}
            onChange={handleWeightChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
