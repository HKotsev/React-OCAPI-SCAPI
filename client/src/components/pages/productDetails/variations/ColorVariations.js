import classes from "../details.module.css";
const ColorVariations = (props) => {
  const handleColorSwitch = (colorValue, colorName) => {
    if (!props.variationAttributes.color) return;
    props.productAttributesHanlder("color", colorValue);
  };
  return (
    <div className={classes["color-variations"]}>
      {props.variationAttributes.color.map((color, i) => {
        return (
          <span
            key={i}
            onClick={() => {
              handleColorSwitch(color.value, color.name);
            }}
            style={{ backgroundColor: color.name.trim().toLowerCase() }}
          ></span>
        );
      })}
    </div>
  );
};
export default ColorVariations;
