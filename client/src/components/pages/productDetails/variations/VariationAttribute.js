import classes from "./variationAttribute.module.css";
import Option from "./Option";
const VariationAttrute = (props) => {
  const choosenOptionHandler = (attribute, option) => {
    props.productAttributesHanlder(attribute, option);
  };
  return (
    <div className={classes.container}>
      {Object.keys(props.variationAttributes).map((attribute, i) => {
        if (
          attribute === "color" &&
          Array.isArray(props.variationAttributes[attribute])
        )
          return;

        return (
          <Option
            productDetails={props.productDetails}
            optionHandler={choosenOptionHandler}
            key={i}
            inex={i}
            attribute={attribute}
            variationAttributes={props.variationAttributes}
          />
        );
      })}
    </div>
  );
};
export default VariationAttrute;
