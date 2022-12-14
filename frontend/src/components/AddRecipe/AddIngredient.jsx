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
          <span
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              marginBottom: "25px",
            }}
          >
            <Typography
              variant="h4"
              component="h3"
              color="primary"
              gutterBottom={true}
              sx={{
                marginTop: "2rem",
                // display: "flex",
                // flexDirection: "row",
                // justifyContent: "flex-start",
                // marginBottom: "25px",
              }}
            >
              Add Ingredients
            </Typography>
          </span>
          <div
            style={{
              display: "inline-flex",
              marginBottom: "36px",
              justifyContent: "flex-start",
              flexWrap: "wrap",
              flexDirection: "row",
            }}
          >
            <Typography variant="h4" component="label" color="error">
              Ingredient
            </Typography>
          </div>
          <Typography
            variant="h5"
            component="label"
            htmlFor="ingredient_name"
            color="primary"
            sx={{
              display: "inline-flex",
              justifyContent: " flex-start",
              flexWrap: "wrap",
              marginBottom: "8px",
            }}
          >
            Name
          </Typography>
          <TextField
            type="text"
            id="ingredient_name"
            size="small"
            variant="outlined"
            name="name"
            placeholder="Enter an ingredient name"
            value={element.name || ""}
            onChange={(e) => handleChange(index, e)}
          />
          <Typography
            variant="h5"
            component="label"
            htmlFor="ingredient_amount"
            color="primary"
            sx={{
              display: "inline-flex",
              justifyContent: "flex-start",
              flexWrap: "wrap",
              marginBottom: "8px",
              marginTop: "20px",
            }}
          >
            Amount
          </Typography>
          <TextField
            type="number"
            id="ingredient_amount"
            size="small"
            variant="outlined"
            placeholder="Enter an amount"
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
            sx={{
              display: "inline-flex",
              justifyContent: "flex-start",
              flexWrap: "wrap",
              marginBottom: "8px",
              marginTop: "20px",
            }}
          >
            Unit of Measure
          </Typography>
          <TextField
            type="text"
            id="ingredient_unit"
            size="small"
            placeholder="Enter a unit of measurement"
            variant="outlined"
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
                backgroundImage:
                  "linear-gradient(to right, hsl(28deg 82% 48%), hsl(20deg 96% 28%))",
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
            backgroundImage:
              "linear-gradient(to right, hsl(150deg, 80%, 40%), hsl(181deg, 80%, 20%))",
            boxShadow: "0px 3px 8px hsl(181deg 80% 20% / 30%)",
          }}
        >
          Add
        </Button>
      </div>
    </Container>
  );
};

export default Testing;
