import React, { useState } from "react";

const Testing = (props) => {
  const [formValues, setFormValues] = useState([
    { name: "", amount: 0, unit: "" },
  ]);

  let handleChange = (i, e) => {
    let newFormValues = [...formValues];
    newFormValues[i][e.target.name] = e.target.value;
    setFormValues(newFormValues);
    props.setIngredients(newFormValues);
  };

  let addFormFields = () => {
    setFormValues([...formValues, { name: "", amount: 0, unit: "" }]);
  };

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
    <div>
      {formValues.map((element, index) => (
        <div className="form-inline" key={index}>
          <h1>Ingredients</h1>
          <label htmlFor="ingredient_name">Name</label>
          <input
            type="text"
            id="ingredient_name"
            name="name"
            value={element.name || ""}
            onChange={(e) => handleChange(index, e)}
          />
          <label htmlFor="ingredient_amount">Amount</label>
          <input
            type="number"
            id="ingredient_amount"
            name="amount"
            value={element.amount || ""}
            onChange={(e) => handleChange(index, e)}
          />
          <label htmlFor="ingredient_unit">Unit of Measure</label>
          <input
            type="text"
            id="ingredient_unit"
            name="unit"
            value={element.unit || ""}
            onChange={(e) => handleChange(index, e)}
          />
          {index ? (
            <button
              type="button"
              className="button remove"
              onClick={() => removeFormFields(index)}
            >
              Remove
            </button>
          ) : null}
        </div>
      ))}
      <div className="button-section">
        <button
          className="button add"
          type="button"
          onClick={() => addFormFields()}
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default Testing;
