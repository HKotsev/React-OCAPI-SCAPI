import classes from "./variationAttribute.module.css";
import { useEffect, useState } from "react";
import React from "react";

const Option = (props) => {
  const [selectedOption, setSelectedOption] = useState("");

  useEffect(() => {
    if (props.productDetails.type.variation_group) {
      props.optionHandler(
        props.attribute,
        props.productDetails.variation_values[props.attribute]
      );
    }
  }, []);

  const optionHanlder = (event) => {
    setSelectedOption(event.target.value);
    props.optionHandler(props.attribute, event.target.value);
  };
  return (
    <div className={classes["option-card"]}>
      <label>{props.attribute}</label>
      <select
        value={selectedOption}
        onChange={optionHanlder}
        className={classes["option-conainer"]}
        required
      >
        {props.variationAttributes[props.attribute].map((attr, i) => {
          if (i === 0) {
            return (
              <React.Fragment key={i}>
                <option value="">Select an option</option>
                <option disabled={!attr.orderable} value={attr.value}>
                  {attr.name}
                </option>
              </React.Fragment>
            );
          }
          return (
            <option disabled={!attr.orderable} value={attr.value} key={i}>
              {attr.name}
            </option>
          );
        })}{" "}
      </select>
    </div>
  );
};
export default Option;
