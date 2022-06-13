import React, { useState, useEffect } from "react";

const IngredientList = (props) => {
  return (
    <div>
      <p>
        {props.IngredientAmount} {props.IngredientUnit} of
        {props.IngredientName}
      </p>
    </div>
  );
};

export default IngredientList;
