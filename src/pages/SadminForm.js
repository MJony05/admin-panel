import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  makeStyles,
} from "@material-ui/core";

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
  const [name, setName] = useState(product.name);

  const [sname, setSname] = useState(product ? product.sname : "");
  const [age, setAge] = useState(product ? product.age : "");
  const [username, setUsername] = useState(product ? product.username : "");
  const [password, setPassword] = useState(product ? product.password : "");
  useEffect(() => {
    setName(product.name);
    setSname(product.sname);
    setAge(product.age);
    setUsername(product.username);
    setPassword(product.password);
  }, [
    product.name,
    product.sname,
    product.age,
    product.password,
    product.username,
  ]);
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleSnameChange = (event) => {
    setSname(event.target.value);
  };

  const handleAgeChange = (event) => {
    setAge(event.target.value);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newProduct = {
      id: product ? product.id : null,
      name,
      sname,
      age,
      username,
      password,
    };
    onSubmit(newProduct);
    setName("");
    setSname("");
    setAge("");
    setUsername("");
    setPassword("");
  };

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">
        {product ? "Edit Admin" : "Add Admin"}
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
            id="surname"
            label="Surname"
            variant="outlined"
            value={sname}
            onChange={handleSnameChange}
            multiline
            rows={3}
            required
            className={classes.textField}
          />

          <TextField
            id="age"
            label="Age"
            variant="outlined"
            value={age}
            onChange={handleAgeChange}
            type="number"
            required
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            id="username"
            label="Username"
            variant="outlined"
            value={username}
            onChange={handleUsernameChange}
            type="text"
            required
            className={classes.textField}
          />
          <TextField
            id="password"
            label="Password"
            variant="outlined"
            value={password}
            onChange={handlePasswordChange}
            type="text"
            required
            className={classes.textField}
          />

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
