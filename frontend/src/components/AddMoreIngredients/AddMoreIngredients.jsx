import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import AuthContext from "../../context/AuthContext";
import {
  Typography,
  Button,
  ButtonGroup,
  Container,
  Grid,
} from "@mui/material";

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
      <Typography
        variant="h4"
        component="h3"
        color="secondary"
        gutterBottom={true}
      >
        Edit Ingredients
      </Typography>
      {formValues.map((element, index) => (
        <Grid container direction="column" className="form-inline" key={index}>
          <Typography
            variant="h5"
            component="h4"
            gutterBottom={true}
            color="error"
          >
            Ingredient
          </Typography>
          <Typography
            variant="h5"
            component="label"
            color="primary"
            htmlFor="ingredient_name"
          >
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
            variant="h5"
            component="label"
            color="primary"
            htmlFor="ingredient_amount"
          >
            Amount
          </Typography>
          <input
            type="number"
            id="ingredient_amount"
            name="amount"
            value={element.amount || ""}
            color="primary"
            onChange={(e) => handleChange(index, e)}
          />
          <Typography
            variant="h5"
            component="label"
            color="primary"
            htmlFor="ingredient_unit"
          >
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
            sx={{
              backgroundImage:
                "linear-gradient(to right, hsl(28deg 82% 48%), hsl(20deg 96% 28%))",
              borderColor: "none",
            }}
          >
            Remove
          </Button>
        </Grid>
      ))}
      <div className="button-section">
        <Button
          className="button add"
          variant="contained"
          color="primary"
          type="button"
          sx={{
            margin: 2.5,
            backgroundImage:
              "linear-gradient(to right, hsl(150deg, 80%, 40%), hsl(181deg, 80%, 20%))",
          }}
          onClick={() => addFormFields()}
        >
          Add
        </Button>
      </div>
    </Container>
  );
};

export default AddMoreIngredients;
