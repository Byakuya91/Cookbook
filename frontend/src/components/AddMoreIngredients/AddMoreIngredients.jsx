import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import AuthContext from "../../context/AuthContext";

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
  // console.log("The new Ingredients are:", newIngredients);
  // console.log("The new Ingredients unspread are:", unspreadNewIngredients);

  //   console log tests
  //   console.log("the Ingredients are as follows: ", ingredients_lst);

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

  // STEPS
  // 1) Figure out a way to take each individual object inside formValues and do an Axios call

  // 2) Incorporate headers
  // 3) Give us some response going forward.

  //   ingredients_lst.map((ingredient) => ingredientForm.append("Ingredients[]", ingredient))

  console.log("Outside the function before the AXIOS call", newIngredients);

  // async function handleIngredientsSubmit(e) {
  //   // prevents the page from defaulting
  //   e.preventDefault();
  //   console.log("Executing Handle Ingredient Submit ");

  //   // Step One: create an object to send in the POST request
  //   let IngredientForm = new FormData();

  //   //  Step Two: put each Ingredient object inside the FormData object
  //   // localStorage.setItem("token", res.headers["x-auth-token"]);
  //   setUser(jwtDecode(localStorage.getItem("token")));

  //   newIngredients.forEach((newIngredient) => {
  //     IngredientForm.append("ingredients[]", newIngredient);
  //   });

  //   // Step Three: AXIOS request

  //   console.log(
  //     "the Ingredients inside for the form is",
  //     IngredientForm.getAll("ingredients[]")
  //   );

  //   try {
  //     console.log("Inside function/before axios call: ", IngredientForm);

  //     await axios
  //       .post(
  //         `${BASE}/ingredients/${user._id}/recipes/${props.recipeID}/ingredients/`,
  //         IngredientForm,
  //         {
  //           headers: {
  //             "x-auth-token": localStorage.getItem("token"),
  //           },
  //         }
  //         // console.log(
  //         //   "The ingredients before the AXIO call are:",
  //         //   IngredientForm
  //         // ),
  //         // console.log("The user information  before the  AXIOS call are:", user)
  //       )

  //       .then((res) => {
  //         console.log("Promise Fulfilled:", res.data);
  //       });
  //   } catch (error) {
  //     console.log(error.message);
  //   }

  //   console.log("After the request of the setState call:", user);
  //   // console.log(res.data);
  // }

  // let resultOfData = handleIngredientSubmit();

  // console.log("The data inside handleIngredientSubmit is:", resultOfData);

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

          <button
            type="button"
            className="button remove"
            onClick={() => removeFormFields(index)}
          >
            Remove
          </button>
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

export default AddMoreIngredients;
