import axios from "axios";
import React, { useState, useEffect } from "react";

// NOTES: LOOK AT RECIPES DELETE FUNCTION AND REPLICATE IT
// COPY and PASTE Ingredients display code

const ProfileIngredientList = (props) => {
  //   console.log("The Ingredient ID is: ", props.IngredientID);

  return (
    <div>
      <div>
        <p>
          {props.IngredientAmount} {props.IngredientUnit} of{" "}
          {props.IngredientName}
        </p>
      </div>
    </div>
  );
};

export default ProfileIngredientList;
