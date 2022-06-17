import React, { useState } from "react";
import {
  Typography,
  Button,
  ButtonGroup,
  Icon,
  Container,
  Grid,
} from "@mui/material";
import { TextField } from "@mui/material";

const Testing = (props) => {
  const [formValues, setFormValues] = useState([
    { name: "", amount: 0, unit: "" },
  ]);
  //  changes state for formValues above.
  let handleChange = (i, e) => {
    let newFormValues = [...formValues];
    newFormValues[i][e.target.name] = e.target.value;
    setFormValues(newFormValues);
    props.setIngredients(newFormValues);
  };
  // Add a field to the form
  let addFormFields = () => {
    setFormValues([...formValues, { name: "", amount: 0, unit: "" }]);
  };
  // remove a field from the form
  let removeFormFields = (i) => {
    let newFormValues = [...formValues];
    newFormValues.splice(i, 1);
    setFormValues(newFormValues);
  };

  let handleSubmit = (event) => {
    event.preventDefault();
    alert(JSON.stringify(formValues));
  };

  return (
    <Container>
      {formValues.map((element, index) => (
        <Grid container key={index} direction="column">
          <Typography
            variant="h4"
            component="h3"
            color="primary"
            gutterBottom={true}
            sx={{
              marginTop: "2rem",
            }}
          >
            Add Ingredients
          </Typography>

          <Typography variant="h5" component="label" color="error">
            Ingredient
          </Typography>
          <Typography
            variant="h5"
            component="label"
            htmlFor="ingredient_name"
            color="primary"
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
            htmlFor="ingredient_amount"
            color="primary"
          >
            Amount
          </Typography>
          <input
            type="number"
            id="ingredient_amount"
            name="amount"
            value={element.amount || ""}
            onChange={(e) => handleChange(index, e)}
            styles={{
              width: 50,
            }}
          />
          <Typography
            variant="h5"
            component="label"
            htmlFor="ingredient_unit"
            color="primary"
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
          {index ? (
            <Button
              type="button"
              variant="contained"
              color="success"
              className="button remove"
              onClick={() => removeFormFields(index)}
              sx={{
                margin: 2.5,
              }}
            >
              Remove
            </Button>
          ) : null}
        </Grid>
      ))}
      <div className="button-section">
        <Button
          className="button add"
          variant="contained"
          type="button"
          onClick={() => addFormFields()}
          sx={{
            margin: 2.5,
          }}
        >
          Add
        </Button>
      </div>
    </Container>
  );
};

export default Testing;
