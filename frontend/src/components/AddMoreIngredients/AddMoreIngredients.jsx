import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import AuthContext from "../../context/AuthContext";
import { Typography, Button, ButtonGroup, Container } from "@mui/material";

// TODO List:

// Create a form component to hold this form values WORKING ON IT
// Create a function to make a POST request to add the recipes WORKING ON IT
// Pull in the necessary pieces of state for the POST request WORKING ON IT

const AddMoreIngredients = (props) => {
  const { user, setUser } = useContext(AuthContext);
  const [formValues, setFormValues] = useState(props.ingredients);

  //   define BASE URL
  const BASE = `http://localhost:5000/api`;

  //   define modified JSON array for Ingredients
  let ingredients_lst = JSON.stringify(formValues);
  // console.log(formValues);

  let newIngredients = [...formValues];
  let unspreadNewIngredients = [formValues];

  //  changes state for formValues above.
  let handleChange = (i, e) => {
    let newFormValues = [...formValues];
    newFormValues[i][e.target.name] = e.target.value;
    setFormValues(newFormValues);
    props.setEditIngredients(newFormValues);
  };
  // Add a field to the form
  let addFormFields = () => {
    setFormValues([...formValues, { name: "", amount: 0, unit: "" }]);
    props.setEditIngredients([
      ...formValues,
      { name: "", amount: 0, unit: "" },
    ]);
  };
  // remove a field from the form
  let removeFormFields = (i) => {
    let newFormValues = [...formValues];
    newFormValues.splice(i, 1);
    setFormValues(newFormValues);
    props.setEditIngredients(newFormValues);
  };

  return (
    <Container>
      <Typography variant="h3" component="h2" gutterBottom={true}>
        Edit Ingredients
      </Typography>
      {formValues.map((element, index) => (
        <div className="form-inline" key={index}>
          <Typography variant="h4" component="h4" gutterBottom={true}>
            Ingredient
          </Typography>
          <Typography variant="label" component="h2" htmlFor="ingredient_name">
            Name
          </Typography>
          <input
            type="text"
            id="ingredient_name"
            name="name"
            value={element.name || ""}
            onChange={(e) => handleChange(index, e)}
          />
          <Typography
            variant="label"
            component="h2"
            htmlFor="ingredient_amount"
          >
            Amount
          </Typography>
          <input
            type="number"
            id="ingredient_amount"
            name="amount"
            value={element.amount || ""}
            onChange={(e) => handleChange(index, e)}
          />
          <Typography variant="label" component="h2" htmlFor="ingredient_unit">
            Unit of Measure
          </Typography>
          <input
            type="text"
            id="ingredient_unit"
            name="unit"
            value={element.unit || ""}
            onChange={(e) => handleChange(index, e)}
          />

          <Button
            type="button"
            className="button remove"
            variant="contained"
            color="success"
            onClick={() => removeFormFields(index)}
          >
            Remove
          </Button>
        </div>
      ))}
      <div className="button-section">
        <Button
          className="button add"
          variant="contained"
          color="primary"
          type="button"
          onClick={() => addFormFields()}
        >
          Add
        </Button>
      </div>
    </Container>
  );
};

export default AddMoreIngredients;
